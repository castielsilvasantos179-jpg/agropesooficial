# Guia de Deploy na Vercel

Este projeto está pronto para ser hospedado na Vercel. Siga os passos abaixo:

## Pré-requisitos

- Conta no GitHub
- Conta na Vercel (https://vercel.com)

## Passos para Deploy

### 1. Criar um repositório no GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/seu-usuario/seu-repositorio.git
git push -u origin main
```

### 2. Conectar com Vercel

1. Acesse https://vercel.com
2. Clique em "New Project"
3. Selecione "Import Git Repository"
4. Cole a URL do seu repositório GitHub
5. Clique em "Import"

### 3. Configurar Variáveis de Ambiente (se necessário)

Na dashboard da Vercel, vá para "Settings" > "Environment Variables" e adicione qualquer variável necessária.

### 4. Deploy Automático

Após conectar o repositório, qualquer push para a branch `main` acionará um deploy automático.

## Estrutura do Projeto

```
catalogo-balancas-gado/
├── client/                 # Frontend React + Vite
│   ├── src/
│   │   ├── pages/         # Páginas (Home, ProductPage)
│   │   ├── components/    # Componentes React
│   │   ├── lib/           # Utilitários (validadores, produtos)
│   │   └── public/        # Arquivos estáticos (imagens, assets)
│   └── index.html
├── server/                # Backend Express
│   ├── index.ts          # Servidor principal
│   └── pix.ts            # Lógica de geração de PIX
├── dist/                 # Build output (gerado automaticamente)
├── package.json
├── vite.config.ts
└── vercel.json           # Configuração da Vercel
```

## Funcionalidades Implementadas

✅ **Catálogo de Produtos** — Exibição de balanças para gado com detalhes técnicos
✅ **Checkout com Validação** — Validação de CPF e busca automática de CEP
✅ **Pagamento via PIX** — Integração com geração de QR Code PIX estático
✅ **Preços Fixos** — R$ 999,90 (PIX) e R$ 1.499,00 (Cartão)
✅ **Banner Responsivo** — Imagem de fazenda com overlay de gradiente
✅ **Integração WhatsApp** — Botões de contato direto via WhatsApp

## Variáveis de Ambiente

Se necessário, configure as seguintes variáveis na Vercel:

```
VITE_API_URL=https://seu-dominio.vercel.app
NODE_ENV=production
```

## Troubleshooting

### Imagens não carregam
- Verifique se as imagens estão em `client/public/assets/`
- Confirme que os caminhos no código usam `/assets/nome-da-imagem.png`

### Erro de build
- Certifique-se de que todas as dependências estão no `package.json`
- Execute `pnpm install` localmente para testar o build

### Rotas não funcionam
- A configuração em `vercel.json` redireciona todas as rotas para `index.html`
- Isso permite que o React Router funcione corretamente

## Suporte

Para mais informações sobre deploy na Vercel, visite: https://vercel.com/docs
