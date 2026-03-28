import { useState } from 'react';
import { Search, Shield, AlertTriangle, Calendar, RefreshCcw } from 'lucide-react';

export default function WarrantyTool() {
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.length > 2) {
      if (searchQuery.toLowerCase().includes('out')) {
         setResult({
           customer: 'Reliance Manufacturing',
           device: 'Sunce Hybrid Inverter 10KVA',
           serial: searchQuery.toUpperCase(),
           status: 'Out of Warranty',
           startDate: '2018-03-12',
           expiryDate: '2023-03-12',
           amc: false
         });
      } else {
         setResult({
           customer: 'Adani Renewables',
           device: 'Sunce Prime Grid-Tie 50kW',
           serial: searchQuery.toUpperCase(),
           status: 'In Warranty',
           startDate: '2023-11-05',
           expiryDate: '2028-11-05',
           amc: true
         });
      }
    }
  };

  const toggleAMC = () => {
    if(result) {
      setResult({...result, amc: !result.amc});
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Warranty Verification Engine</h1>
        <p className="text-slate-500 mt-1 font-medium">Instantly crosscheck active warranties via Serial Number or Customer Phone</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex items-center">
        <form onSubmit={handleSearch} className="flex w-full gap-4 flex-col md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search serial EX-xxxx (Type 'out' to test expired cases)..."
              className="w-full pl-14 pr-6 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50 text-slate-800 font-medium transition-all text-lg"
              required
            />
          </div>
          <button type="submit" className="px-10 py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors shadow-lg">
            Scan Database
          </button>
        </form>
      </div>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
            {/* Background design */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-10 blur-xl ${result.status === 'In Warranty' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center">
              <Shield className="w-6 h-6 mr-3 text-brand-500" /> Policy Status
            </h3>
            
            <div className="flex items-center justify-between py-4 border-b border-slate-100">
               <span className="text-slate-500 font-medium">Coverage</span>
               {result.status === 'In Warranty' ? (
                 <span className="px-4 py-1.5 rounded-full bg-green-100 text-green-700 font-extrabold text-xs uppercase tracking-wider border border-green-200 shadow-sm flex items-center">
                   <Shield className="w-4 h-4 mr-2" /> In Warranty
                 </span>
               ) : (
                 <span className="px-4 py-1.5 rounded-full bg-red-100 text-red-700 font-extrabold text-xs uppercase tracking-wider border border-red-200 shadow-sm flex items-center">
                   <AlertTriangle className="w-4 h-4 mr-2" /> Out of Warranty
                 </span>
               )}
            </div>

            <div className="flex justify-between py-4 border-b border-slate-100">
               <span className="text-slate-500 font-medium flex items-center"><Calendar className="w-4 h-4 mr-2" /> Start Date</span>
               <span className="font-semibold text-slate-800">{result.startDate}</span>
            </div>

            <div className="flex justify-between py-4 border-b border-slate-100">
               <span className="text-slate-500 font-medium flex items-center"><Calendar className="w-4 h-4 mr-2" /> Expiry Date</span>
               <span className="font-semibold text-slate-800">{result.expiryDate}</span>
            </div>
            
            <div className="flex items-center justify-between pt-6">
               <div className="flex flex-col">
                 <span className="text-slate-800 font-bold flex items-center">
                   <RefreshCcw className="w-4 h-4 mr-2 text-brand-500" /> AMC Add-on
                 </span>
                 <span className="text-xs text-slate-400 mt-1">Annual Maintenance Contract</span>
               </div>
               <button 
                  onClick={toggleAMC}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors shadow-inner ${result.amc ? 'bg-brand-500' : 'bg-slate-300'}`}
               >
                 <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-md ${result.amc ? 'translate-x-7' : 'translate-x-1'}`} />
               </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex flex-col justify-center space-y-8 relative">
             <div className="absolute top-0 right-0 p-8 opacity-5">
               <Shield className="w-32 h-32" />
             </div>
             
             <div>
               <p className="text-xs text-brand-500 font-extrabold uppercase tracking-widest mb-2">Registered Owner</p>
               <p className="text-2xl font-black text-slate-800">{result.customer}</p>
             </div>
             <div>
               <p className="text-xs text-brand-500 font-extrabold uppercase tracking-widest mb-2">Hardware Unit</p>
               <p className="text-xl font-bold text-slate-700">{result.device}</p>
             </div>
             <div>
               <p className="text-xs text-brand-500 font-extrabold uppercase tracking-widest mb-2">Identifier</p>
               <p className="text-lg font-mono font-bold text-slate-800 bg-slate-100 px-4 py-2 rounded-xl inline-block border border-slate-200">{result.serial}</p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
