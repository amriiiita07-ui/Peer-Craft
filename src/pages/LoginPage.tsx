import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldAlert,
  UserCheck,
  Eye,
  EyeOff,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserProfile } from '../types';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { initialUser, adminUser } from '../data/mockData';

export const LoginPage: React.FC = () => {
  const { switchUser } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState(() => {
    return localStorage.getItem('peercraft_remembered_email') || '';
  });
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg('Please enter your college email address.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    setTimeout(() => {
      setIsLoading(false);
      const cleanEmail = email.trim().toLowerCase();

      // Remember email preference
      if (rememberMe) {
        localStorage.setItem('peercraft_remembered_email', cleanEmail);
      } else {
        localStorage.removeItem('peercraft_remembered_email');
      }

      if (cleanEmail.includes('admin') || cleanEmail.includes('ananya')) {
        switchUser(adminUser);
        navigate('/dashboard');
        return;
      }

      // 1. Check for previously registered/saved user profile
      let foundUser: UserProfile | null = null;
      try {
        const savedRegs = localStorage.getItem('peercraft_registered_users');
        if (savedRegs) {
          const list: UserProfile[] = JSON.parse(savedRegs);
          foundUser = list.find((u) => u.email.toLowerCase() === cleanEmail) || null;
        }

        if (!foundUser) {
          const savedCurrent = localStorage.getItem('peercraft_user');
          if (savedCurrent) {
            const parsed = JSON.parse(savedCurrent);
            if (parsed.email && parsed.email.toLowerCase() === cleanEmail) {
              foundUser = parsed;
            }
          }
        }
      } catch {
        // ignore
      }

      if (foundUser) {
        localStorage.setItem('peercraft_last_student', JSON.stringify(foundUser));
        switchUser(foundUser);
      } else {
        // Compute clean name from entered email (e.g. "amrita.singh@campus.edu" -> "Amrita Singh")
        const namePart = email.split('@')[0] || 'Student';
        const formattedName = namePart
          .replace(/[._-]+/g, ' ')
          .split(' ')
          .filter(Boolean)
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(' ') || 'Student User';

        const dynamicUser: UserProfile = {
          ...initialUser,
          id: `usr_${Date.now()}`,
          fullName: formattedName,
          firstName: formattedName.split(' ')[0],
          email: email.trim(),
          avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formattedName)}`,
        };
        localStorage.setItem('peercraft_last_student', JSON.stringify(dynamicUser));
        switchUser(dynamicUser);
      }

      navigate('/dashboard');
    }, 500);
  };

  const handleQuickDemoLogin = (role: 'student' | 'admin') => {
    if (role === 'admin') {
      if (rememberMe) {
        localStorage.setItem('peercraft_remembered_email', adminUser.email.toLowerCase());
      }
      switchUser(adminUser);
    } else {
      if (rememberMe) {
        localStorage.setItem('peercraft_remembered_email', initialUser.email.toLowerCase());
      }
      switchUser(initialUser);
    }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F3F7EA] dark:bg-[#0D1610] text-[#1D3024] dark:text-[#ECF5EE] flex items-center justify-center p-4 sm:p-6 relative transition-colors">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="max-w-md w-full bg-[#FAFCF5] dark:bg-[#162A1E] rounded-card border border-[#DCE6D2] dark:border-[#274735] shadow-card p-6 sm:p-8 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-1.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#26783C] to-[#173D2A] text-[#EFC66B] flex items-center justify-center mx-auto shadow-subtle">
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-black text-[#173D2A] dark:text-[#ECF5EE] tracking-tight">
            Sign In to PeerCraft
          </h1>
          <p className="text-xs text-[#687769] dark:text-[#96B4A0]">
            Access your campus projects, credits wallet, and team workspaces.
          </p>
        </div>

        {errorMsg && (
          <div className="bg-[#D94A4A]/10 border border-[#D94A4A]/30 text-[#D94A4A] p-3 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Quick Demo Evaluation Buttons */}
        <div className="p-3 bg-[#EAF1DC] dark:bg-[#0E2F1F] rounded-xl border border-[#DCE6D2] dark:border-[#274735] space-y-2 text-xs">
          <div className="font-bold text-[#173D2A] dark:text-[#ECF5EE] text-[11px] uppercase tracking-wider">
            Quick Persona Switch (Evaluation Mode)
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('student')}
              className="p-2 rounded-lg bg-[#FAFCF5] dark:bg-[#14241B] hover:bg-white dark:hover:bg-[#1E3627] border border-[#DCE6D2] dark:border-[#274735] text-left transition-colors cursor-pointer"
            >
              <div className="font-bold text-[#173D2A] dark:text-[#ECF5EE] text-[11px]">Aryan Sharma</div>
              <div className="text-[10px] text-[#26783C] dark:text-[#4ADE80]">Student Lead (1,250 Credits)</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin')}
              className="p-2 rounded-lg bg-[#FAFCF5] dark:bg-[#14241B] hover:bg-white dark:hover:bg-[#1E3627] border border-[#DCE6D2] dark:border-[#274735] text-left transition-colors cursor-pointer"
            >
              <div className="font-bold text-[#173D2A] dark:text-[#ECF5EE] text-[11px]">Prof. Ananya Sen</div>
              <div className="text-[10px] text-[#B88718] dark:text-[#EFC66B]">Innovation Cell Admin</div>
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#173D2A] dark:text-[#ECF5EE] mb-1">College Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. yourname@campus.edu"
              className="w-full px-3 py-2 bg-[#EAF1DC]/50 dark:bg-[#0D1610] border border-[#DCE6D2] dark:border-[#274735] focus:border-[#26783C] dark:focus:border-[#4ADE80] rounded-input text-[#1D3024] dark:text-white outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-[#173D2A] dark:text-[#ECF5EE]">Password</label>
              <a href="#forgot" className="text-[11px] text-[#26783C] dark:text-[#4ADE80] hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-3 pr-8 py-2 bg-[#EAF1DC]/50 dark:bg-[#0D1610] border border-[#DCE6D2] dark:border-[#274735] focus:border-[#26783C] dark:focus:border-[#4ADE80] rounded-input text-[#1D3024] dark:text-white outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#687769] dark:text-[#96B4A0]"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-[#26783C]"
              />
              <span className="text-[#687769]">Remember me for 30 days</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-[#26783C] hover:bg-[#1C622F] disabled:opacity-50 text-white font-bold rounded-btn transition-colors shadow-xs text-xs flex items-center justify-center gap-1.5"
          >
            <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-[#687769]">
          Don't have an account yet?{' '}
          <Link to="/signup" className="font-bold text-[#26783C] hover:underline">
            Register & Claim 1,000 Credits
          </Link>
        </div>
      </div>
    </div>
  );
};
