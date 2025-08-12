import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AlertsBanner from "@/components/servana/AlertsBanner";
import InventoryCard, { InventoryItem } from "@/components/servana/InventoryCard";
import CameraCapture from "@/components/servana/CameraCapture";
import ScheduleModal from "@/components/servana/ScheduleModal";
import ReportFeedbackModal from "@/components/servana/ReportFeedbackModal";
import RecipeSuggestions from "@/components/servana/RecipeSuggestions";
import placeholder from "/placeholder.svg";

const CATEGORIES = ["Fruits", "Vegetables", "Dairy", "Bakery", "Cooked", "Other"] as const;

type Category = typeof CATEGORIES[number];

export default function Listings() {
  const [items, setItems] = useState<InventoryItem[]>(() => initialMock());
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<string>("soonest");

  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [newQty, setNewQty] = useState<number>(1);
  const [newExpiry, setNewExpiry] = useState<string>("");
  const [newCategory, setNewCategory] = useState<Category>("Other");

  const [scheduleFor, setScheduleFor] = useState<InventoryItem | null>(null);
  const [reportFor, setReportFor] = useState<InventoryItem | null>(null);

  // Mock realtime updates
  useEffect(() => {
    const id = setInterval(() => {
      setItems((prev) =>
        prev.map((i) => (Math.random() < 0.08 && i.quantity > 0 ? { ...i, quantity: i.quantity - 1 } : i))
      );
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const filtered = useMemo(() => {
    let list = items.filter((i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase())
    );
    if (category !== "all") list = list.filter((i) => i.category === category);
    if (sort === "soonest") list = list.sort((a, b) => daysUntil(a.expiryDate) - daysUntil(b.expiryDate));
    if (sort === "quantity") list = list.sort((a, b) => b.quantity - a.quantity);
    return [...list];
  }, [items, search, category, sort]);

  const expiringSoon = items.filter((i) => daysUntil(i.expiryDate) <= 2 && i.quantity > 0);

  function handleAdd() {
    if (!pendingImage || !newName || !newExpiry) return;
    const item: InventoryItem = {
      id: Math.random().toString(36).slice(2),
      name: newName,
      image: pendingImage,
      expiryDate: newExpiry,
      quantity: newQty,
      category: newCategory,
      trustRating: 4.6,
    };
    setItems((prev) => [item, ...prev]);
    setPendingImage(null);
    setNewName("");
    setNewQty(1);
    setNewExpiry("");
    setNewCategory("Other");
    // In real app: upload to storage + realtime broadcast
  }

  return (
    <main className="container mx-auto px-4 py-6 space-y-6">
      <Helmet>
        <title>Servana Food Listings | Smart Food Sharing</title>
        <meta name="description" content="Browse fresh community-shared food with live photos, expiry indicators, and pickup coordination on Servana." />
        <link rel="canonical" href="/listings" />
      </Helmet>

      <h1 className="text-3xl font-bold">Available Food Listings</h1>

      <AlertsBanner items={expiringSoon} />

      <section aria-labelledby="filters" className="grid gap-3 md:grid-cols-3">
        <div className="md:col-span-1">
          <label htmlFor="search" className="sr-only">Search listings</label>
          <Input id="search" placeholder="Search by name or category" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-3">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="soonest">Expiry (Soonest)</SelectItem>
              <SelectItem value="quantity">Quantity (High→Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

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
                  <Input placeholder="Item name (e.g., Bananas)" value={newName} onChange={(e) => setNewName(e.target.value)} />
                  <Input type="number" min={1} value={newQty} onChange={(e) => setNewQty(Number(e.target.value))} placeholder="Quantity" />
                  <Input type="date" value={newExpiry} onChange={(e) => setNewExpiry(e.target.value)} aria-label="Expiry date" />
                  <Select value={newCategory} onValueChange={(v) => setNewCategory(v as Category)}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Category" /></SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAdd}>Add listing</Button>
                  <Button variant="outline" onClick={() => setPendingImage(null)}>Retake</Button>
                </div>
              </div>
            )}
            <p className="text-sm text-muted-foreground">Only live camera captures are allowed for safety and freshness verification.</p>
          </CardContent>
        </Card>

        <RecipeSuggestions items={items} />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <InventoryCard key={item.id} item={item} onSchedule={() => setScheduleFor(item)} onReport={() => setReportFor(item)} />
        ))}
        {filtered.length === 0 && (
          <p className="text-muted-foreground">No items match your criteria.</p>
        )}
      </section>

      <ScheduleModal
        open={!!scheduleFor}
        onOpenChange={(o) => !o && setScheduleFor(null)}
        item={scheduleFor}
        onConfirm={() => setScheduleFor(null)}
      />
      <ReportFeedbackModal
        open={!!reportFor}
        onOpenChange={(o) => !o && setReportFor(null)}
        item={reportFor}
        onSubmit={() => setReportFor(null)}
      />
    </main>
  );
}

function initialMock(): InventoryItem[] {
  const today = new Date();
  const plus = (d: number) => new Date(today.getTime() + d * 86400000).toISOString().slice(0, 10);
  return [
    { id: "1", name: "Tomatoes", image: placeholder, expiryDate: plus(2), quantity: 5, category: "Vegetables", trustRating: 4.8 },
    { id: "2", name: "Bananas", image: placeholder, expiryDate: plus(1), quantity: 8, category: "Fruits", trustRating: 4.5 },
    { id: "3", name: "Milk", image: placeholder, expiryDate: plus(4), quantity: 2, category: "Dairy", trustRating: 4.7 },
  ];
}

export function daysUntil(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  return Math.ceil((d.getTime() - now.getTime()) / 86400000);
}
