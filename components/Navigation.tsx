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
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            <Link href="/" className="text-xl font-bold text-slate-900">
              Study Abroad AI/ML
            </Link>
          </div>
          <div className="flex gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-blue-100 text-blue-900"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
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
