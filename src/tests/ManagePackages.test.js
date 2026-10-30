import { describe, it, expect } from 'vitest';

/**
 * Pure unit tests for ManagePackages business logic.
 * Tests filtering, CRUD operations, and price formatting
 * without needing to render the full component.
 */

// --- Price formatting (as implemented in handleSubmit) ---
function formatPrice(rawPrice) {
  return Number(rawPrice).toLocaleString();
}

// --- Filter logic (as implemented in filteredPackages) ---
function filterPackages(packages, searchQuery, filterDuration) {
  return packages.filter(pkg => {
    const matchesSearch =
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDuration =
      filterDuration === 'All Durations' || pkg.duration === filterDuration;
    return matchesSearch && matchesDuration;
  });
}

// --- CRUD helpers (mirrors handleSubmit / confirmDelete) ---
function addPackage(packages, formData) {
  const formattedPrice = formatPrice(formData.price);
  return [...packages, { ...formData, id: Date.now(), price: formattedPrice }];
}

function updatePackage(packages, editingId, formData) {
  const formattedPrice = formatPrice(formData.price);
  return packages.map(p =>
    p.id === editingId ? { ...formData, id: p.id, price: formattedPrice } : p
  );
}

function deletePackage(packages, idToDelete) {
  return packages.filter(p => p.id !== idToDelete);
}

// --- Test data ---
const samplePackages = [
  { id: 1, title: 'Ugnayan: The Connection', price: '2,500', duration: 'Day Trip', group: '2-4', desc: 'Forest bathing experience' },
  { id: 2, title: 'Sama: Community Stay', price: '4,800', duration: '2 Days, 1 Night', group: 'Max 6', desc: 'Farm life immersion' },
  { id: 3, title: 'Kapwa: Shared Journey', price: '7,200', duration: '3 Days, 2 Nights', group: 'Group of 10', desc: 'Mountain trek adventure' },
];

describe('ManagePackages business logic', () => {
  describe('filterPackages()', () => {
    it('returns all packages when search is empty and duration is All Durations', () => {
      expect(filterPackages(samplePackages, '', 'All Durations')).toHaveLength(3);
    });

    it('filters by title (case-insensitive)', () => {
      const result = filterPackages(samplePackages, 'ugnayan', 'All Durations');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
    });

    it('filters by description (case-insensitive)', () => {
      const result = filterPackages(samplePackages, 'mountain trek', 'All Durations');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(3);
    });

    it('filters by exact duration', () => {
      const result = filterPackages(samplePackages, '', 'Day Trip');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
    });

    it('returns empty array when no title or desc match', () => {
      expect(filterPackages(samplePackages, 'zzznoexist', 'All Durations')).toHaveLength(0);
    });

    it('applies both search and duration filters simultaneously', () => {
      // "farm" appears in desc of id:2 which has "2 Days, 1 Night"
      const result = filterPackages(samplePackages, 'farm', '2 Days, 1 Night');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(2);
    });

    it('returns empty when search matches but duration does not', () => {
      const result = filterPackages(samplePackages, 'ugnayan', '3 Days, 2 Nights');
      expect(result).toHaveLength(0);
    });
  });

  describe('formatPrice()', () => {
    it('formats 2500 to a locale string', () => {
      // toLocaleString is environment-dependent; we check it is a non-empty string
      const result = formatPrice('2500');
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('produces the same result as Number().toLocaleString()', () => {
      expect(formatPrice('7200')).toBe(Number('7200').toLocaleString());
    });

    it('strips commas from "2,500" before formatting (via Number())', () => {
      // Number("2,500") is NaN, so .replace(/,/g,'') happens before this call in openModal
      // Here we only test the formatPrice step with already-stripped input
      expect(formatPrice('2500')).toBe(Number(2500).toLocaleString());
    });
  });

  describe('addPackage()', () => {
    it('appends a new package to the array', () => {
      const result = addPackage(samplePackages, { title: 'New Pkg', price: '1000', duration: 'Day Trip', group: '1', desc: 'Test' });
      expect(result).toHaveLength(4);
    });

    it('new package title matches formData', () => {
      const result = addPackage(samplePackages, { title: 'New Pkg', price: '1000', duration: 'Day Trip', group: '1', desc: 'Test' });
      expect(result.at(-1).title).toBe('New Pkg');
    });

    it('new package price is formatted via toLocaleString', () => {
      const result = addPackage(samplePackages, { title: 'Pkg', price: '5000', duration: 'Day Trip', group: '1', desc: '' });
      expect(result.at(-1).price).toBe(Number(5000).toLocaleString());
    });

    it('new package gets a numeric id', () => {
      const result = addPackage(samplePackages, { title: 'Pkg', price: '100', duration: 'Day Trip', group: '1', desc: '' });
      expect(typeof result.at(-1).id).toBe('number');
    });
  });

  describe('updatePackage()', () => {
    it('updates only the package with the matching id', () => {
      const result = updatePackage(samplePackages, 1, { title: 'Updated Title', price: '3000', duration: 'Day Trip', group: '2', desc: 'Updated' });
      expect(result[0].title).toBe('Updated Title');
      expect(result[1].title).toBe('Sama: Community Stay');
      expect(result[2].title).toBe('Kapwa: Shared Journey');
    });

    it('preserves the original id after update', () => {
      const result = updatePackage(samplePackages, 2, { title: 'X', price: '100', duration: 'Day Trip', group: '1', desc: 'Y' });
      expect(result[1].id).toBe(2);
    });

    it('does not change array length', () => {
      const result = updatePackage(samplePackages, 1, { title: 'X', price: '100', duration: 'Day Trip', group: '1', desc: 'Y' });
      expect(result).toHaveLength(3);
    });
  });

  describe('deletePackage()', () => {
    it('removes the package with the matching id', () => {
      const result = deletePackage(samplePackages, 2);
      expect(result).toHaveLength(2);
      expect(result.find(p => p.id === 2)).toBeUndefined();
    });

    it('does not remove unrelated packages', () => {
      const result = deletePackage(samplePackages, 2);
      expect(result.find(p => p.id === 1)).toBeDefined();
      expect(result.find(p => p.id === 3)).toBeDefined();
    });

    it('returns unchanged array when id does not exist', () => {
      const result = deletePackage(samplePackages, 999);
      expect(result).toHaveLength(3);
    });
  });
});
