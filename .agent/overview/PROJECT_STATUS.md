# Project Overview

## Project Name
**VICCS Channels — Lumina Stream**

## Description
Plataforma de streaming ao vivo desenvolvida como parte do ecossistema VICCS. Exibe canais de TV ao vivo via sistema de "adapters" que fazem scraping de fontes externas (RedeCanaisTV, MultiCanaisHD, BBB26Shop, YouTube) para obter URLs de streams HLS. Utiliza catálogo local de canais (sem dependência de banco externo) e apresenta interface moderna estilo "Netflix/Streaming" com glassmorphism, dark mode e player de vídeo customizado com HLS.js.

## Tech Stack
- **Language:** TypeScript
- **Framework:** Next.js 16.1.4 (App Router)
- **Runtime:** React 19.2.3 / React DOM 19.2.3
- **Styling:** Tailwind CSS 3.4 + tailwindcss-animate
- **Fontes:** Google Fonts (Inter para corpo, Outfit para títulos)
- **Player:** HLS.js 1.6.15
- **Animações:** Framer Motion 12.29.0
- **Ícones:** Lucide React 0.563.0
- **UI Utils:** clsx, tailwind-merge, vaul (drawer/sheet), sonner (toasts)
- **Linting:** ESLint 9 + eslint-config-next
- **Data:** Catálogo local (sem Supabase — projeto anterior foi desativado)

## Folder Structure
```text
VICCS_Channels/
├── .agent/                     # Agent configs (skills, workflows, overview)
│   ├── overview/
│   │   └── PROJECT_STATUS.md   # This file
│   ├── skills/
│   └── workflows/
└── lumina-stream/              # Main Next.js application
    ├── .env.local              # Supabase keys (legacy, not used)
    ├── img/
    │   ├── canais/             # Channel logo assets
    │   └── filmes/             # Movie poster assets (legacy)
    ├── public/
    │   └── canais/             # Public channel images
    ├── src/
    │   ├── app/
    │   │   ├── api/
    │   │   │   ├── proxy/route.ts       # CORS proxy for HLS streams
    │   │   │   └── scrape-stream/route.ts # Stream scraping API endpoint
    │   │   ├── watch/
    │   │   │   └── [id]/
    │   │   │       ├── page.tsx           # Watch page (SSR)
    │   │   │       ├── StreamSelector.tsx  # Stream source selector UI
    │   │   │       └── SourceSelector.tsx  # Adapter source selector (legacy)
    │   │   ├── globals.css     # Design tokens + glassmorphism utils
    │   │   ├── layout.tsx      # Root layout (Inter + Outfit fonts)
    │   │   └── page.tsx        # Homepage (channel grid + hero)
    │   ├── components/
    │   │   ├── ChannelCard.tsx       # Channel card component
    │   │   ├── ChannelCarousel.tsx   # Horizontal channel carousel
    │   │   ├── HeroSection.tsx       # Landing hero section (Dynamic Client Component)
    │   │   └── VideoPlayer.tsx       # Custom HLS video player
    │   ├── lib/
    │   │   ├── adapters/
    │   │   │   ├── types.ts          # Adapter/source type definitions
    │   │   │   ├── registry.ts       # Central adapter registry + proxy fallback
    │   │   │   ├── redecanaistv.ts   # RedeCanaisTV adapter (DooPlay)
    │   │   │   ├── multicanaishd.ts  # MultiCanaisHD adapter
    │   │   │   ├── bbb26shop.ts      # BBB26Shop adapter
    │   │   │   └── youtube.ts        # YouTube live adapter
    │   │   ├── channels.ts    # ★ Local channel catalog (8 canais)
    │   │   └── utils.ts              # cn() utility (clsx + twMerge)
    │   ├── types/
    │   │   └── supabase.ts    # Supabase Database types (legacy)
    │   └── utils/
    │       └── supabase/
    │           ├── client.ts  # Supabase browser client (legacy)
    │           └── server.ts  # Supabase SSR server client (legacy)
    ├── seed_channels.js       # DB seeding script (legacy)
    ├── seed_channels.sql      # SQL seed data (legacy)
    ├── seed_fix.js            # DB seed fix script (legacy)
    ├── lumina-dev.ps1         # PowerShell dev launcher
    ├── run-dev.bat            # Windows dev shortcut
    ├── next.config.ts         # Next.js config (remote image patterns)
    ├── tailwind.config.ts     # Tailwind design system config
    ├── tsconfig.json          # TypeScript config
    └── package.json           # Dependencies & scripts
```

