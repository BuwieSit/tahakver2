import React from 'react';
import { 
  Users, 
  Package, 
  CalendarCheck, 
  TrendingUp,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const AdminDashboard = () => {
  // Mock data for charts
  const revenueData = [
    { name: 'Jan', revenue: 12000, bookings: 45 },
    { name: 'Feb', revenue: 19000, bookings: 52 },
    { name: 'Mar', revenue: 15000, bookings: 48 },
    { name: 'Apr', revenue: 22000, bookings: 61 },
    { name: 'May', revenue: 30000, bookings: 75 },
    { name: 'Jun', revenue: 42500, bookings: 128 },
  ];

  const packageDistribution = [
    { name: 'Ugnayan', value: 40, color: '#10b981' },
    { name: 'Sama', value: 25, color: '#3b82f6' },
    { name: 'Kapwa', value: 20, color: '#8b5cf6' },
    { name: 'Others', value: 15, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-8 animate__animated animate__fadeIn pb-12 text-white">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-emerald-500">Analytics Overview</h1>
          <p className="text-gray-400">Real-time performance metrics for TAHAK.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-gray-900 border border-gray-800 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
            Last 30 Days
          </button>
          <button className="bg-emerald-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-900/20">
            Export Report
          </button>
        </div>
      </header>
      
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Bookings" 
          value="128" 
          change="+12.5%" 
          icon={<CalendarCheck className="text-blue-500" />} 
          bg="bg-blue-500/10" 
        />
        <StatCard 
          title="Active Users" 
          value="1,245" 
          change="+3.2%" 
          icon={<Users className="text-emerald-500" />} 
          bg="bg-emerald-500/10" 
        />
        <StatCard 
          title="Total Packages" 
          value="12" 
          change="0%" 
          icon={<Package className="text-purple-500" />} 
          bg="bg-purple-500/10" 
        />
        <StatCard 
          title="Revenue" 
          value="₱42,500" 
          change="+8.4%" 
          icon={<TrendingUp className="text-amber-500" />} 
          bg="bg-amber-500/10" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-gray-900 rounded-3xl p-6 border border-gray-800 shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-bold">Revenue Growth</h2>
              <p className="text-xs text-gray-500 mt-1">Monthly earnings vs booking volume</p>
            </div>
            <select className="bg-gray-950 border border-gray-800 text-xs rounded-lg px-2 py-1 outline-none">
              <option>Yearly</option>
              <option>Monthly</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#6b7280" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#6b7280" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `₱${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800 shadow-xl">
          <h2 className="text-xl font-bold mb-2">Package Popularity</h2>
          <p className="text-xs text-gray-500 mb-6">Distribution of bookings by category</p>
          
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={packageDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {packageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3 mt-4">
            {packageDistribution.map((pkg, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: pkg.color }} />
                  <span className="text-gray-400">{pkg.name}</span>
                </div>
                <span className="font-bold">{pkg.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Recent Activity</h2>
            <button className="text-emerald-500 text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { user: "Juan Dela Cruz", pkg: "Ugnayan Experience", date: "2 mins ago", status: "Pending" },
              { user: "Maria Clara", pkg: "Custom Journey", date: "1 hour ago", status: "Confirmed" },
              { user: "Jose Rizal", pkg: "Sama Stay", date: "3 hours ago", status: "Confirmed" },
            ].map((booking, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-950 rounded-2xl border border-gray-800/50 hover:border-emerald-500/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center font-bold text-emerald-500">
                    {booking.user[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-100">{booking.user}</h4>
                    <p className="text-xs text-gray-500">{booking.pkg}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-[10px] text-gray-500 mb-1">
                    <Clock size={10} />
                    {booking.date}
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    booking.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800 shadow-xl">
          <h2 className="text-xl font-bold mb-6 text-gray-100">System Management</h2>
          <div className="grid grid-cols-2 gap-4">
            <ActionCard 
              title="Add Package" 
              icon={<Package size={20} />} 
              desc="Create experience" 
              color="bg-emerald-600" 
            />
            <ActionCard 
              title="New Activity" 
              icon={<TrendingUp size={20} />} 
              desc="Update custom list" 
              color="bg-blue-600" 
            />
            <ActionCard 
              title="User Logs" 
              icon={<Users size={20} />} 
              desc="View activity" 
              color="bg-purple-600" 
            />
            <ActionCard 
              title="Settings" 
              icon={<ArrowUpRight size={20} />} 
              desc="Site config" 
              color="bg-gray-800" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, icon, bg }) => (
  <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800 shadow-xl relative overflow-hidden group hover:border-emerald-500/30 transition-all">
    <div className="relative z-10">
      <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">{title}</h3>
      <div className="flex items-end gap-2 mt-1">
        <span className="text-2xl font-bold text-gray-100">{value}</span>
        <span className={`text-xs font-bold mb-1 ${change.startsWith('+') ? 'text-emerald-500' : 'text-gray-500'}`}>
          {change}
        </span>
      </div>
    </div>
  </div>
);

const ActionCard = ({ title, icon, desc, color }) => (
  <button className={`${color} p-4 rounded-2xl text-left hover:scale-[1.02] transition-transform shadow-lg group w-full`}>
    <div className="mb-3 group-hover:rotate-12 transition-transform p-2 bg-white/10 w-fit rounded-lg">{icon}</div>
    <h3 className="font-bold text-base leading-tight text-white">{title}</h3>
    <p className="text-[10px] opacity-70 mt-1 text-white">{desc}</p>
  </button>
);

export default AdminDashboard;
