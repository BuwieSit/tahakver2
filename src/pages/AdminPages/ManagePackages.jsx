import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Package, X, CheckCircle2, AlertTriangle, PartyPopper } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const ManagePackages = () => {
  const { packages, setPackages } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [packageToDelete, setPackageToDelete] = useState(null);
  const [editingPackage, setEditingPackage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDuration, setFilterDuration] = useState("All Durations");
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    duration: "Day Trip",
    group: "",
    desc: ""
  });

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setIsSuccessModalOpen(true);
    // Automatically close after 3 seconds
    setTimeout(() => {
      setIsSuccessModalOpen(false);
    }, 3000);
  };

  const handleOpenModal = (pkg = null) => {
    if (pkg) {
      setEditingPackage(pkg);
      setFormData({
        title: pkg.title,
        price: pkg.price,
        duration: pkg.duration,
        group: pkg.group,
        desc: pkg.desc
      });
    } else {
      setEditingPackage(null);
      setFormData({
        title: "",
        price: "",
        duration: "Day Trip",
        group: "",
        desc: ""
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPackage(null);
  };

  const handleOpenDeleteModal = (pkg) => {
    setPackageToDelete(pkg);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPackageToDelete(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // SEC-10: Store price as a plain number, format only at render time
    const numericPrice = Number(formData.price) || 0;
    const action = editingPackage ? "updated" : "added";
    
    if (editingPackage) {
      setPackages(prev => prev.map(p => 
        p.id === editingPackage.id 
          ? { ...formData, id: p.id, price: numericPrice } 
          : p
      ));
    } else {
      const newPackage = {
        ...formData,
        id: Date.now(),
        price: numericPrice
      };
      setPackages(prev => [...prev, newPackage]);
    }
    
    handleCloseModal();
    showSuccess(`Package ${action} successfully!`);
  };

  const confirmDelete = () => {
    if (packageToDelete) {
      setPackages(prev => prev.filter(p => p.id !== packageToDelete.id));
      handleCloseDeleteModal();
      showSuccess("Package deleted successfully!");
    }
  };

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pkg.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDuration = filterDuration === "All Durations" || pkg.duration === filterDuration;
    return matchesSearch && matchesDuration;
  });

  return (
    <div className="space-y-8 animate__animated animate__fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-emerald-500">Manage Packages</h1>
          <p className="text-gray-400">Add, edit or remove tour packages</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20"
        >
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-950 border border-gray-800 rounded-xl py-3 pl-12 pr-4 text-gray-200 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        <select 
          value={filterDuration}
          onChange={(e) => setFilterDuration(e.target.value)}
          className="bg-gray-950 border border-gray-800 text-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
        >
          <option>All Durations</option>
          <option>Day Trip</option>
          <option>2 Days, 1 Night</option>
          <option>3 Days, 2 Nights</option>
        </select>
      </div>

      {/* Packages Table */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
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
              {filteredPackages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-gray-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                        <Package size={20} />
                      </div>
                      <div>
                        <span className="font-medium text-gray-200 block">{pkg.title}</span>
                        <span className="text-[10px] text-gray-500 line-clamp-1">{pkg.desc}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-emerald-500 font-bold">₱{Number(pkg.price).toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-400">{pkg.duration}</td>
                  <td className="px-6 py-4 text-gray-400">{pkg.group}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(pkg)}
                        className="p-2 hover:bg-emerald-500/10 text-gray-400 hover:text-emerald-500 rounded-lg transition-all"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleOpenDeleteModal(pkg)}
                        className="p-2 hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPackages.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500 italic">
                    No packages found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Main Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={handleCloseModal}></div>
          <div className="relative bg-gray-900 border border-emerald-500/30 w-full max-w-lg rounded-[2.5rem] shadow-[0_0_50px_rgba(16,185,129,0.1)] overflow-hidden animate__animated animate__zoomIn animate__faster">
            <div className="p-8 border-b border-gray-800 flex justify-between items-center bg-gray-900">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-xl">
                  {editingPackage ? <Edit2 size={24} className="text-emerald-500" /> : <Plus size={24} className="text-emerald-500" />}
                </div>
                {editingPackage ? 'Edit Package' : 'Add New Package'}
              </h2>
              <button onClick={handleCloseModal} className="p-2 hover:bg-gray-800 rounded-xl transition-colors text-gray-400">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Package Title</label>
                <input 
                  type="text" 
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Ugnayan: The Connection" 
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl py-3 px-4 text-gray-200 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Price (₱)</label>
                  <input 
                    type="number" 
                    name="price"
                    required
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="2500" 
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl py-3 px-4 text-gray-200 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration</label>
                  <select 
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl py-3 px-4 text-gray-200 focus:outline-none focus:border-emerald-500 transition-colors"
                  >
                    <option>Day Trip</option>
                    <option>2 Days, 1 Night</option>
                    <option>3 Days, 2 Nights</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Group Size</label>
                <input 
                  type="text" 
                  name="group"
                  required
                  value={formData.group}
                  onChange={handleInputChange}
                  placeholder="e.g. 2-4 persons" 
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl py-3 px-4 text-gray-200 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</label>
                <textarea 
                  name="desc"
                  required
                  rows="3"
                  value={formData.desc}
                  onChange={handleInputChange}
                  placeholder="Describe the experience..." 
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl py-3 px-4 text-gray-200 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                ></textarea>
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
                  <span>{editingPackage ? 'Update' : 'Save'} Package</span>
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
                You are about to delete <span className="text-gray-200 font-bold">"{packageToDelete?.title}"</span>. This action cannot be undone.
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

export default ManagePackages;
