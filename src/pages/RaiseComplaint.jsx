import { AlertCircle, CheckCircle, ArrowLeft, User, Zap, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-400 bg-slate-50 text-slate-800 font-medium transition-all placeholder:text-slate-400 placeholder:font-normal";

const labelClass = "block text-sm font-bold text-slate-700 mb-2";

// ── Section Card ──────────────────────────────────────────────────────────────
function SectionCard({ icon: Icon, iconBg, iconColor, title, subtitle, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-8 py-5 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl ${iconBg}`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-800 tracking-tight">{title}</h2>
            <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
          </div>
        </div>
      </div>
      <div className="px-8 py-6">{children}</div>
    </div>
  );
}

// ── Success Screen ────────────────────────────────────────────────────────────
function SuccessScreen({ onReset }) {
  return (
    <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-100 max-w-2xl mx-auto text-center">
      <div className="inline-flex items-center justify-center w-24 h-24 bg-green-50 rounded-full mb-8">
        <CheckCircle className="w-12 h-12 text-green-500" />
      </div>
      <h2 className="text-3xl font-extrabold text-slate-800 mb-4 tracking-tight">Complaint Registered</h2>
      <p className="text-slate-600 mb-8 text-lg leading-relaxed">
        Your service request has been successfully logged. Our technical team will review it and contact you shortly to provide assistance.
      </p>
      <button
        onClick={onReset}
        className="px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all"
      >
        Submit Another Request
      </button>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function RaiseComplaint() {
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', address: '' });
  const [inverter, setInverter] = useState({ brand: '', model: '', serial: '', purchaseDate: '', warranty: 'in-warranty' });
  const [fault, setFault]       = useState({ category: 'no-output', priority: 'medium', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setCustomer({ name: '', email: '', phone: '', address: '' });
    setInverter({ brand: '', model: '', serial: '', purchaseDate: '', warranty: 'in-warranty' });
    setFault({ category: 'no-output', priority: 'medium', description: '' });
  };

  if (submitted) return <SuccessScreen onReset={handleReset} />;

  return (
    <div className="max-w-3xl mx-auto">

      {/* ── Page Header ── */}
      <div className="flex items-center gap-4 mb-8">
        <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-all">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-50 rounded-2xl">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Raise a Complaint</h1>
            <p className="text-slate-500 mt-1 font-medium">Submit a service request for your solar equipment</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* ── Section 1: Customer Details ── */}
        <SectionCard
          icon={User}
          iconBg="bg-blue-50"
          iconColor="text-blue-500"
          title="Customer Details"
          subtitle="Enter customer information"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Customer Name</label>
              <input
                type="text"
                placeholder="Enter customer name"
                className={inputClass}
                value={customer.name}
                onChange={e => setCustomer(p => ({ ...p, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Email Address</label>
              <input
                type="email"
                placeholder="customer@example.com"
                className={inputClass}
                value={customer.email}
                onChange={e => setCustomer(p => ({ ...p, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Phone Number</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                className={inputClass}
                value={customer.phone}
                onChange={e => setCustomer(p => ({ ...p, phone: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Address</label>
              <input
                type="text"
                placeholder="Enter full address"
                className={inputClass}
                value={customer.address}
                onChange={e => setCustomer(p => ({ ...p, address: e.target.value }))}
                required
              />
            </div>
          </div>
        </SectionCard>

        {/* ── Section 2: Inverter Details ── */}
        <SectionCard
          icon={Zap}
          iconBg="bg-yellow-50"
          iconColor="text-yellow-500"
          title="Inverter Details"
          subtitle="Provide inverter information"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Inverter Brand</label>
              <input
                type="text"
                placeholder="e.g., Luminous, Microtek"
                className={inputClass}
                value={inverter.brand}
                onChange={e => setInverter(p => ({ ...p, brand: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Inverter Model</label>
              <input
                type="text"
                placeholder="Model number"
                className={inputClass}
                value={inverter.model}
                onChange={e => setInverter(p => ({ ...p, model: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Serial Number</label>
              <input
                type="text"
                placeholder="Device serial number"
                className={inputClass}
                value={inverter.serial}
                onChange={e => setInverter(p => ({ ...p, serial: e.target.value }))}
              />
            </div>
            <div>
              <label className={labelClass}>Purchase Date</label>
              <input
                type="date"
                className={inputClass}
                value={inverter.purchaseDate}
                onChange={e => setInverter(p => ({ ...p, purchaseDate: e.target.value }))}
              />
            </div>
            <div className="md:col-span-1">
              <label className={labelClass}>Warranty Status</label>
              <select
                className={inputClass}
                value={inverter.warranty}
                onChange={e => setInverter(p => ({ ...p, warranty: e.target.value }))}
              >
                <option value="in-warranty">In Warranty</option>
                <option value="out-of-warranty">Out of Warranty</option>
                <option value="amc">Under AMC</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
          </div>
        </SectionCard>

        {/* ── Section 3: Fault Details ── */}
        <SectionCard
          icon={AlertTriangle}
          iconBg="bg-red-50"
          iconColor="text-red-500"
          title="Fault Details"
          subtitle="Describe the issue"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className={labelClass}>Fault Category</label>
              <select
                className={inputClass}
                value={fault.category}
                onChange={e => setFault(p => ({ ...p, category: e.target.value }))}
                required
              >
                <option value="no-output">No Output</option>
                <option value="low-output">Low Output</option>
                <option value="error-code">Error Code / Fault Code</option>
                <option value="overheating">Overheating</option>
                <option value="communication">Communication / SCADA Issue</option>
                <option value="physical-damage">Physical Damage</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Priority</label>
              <select
                className={inputClass}
                value={fault.priority}
                onChange={e => setFault(p => ({ ...p, priority: e.target.value }))}
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Problem Description</label>
            <textarea
              rows={5}
              placeholder="Describe the issue in detail..."
              className={`${inputClass} resize-none`}
              value={fault.description}
              onChange={e => setFault(p => ({ ...p, description: e.target.value }))}
              required
            />
          </div>
        </SectionCard>

        {/* ── Footer Buttons ── */}
        <div className="flex justify-end items-center gap-4 pt-2 pb-6">
          <button
            type="button"
            onClick={handleReset}
            className="px-8 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-200 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-10 py-3.5 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-extrabold rounded-xl shadow-xl shadow-red-500/20 transform transition-all hover:-translate-y-0.5"
          >
            Create Ticket
          </button>
        </div>

      </form>
    </div>
  );
}