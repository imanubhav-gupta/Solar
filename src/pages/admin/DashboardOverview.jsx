import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Ticket, DollarSign, Wrench, ShieldAlert } from 'lucide-react';

const mockPieData = [
  { name: 'Under Pickup', value: 30 },
  { name: 'Repair', value: 45 },
  { name: 'Dispatched', value: 25 },
];

const mockBarData = [
  { name: 'IGBT', usage: 120 },
  { name: 'Capacitor', usage: 250 },
  { name: 'Control Board', usage: 60 },
  { name: 'Cooling Fan', usage: 90 },
  { name: 'Power Module', usage: 45 },
];

const COLORS = ['#f59e0b', '#3b82f6', '#10b981'];

export default function DashboardOverview() {
  const kpis = [
    { title: 'Total Tickets', value: '1,245', sub: '85 Open / 1160 Closed', icon: <Ticket className="text-blue-500 w-8 h-8"/>, bg: 'bg-blue-50' },
    { title: 'Total Revenue', value: '₹4.2M', sub: '+12% from last month', icon: <DollarSign className="text-green-500 w-8 h-8"/>, bg: 'bg-green-50' },
    { title: 'Active Repairs', value: '85', sub: 'In service centers', icon: <Wrench className="text-amber-500 w-8 h-8"/>, bg: 'bg-amber-50' },
    { title: 'Warranty Claims', value: '312', sub: 'Approval pending: 15', icon: <ShieldAlert className="text-red-500 w-8 h-8"/>, bg: 'bg-red-50' },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex justify-between items-end border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Admin Analytics</h1>
          <p className="text-slate-500 mt-1">High-level overview of business operations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{kpi.title}</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-1">{kpi.value}</h3>
              <p className="text-xs font-medium text-slate-400 mt-2">{kpi.sub}</p>
            </div>
            <div className={`p-4 rounded-full ${kpi.bg}`}>
              {kpi.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Tickets by Status</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={mockPieData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value">
                  {mockPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Spare Parts Usage</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockBarData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="name" tick={{fontSize: 12}} />
                <YAxis />
                <Tooltip cursor={{fill: '#f1f5f9'}} />
                <Bar dataKey="usage" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
