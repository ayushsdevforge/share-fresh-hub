import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function Profile() {
  const rating = 4.7;
  const totalShares = 23;
  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <Helmet>
        <title>Profile | Servana</title>
        <meta name="description" content="View user profile and trust rating on Servana." />
        <link rel="canonical" href="/profile/me" />
      </Helmet>
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-lg">
            <Star className="h-5 w-5 text-primary" />
            Trust rating: <span className="font-semibold">{rating.toFixed(1)} / 5</span>
          </div>
          <p className="text-muted-foreground">Community shares completed: {totalShares}</p>
        </CardContent>
      </Card>
    </main>
  );
}