## Current Features Implemented
1. **Homepage (Landing Page)**
   - Hero section com gradients e animações
   - **Hero Dinâmico:** Sorteia um canal aleatório a cada visita (client-side render) para evitar repetitividade
   - Carrossel horizontal de 8 canais populares (dados locais)
   - Design glassmorphism com dark mode

2. **Sistema de Adapters (Channel Pushing v2)**
   - **Registry centralizado** com mapeamento de canais para adapters
   - **4 adapters ativos:** RedeCanaisTV, MultiCanaisHD, BBB26Shop, YouTube
   - **Proxy fallback chain:** Direct → AllOrigins → Codetabs → CORSProxy.io
   - **Cache de scraping** (5 min TTL)
   - **Slug aliases** para resolução flexível de nomes de canais
   - **Execução paralela** de múltiplos adapters via `Promise.allSettled`

3. **8 Canais Registrados (Ordem de Exibição)**
   - Multishow (redecanaistv)
   - Paramount+ (redecanaistv)
   - Globo (redecanaistv)
   - Big Brother Brasil 26 (3 adapters: multicanaishd, redecanaistv, bbb26shop)
   - HBO (redecanaistv)
   - ESPN (redecanaistv)
   - SporTV (redecanaistv)
   - KBS World TV (youtube)

4. **Watch Page (/watch/[id])**
   - Player de vídeo HLS customizado com controles glassmorphism
   - Play/Pause, Volume slider, Playback speed (0.5x–2x)
   - Fullscreen + Modo Teatro
   - Auto-hide de controles (3s inatividade)
   - Proxy CORS automático para streams externos
   - Seletor de fontes de stream (StreamSelector)

5. **API Routes**
   - `GET /api/scrape-stream?channel=<slug>` — Scraping de streams ao vivo
   - `GET /api/proxy?url=<url>&referer=<ref>` — Proxy CORS para streams HLS

6. **Data Layer**
   - Catálogo local em `src/lib/channels.ts` (sem dependência de banco)
   - IDs são slugs que batem com o adapter registry

## Design System
- **Color Scheme:** Dark mode (HSL tokens via CSS custom properties)
- **Glassmorphism:** `bg-white/5 backdrop-blur-xl border-white/10`
- **Typography:** Inter (body) + Outfit (headings)
- **Accent:** Indigo (player controls, active states)
- **Background:** Radial gradients fixos (violet + cyan spots)

## Recent Changes (2026-05-02)
- ✅ Migrado catálogo de canais de Supabase para dados locais
- ✅ Removida seção "Filmes Recentes" (plataforma apenas de canais)
- ✅ `HeroSection` refatorado para ser totalmente dinâmico, sorteando canais de forma aleatória
- ✅ Sorteio de canal movido para client-side (evitando *Hydration Mismatch* do React e Dark Reader)
- ✅ Corrigido link do hero section (UUID → slug) e links de todos os canais
- ✅ Catálogo de canais reordenado: Multishow agora é o 1º canal, BBB 26 é o 4º
- ✅ Todos os 8 canais restaurados e funcionando com descrições exclusivas para o novo HeroSection dinâmico

## Work In Progress / Known TODOs
- [ ] README.md é o template padrão do `create-next-app` (não customizado)
- [ ] Sem testes automatizados (unit/e2e)
- [ ] Sem autenticação de usuário (acesso público)
- [ ] Sem PWA/Service Worker
- [ ] Sem SEO personalizado (meta description genérica)
- [ ] Scraping depende de disponibilidade das fontes externas (fragilidade inerente)
- [ ] Arquivos legados do Supabase podem ser removidos (types, utils, seeds, .env.local)
- [ ] `check_scrape.ts`, `verify.mjs`, `temp_html.txt`, `manifest_test.txt` são arquivos de debug não integrados

## Last Synced
`2026-05-02T21:02:00-03:00`
