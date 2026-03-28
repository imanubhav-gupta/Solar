import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const loginEmail = email.toLowerCase();
    
    if (loginEmail.includes('admin')) {
      login(email, 'admin');
      navigate('/admin');
    } else if (loginEmail.includes('sales')) {
      login(email, 'sales');
      navigate('/sales');
    } else if (loginEmail.includes('service') || loginEmail.includes('engineer')) {
      login(email, 'service');
      navigate('/service');
    } else {
      login(email, 'customer');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 font-sans relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-brand-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-yellow-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-10"></div>
      
      <div className="z-10 w-full max-w-md p-6 md:p-8 glass-effect rounded-2xl shadow-2xl border border-white/10 m-4 relative backdrop-blur-xl bg-white/10">
        
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-brand-500/20 rounded-full mb-4 ring-1 ring-brand-400/50">
            <Sun className="h-10 w-10 text-brand-400" />
          </div>
          <h1 className="text-2xl md:text-3xl items-center font-bold text-white tracking-tight text-center">Sunce Renewables</h1>
          <p className="text-brand-200 mt-2 text-sm font-medium">The Solar Inverter Doctors</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Customer ID / Email</label>
            <input 
              type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              placeholder="sales@sunce.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full flex justify-center items-center py-3 px-4 rounded-lg bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-semibold shadow-lg shadow-brand-500/30 transform transition-all hover:-translate-y-0.5"
          >
            <span>Secure Login</span>
            <Zap className="ml-2 h-4 w-4" />
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-slate-400">
          © 2024 Sunce Renewables Pvt. Ltd.<br/>Founded 2016 • Noida, India
        </p>
      </div>
    </div>
  );
}
