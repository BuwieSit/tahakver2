import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Activity, 
  CalendarCheck, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  User,
  CheckCircle2,
  AlertCircle,
  Info
} from 'lucide-react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Booking', message: 'Juan Dela Cruz booked Ugnayan Experience', time: '2 mins ago', type: 'success', read: false },
    { id: 2, title: 'New User', message: 'Maria Clara registered an account', time: '1 hour ago', type: 'info', read: false },
    { id: 3, title: 'System Update', message: 'Server maintenance scheduled for midnight', time: '3 hours ago', type: 'warning', read: true },
  ]);
  
  const notificationRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin' },
    { icon: <Package size={20} />, label: 'Manage Packages', path: '/admin/packages' },
    { icon: <Activity size={20} />, label: 'Manage Activities', path: '/admin/activities' },
    { icon: <CalendarCheck size={20} />, label: 'Bookings', path: '/admin/bookings' },
    { icon: <Users size={20} />, label: 'Users', path: '/admin/users' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/admin/settings' },
  ];

  const handleLogout = () => {
    navigate('/access');
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-900 border-r border-gray-800 transition-all duration-300 flex flex-col fixed h-full z-50`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && <span className="text-xl font-bold text-emerald-500">TAHAK Admin</span>}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all group ${
                location.pathname === item.path 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                  : 'hover:bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              <div className="shrink-0">{item.icon}</div>
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-3 py-3 w-full text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`${isSidebarOpen ? 'ml-64' : 'ml-20'} flex-1 flex flex-col transition-all duration-300`}>
        {/* Top Header */}
        <header className="h-20 bg-gray-900/50 backdrop-blur-md border-b border-gray-800 px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="relative w-96 hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search data, users, bookings..." 
              className="w-full bg-gray-950/50 border border-gray-800 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-emerald-500/50 transition-all text-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all relative group"
              >
                <Bell size={20} className="text-gray-400 group-hover:text-white" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-gray-800">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-4 w-80 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden animate__animated animate__fadeIn">
                  <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                    <h3 className="font-bold">Notifications</h3>
                    <button onClick={markAllAsRead} className="text-xs text-emerald-500 hover:underline">Mark all as read</button>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(n => (
                        <div key={n.id} className={`p-4 border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors cursor-pointer ${!n.read ? 'bg-emerald-500/5' : ''}`}>
                          <div className="flex gap-3">
                            <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                              n.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 
                              n.type === 'warning' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'
                            }`}>
                              {n.type === 'success' ? <CheckCircle2 size={16} /> : 
                               n.type === 'warning' ? <AlertCircle size={16} /> : <Info size={16} />}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-200">{n.title}</p>
                              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{n.message}</p>
                              <p className="text-[10px] text-gray-600 mt-2 font-medium">{n.time}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-gray-500 text-sm">No new notifications</div>
                    )}
                  </div>
                  <button className="w-full p-3 text-xs text-gray-400 hover:text-white hover:bg-gray-800 transition-all font-medium border-t border-gray-800">
                    See All Notifications
                  </button>
                </div>
              )}
            </div>

            <div className="h-8 w-px bg-gray-800 mx-2" />

            {/* Profile */}
            <div className="flex items-center gap-3 pl-2 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-200 group-hover:text-emerald-500 transition-colors">Admin Buwie</p>
                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-900/20">
                BS
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
