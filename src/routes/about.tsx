import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — SkyLine Airways" }] }),
  component: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">About SkyLine Airways</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Founded with a vision to revolutionize air travel, SkyLine Airways connects millions of travelers to destinations worldwide with comfort, reliability, and elegance.
        </p>
      </main>
      <Footer />
    </div>
  ),
});
