import { describe, it, expect } from 'vitest';

/**
 * Pure unit tests for ManageActivities business logic.
 * Tests filtering, CRUD operations, and price parsing.
 */

// --- Price parsing (as implemented in handleSubmit) ---
function parsePrice(rawPrice) {
  return parseInt(rawPrice) || 0;
}

// --- Filter logic ---
function filterActivities(activities, searchQuery, filterCategory) {
  return activities.filter(activity => {
    const matchesSearch = activity.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === 'All Categories' || activity.category === filterCategory;
    return matchesSearch && matchesCategory;
  });
}

// --- CRUD helpers ---
function addActivity(activities, formData) {
  const formatted = { ...formData, price: parsePrice(formData.price), id: Date.now() };
  return [...activities, formatted];
}

function updateActivity(activities, editingId, formData) {
  return activities.map(a =>
    a.id === editingId ? { ...formData, price: parsePrice(formData.price), id: a.id } : a
  );
}

function deleteActivity(activities, idToDelete) {
  return activities.filter(a => a.id !== idToDelete);
}

// --- Test data ---
const sampleActivities = [
  { id: 1, name: 'Forest Bathing', price: 500, icon: '🌲', category: 'Wellness' },
  { id: 2, name: 'Mountain Trekking', price: 800, icon: '⛰️', category: 'Adventure' },
  { id: 3, name: 'Traditional Hilot', price: 1200, icon: '👐', category: 'Wellness' },
  { id: 4, name: 'Farm-to-Table Lunch', price: 600, icon: '🥗', category: 'Food' },
  { id: 5, name: 'Waterfalls Swim', price: 300, icon: '🌊', category: 'Leisure' },
  { id: 6, name: 'Tea Ritual', price: 400, icon: '🍵', category: 'Culture' },
];

describe('ManageActivities business logic', () => {
  describe('filterActivities()', () => {
    it('returns all activities when search is empty and category is All Categories', () => {
      expect(filterActivities(sampleActivities, '', 'All Categories')).toHaveLength(6);
    });

    it('filters by name (case-insensitive)', () => {
      const result = filterActivities(sampleActivities, 'forest', 'All Categories');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
    });

    it('does NOT filter by description (unlike packages — activities match name only)', () => {
      // "bath" is in "Forest Bathing" name, so it matches; but if we search "pine forest"
      // which would only appear in a description, it returns nothing
      const result = filterActivities(sampleActivities, 'pine forest', 'All Categories');
      expect(result).toHaveLength(0);
    });

    it('filters by category', () => {
      const result = filterActivities(sampleActivities, '', 'Wellness');
      expect(result).toHaveLength(2);
      expect(result.every(a => a.category === 'Wellness')).toBe(true);
    });

    it('filters Adventure category returns only Mountain Trekking', () => {
      const result = filterActivities(sampleActivities, '', 'Adventure');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Mountain Trekking');
    });

    it('returns empty array when no name matches', () => {
      expect(filterActivities(sampleActivities, 'zzznoexist', 'All Categories')).toHaveLength(0);
    });

    it('applies both search and category filters simultaneously', () => {
      const result = filterActivities(sampleActivities, 'hilot', 'Wellness');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Traditional Hilot');
    });

    it('returns empty when name matches but category does not', () => {
      const result = filterActivities(sampleActivities, 'forest bathing', 'Adventure');
      expect(result).toHaveLength(0);
    });
  });

  describe('parsePrice()', () => {
    it('parses "500" to number 500', () => {
      expect(parsePrice('500')).toBe(500);
    });

    it('parses "0" to 0', () => {
      expect(parsePrice('0')).toBe(0);
    });

    it('returns 0 for empty string (parseInt fallback)', () => {
      expect(parsePrice('')).toBe(0);
    });

    it('returns 0 for non-numeric string', () => {
      expect(parsePrice('abc')).toBe(0);
    });

    it('truncates decimals (parseInt behaviour)', () => {
      expect(parsePrice('500.99')).toBe(500);
    });
  });

  describe('addActivity()', () => {
    it('appends a new activity to the array', () => {
      const result = addActivity(sampleActivities, { name: 'New Act', price: '200', icon: '🧪', category: 'Culture' });
      expect(result).toHaveLength(7);
    });

    it('new activity name matches formData', () => {
      const result = addActivity(sampleActivities, { name: 'New Act', price: '200', icon: '🧪', category: 'Culture' });
      expect(result.at(-1).name).toBe('New Act');
    });

    it('new activity price is a parsed integer', () => {
      const result = addActivity(sampleActivities, { name: 'Act', price: '750', icon: '✨', category: 'Wellness' });
      expect(result.at(-1).price).toBe(750);
      expect(typeof result.at(-1).price).toBe('number');
    });

    it('new activity price defaults to 0 when price is empty', () => {
      const result = addActivity(sampleActivities, { name: 'Act', price: '', icon: '✨', category: 'Wellness' });
      expect(result.at(-1).price).toBe(0);
    });

    it('new activity gets a numeric id', () => {
      const result = addActivity(sampleActivities, { name: 'Act', price: '100', icon: '✨', category: 'Wellness' });
      expect(typeof result.at(-1).id).toBe('number');
    });
  });

  describe('updateActivity()', () => {
    it('updates only the activity with the matching id', () => {
      const result = updateActivity(sampleActivities, 1, { name: 'Updated', price: '999', icon: '🔄', category: 'Culture' });
      expect(result[0].name).toBe('Updated');
      expect(result[1].name).toBe('Mountain Trekking');
    });

    it('preserves the original id after update', () => {
      const result = updateActivity(sampleActivities, 3, { name: 'X', price: '100', icon: '✨', category: 'Wellness' });
      expect(result[2].id).toBe(3);
    });

    it('converts price string to integer on update', () => {
      const result = updateActivity(sampleActivities, 1, { name: 'Forest Bathing', price: '600', icon: '🌲', category: 'Wellness' });
      expect(result[0].price).toBe(600);
      expect(typeof result[0].price).toBe('number');
    });

    it('does not change array length', () => {
      const result = updateActivity(sampleActivities, 1, { name: 'X', price: '100', icon: '✨', category: 'Wellness' });
      expect(result).toHaveLength(6);
    });
  });

  describe('deleteActivity()', () => {
    it('removes the activity with the matching id', () => {
      const result = deleteActivity(sampleActivities, 4);
      expect(result).toHaveLength(5);
      expect(result.find(a => a.id === 4)).toBeUndefined();
    });

    it('does not remove unrelated activities', () => {
      const result = deleteActivity(sampleActivities, 4);
      expect(result.find(a => a.id === 1)).toBeDefined();
    });

    it('returns unchanged array when id does not exist', () => {
      const result = deleteActivity(sampleActivities, 999);
      expect(result).toHaveLength(6);
    });
  });

  describe('valid categories', () => {
    it('all 5 valid categories are represented in the default data', () => {
      const categories = ['Wellness', 'Adventure', 'Food', 'Leisure', 'Culture'];
      categories.forEach(cat => {
        expect(sampleActivities.some(a => a.category === cat)).toBe(true);
      });
    });
  });
});
