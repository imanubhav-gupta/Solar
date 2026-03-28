import { Clock } from 'lucide-react';

const mockLogs = [
  { id: 1, user: 'admin@sunce.com', action: 'Modified System Role for Bob Jones to Sales Manager', time: '10 mins ago', date: '2024-03-25 14:32:00' },
  { id: 2, user: 'engineer@sunce.com', action: 'Added Spares (IGBT Module x2) to Ticket TKT-1002', time: '1 hour ago', date: '2024-03-25 13:45:10' },
  { id: 3, user: 'sales@sunce.com', action: 'Created new AMC Contract AMC-902 for TechFlow Inc', time: '3 hours ago', date: '2024-03-25 11:20:00' },
  { id: 4, user: 'service@sunce.com', action: 'Updated Ticket TKT-1003 Status to Closed', time: 'Yesterday', date: '2024-03-24 16:15:33' },
  { id: 5, user: 'admin@sunce.com', action: 'Suspended user account operations@sunce.com', time: 'Yesterday', date: '2024-03-24 09:10:00' },
];

export default function SystemLogs() {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6 border-l-4 border-l-slate-800">
        <h2 className="text-2xl font-bold text-slate-800">System Activity Logs</h2>
        <p className="text-slate-500 mt-1">Immutable read-only audit trail of system events.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
          
          {mockLogs.map(log => (
            <div key={log.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-100 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 mx-auto">
                <Clock className="w-4 h-4" />
              </div>

              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-4 rounded-xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-slate-800">{log.user}</span>
                  <span className="text-xs font-medium text-slate-400 bg-white px-2 py-1 rounded-full border border-slate-100">{log.time}</span>
                </div>
                <p className="text-sm text-slate-600">{log.action}</p>
                <div className="mt-2 text-xs text-slate-400 text-right">{log.date}</div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
