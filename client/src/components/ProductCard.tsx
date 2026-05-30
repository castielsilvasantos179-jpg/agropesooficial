// AgroPeso — ProductCard Component
// Design: Agro-Tech Moderno | Card com hover elevation

import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/produto/${product.slug}`}>
      <div className="product-card bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm cursor-pointer h-full flex flex-col group">
        {/* Image */}
        <div className="relative bg-slate-50 overflow-hidden" style={{ aspectRatio: "4/3" }}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span
              className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-navy text-white"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
            >
              {product.category}
            </span>
            {product.badge && (
              <span
                className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-amber text-white"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
              >
                {product.badge}
              </span>
            )}
          </div>
          {/* Model code */}
          <span
            className="absolute top-3 right-3 text-xs font-mono-data font-medium text-slate-500 bg-white/90 px-2 py-1 rounded-md"
          >
            {product.model}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3
            className="text-xl font-bold text-navy mb-2 leading-tight"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {product.name}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">
            {product.shortDescription}
          </p>

          {/* Key specs */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {product.specs.slice(0, 4).map((spec) => (
              <div key={spec.label} className="bg-slate-50 rounded-lg px-3 py-2">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium mb-0.5">
                  {spec.label}
                </div>
                <div
                  className="text-xs font-semibold text-navy font-mono-data"
                >
                  {spec.value}
                </div>
              </div>
            ))}
          </div>

          {/* Top features */}
          <ul className="space-y-1.5 mb-5">
            {product.features.slice(0, 3).map((feat) => (
              <li key={feat} className="flex items-start gap-2 text-xs text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                {feat}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-xs text-slate-400 font-medium">
              Capacidade: <strong className="text-navy">{product.capacity}</strong>
            </span>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-amber group-hover:gap-2.5 transition-all duration-200">
              Ver detalhes
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
