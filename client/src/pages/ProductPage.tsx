// Design: Agro-Tech Moderno | Navy + Amber | Two-column layout + Carousel + Checkout + PIX

import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { getProductBySlug, products } from "@/lib/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import PixModal from "@/components/PixModal";
import {
  ArrowLeft,
  CheckCircle2,
  Package,
  Wrench,
  MapPin,
  Phone,
  ChevronRight,
  ChevronLeft,
  ShoppingCart,
  X,
  QrCode,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";
import { validateCPF, fetchAddressByCEP } from "@/lib/validators";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPixModal, setShowPixModal] = useState(false);
  const [cpfError, setCpfError] = useState("");
  const [cepLoading, setCepLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    quantity: "1",
  });

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-navy mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Produto não encontrado
            </h1>
            <Link href="/">
              <span className="text-amber hover:underline font-semibold">← Voltar ao catálogo</span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);
  const gallery = product.gallery || [product.image];
  const quantity = parseInt(formData.quantity) || 1;
  const pixPrice = 999.90;
  const cardPrice = 1499.00;
  const totalPixPrice = pixPrice * quantity;
  const totalCardPrice = cardPrice * quantity;

  const handleImagePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleImageNext = () => {
    setCurrentImageIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, cpf: value });
    
    // Valida CPF enquanto digita
    if (value.replace(/\D/g, "").length === 11) {
      if (!validateCPF(value)) {
        setCpfError("CPF inválido");
      } else {
        setCpfError("");
      }
    } else {
      setCpfError("");
    }
  };

  const handleCEPChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, zipCode: value });

    // Se o CEP tem 8 dígitos, busca o endereço
    const cleanCEP = value.replace(/\D/g, "");
    if (cleanCEP.length === 8) {
      setCepLoading(true);
      const addressData = await fetchAddressByCEP(cleanCEP);
      setCepLoading(false);

      if (addressData) {
        setFormData((prev) => ({
          ...prev,
          address: addressData.logradouro,
          city: addressData.localidade,
          state: addressData.uf,
        }));
        toast.success("Endereço preenchido automaticamente!");
      } else {
        toast.error("CEP não encontrado");
      }
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    // Valida CPF
    if (!validateCPF(formData.cpf)) {
      toast.error("CPF inválido");
      setCpfError("CPF inválido");
      return;
    }

    // Abre o modal PIX com o valor correto
    setShowCheckout(false);
    setShowPixModal(true);
  };

  const handleWhatsAppOrder = () => {
    const message = `Olá! Gostaria de comprar:

*${product.name} (${product.model})*
Quantidade: ${quantity}
Valor à vista no Pix: R$ ${pixPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
Valor no cartão: R$ ${cardPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} em até 10x
Total no Pix: R$ ${totalPixPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

*Dados do Cliente:*
Nome: ${formData.name}
Email: ${formData.email}
Telefone: ${formData.phone}
Endereço: ${formData.address}
Cidade: ${formData.city}
Estado: ${formData.state}
CEP: ${formData.zipCode}

Por favor, confirme o pedido e envie os detalhes de entrega.`;

    const whatsappUrl = `https://wa.me/5561186109000150?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    toast.success("Redirecionando para WhatsApp...");
    setShowCheckout(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      {/* ── BREADCRUMB ── */}
      <div className="bg-navy-dark pt-16">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm text-slate-400">
            <Link href="/">
              <span className="hover:text-amber transition-colors cursor-pointer">Início</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/#catalogo">
              <span className="hover:text-amber transition-colors cursor-pointer">Catálogo</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-200">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* ── PRODUCT HERO ── */}
      <section className="bg-navy-dark pb-12">
        <div className="container">
          <Link href="/">
            <button className="flex items-center gap-2 text-slate-400 hover:text-amber transition-colors mb-8 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-150" />
              <span className="text-sm font-medium">Voltar ao catálogo</span>
            </button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Carousel */}
            <div className="relative">
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 p-8 relative shadow-sm">
                <img
                  src={gallery[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-auto object-contain max-h-80 mx-auto"
                />

                {/* Carousel controls */}
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={handleImagePrev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-navy hover:bg-navy-dark text-white p-2 rounded-full transition-colors duration-150"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleImageNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-navy hover:bg-navy-dark text-white p-2 rounded-full transition-colors duration-150"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Thumbnails */}
                    <div className="flex gap-2 mt-4 justify-center">
                      {gallery.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all duration-150 ${
                            idx === currentImageIndex ? "bg-amber w-6" : "bg-slate-300 hover:bg-slate-400"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span
                  className="inline-block text-xs font-semibold px-3 py-1.5 rounded-lg bg-navy text-white"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
                >
                  {product.category}
                </span>
                {product.badge && (
                  <span
                    className="inline-block text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber text-white"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
                  >
                    {product.badge}
                  </span>
                )}
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono-data text-sm text-amber font-medium bg-amber/10 px-3 py-1 rounded-md">
                  {product.model}
                </span>
                <span className="text-slate-400 text-sm">·</span>
                <span className="text-slate-400 text-sm">{product.category}</span>
              </div>

              <h1
                className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {product.name}
              </h1>

              <p className="text-slate-300 text-base leading-relaxed mb-6">
                {product.fullDescription}
              </p>

              {/* Capacity highlight */}
              <div className="bg-amber/10 border border-amber/30 rounded-xl p-4 mb-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber flex items-center justify-center shrink-0">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-amber/70 mb-0.5">Capacidade Máxima</div>
                  <div
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {product.capacity}
                  </div>
                </div>
              </div>

              {/* Price highlight */}
              <div className="bg-amber/10 border border-amber/30 rounded-xl p-4 mb-6">
                <div className="text-xs uppercase tracking-wider text-amber/70 mb-2">Preço</div>
                <div
                  className="text-4xl font-bold text-amber"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  R$ {pixPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-sm text-slate-200 mt-1">à vista no Pix</div>
                <div className="mt-3 inline-flex items-center rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold text-white">
                  ou R$ {cardPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} em até 10x no cartão
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 mb-6">
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full btn-cta flex items-center justify-center gap-2 bg-amber hover:bg-amber-dark text-white font-bold text-base px-6 py-4 rounded-xl shadow-lg transition-colors duration-150"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
                >
                  <ShoppingCart className="w-4 h-4" />
                  COMPRAR AGORA
                </button>
              </div>

              {/* Payment methods */}
              <div className="bg-white rounded-xl p-6 mb-6 border border-slate-200 shadow-sm">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663713899247/NXYVQcFsheBRmEaJ.webp"
                  alt="Formas de Pagamento"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DETAILS TABS ── */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Specifications */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="bg-navy px-6 py-4 flex items-center gap-3">
                  <Wrench className="w-5 h-5 text-amber" />
                  <h2
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    ESPECIFICAÇÕES TÉCNICAS
                  </h2>
                </div>
                <div className="divide-y divide-slate-50">
                  {product.specs.map((spec, i) => (
                    <div
                      key={spec.label}
                      className={`flex items-center justify-between px-6 py-3.5 ${
                        i % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                      }`}
                    >
                      <span className="text-sm text-slate-500 font-medium">{spec.label}</span>
                      <span className="font-mono-data text-sm font-semibold text-navy">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mt-6">
                <div className="bg-navy px-6 py-4 flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-amber" />
                  <h2
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    APLICAÇÕES
                  </h2>
                </div>
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.applications.map((app) => (
                    <div
                      key={app}
                      className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-amber shrink-0" />
                      <span className="text-sm font-medium text-navy">{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Features sidebar */}
            <div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-6">
                <div className="bg-navy px-6 py-4 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber" />
                  <h2
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    CARACTERÍSTICAS
                  </h2>
                </div>
                <ul className="divide-y divide-slate-50">
                  {product.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-3 px-6 py-3.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-slate-600 leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact CTA card */}
              <div className="bg-navy rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">💬</div>
                <h3
                  className="text-xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  DÚVIDAS?
                </h3>
                <p className="text-slate-400 text-sm mb-5 leading-relaxed">
                  Nossa equipe está pronta para ajudar você a escolher o modelo ideal.
                </p>
                <a
                  href={`https://wa.me/5561186109000150?text=${encodeURIComponent(`Olá! Tenho dúvidas sobre a ${product.name} (${product.model}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta block w-full bg-amber hover:bg-amber-dark text-white font-bold text-sm py-3 rounded-xl transition-colors duration-150 text-center"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
                >
                  FALAR COM ESPECIALISTA
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED PRODUCTS ── */}
      <section className="py-16 bg-slate-100">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <h2
              className="text-3xl font-bold text-navy"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              OUTROS MODELOS
            </h2>
            <Link href="/#catalogo">
              <span className="text-amber hover:underline font-semibold text-sm flex items-center gap-1 cursor-pointer">
                Ver todos <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CHECKOUT MODAL ── */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-navy px-6 py-4 flex items-center justify-between border-b border-slate-100 rounded-t-2xl">
              <h2
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                FINALIZAR COMPRA
              </h2>
              <button
                onClick={() => setShowCheckout(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="p-6 space-y-6">
              {/* Product Summary */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="flex items-start gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-contain rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-navy mb-1">{product.name}</h3>
                    <p className="text-sm text-slate-600 mb-3">{product.model}</p>
                    <div className="flex items-center gap-4">
                      <div>
                        <label className="text-xs text-slate-600 block mb-1">Quantidade</label>
                        <input
                          type="number"
                          min="1"
                          value={formData.quantity}
                          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                          className="w-16 px-3 py-2 border border-slate-300 rounded-lg text-sm"
                        />
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-600 mb-1">Valor à vista no Pix</div>
                        <div className="font-bold text-amber">R$ {pixPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                        <div className="text-xs text-slate-500 mt-1">Cartão: R$ {cardPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} em até 10x</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="font-semibold text-navy">Total no Pix:</span>
                  <div className="text-right">
                    <span className="block text-2xl font-bold text-amber">R$ {totalPixPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    <span className="text-xs text-slate-500">Cartão: R$ {totalCardPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} em até 10x</span>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="space-y-4">
                <h3 className="font-bold text-navy mb-3">Dados do Cliente</h3>

                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Nome Completo *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber focus:border-transparent"
                    placeholder="João Silva"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber focus:border-transparent"
                      placeholder="joao@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Telefone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber focus:border-transparent"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-1">CPF *</label>
                  <input
                    type="text"
                    required
                    value={formData.cpf}
                    onChange={handleCPFChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber focus:border-transparent ${
                      cpfError ? "border-red-500" : "border-slate-300"
                    }`}
                    placeholder="123.456.789-00"
                  />
                  {cpfError && <p className="text-red-500 text-xs mt-1">{cpfError}</p>}
                </div>
              </div>

              {/* Delivery Info */}
              <div className="space-y-4">
                <h3 className="font-bold text-navy mb-3">Endereço de Entrega</h3>

                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Endereço *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber focus:border-transparent"
                    placeholder="Rua das Flores, 123"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Cidade</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber focus:border-transparent"
                      placeholder="São Paulo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Estado</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber focus:border-transparent"
                      placeholder="SP"
                      maxLength={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">CEP</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={handleCEPChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber focus:border-transparent"
                        placeholder="01310-100"
                        maxLength={9}
                      />
                      {cepLoading && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="w-4 h-4 border-2 border-amber border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Options */}
              <div className="space-y-3">
                {/* Finalizar Compra Button */}
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-amber hover:bg-amber-dark text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
                >
                  <ShoppingCart className="w-5 h-5" />
                  FINALIZAR COMPRA
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── PIX MODAL ── */}
      <PixModal
        isOpen={showPixModal}
        onClose={() => setShowPixModal(false)}
        amount={totalPixPrice}
        productName={product.name}
        productModel={product.model}
        quantity={quantity}
      />

      <Footer />
    </div>
  );
}
