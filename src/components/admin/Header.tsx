'use client';

import { useEffect, useState } from 'react';

type Setting = {
  logo?: string;
  title?: string;
};

export default function Header() {
  const [setting, setSetting] = useState<Setting | null>(null);

  // 👉 load settings
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        setSetting(data);
      } catch (err) {
        console.error('Load settings error:', err);
      }
    };

    load();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', {
      method: 'POST',
    });

    window.location.href = '/admin/login';
  };

  return (
    <div className="h-16 shadow flex items-center justify-between px-6 bg-gradient-to-b from-primary-700  to-primary-600">
      
      {/* LEFT: LOGO + TITLE */}
      <div className="flex items-center gap-3">
        {setting?.logo && (
          <img
            src={setting.logo}
            alt="logo"
            className="h-10 w-auto object-contain"
          />
        )}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-white">Admin</span>

        <button
          onClick={handleLogout}
          className="bg-primary-800 text-white px-3 py-1 rounded text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}