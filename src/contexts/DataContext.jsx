import React, { createContext, useContext, useState, useEffect } from 'react';
import kapwa1 from "../assets/TOUR_PACKAGES/kapwa1.png";
import ugnayan1 from "../assets/TOUR_PACKAGES/ugnayan1.png";
import samasama1 from "../assets/TOUR_PACKAGES/samasama1.png";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Official tour packages from TOUR_PACKAGES.md
  const defaultPackages = [
    {
      id: 1,
      title: "Kapwa Package (3D2N)",
      price: 7200,
      img: kapwa1,
      duration: "3 Days, 2 Nights",
      group: "Min 2-10 persons",
      desc: "Our signature multi-day retreat: Mt. Banahaw guided trek with folklore storytelling and Pamumuwesto, Sta. Lucia Falls water cleansing, Banahaw Circle Nature Retreat stay, FarmKO organic farm immersion, Tuob with Hilot, Kawa bath, and Tacsyapo reflection."
    },
    {
      id: 2,
      title: "Ugnayan Package (2D1N)",
      price: 4800,
      img: ugnayan1,
      duration: "2 Days, 1 Night",
      group: "Min 2-8 persons",
      desc: "A restorative 2D1N healing sanctuary stay at Banahaw Circle Nature Retreat with Arnis stick yoga, forest bathing, Sta. Lucia Falls meditation, Tuob with coconut charcoal and Hilot, campfire story circle, and organic farm tour."
    },
    {
      id: 3,
      title: "Sama-Sama Package (Day Tour)",
      price: 2500,
      img: samasama1,
      duration: "Day Tour",
      group: "Min 2-10 persons",
      desc: "A transformative full-day immersion: Mt. Banahaw guided trek with folklore storytelling, Arnis stick yoga, forest bathing, organic lunch, Kawa bath, Tuob with coconut charcoal and traditional Hilot session, and Tacsyapo reflection."
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
        const parsed = JSON.parse(saved);
        // Cleanse legacy placeholder packages if present (e.g. old 6-package list)
        if (Array.isArray(parsed) && parsed.some(p => p.id === 4 || p.id === 5 || p.id === 6)) {
          localStorage.setItem('tahak_packages', JSON.stringify(defaultPackages));
          return defaultPackages;
        }
        return parsed;
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

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tahak_packages', JSON.stringify(packages));
    } catch (e) {
      console.error("Failed to save packages to localStorage", e);
    }
  }, [packages]);

  useEffect(() => {
    try {
      localStorage.setItem('tahak_activities', JSON.stringify(activities));
    } catch (e) {
      console.error("Failed to save activities to localStorage", e);
    }
  }, [activities]);

  return (
    <DataContext.Provider value={{
      packages,
      setPackages,
      activities,
      setActivities
    }}>
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
