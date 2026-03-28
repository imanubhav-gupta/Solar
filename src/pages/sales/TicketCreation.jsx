import { useState } from 'react';
import { User, Phone, Mail, Box, FileText, CheckCircle } from 'lucide-react';

export default function TicketCreation() {
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Internal Ticket Creation</h1>
          <p className="text-slate-500 mt-1 font-medium">Log a new complaint directly from Sales and BD channels</p>
        </div>
      </div>

      {submitted && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl flex items-center space-x-3 mb-6 shadow-sm">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <span className="font-semibold text-lg">Ticket uniquely logged and queued successfully!</span>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-800">New Client Details</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-bold text-slate-700">
                <User className="w-4 h-4 mr-2 text-brand-500" /> Customer Name
              </label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all bg-slate-50 text-slate-800" placeholder="Enter name" required />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-bold text-slate-700">
                <Phone className="w-4 h-4 mr-2 text-brand-500" /> Phone Number
              </label>
              <input type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all bg-slate-50 text-slate-800" placeholder="+91 98765 43210" required />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-bold text-slate-700">
                <Mail className="w-4 h-4 mr-2 text-brand-500" /> Email Address
              </label>
              <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all bg-slate-50 text-slate-800" placeholder="Optional email..." />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-bold text-slate-700">
                <Box className="w-4 h-4 mr-2 text-brand-500" /> Product Type
              </label>
              <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all bg-slate-50 text-slate-800" required>
                <option value="">Select type...</option>
                <option value="inverter">Solar Inverter</option>
                <option value="panel">Solar Panel</option>
                <option value="battery">Battery Pack</option>
                <option value="other">Other Accessories</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 border-t border-slate-100 pt-8 mt-8">
            <label className="flex items-center text-sm font-bold text-slate-700">
              <FileText className="w-4 h-4 mr-2 text-brand-500" /> Issue Description
            </label>
            <textarea rows="4" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all bg-slate-50 text-slate-800 resize-none" placeholder="Provide full context, any error codes or visual damage mentioned..." required></textarea>
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" className="px-10 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg shadow-brand-500/30 transition-all transform hover:-translate-y-0.5">
              Generate Service Ticket
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
