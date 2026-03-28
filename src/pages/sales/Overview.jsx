import { Users, Truck, Wrench, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Overview() {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Sales & BD Dashboard</h1>
        <p className="text-slate-500 mt-1 font-medium">Welcome back, {user?.email || 'sales@sunce.com'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {[
          { label: 'Pending Pickups', value: '12', icon: <Truck className="w-6 h-6 text-blue-500" />, bg: 'bg-blue-50' },
          { label: 'Active Repairs', value: '34', icon: <Wrench className="w-6 h-6 text-orange-500" />, bg: 'bg-orange-50' },
          { label: 'New Tickets Today', value: '8', icon: <Users className="w-6 h-6 text-emerald-500" />, bg: 'bg-emerald-50' },
          { label: 'AMC Renewals', value: '5', icon: <ShieldCheck className="w-6 h-6 text-brand-500" />, bg: 'bg-brand-50' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
            <div className={`p-4 rounded-xl ${stat.bg}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-400">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
