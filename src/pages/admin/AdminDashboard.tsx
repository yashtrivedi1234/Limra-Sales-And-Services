import React from "react";
import { Link } from "react-router-dom";
import { FileText, Briefcase, Tags, Users } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { label: "Total Blogs", value: "6", icon: FileText, color: "bg-blue-500", path: "/admin/blogs" },
    { label: "Total Services", value: "6", icon: Briefcase, color: "bg-orange-500", path: "/admin/services" },
    { label: "Total Brands", value: "8", icon: Tags, color: "bg-purple-500", path: "/admin/brands" },
    { label: "Active Admins", value: "1", icon: Users, color: "bg-green-500", path: "/admin/settings" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 font-syne">Dashboard Overview</h1>
        <p className="text-neutral-500 mt-2">Welcome to the Limra Admin Panel. Manage your website content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link 
              key={idx} 
              to={stat.path}
              className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-neutral-500 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2 text-neutral-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl text-white ${stat.color} bg-opacity-90 group-hover:scale-110 transition-transform`}>
                  <Icon size={24} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="bg-white p-8 rounded-2xl border border-neutral-200 mt-8">
        <h2 className="text-xl font-bold font-syne mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <Link to="/admin/blogs" className="btn-primary">Manage Blogs</Link>
          <Link to="/admin/services" className="btn-outline">Manage Services</Link>
          <a href="/" target="_blank" rel="noreferrer" className="btn-outline">View Website</a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
