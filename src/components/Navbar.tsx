'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Assessment', href: '/assessment' },
  { label: 'Cases', href: '/cases' },
  { label: 'Drills', href: '/drill' },
  { label: 'Course', href: '/course' },
  { label: 'Pricing', href: '/pricing' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-lg tracking-tight">
            Case<span className="text-accent">WithAI</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'text-accent'
                    : 'text-gray-500 hover:text-gray-900'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/assessment"
              className="text-sm font-semibold text-white bg-gray-900 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Try Free →
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'bg-accent-light text-accent'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <Link href="/login" className="text-center text-sm font-medium text-gray-700 px-4 py-2.5 border border-gray-200 rounded-lg">
              Login
            </Link>
            <Link href="/assessment" className="text-center text-sm font-semibold text-white bg-gray-900 px-4 py-2.5 rounded-lg">
              Try Free Assessment
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
