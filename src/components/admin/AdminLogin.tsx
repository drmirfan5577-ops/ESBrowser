import { useState } from 'react';
import { Shield, Eye, EyeOff, Lock, X } from 'lucide-react';
import logo from '@/assets/logo.png';

interface AdminLoginProps {
  onLogin: (password: string) => boolean;
  onClose: () => void;
  error: string;
}

export const AdminLogin = ({ onLogin, onClose, error }: AdminLoginProps) => {
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(password);
    if (!success) {
      setShake(true);
      setPassword('');
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md">
      <div className={`admin-border glass-card rounded-2xl p-6 w-80 max-w-[90vw] shadow-2xl fade-in-up ${shake ? 'animate-bounce' : ''}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <img src={logo} alt="UniOrbi" className="w-8 h-8 rounded-xl" />
            <div>
              <p className="text-sm font-black shimmer-text">Admin Panel</p>
              <p className="text-xs text-emerald-600">UniOrbi ES Browser</p>
            </div>
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Lock Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-2xl glass-emerald tube-glow flex items-center justify-center">
            <Lock className="w-7 h-7 text-emerald-600" />
          </div>
        </div>

        <h2 className="text-base font-bold text-center text-gray-800 mb-1">Secure Access</h2>
        <p className="text-xs text-center text-gray-400 mb-5">Enter admin password to continue</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 border-gray-200 focus-within:border-emerald-400 bg-gray-50/50 transition-all">
              <Shield className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder:text-gray-400"
                autoFocus
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-400 hover:text-gray-600 transition-colors">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <div className="mt-2 flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-red-50 border border-red-200">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                <p className="text-xs text-red-600 font-medium">{error}</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 tube-glow"
          >
            Access Admin Panel
          </button>
        </form>

        <p className="text-center text-xs text-gray-300 mt-4">Protected by UniOrbi Security</p>
      </div>
    </div>
  );
};
