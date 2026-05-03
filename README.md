<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/monitor-play.svg" width="100" alt="Lumina Stream Logo"/>
  <h1>Lumina Stream</h1>
  <p><strong>A próxima geração de streaming de canais ao vivo. Parte do ecossistema VICCS.</strong></p>

  <p>
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js&logoColor=white" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
    <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
    <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  </p>
</div>

---

## 📺 Sobre o Projeto

**Lumina Stream** é uma plataforma moderna e elegante para visualização de canais de TV e realities ao vivo. Projetado sem dependências de bancos de dados externos, o sistema é incrivelmente rápido e robusto.

Ele utiliza um mecanismo de **"Adapters" de Scraping** via rotas de API do Next.js para buscar links de transmissão ao vivo (HLS / m3u8) em tempo real de várias fontes na internet (como RedeCanaisTV, MultiCanaisHD, YouTube, etc.) e os reproduz utilizando um player de vídeo customizado.

## ✨ Principais Features

- **Interface Premium:** Design elegante em dark mode com efeitos *Glassmorphism*, gradientes radiais, e animações fluidas via Framer Motion.
- **Hero Section Dinâmico:** Um *banner* na página inicial que sorteia canais aleatoriamente a cada carregamento para manter a plataforma visualmente fresca.
- **Sistema de Adapters (Scraping):** Infraestrutura modular no backend (Node.js/Next.js API) com fallback proxies, extraindo transmissões de múltiplos provedores.
- **Proxy CORS Integrado:** API de proxy interna que resolve problemas de bloqueio de política de Mesma Origem (CORS) para streams M3U8.
- **Catálogo de Dados Local:** Completamente autossuficiente (Zero DB externo), garantindo carregamento instantâneo da interface de usuário.
- **Player HLS Customizado:** Interface de player exclusiva com suporte a aceleração de hardware, atalhos, picture-in-picture, tela cheia e modo teatro.

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
| :--- | :--- |
| **Next.js 16 (App Router)** | Framework React para Server-Side Rendering e rotas de API. |
| **TypeScript** | Tipagem estática garantindo estabilidade e DX. |
| **Tailwind CSS & Framer Motion** | Estilização utilitária e animações de alta performance. |
| **HLS.js** | Biblioteca core para renderização de streams HTTP Live Streaming. |
| **Lucide React** | Biblioteca de ícones elegantes e minimalistas. |
| **Cheerio** | Parsing e web scraping para a extração dos links de stream. |

---

## 🚀 Como Buildar e Executar (Getting Started)

Siga os passos abaixo para rodar o Lumina Stream em sua máquina local.

### 1. Pré-requisitos
Certifique-se de ter o **Node.js** (versão 18+ recomendada) e um gerenciador de pacotes como **npm**, **yarn**, **pnpm** ou **bun**.

### 2. Instalação
Clone o repositório ou navegue até a pasta raiz do projeto (`lumina-stream/`), e instale as dependências:

```bash
# Navegue até a pasta
cd lumina-stream

# Instale as dependências
npm install
# ou
yarn install
```

### 3. Executando o Servidor de Desenvolvimento
A plataforma possui alguns scripts convenientes criados para rodar a aplicação:

```bash
# Rodar via npm/yarn/pnpm
npm run dev

# Se estiver usando Windows, você também pode usar os atalhos locais:
./lumina-dev.ps1
# ou
run-dev.bat
```

A aplicação estará disponível em: [http://localhost:3000](http://localhost:3000)

### 4. Construindo para Produção
Para criar a build otimizada de produção:

```bash
npm run build
npm run start
```

---

## 📂 Entendendo a Arquitetura Principal

```text
src/
├── app/
│   ├── api/
│   │   ├── scrape-stream/route.ts  # ⚙️ Endpoint que roda o web scraper
│   │   └── proxy/route.ts          # 🔀 CORS proxy bypass para vídeo
│   ├── watch/[id]/                 # 🎬 Rota de reprodução do canal
│   └── page.tsx                    # 🏠 Homepage e HeroSection dinâmico
├── components/                     # 🧩 Componentes de UI (Cards, Player, etc.)
├── lib/
│   ├── adapters/                   # 🕷️ Lógica de extração de streams (Scraping)
│   └── channels.ts                 # 🗃️ Catálogo Local de Canais (Fonte de Dados)
```

## 📝 Como adicionar um novo canal?

A adição de um canal não exige banco de dados. Tudo é feito via código.
Vá até `src/lib/channels.ts` e adicione um novo objeto ao `CHANNEL_CATALOG`:

```typescript
{
    id: "meu-novo-canal",
    name: "Nome do Canal",
    category: "Entretenimento",
    logo_url: "/canais/imagem.png",
    image_color: "#FF0000",
    is_featured: false,
    viewers: 5000,
    description: "Descrição fantástica que aparece no HeroSection.",
}
```
*Observação: Lembre-se de mapear o `id` do canal (ex: `meu-novo-canal`) ao respectivo adaptador na pasta `src/lib/adapters/registry.ts` para que a engine de scraping saiba como buscar a transmissão.*

---
<div align="center">
  <sub>Criado e idealizado por <b>VICCS</b></sub>
</div>
