'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/login', label: 'Login' },
  { href: '/projects', label: 'Projects' },
];

export default function TopBar() {
  const pathname = usePathname();

  return (
    <nav className="mx-auto flex w-full max-w-3xl items-center justify-center gap-3 rounded-2xl border border-gray-800 bg-gray-900/90 px-6 py-4 text-sm shadow-2xl shadow-black/40 backdrop-blur">
      {navItems.map(({ href, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={`flex-1 rounded-lg border px-4 py-2 text-center font-semibold text-gray-300 transition-colors ${
              isActive
                ? 'border-blue-500 bg-blue-600/20 text-white'
                : 'border-gray-800 bg-gray-950/40 hover:border-blue-500 hover:text-white'
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
