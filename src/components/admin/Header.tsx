'use client';

import { useEffect, useState } from 'react';
import { FiLogOut, FiMenu } from 'react-icons/fi';

type Setting = {
  logo?: string;
  title?: string;
};

type HeaderProps = {
  onToggleSidebar: () => void;
};


export default function Header({ onToggleSidebar }: HeaderProps) {
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

    window.location.href = '/login';
  };

  return (
    <div className="h-16 shadow flex items-center justify-between px-6 bg-gradient-to-b from-primary-700  to-primary-600">
      {/* LEFT: LOGO + TITLE */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden text-white"
        >
          <FiMenu size={28} />
        </button>
        {setting?.logo && (
          <img
            src={setting.logo}
            alt="logo"
            className="h-10 w-auto object-contain"
          />
        )}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-white">Admin</span>

        <button
          onClick={handleLogout}
          className="bg-primary-800 text-white px-3 py-2 md:py-1 rounded text-sm"
        >
          <FiLogOut className='md:hidden'/>
          <span className='max-md:hidden'>Logout</span>
        </button>
      </div>
    </div>
  );
}