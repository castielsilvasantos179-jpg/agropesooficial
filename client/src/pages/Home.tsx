// AgroPeso — Home Page
// Design: Agro-Tech Moderno | Navy + Amber | Barlow Condensed + Source Sans 3

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import {
  Shield,
  Zap,
  Truck,
  HeadphonesIcon,
  ChevronDown,
  CheckCircle2,
  Star,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ paddingTop: "4rem" }}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/assets/hero_fazenda.png"
            alt="Gado nelore na fazenda ao pôr do sol"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy-dark/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 py-20">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-amber/20 border border-amber/40 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
              <span className="text-amber text-sm font-semibold tracking-wide">
                Tecnologia de Ponta para o Campo
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-5xl md:text-7xl font-bold text-white leading-none mb-6"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              PESAGEM PRECISA
              <br />
              <span className="text-amber">PARA O CAMPO</span>
            </h1>

            <p className="text-lg text-slate-200 leading-relaxed mb-8 max-w-xl">
              Balanças eletrônicas desenvolvidas para quem vive da pecuária.
              Tecnologia, durabilidade e precisão em cada pesagem.
            </p>

            {/* Features bullets */}
            <ul className="space-y-2.5 mb-10">
              {[
                "Estrutura reforçada para uso intenso no campo",
                "Precisão de 0,5 kg em animais de até 4.000 kg",
                "Suporte técnico especializado",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-amber shrink-0" />
                  <span className="text-base">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#catalogo"
                className="btn-cta bg-amber hover:bg-amber-dark text-white font-bold text-base px-8 py-4 rounded-lg shadow-lg transition-colors duration-150"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
              >
                VER CATÁLOGO
              </a>
              <a
                href="https://wa.me/5541999283623?text=Olá! Gostaria de solicitar um orçamento."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-base px-8 py-4 rounded-lg backdrop-blur-sm transition-colors duration-150"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
              >
                SOLICITAR ORÇAMENTO
              </a>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-white font-display" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>+500</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Produtores</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white font-display" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>12</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Anos no mercado</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <div className="flex items-center gap-1 justify-center">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-amber fill-amber" />)}
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Avaliação</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#catalogo"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
          aria-label="Rolar para baixo"
        >
          <ChevronDown className="w-8 h-8" />
        </a>
      </section>

      {/* ── FEATURES STRIP ── */}
      <section className="bg-navy py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, label: "Estrutura Robusta", desc: "Aço carbono com pintura eletrostática" },
              { icon: Zap, label: "Alta Precisão", desc: "Erro máximo de 0,5 kg" },
              { icon: Truck, label: "Entrega Rápida", desc: "Para todo o Brasil" },
              { icon: HeadphonesIcon, label: "Suporte 24h", desc: "Assistência técnica especializada" },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-amber" />
                </div>
                <div>
                  <div
                    className="text-white font-bold text-sm"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {label}
                  </div>
                  <div className="text-slate-400 text-xs mt-0.5">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATALOG ── */}
      <section id="catalogo" className="py-20">
        <div className="container">
          {/* Section header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-amber/10 border border-amber/30 rounded-full px-4 py-1.5 mb-4">
              <span className="text-amber text-sm font-semibold tracking-wide">Nossos Produtos</span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-navy mb-4"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              MODELOS PARA CADA NECESSIDADE
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Soluções completas de pesagem desenvolvidas especificamente para o ambiente rural.
              Escolha o modelo ideal para sua operação.
            </p>
          </div>

          {/* Products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="galeria" className="relative py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber/30 to-transparent" />
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-navy/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <div>
            <span className="text-amber font-bold text-xs uppercase tracking-widest bg-amber/10 px-4 py-1.5 rounded-full mb-6 inline-block border border-amber/30">
              Equipamentos em Campo
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-6 tracking-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Galeria de <span className="text-amber">Produtos</span>
            </h2>
            <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Confira os detalhes operacionais e a robustez das soluções AgroPeso instaladas nas principais fazendas do Brasil.
            </p>
          </div>
        </div>

        {/* Carousel container */}
        <div className="relative z-10">
          <div className="overflow-hidden w-full py-4">
            <style>{`
              @keyframes marquee-ltr {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .marquee-ltr {
                animation: marquee-ltr 60s linear infinite;
              }
              .marquee-ltr:hover {
                animation-play-state: paused;
              }
            `}</style>
            <div className="flex gap-6 w-max marquee-ltr px-3">
              {[
                { type: "video", src: "https://inbalancebalancas.com.br/videos/app-vid-1.mp4", alt: "Resultados Reais" },
                { type: "image", src: "https://inbalancebalancas.com.br/videos/app-img-1.webp", alt: "Resultados Reais" },
                { type: "video", src: "https://inbalancebalancas.com.br/videos/app-vid-2.mp4", alt: "Operação Rápida" },
                { type: "image", src: "https://inbalancebalancas.com.br/videos/app-img-2.webp", alt: "Operação Rápida" },
                { type: "video", src: "https://inbalancebalancas.com.br/videos/app-vid-3.mp4", alt: "Fazendas InBalance" },
                { type: "image", src: "https://inbalancebalancas.com.br/videos/app-img-3.webp", alt: "Fazendas InBalance" },
                { type: "video", src: "https://inbalancebalancas.com.br/videos/app-vid-4.mp4", alt: "Pesagem de Precisão" },
                { type: "image", src: "https://inbalancebalancas.com.br/videos/app-img-4.webp", alt: "Pesagem de Precisão" },
                // Repeat for continuous loop
                { type: "video", src: "https://inbalancebalancas.com.br/videos/app-vid-1.mp4", alt: "Resultados Reais" },
                { type: "image", src: "https://inbalancebalancas.com.br/videos/app-img-1.webp", alt: "Resultados Reais" },
                { type: "video", src: "https://inbalancebalancas.com.br/videos/app-vid-2.mp4", alt: "Operação Rápida" },
                { type: "image", src: "https://inbalancebalancas.com.br/videos/app-img-2.webp", alt: "Operação Rápida" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="relative flex-shrink-0 w-56 h-40 sm:w-64 sm:h-48 rounded-2xl overflow-hidden shadow-lg border border-amber/20 group bg-navy-dark"
                >
                  {item.type === "video" ? (
                    <video
                      src={item.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

        {/* Scroll indicator */}
        <div className="mt-12 text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 text-amber">
            <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40 animate-pulse" style={{ animationDelay: "0s" }} />
            <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40 animate-pulse" style={{ animationDelay: "0.2s" }} />
            <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40 animate-pulse" style={{ animationDelay: "0.4s" }} />
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="sobre" className="bg-navy py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber/20 border border-amber/40 rounded-full px-4 py-1.5 mb-5">
                <span className="text-amber text-sm font-semibold tracking-wide">Sobre a AgroPeso</span>
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                PRECISÃO QUE
                <br />
                <span className="text-amber">FAZ A DIFERENÇA</span>
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                Há mais de 12 anos desenvolvendo soluções de pesagem para a pecuária brasileira,
                a AgroPeso combina tecnologia de ponta com a robustez exigida pelo campo.
                Nossos equipamentos são testados nas condições mais adversas para garantir
                que você tenha sempre a leitura correta na hora certa.
              </p>
              <p className="text-slate-300 leading-relaxed mb-8">
                Cada grama de diferença na pesagem representa dinheiro no seu bolso.
                Com nossas balanças, você elimina as perdas causadas por imprecisão
                e toma decisões de manejo baseadas em dados confiáveis.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "+500", label: "Produtores atendidos" },
                  { value: "12 anos", label: "De experiência" },
                  { value: "0,5 kg", label: "Precisão máxima" },
                  { value: "24h", label: "Suporte técnico" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/10 rounded-xl p-4">
                    <div
                      className="text-2xl font-bold text-amber"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/manus-storage/hero_gado_366f4488.png"
                  alt="Gado nelore na fazenda"
                  className="w-full h-80 object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-amber rounded-xl p-4 shadow-xl">
                <div
                  className="text-3xl font-bold text-white"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  4.000 kg
                </div>
                <div className="text-white/80 text-xs mt-0.5">Capacidade máxima</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contato" className="py-20 bg-slate-50">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-amber/10 border border-amber/30 rounded-full px-4 py-1.5 mb-5">
              <span className="text-amber text-sm font-semibold tracking-wide">Fale Conosco</span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-navy mb-4"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              SOLICITE SEU ORÇAMENTO
            </h2>
            <p className="text-slate-500 text-lg mb-10">
              Entre em contato e receba uma proposta personalizada para sua operação.
              Atendemos todo o Brasil.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {[
                { label: "WhatsApp", value: "(41) 99928-3623", href: "https://wa.me/5541999283623", icon: "💬" },
                { label: "E-mail", value: "contato@agropeso.com.br", href: "mailto:contato@agropeso.com.br", icon: "✉️" },
                { label: "Horário", value: "Seg–Sex, 8h–18h", href: "#", icon: "🕐" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-amber/30 transition-all duration-200 text-left"
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">{item.label}</div>
                  <div className="font-semibold text-navy text-sm">{item.value}</div>
                </a>
              ))}
            </div>

            <a
              href="https://wa.me/5541999283623?text=Olá! Gostaria de solicitar um orçamento para balanças de gado."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta inline-flex items-center gap-3 bg-amber hover:bg-amber-dark text-white font-bold text-lg px-10 py-4 rounded-xl shadow-lg transition-colors duration-150"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
            >
              💬 CHAMAR NO WHATSAPP
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
