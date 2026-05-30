import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import QRCode from "qrcode";
import { generatePixPayload } from "./pix.js";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Em produção (Railway), o arquivo estará no mesmo diretório do bundle ou no root
const CONFIG_PATH = process.env.NODE_ENV === "production" 
  ? path.resolve(process.cwd(), "config.json")
  : path.resolve(__dirname, "config.json");

async function getConfig() {
  try {
    const data = await fs.readFile(CONFIG_PATH, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    // Tenta ler do root se falhar no diretório do bundle
    try {
      const rootPath = path.resolve(process.cwd(), "config.json");
      const data = await fs.readFile(rootPath, "utf-8");
      return JSON.parse(data);
    } catch (e) {
      return {
        pixKey: "61186109000150",
        merchantName: "AGROPESO BALANCAS",
        merchantCity: "BRASIL"
      };
    }
  }
}

async function saveConfig(config: any) {
  await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2));
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // ── ROTA PIX: Gera payload e QR Code ──────────────────────────────────────
  app.post("/api/pix/generate", async (req, res) => {
    try {
      const config = await getConfig();
      const { amount, txid, description } = req.body as {
        amount?: number;
        txid?: string;
        description?: string;
      };

      const payload = generatePixPayload({
        key: config.pixKey,
        merchantName: config.merchantName,
        merchantCity: config.merchantCity,
        amount: amount ? Number(amount) : undefined,
        txid: txid || "***",
        description,
      });

      // Gera o QR Code em formato base64 (Data URL PNG)
      const qrCodeDataUrl = await QRCode.toDataURL(payload, {
        errorCorrectionLevel: "M",
        margin: 2,
        width: 300,
        color: {
          dark: "#1e3a5f", // Navy
          light: "#ffffff",
        },
      });

      res.json({
        success: true,
        payload,
        qrCode: qrCodeDataUrl,
        pixKey: config.pixKey,
        merchantName: config.merchantName,
      });
    } catch (err) {
      console.error("Erro ao gerar PIX:", err);
      res.status(500).json({ success: false, error: "Erro ao gerar PIX" });
    }
  });

  // ── ROTAS ADMIN ────────────────────────────────────────────────────────────
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

  app.get("/api/admin/config", async (req, res) => {
    const auth = req.headers.authorization;
    if (auth !== `Bearer ${ADMIN_PASSWORD}`) {
      return res.status(401).json({ error: "Não autorizado" });
    }
    const config = await getConfig();
    res.json(config);
  });

  app.post("/api/admin/config", async (req, res) => {
    const auth = req.headers.authorization;
    if (auth !== `Bearer ${ADMIN_PASSWORD}`) {
      return res.status(401).json({ error: "Não autorizado" });
    }
    const newConfig = req.body;
    await saveConfig(newConfig);
    res.json({ success: true, config: newConfig });
  });

  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      res.json({ success: true, token: ADMIN_PASSWORD });
    } else {
      res.status(401).json({ success: false, error: "Senha incorreta" });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3001;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
