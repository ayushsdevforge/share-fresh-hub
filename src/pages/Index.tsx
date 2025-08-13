import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

export default function Index() {
  return (
    <main>
      <Helmet>
        <title>Servana – Smart Food Sharing & Waste Reduction</title>
        <meta name="description" content="Servana helps communities share fresh food safely. Discover listings, capture live photos, and reduce waste together." />
        <link rel="canonical" href="/" />
      </Helmet>

      <section className="container mx-auto grid min-h-[90vh] place-items-center px-4">
        <div className="max-w-2xl text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Share Fresh. Build Trust. Reduce Waste.
          </h1>
          <p className="mt-4 text-muted-foreground text-lg">
            Servana is a community-driven platform to share surplus food with
            verified profiles, AI recipe ideas, and live photo capture.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <NavLink to="/listings">
              <Button size="lg">Browse Listings</Button>
            </NavLink>
            <NavLink to="/auth/signup">
              <Button size="lg" variant="outline">Join the community</Button>
            </NavLink>
          </div>
        </div>
      </section>
    </main>
  );
}
