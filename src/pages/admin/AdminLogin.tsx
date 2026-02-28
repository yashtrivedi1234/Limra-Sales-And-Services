import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { toast } from 'sonner';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      toast.success('Login successful');
      navigate('/admin');
    } else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden p-8 border border-neutral-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-syne text-brand-blue tracking-tight">
            LIMRA <span className="text-brand-orange">ADMIN</span>
          </h1>
          <p className="text-neutral-500 mt-2">Sign in to manage your content</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-colors"
              placeholder="admin@limrasales.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-colors"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-blue text-white py-3 rounded-xl font-medium hover:bg-brand-blue-dark transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-neutral-500">
          <a href="/" className="hover:text-brand-blue transition-colors">Return to Website</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
