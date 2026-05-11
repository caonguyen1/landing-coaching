'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const handleLogin = async () => {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/admin/hero');
    } else {
      toast.error('Sai tài khoản');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-200 px-4">
  <div className="w-full max-w-md bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-purple-100 space-y-6">
    
    {/* Header */}
    <div className="text-center space-y-1">
      <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
      <p className="text-sm text-gray-500">Welcome back 👋</p>
    </div>

    {/* Username */}
    <div className="space-y-1">
      <label className="text-sm text-gray-600">Username</label>
      <input
        placeholder="Enter your username"
        onChange={(e) =>
          setForm({ ...form, username: e.target.value })
        }
        className="w-full border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none rounded-lg p-3 transition"
      />
    </div>

    {/* Password */}
    <div className="space-y-1">
      <label className="text-sm text-gray-600">Password</label>
      <input
        type="password"
        placeholder="Enter your password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
        className="w-full border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none rounded-lg p-3 transition"
      />
    </div>

    {/* Button */}
    <button
      onClick={handleLogin}
      className="w-full bg-purple-600 hover:bg-purple-700 active:scale-[0.98] transition text-white py-3 rounded-lg font-medium shadow-md"
    >
      Login
    </button>

    {/* Footer */}
    <p className="text-xs text-center text-gray-400">
      Secure admin access only
    </p>
  </div>
</div>
  );
}