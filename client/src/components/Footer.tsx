// AgroPeso — Footer Component
// Design: Agro-Tech Moderno | Navy dark background

import { Scale, Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-slate-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-amber flex items-center justify-center">
                <Scale className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span
                className="font-display text-xl font-bold text-white tracking-wide"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                AGROPESO
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 mb-5">
              Balanças eletrônicas de alta precisão para pesagem de gado bovino.
              Tecnologia, durabilidade e precisão para o campo.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-amber transition-colors duration-150"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-amber transition-colors duration-150"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4
              className="text-white font-bold text-base mb-4 uppercase tracking-wider"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Produtos
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/produto/balanca-barra-60", label: "Balança de Barra 60cm — APB-60" },
                { href: "/produto/balanca-barra-90", label: "Balança de Barra 90cm — APB-90" },
                { href: "/produto/balanca-barra-120", label: "Balança de Barra 120cm — APB-120" },
                { href: "/produto/pranchao-portatil-500", label: "Pranchão Portátil — PLAT-500" },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="hover:text-amber transition-colors duration-150"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-white font-bold text-base mb-4 uppercase tracking-wider"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Contato
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber mt-0.5 shrink-0" />
                <span>(00) 00000-0000</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-amber mt-0.5 shrink-0" />
                <span>contato@agropeso.com.br</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber mt-0.5 shrink-0" />
                <span>Brasil — Atendimento em todo o território nacional</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} AgroPeso. Todos os direitos reservados.</span>
          <span>Balanças para pesagem de gado bovino</span>
        </div>
      </div>
    </footer>
  );
}
