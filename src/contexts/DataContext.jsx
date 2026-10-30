import React, { createContext, useContext, useState, useEffect } from 'react';
import farm from "../assets/pictures/farm.jpg";
import forestbath from "../assets/pictures/forestbath.jpg";
import trek from "../assets/pictures/trek.jpg";
import tea from "../assets/pictures/tea.jpg";
import sound from "../assets/pictures/sound.jpg";
import hilot from "../assets/pictures/hilot.png";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Initial default data
  const defaultPackages = [
    {
      id: 1,
      title: "Ugnayan: The Connection",
      price: "2,500",
      img: forestbath,
      duration: "Day Trip",
      group: "2-4 persons",
      desc: "A full day of forest bathing, guided meditation, and organic lunch."
    },
    {
      id: 2,
      title: "Sama: Community Stay",
      price: "4,800",
      img: farm,
      duration: "2 Days, 1 Night",
      group: "Max 6 persons",
      desc: "Immerse in local farm life, learn traditional crafts, and sleep under the stars."
    },
    {
      id: 3,
      title: "Kapwa: Shared Journey",
      price: "7,200",
      img: trek,
      duration: "3 Days, 2 Nights",
      group: "Group of 10",
      desc: "Multi-day mountain trek with professional guides and tribal storytelling."
    },
    {
      id: 4,
      title: "The Sound of Silence",
      price: "1,800",
      img: sound,
      duration: "4 Hours",
      group: "Max 12 persons",
      desc: "A therapeutic sound bath session in the middle of a pine forest."
    },
    {
      id: 5,
      title: "Ancestral Healing (Hilot)",
      price: "3,200",
      img: hilot,
      duration: "Full Day",
      group: "Private",
      desc: "Traditional Hilot massage and herbal bath experience at the falls."
    },
    {
      id: 6,
      title: "Mountain Tea Ritual",
      price: "1,200",
      img: tea,
      duration: "2 Hours",
      group: "Open Group",
      desc: "Taste various mountain teas and learn about local medicinal plants."
    }
  ];

  const defaultActivities = [
    { id: 1, name: "Forest Bathing", price: 500, icon: "🌲", category: "Wellness" },
    { id: 2, name: "Mountain Trekking", price: 800, icon: "⛰️", category: "Adventure" },
    { id: 3, name: "Traditional Hilot", price: 1200, icon: "👐", category: "Wellness" },
    { id: 4, name: "Farm-to-Table Lunch", price: 600, icon: "🥗", category: "Food" },
    { id: 5, name: "Waterfalls Swim", price: 300, icon: "🌊", category: "Leisure" },
    { id: 6, name: "Tea Ritual", price: 400, icon: "🍵", category: "Culture" },
  ];

  // Initialize state from localStorage or defaults
  const [packages, setPackages] = useState(() => {
    const saved = localStorage.getItem('tahak_packages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse packages from localStorage", e);
        return defaultPackages;
      }
    }
    return defaultPackages;
  });

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('tahak_activities');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse activities from localStorage", e);
        return defaultActivities;
      }
    }
    return defaultActivities;
  });

  // Sync with localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('tahak_packages', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('tahak_activities', JSON.stringify(activities));
  }, [activities]);

  return (
    <DataContext.Provider value={{ packages, setPackages, activities, setActivities }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
