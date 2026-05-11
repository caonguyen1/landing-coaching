'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiOutlineMail } from 'react-icons/hi';

// 👇 Heroicons outline
import {
  HiOutlineHome,
  HiOutlineStar,
  HiOutlineUser,
  HiOutlineHeart,
  HiOutlineVideoCamera,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCog6Tooth,
} from 'react-icons/hi2';

const menus = [
  { name: 'Banner', path: '/admin/hero', icon: HiOutlineHome },
  { name: 'Điểm khác biệt', path: '/admin/highlight', icon: HiOutlineStar },
  { name: 'Giới thiệu', path: '/admin/expert', icon: HiOutlineUser },
  { name: 'Trị liệu hôn nhân', path: '/admin/services', icon: HiOutlineHeart },
  { name: 'Videos', path: '/admin/videos', icon: HiOutlineVideoCamera },
  { name: 'Phản hồi khách hàng', path: '/admin/testimonials', icon: HiOutlineChatBubbleLeftRight },
  { name: 'Khách hàng liên hệ', path: '/admin/contacts', icon: HiOutlineMail },
  { name: 'Settings', path: '/admin/settings', icon: HiOutlineCog6Tooth },
];

export default function Sidebar({sidebarOpen }) {
  const pathname = usePathname();

  return (
    <div className={`
            fixed lg:static top-16 left-0 z-50 bg-white shadow-lg
            h-[calc(100vh-64px)]
            transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
          `}
        >


      <nav className="p-4 space-y-2">
        {menus.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-2 px-2 py-2 rounded transition ${
                active
                  ? 'bg-purple-600 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {/* ICON */}
              <Icon
                className={`text-xl ${
                  active ? 'text-white' : 'text-gray-500'
                }`}
              />

              {/* TEXT */}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}