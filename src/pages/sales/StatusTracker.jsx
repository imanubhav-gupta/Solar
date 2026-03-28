import { useState } from 'react';
import { Activity, Clock, Save, History, FileText, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function StatusTracker() {
  const { user } = useAuth();
  const [ticketId, setTicketId] = useState('TK-2024-8902');
  
  const [history, setHistory] = useState([
    { date: '2024-03-24 09:15 AM', status: 'Received', remarks: 'Unit received at Noida facility. Packaging intact.', user: 'admin@sunce.com' },
    { date: '2024-03-23 11:30 AM', status: 'On Transit', remarks: 'Picked up by BlueDart.', user: 'sales@sunce.com' },
    { date: '2024-03-22 04:00 PM', status: 'Under Pickup', remarks: 'Ticket generated and pickup scheduled.', user: 'sales@sunce.com' },
  ]);

  const [newStatus, setNewStatus] = useState('Under Repair');
  const [remarks, setRemarks] = useState('');

  const statuses = [
    'Under Pickup', 'On Transit', 'Received', 'Under Repair', 'Ready to Dispatch', 'Dispatched', 'Ticket Closed'
  ];

  const handleUpdate = (e) => {
    e.preventDefault();
    if(!remarks.trim()) return;

    const newLog = {
      date: new Date().toLocaleString([], {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit'}),
      status: newStatus,
      remarks: remarks,
      user: user?.email || 'sales@sunce.com'
    };

    setHistory([newLog, ...history]);
    setRemarks('');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Status Lifecycle Tracker</h1>
        <p className="text-slate-500 mt-1 font-medium">Update current device status and view audit logs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-brand-500" /> Update Status
              </h3>
              
              <form onSubmit={handleUpdate} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Ticket ID</label>
                  <input type="text" value={ticketId} onChange={e=>setTicketId(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 font-mono text-slate-700" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">New Status</label>
                  <select value={newStatus} onChange={e=>setNewStatus(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 bg-white font-semibold text-slate-800">
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center">
                    <FileText className="w-3 h-3 mr-1" /> Remarks (Required)
                  </label>
                  <textarea value={remarks} onChange={e=>setRemarks(e.target.value)} rows="3" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 bg-slate-50 resize-none text-sm" placeholder="Add detailed notes..." required></textarea>
                </div>

                <div className="pt-2">
                  <button type="submit" className="w-full flex items-center justify-center py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg shadow-brand-500/20 transition-all">
                    <Save className="w-4 h-4 mr-2" /> Log Status Update
                  </button>
                </div>
              </form>
           </div>
        </div>

        {/* History Column */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden h-full">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 flex items-center">
                <History className="w-5 h-5 mr-2 text-brand-500" /> Complete Audit Trail
              </h3>
              <span className="bg-slate-200 text-slate-600 px-3 py-1 rounded-full text-xs font-bold tracking-wider">{ticketId}</span>
            </div>
            
            <div className="p-6">
               <div className="space-y-6 border-l-2 border-slate-100 ml-3 pl-6 relative">
                 {history.map((log, i) => (
                   <div key={i} className="relative animate-fade-in" style={{animationDelay: `${i * 100}ms`}}>
                     <div className={`absolute w-4 h-4 rounded-full -left-[1.95rem] top-1.5 border-4 border-white shadow-sm ${i === 0 ? 'bg-brand-500' : 'bg-slate-300'}`}></div>
                     
                     <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                            log.status === 'Ticket Closed' ? 'bg-emerald-100 text-emerald-700' : 
                            log.status === 'Received' ? 'bg-blue-100 text-blue-700' :
                            log.status === 'Under Repair' ? 'bg-orange-100 text-orange-700' :
                            'bg-slate-200 text-slate-700'
                          }`}>
                            <Activity className="w-3 h-3 mr-1" /> {log.status}
                          </span>
                          <span className="text-xs text-slate-500 font-semibold flex items-center">
                             <Clock className="w-3 h-3 mr-1" /> {log.date}
                          </span>
                        </div>
                        
                        <p className="text-slate-700 text-sm mb-3 font-medium bg-white p-3 rounded-lg border border-slate-100">{log.remarks}</p>
                        
                        <div className="flex justify-end">
                           <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Updated By: <span className="text-slate-600 lowercase">{log.user}</span></span>
                        </div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
