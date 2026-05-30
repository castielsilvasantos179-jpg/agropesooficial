// AgroPeso — Header Component
// Design: Agro-Tech Moderno | Navy background, Amber accent

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Scale } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/#catalogo", label: "Catálogo" },
    { href: "/#sobre", label: "Sobre" },
    { href: "/#contato", label: "Contato" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy-dark shadow-lg">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-amber flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-105">
              <Scale className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="font-display text-xl font-bold text-white tracking-wide"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                AGROPESO
              </span>
              <span className="text-[10px] text-slate-400 tracking-widest uppercase font-mono-data">
                Balanças para Gado
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  location === link.href
                    ? "text-amber bg-white/10"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <a
            href="https://wa.me/5500000000000?text=Olá! Gostaria de solicitar um orçamento para balanças de gado."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex btn-cta items-center gap-2 bg-amber hover:bg-amber-dark text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-md transition-colors duration-150"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Solicitar Orçamento
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy-dark border-t border-white/10 px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-3 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/5500000000000?text=Olá! Gostaria de solicitar um orçamento para balanças de gado."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 bg-amber text-white font-semibold text-sm px-5 py-3 rounded-lg text-center"
            onClick={() => setMobileOpen(false)}
          >
            Solicitar Orçamento
          </a>
        </div>
      )}
    </header>
  );
}
