/**
 * Channel Catalog — Local Data Source
 * 
 * Catálogo local de canais. Substitui o Supabase como fonte de verdade
 * para o catálogo de canais (metadados de exibição).
 * 
 * O scraping dinâmico de fontes de transmissão continua via adapters.
 */

export interface Channel {
    id: string;
    name: string;
    category: string;
    logo_url: string;
    image_color: string;
    is_featured: boolean;
    viewers: number;
    description: string;
}

export const CHANNEL_CATALOG: Channel[] = [
    {
        id: "multishow",
        name: "Multishow",
        category: "Entretenimento",
        logo_url: "/canais/multishow.png",
        image_color: "#FF6B00",
        is_featured: false,
        viewers: 8000,
        description: "Diversão garantida com o melhor do humor, música ao vivo e programas de entretenimento no Multishow.",
    },
    {
        id: "paramount-plus",
        name: "Paramount+ Plus",
        category: "Streaming",
        logo_url: "/canais/paramount-plus.png",
        image_color: "#0064FF",
        is_featured: false,
        viewers: 12000,
        description: "Assista aos melhores filmes, séries exclusivas e conteúdos originais da Paramount+ ao vivo.",
    },
    {
        id: "globo",
        name: "Globo",
        category: "TV Aberta",
        logo_url: "/canais/globo.png",
        image_color: "#E21B1B",
        is_featured: true,
        viewers: 35000,
        description: "A programação completa da TV Globo ao vivo. Notícias, novelas, esportes e muito entretenimento para você.",
    },
    {
        id: "big-brother-brasil-26",
        name: "Big Brother Brasil 26",
        category: "Reality",
        logo_url: "/canais/bbb-16.png",
        image_color: "#FF8C00",
        is_featured: true,
        viewers: 45000,
        description: "Acompanhe a casa mais vigiada do Brasil 24 horas por dia. Câmeras exclusivas, festas e tudo o que rola no reality.",
    },
    {
        id: "hbo",
        name: "HBO",
        category: "Filmes & Séries",
        logo_url: "/canais/hbo.png",
        image_color: "#7B2D8E",
        is_featured: true,
        viewers: 18000,
        description: "Assista às séries premiadas, filmes de sucesso e produções originais incríveis com a qualidade HBO.",
    },
    {
        id: "espn",
        name: "ESPN",
        category: "Esportes",
        logo_url: "/canais/espn.png",
        image_color: "#CC0000",
        is_featured: false,
        viewers: 22000,
        description: "Acompanhe os principais campeonatos do mundo, análises esportivas e jogos ao vivo na ESPN.",
    },
    {
        id: "sportv",
        name: "SporTV",
        category: "Esportes",
        logo_url: "/canais/sportv.png",
        image_color: "#00A859",
        is_featured: false,
        viewers: 15000,
        description: "O canal campeão. Cobertura completa do esporte brasileiro e internacional, com muito futebol ao vivo.",
    },
    {
        id: "kbs-world-tv",
        name: "KBS World TV",
        category: "Internacional",
        logo_url: "/canais/kbsworldtv.png",
        image_color: "#1A1A2E",
        is_featured: false,
        viewers: 5000,
        description: "Sua janela para a Coreia do Sul. K-dramas, programas de K-pop e entretenimento coreano 24 horas por dia.",
    },
];

/** Buscar todos os canais */
export function getAllChannels(): Channel[] {
    return CHANNEL_CATALOG;
}

/** Buscar um canal por ID (slug) */
export function getChannelById(id: string): Channel | null {
    return CHANNEL_CATALOG.find(c => c.id === id) || null;
}

/** Buscar canais featured */
export function getFeaturedChannels(): Channel[] {
    return CHANNEL_CATALOG.filter(c => c.is_featured);
}
