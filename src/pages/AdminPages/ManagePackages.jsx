import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Package } from 'lucide-react';

const ManagePackages = () => {
  const [packages, setPackages] = useState([
    {
      id: 1,
      title: "Ugnayan: The Connection",
      price: "₱2,500",
      duration: "Day Trip",
      group: "2-4 persons",
      desc: "A full day of forest bathing, guided meditation, and organic lunch."
    },
    {
      id: 2,
      title: "Sama: Community Stay",
      price: "₱4,800",
      duration: "2 Days, 1 Night",
      group: "Max 6 persons",
      desc: "Immerse in local farm life, learn traditional crafts, and sleep under the stars."
    },
    {
      id: 3,
      title: "Kapwa: Shared Journey",
      price: "₱7,200",
      duration: "3 Days, 2 Nights",
      group: "Group of 10",
      desc: "Multi-day mountain trek with professional guides and tribal storytelling."
    }
  ]);

  return (
    <div className="space-y-8 animate__animated animate__fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-emerald-500">Manage Packages</h1>
          <p className="text-gray-400">Add, edit or remove tour packages</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20">
          <Plus size={20} />
          <span>Add New Package</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder="Search packages..." 
            className="w-full bg-gray-950 border border-gray-800 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        <select className="bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors">
          <option>All Durations</option>
          <option>Day Trip</option>
          <option>Overnight</option>
          <option>Multi-day</option>
        </select>
      </div>

      {/* Packages Table */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-800/50 text-gray-400 text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Package Name</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Duration</th>
                <th className="px-6 py-4 font-semibold">Group Size</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-gray-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                        <Package size={20} />
                      </div>
                      <span className="font-medium text-gray-200">{pkg.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-emerald-500 font-bold">{pkg.price}</td>
                  <td className="px-6 py-4 text-gray-400">{pkg.duration}</td>
                  <td className="px-6 py-4 text-gray-400">{pkg.group}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-blue-500/10 text-blue-400 rounded-lg transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagePackages;
