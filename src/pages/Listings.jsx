import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CameraCapture from "@/components/servana/CameraCapture";
import RecipeSuggestions from "@/components/servana/RecipeSuggestions";

export default function Listings() {
  const [items, setItems] = useState([]); // live user-added items only
  const [pendingImage, setPendingImage] = useState(null);
  const [newName, setNewName] = useState("");

  function handleAdd() {
    if (!pendingImage || !newName) return;
    const item = {
      id: Math.random().toString(36).slice(2),
      name: newName,
      image: pendingImage,
    };
    setItems((prev) => [item, ...prev]);
    setPendingImage(null);
    setNewName("");
  }

  return (
    <main className="container mx-auto px-4 py-6 space-y-6">
      <Helmet>
        <title>Live Food Post & AI Recipes | Servana</title>
        <meta name="description" content="Capture a live food photo and instantly get AI recipe suggestions based on your items." />
        <link rel="canonical" href="/listings" />
      </Helmet>

      <h1 className="text-3xl font-bold ">Live Photo & AI Recipe Suggestions</h1>

      <section id="capture" aria-labelledby="add-item" className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Live Photo Capture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {!pendingImage ? (
              <CameraCapture onCapture={(dataUrl) => setPendingImage(dataUrl)} />
            ) : (
              <div className="space-y-3">
                <img src={pendingImage} alt="Captured fresh food photo preview" className="w-full rounded-md" />
                <div className="grid gap-3 md:grid-cols-2">
                  <Input
                    placeholder="Item name (e.g., Bananas)"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    aria-label="Item name"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAdd}>Add for suggestions</Button>
                  <Button variant="outline" onClick={() => setPendingImage(null)}>Retake</Button>
                </div>
              </div>
            )}
            <p className="text-sm text-muted-foreground">Only live camera captures are allowed for safety and freshness verification.</p>
          </CardContent>
        </Card>

        <RecipeSuggestions items={items} />
      </section>
    </main>
  );
}

// Keep this utility exported for components that rely on it (e.g., InventoryCard)
export function daysUntil(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  return Math.ceil((d.getTime() - now.getTime()) / 86400000);
}
