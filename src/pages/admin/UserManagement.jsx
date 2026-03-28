import { useState } from 'react';
import { Shield, ShieldAlert, User, CheckCircle, XCircle } from 'lucide-react';

const initialUsers = [
  { id: 1, name: 'Alice Smith', email: 'admin@sunce.com', role: 'admin', active: true },
  { id: 2, name: 'Bob Jones', email: 'sales@sunce.com', role: 'sales', active: true },
  { id: 3, name: 'Charlie Ray', email: 'engineer@sunce.com', role: 'engineer', active: true },
  { id: 4, name: 'Dave Martin', email: 'service@sunce.com', role: 'service', active: false },
];

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers);

  const toggleStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, active: !u.active } : u));
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">User & Role Management</h2>
          <p className="text-slate-500 mt-1">Manage staff accounts, roles, and access controls.</p>
        </div>
        <button className="px-5 py-2.5 bg-brand-500 text-white font-semibold rounded-xl shadow-lg shadow-brand-500/30 hover:bg-brand-600 transition-colors">
          + Add New User
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wider border-b">
              <th className="p-4 font-semibold">User</th>
              <th className="p-4 font-semibold">Role</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center mr-3 text-slate-500">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{u.name}</p>
                      <p className="text-sm text-slate-500">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                    u.role === 'admin' ? 'bg-red-100 text-red-800' :
                    u.role === 'sales' ? 'bg-blue-100 text-blue-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {u.role === 'admin' && <ShieldAlert className="w-3 h-3 mr-1" />}
                    {u.role !== 'admin' && <Shield className="w-3 h-3 mr-1" />}
                    {u.role}
                  </span>
                </td>
                <td className="p-4">
                  {u.active ? (
                    <span className="inline-flex items-center text-green-600 font-medium text-sm">
                      <CheckCircle className="w-4 h-4 mr-1" /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-slate-400 font-medium text-sm">
                      <XCircle className="w-4 h-4 mr-1" /> Suspended
                    </span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => toggleStatus(u.id)}
                    className={`px-4 py-2 border rounded-lg text-sm font-semibold transition-colors ${
                      u.active ? 'border-amber-200 text-amber-600 hover:bg-amber-50' : 'border-green-200 text-green-600 hover:bg-green-50'
                    }`}
                  >
                    {u.active ? 'Suspend' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
