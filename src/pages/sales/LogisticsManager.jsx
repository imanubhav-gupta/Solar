import { useState } from 'react';
import { MapPin, Calendar, Truck, Package, Phone, CheckCircle } from 'lucide-react';

export default function LogisticsManager() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Pickup & Logistics Manager</h1>
        <p className="text-slate-500 mt-1 font-medium">Schedule product returns and track inbound courier movements</p>
      </div>

      {submitted && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-6 py-4 rounded-xl flex items-center space-x-3 mb-6 shadow-sm">
          <CheckCircle className="w-6 h-6 text-blue-500" />
          <span className="font-semibold text-lg">Logistics mandate registered successfully!</span>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-800">Return Details</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-bold text-slate-700">
                <MapPin className="w-4 h-4 mr-2 text-brand-500" /> Pickup Location
              </label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all bg-slate-50 text-slate-800" placeholder="Full address..." required />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-bold text-slate-700">
                <Calendar className="w-4 h-4 mr-2 text-brand-500" /> Pickup Date
              </label>
              <input type="date" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all bg-slate-50 text-slate-800" required />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center text-sm font-bold text-slate-700">
                <Truck className="w-4 h-4 mr-2 text-brand-500" /> Transport Mode
              </label>
              <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all bg-slate-50 text-slate-800" required>
                <option value="courier">Courier</option>
                <option value="logistics">Direct Logistics</option>
              </select>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-wider">Courier / Logistics Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-bold text-slate-700">
                  <Package className="w-4 h-4 mr-2 text-brand-500" /> Courier Name
                </label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all bg-slate-50 text-slate-800" placeholder="e.g. BlueDart" required />
              </div>
              <div className="space-y-2">
                <label className="flex items-center text-sm font-bold text-slate-700">
                  <span className="w-4 h-4 mr-2 flex items-center justify-center font-bold text-brand-500 text-[10px] border border-brand-500 rounded-sm">#</span> LR Number
                </label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all bg-slate-50 text-slate-800 font-mono tracking-wider" placeholder="Tracking ID" required />
              </div>
              <div className="space-y-2">
                <label className="flex items-center text-sm font-bold text-slate-700">
                  <Phone className="w-4 h-4 mr-2 text-brand-500" /> Contact Person
                </label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all bg-slate-50 text-slate-800" placeholder="Driver / Agent Name" required />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" className="px-10 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg shadow-brand-500/20 transition-all transform hover:-translate-y-0.5 mt-4">
              Save Logistics Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
