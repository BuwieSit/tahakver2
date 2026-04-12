import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Activity, Tag } from 'lucide-react';

const ManageActivities = () => {
  const [activities, setActivities] = useState([
    { id: 1, name: "Forest Bathing", price: 500, icon: "🌲", category: "Wellness" },
    { id: 2, name: "Mountain Trekking", price: 800, icon: "⛰️", category: "Adventure" },
    { id: 3, name: "Traditional Hilot", price: 1200, icon: "👐", category: "Wellness" },
    { id: 4, name: "Farm-to-Table Lunch", price: 600, icon: "🥗", category: "Food" },
    { id: 5, name: "Waterfalls Swim", price: 300, icon: "🌊", category: "Leisure" },
    { id: 6, name: "Tea Ritual", price: 400, icon: "🍵", category: "Culture" },
  ]);

  return (
    <div className="space-y-8 animate__animated animate__fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-emerald-500">Manage Activities</h1>
          <p className="text-gray-400">Individual experiences for custom bookings</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20">
          <Plus size={20} />
          <span>Add New Activity</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-emerald-500/50 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-center text-3xl">
                {activity.icon}
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 hover:bg-blue-500/10 text-blue-400 rounded-lg transition-colors">
                  <Edit2 size={16} />
                </button>
                <button className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-100 mb-1">{activity.name}</h3>
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
              <Tag size={14} />
              <span>{activity.category}</span>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-800">
              <span className="text-gray-400 text-sm">Price per person</span>
              <span className="text-emerald-500 font-bold text-lg">₱{activity.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageActivities;
