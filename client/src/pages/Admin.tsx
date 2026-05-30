import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [config, setConfig] = useState({
    pixKey: "",
    merchantName: "",
    merchantCity: ""
  });
  const [, setLocation] = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      setIsLoggedIn(true);
      fetchConfig(token);
    }
  }, []);

  const fetchConfig = async (token: string) => {
    try {
      const res = await fetch("/api/admin/config", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setConfig(data);
      } else {
        localStorage.removeItem("admin_token");
        setIsLoggedIn(false);
      }
    } catch (err) {
      toast.error("Erro ao carregar configurações");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("admin_token", data.token);
        setIsLoggedIn(true);
        fetchConfig(data.token);
        toast.success("Login realizado com sucesso");
      } else {
        toast.error("Senha incorreta");
      }
    } catch (err) {
      toast.error("Erro ao fazer login");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch("/api/admin/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(config)
      });
      if (res.ok) {
        toast.success("Configurações salvas com sucesso");
      } else {
        toast.error("Erro ao salvar configurações");
      }
    } catch (err) {
      toast.error("Erro ao salvar");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Acesso Administrativo</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite a senha admin"
                />
              </div>
              <Button type="submit" className="w-full">Entrar</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900">Configurações PIX</h1>
          <Button variant="outline" onClick={() => {
            localStorage.removeItem("admin_token");
            setIsLoggedIn(false);
          }}>Sair</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dados do Recebedor</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pixKey">Chave PIX (CNPJ, CPF, Email ou Aleatória)</Label>
                <Input
                  id="pixKey"
                  value={config.pixKey}
                  onChange={(e) => setConfig({ ...config, pixKey: e.target.value })}
                  placeholder="Ex: 00.000.000/0001-00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="merchantName">Nome do Recebedor</Label>
                <Input
                  id="merchantName"
                  value={config.merchantName}
                  onChange={(e) => setConfig({ ...config, merchantName: e.target.value })}
                  placeholder="Ex: AGROPESO BALANCAS"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="merchantCity">Cidade</Label>
                <Input
                  id="merchantCity"
                  value={config.merchantCity}
                  onChange={(e) => setConfig({ ...config, merchantCity: e.target.value })}
                  placeholder="Ex: BRASIL"
                />
              </div>
              <Button type="submit" className="w-full">Salvar Alterações</Button>
            </form>
          </CardContent>
        </Card>
        
        <Button variant="ghost" onClick={() => setLocation("/")} className="w-full">
          Voltar para o Site
        </Button>
      </div>
    </div>
  );
}
