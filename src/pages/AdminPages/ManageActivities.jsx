import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Activity, Tag, X, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const ManageActivities = () => {
  const { activities, setActivities } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [activityToDelete, setActivityToDelete] = useState(null);
  const [editingActivity, setEditingActivity] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    icon: "✨",
    category: "Wellness"
  });

  const categories = ["Wellness", "Adventure", "Food", "Leisure", "Culture"];

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setIsSuccessModalOpen(true);
    setTimeout(() => setIsSuccessModalOpen(false), 3000);
  };

  const handleOpenModal = (activity = null) => {
    if (activity) {
      setEditingActivity(activity);
      setFormData({
        name: activity.name,
        price: activity.price.toString(),
        icon: activity.icon,
        category: activity.category
      });
    } else {
      setEditingActivity(null);
      setFormData({
        name: "",
        price: "",
        icon: "✨",
        category: "Wellness"
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingActivity(null);
  };

  const handleOpenDeleteModal = (activity) => {
    setActivityToDelete(activity);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setActivityToDelete(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = editingActivity ? "updated" : "added";
    
    const formattedActivity = {
      ...formData,
      price: parseInt(formData.price) || 0
    };

    if (editingActivity) {
      setActivities(prev => prev.map(a => 
        a.id === editingActivity.id ? { ...formattedActivity, id: a.id } : a
      ));
    } else {
      setActivities(prev => [...prev, { ...formattedActivity, id: Date.now() }]);
    }
    
    handleCloseModal();
    showSuccess(`Activity ${action} successfully!`);
  };

  const confirmDelete = () => {
    if (activityToDelete) {
      setActivities(prev => prev.filter(a => a.id !== activityToDelete.id));
      handleCloseDeleteModal();
      showSuccess("Activity deleted successfully!");
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "All Categories" || activity.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate__animated animate__fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-emerald-500">Manage Activities</h1>
          <p className="text-gray-400">Individual experiences for custom bookings</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20"
        >
          <Plus size={20} />
          <span>Add New Activity</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder="Search activities..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-950 border border-gray-800 rounded-xl py-3 pl-12 pr-4 text-gray-200 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        <select 
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-gray-950 border border-gray-800 text-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
        >
          <option>All Categories</option>
          {categories.map(cat => <option key={cat}>{cat}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-emerald-500/50 transition-all group relative overflow-hidden">
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                {activity.icon}
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                <button 
                  onClick={() => handleOpenModal(activity)}
                  className="p-2 hover:bg-emerald-500/10 text-gray-400 hover:text-emerald-500 rounded-lg transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => handleOpenDeleteModal(activity)}
                  className="p-2 hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-100 mb-1 relative z-10">{activity.name}</h3>
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-4 relative z-10">
              <Tag size={14} />
              <span>{activity.category}</span>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-800 relative z-10">
              <span className="text-gray-400 text-sm">Price per person</span>
              <span className="text-emerald-500 font-bold text-lg">₱{activity.price.toLocaleString()}</span>
            </div>

            {/* Subtle background glow on hover */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full -translate-y-16 translate-x-16 group-hover:bg-emerald-500/10 transition-colors"></div>
          </div>
        ))}

        {filteredActivities.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 italic">
            No activities found matching your criteria.
          </div>
        )}
      </div>

      {/* Main Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={handleCloseModal}></div>
          <div className="relative bg-gray-900 border border-emerald-500/30 w-full max-w-md rounded-[2.5rem] shadow-[0_0_50px_rgba(16,185,129,0.1)] overflow-hidden animate__animated animate__zoomIn animate__faster">
            <div className="p-8 border-b border-gray-800 flex justify-between items-center bg-gray-900">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-xl">
                  {editingActivity ? <Edit2 size={24} className="text-emerald-500" /> : <Plus size={24} className="text-emerald-500" />}
                </div>
                {editingActivity ? 'Edit Activity' : 'Add New Activity'}
              </h2>
              <button onClick={handleCloseModal} className="p-2 hover:bg-gray-800 rounded-xl transition-colors text-gray-400">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="space-y-1.5 sm:col-span-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Icon</label>
                  <input 
                    type="text" 
                    name="icon"
                    required
                    maxLength="2"
                    value={formData.icon}
                    onChange={handleInputChange}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl py-3 px-4 text-center text-xl text-gray-200 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-3">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Activity Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Forest Bathing" 
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl py-3 px-4 text-gray-200 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl py-3 px-4 text-gray-200 focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  {categories.map(cat => <option key={cat}>{cat}</option>)}
                </select>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Price (₱)</label>
                <input 
                  type="number" 
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="500" 
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl py-3 px-4 text-gray-200 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button 
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-xl transition-all order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 order-1 sm:order-2"
                >
                  <CheckCircle2 size={18} />
                  <span>{editingActivity ? 'Update' : 'Save'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleCloseDeleteModal}></div>
          <div className="relative bg-gray-900 border border-gray-800 w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate__animated animate__headShake animate__faster">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <AlertTriangle size={32} />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Are you sure?</h2>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                You are about to delete <span className="text-gray-200 font-bold">"{activityToDelete?.name}"</span>. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={handleCloseDeleteModal}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-xl transition-all"
                >
                  No, Keep it
                </button>
                <button 
                  onClick={confirmDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-red-900/20"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSuccessModalOpen(false)}></div>
          <div className="relative bg-emerald-600 w-full max-w-xs rounded-3xl shadow-2xl overflow-hidden animate__animated animate__bounceIn">
            <div className="p-8 text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-xl font-bold mb-1">Success!</h2>
              <p className="text-emerald-50 text-sm">{successMessage}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageActivities;
