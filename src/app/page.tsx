import { HeroSection } from "@/components/HeroSection";
import { ChannelCard } from "@/components/ChannelCard";
import { ChannelCarousel } from "@/components/ChannelCarousel";
import Link from "next/link";
import { getAllChannels } from "@/lib/channels";

export default function Home() {
  const channels = getAllChannels();

  return (
    <div className="min-h-screen pb-20">
      <HeroSection />

      {/* Channel Categories */}
      <div className="relative z-20 space-y-12 px-6 md:px-12 mt-4">

        {/* Section: Live Channels */}
        <section>
          <ChannelCarousel title="Canais Populares">
            {channels.map((channel) => (
              <Link key={channel.id} href={`/watch/${channel.id}`}>
                <ChannelCard
                  name={channel.name}
                  category={channel.category}
                  viewers={channel.viewers}
                  image={channel.logo_url || "/canais/bbb-16.png"}
                />
              </Link>
            ))}
          </ChannelCarousel>
        </section>

      </div>
    </div>
  );
}
