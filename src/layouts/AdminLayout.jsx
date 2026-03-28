import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldAlert, LogOut, LayoutDashboard, FileText, Users, TrendingUp, History, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Analytics', path: '/admin', icon: <LayoutDashboard className="w-5 h-5 mr-3" /> },
    { name: 'Ticket Master', path: '/admin/tickets', icon: <FileText className="w-5 h-5 mr-3" /> },
    { name: 'User Management', path: '/admin/users', icon: <Users className="w-5 h-5 mr-3" /> },
    { name: 'Financial & AMC', path: '/admin/financial', icon: <TrendingUp className="w-5 h-5 mr-3" /> },
    { name: 'System Logs', path: '/admin/logs', icon: <History className="w-5 h-5 mr-3" /> },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-6 flex items-center mb-6">
        <div className="p-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-lg shadow-red-500/30 ring-1 ring-red-400/50">
          <ShieldAlert className="h-8 w-8 text-white" />
        </div>
        <span className="ml-3 text-xl font-bold text-white tracking-tight">Admin Console</span>
      </div>
      
      <div className="px-4 mb-4">
        <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-2">System Admin</p>
        <div className="bg-slate-800/50 rounded-lg p-3 text-sm font-medium text-slate-200 truncate border border-slate-700">
          {user?.email || 'admin@sunce.com'}
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                  : 'hover:bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl text-sm font-medium transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Log Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* Mobile Top Navigation */}
      <div className="md:hidden fixed top-0 w-full bg-slate-900 border-b border-slate-800 z-50 flex items-center justify-between p-4">
        <div className="flex items-center">
          <ShieldAlert className="h-6 w-6 text-red-500" />
          <span className="ml-3 text-lg font-bold text-white tracking-tight">Admin Console</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-slate-300 hover:text-white focus:outline-none p-1"
        >
          {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm flex flex-col pt-0">
          <div className="w-64 bg-slate-900 h-full flex flex-col shadow-2xl animate-fade-in-left pt-16 relative">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex-col shadow-xl hidden md:flex fixed h-full z-10 bottom-0 top-0 border-r border-slate-800">
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full md:ml-64 bg-slate-50 min-h-screen pt-20 md:pt-0">
        <div className="p-4 sm:p-8 max-w-7xl mx-auto animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
