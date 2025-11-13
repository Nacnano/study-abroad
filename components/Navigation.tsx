"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    {
      href: "/",
      label: "🎓 Universities",
      description: "Browse & filter programs",
    },
    {
      href: "/country-comparison",
      label: "🌍 Country Comparison",
      description: "Visa & job market analysis",
    },
    {
      href: "/scholarships",
      label: "💰 Scholarships",
      description: "Funding opportunities",
    },
  ];

  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎓</span>
            <Link
              href="/"
              className="text-2xl font-bold text-white hover:text-blue-300 transition-colors"
            >
              Study Abroad AI/ML
            </Link>
          </div>
          <div className="flex gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                  pathname === link.href
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
