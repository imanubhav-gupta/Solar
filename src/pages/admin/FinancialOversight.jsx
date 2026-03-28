import { DollarSign, Cpu } from 'lucide-react';

const mockAMC = [
  { id: 'AMC-901', customer: 'Global Energy', value: '₹45,000', startDate: '2024-01-01', endDate: '2024-12-31', status: 'Active' },
  { id: 'AMC-902', customer: 'TechFlow Inc', value: '₹120,000', startDate: '2023-06-15', endDate: '2024-06-14', status: 'Expiring Soon' },
];

const mockParts = [
  { component: 'IGBT Module', totalUsed: 120, estValue: '₹360,000' },
  { component: 'Capacitors', totalUsed: 250, estValue: '₹50,000' },
  { component: 'Control Board', totalUsed: 60, estValue: '₹180,000' },
];

export default function FinancialOversight() {
  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Financial & Warranty Oversight</h2>
        <p className="text-slate-500">Consolidated financial overview of contracts and repair resources.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
          <DollarSign className="w-5 h-5 mr-2 text-green-500" /> All AMC Contracts
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wider border-b">
                <th className="p-3">Contract ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Value</th>
                <th className="p-3">Start Date</th>
                <th className="p-3">End Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockAMC.map(row => (
                <tr key={row.id} className="border-b last:border-0 border-slate-100">
                  <td className="p-3 font-mono text-sm text-slate-600">{row.id}</td>
                  <td className="p-3 font-medium text-slate-800">{row.customer}</td>
                  <td className="p-3 font-semibold text-green-600">{row.value}</td>
                  <td className="p-3 text-sm text-slate-500">{row.startDate}</td>
                  <td className="p-3 text-sm text-slate-500">{row.endDate}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
          <Cpu className="w-5 h-5 mr-2 text-blue-500" /> Summary of Spare Parts Consumption
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wider border-b">
                <th className="p-3">Component Name</th>
                <th className="p-3 text-right">Total Quantity Used</th>
                <th className="p-3 text-right">Estimated Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {mockParts.map(row => (
                <tr key={row.component} className="border-b last:border-0 border-slate-100">
                  <td className="p-3 font-semibold text-slate-700">{row.component}</td>
                  <td className="p-3 text-right text-slate-600">{row.totalUsed} units</td>
                  <td className="p-3 text-right font-semibold text-red-500">{row.estValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
