// Componente de Modal PIX - Exibe QR Code e Pix Copia e Cola
import { useState, useEffect, useCallback } from "react";
import { X, Copy, CheckCircle2, RefreshCw, QrCode } from "lucide-react";
import { toast } from "sonner";

interface PixModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  productName: string;
  productModel: string;
  quantity: number;
  onSuccess?: () => void;
}

interface PixData {
  payload: string;
  qrCode: string;
  pixKey: string;
  merchantName: string;
}

export default function PixModal({
  isOpen,
  onClose,
  amount,
  productName,
  productModel,
  quantity,
}: PixModalProps) {
  const [pixData, setPixData] = useState<PixData | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePix = useCallback(async () => {
    setLoading(true);
    setError(null);
    setPixData(null);

    try {
      const txid = `BALANCA${Date.now().toString().slice(-10)}`;
      const description = `${productModel} x${quantity}`.substring(0, 72);

      const response = await fetch("/api/pix/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(amount.toFixed(2)),
          txid,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao gerar PIX");
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Erro ao gerar PIX");
      }

      setPixData(data);
    } catch (err) {
      setError("Não foi possível gerar o PIX. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [amount, productModel, quantity]);

  useEffect(() => {
    if (isOpen) {
      generatePix();
    }
  }, [isOpen, generatePix]);

  const handleCopy = async () => {
    if (!pixData?.payload) return;
    try {
      await navigator.clipboard.writeText(pixData.payload);
      setCopied(true);
      toast.success("Código PIX copiado!");
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error("Erro ao copiar. Copie manualmente.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-navy px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber rounded-lg flex items-center justify-center">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <h2
              className="text-xl font-bold text-white"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              PAGAMENTO VIA PIX
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Resumo do pedido */}
          <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-200">
            <div className="text-xs uppercase tracking-wider text-slate-500 mb-1">Pedido</div>
            <div className="font-bold text-navy text-sm">{productName}</div>
            <div className="text-slate-500 text-xs mb-3">{productModel} · Qtd: {quantity}</div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <span className="text-sm font-semibold text-navy">Total à vista no PIX:</span>
              <span
                className="text-2xl font-bold text-amber"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                R$ {amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Estado de carregamento */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <div className="w-12 h-12 border-4 border-amber border-t-transparent rounded-full animate-spin" />
              <p className="text-slate-500 text-sm">Gerando QR Code PIX...</p>
            </div>
          )}

          {/* Erro */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-8 gap-4">
              <p className="text-red-500 text-sm text-center">{error}</p>
              <button
                onClick={generatePix}
                className="flex items-center gap-2 px-4 py-2 bg-amber text-white rounded-lg text-sm font-semibold hover:bg-amber-dark transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Tentar novamente
              </button>
            </div>
          )}

          {/* QR Code e payload */}
          {pixData && !loading && (
            <div className="space-y-5">
              {/* Instruções */}
              <div className="bg-amber/10 border border-amber/30 rounded-xl p-4">
                <h3 className="font-bold text-navy text-sm mb-2">Como pagar:</h3>
                <ol className="space-y-1.5 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber text-white text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">1</span>
                    Abra o app do seu banco
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber text-white text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">2</span>
                    Escaneie o QR Code abaixo ou copie o código PIX
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber text-white text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">3</span>
                    Confirme o pagamento de{" "}
                    <strong className="text-amber">
                      R$ {amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </strong>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber text-white text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">4</span>
                    Envie o comprovante pelo WhatsApp para confirmar seu pedido
                  </li>
                </ol>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center">
                <div className="bg-white border-4 border-navy rounded-2xl p-3 shadow-md inline-block">
                  <img
                    src={pixData.qrCode}
                    alt="QR Code PIX"
                    className="w-56 h-56 object-contain"
                  />
                </div>
                <div className="mt-2 text-xs text-slate-500 text-center">
                  Recebedor: <strong className="text-navy">{pixData.merchantName}</strong>
                </div>
                <div className="mt-1 text-xs text-slate-400 text-center">
                  Chave CNPJ: {pixData.pixKey.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")}
                </div>
              </div>

              {/* Pix Copia e Cola */}
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-500 mb-2 font-semibold">
                  PIX Copia e Cola
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-3">
                  <p className="text-xs text-slate-600 font-mono break-all leading-relaxed select-all">
                    {pixData.payload}
                  </p>
                </div>
                <button
                  onClick={handleCopy}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-150 ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-navy hover:bg-navy-dark text-white"
                  }`}
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      CÓDIGO COPIADO!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      COPIAR CÓDIGO PIX
                    </>
                  )}
                </button>
              </div>

              {/* Aviso */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <p className="text-xs text-blue-700 text-center leading-relaxed">
                  Após o pagamento, envie o comprovante pelo WhatsApp para agilizar a confirmação e entrega do seu pedido.
                </p>
              </div>

              {/* Botão WhatsApp */}
              <a
                href={`https://wa.me/5561186109000150?text=${encodeURIComponent(
                  `Olá! Acabei de realizar o pagamento via PIX do pedido:\n\n*${productName} (${productModel})*\nQuantidade: ${quantity}\nValor: R$ ${amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}\n\nSegue o comprovante em anexo.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-green-500 hover:bg-green-600 text-white transition-colors"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                ENVIAR COMPROVANTE NO WHATSAPP
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
