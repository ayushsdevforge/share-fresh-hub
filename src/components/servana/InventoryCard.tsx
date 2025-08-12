import { daysUntil } from "@/pages/Listings";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type InventoryItem = {
  id: string;
  name: string;
  image: string;
  expiryDate: string; // YYYY-MM-DD
  quantity: number;
  category: string;
  trustRating: number; // 0-5
};

export default function InventoryCard({
  item,
  onSchedule,
  onReport,
}: {
  item: InventoryItem;
  onSchedule: () => void;
  onReport: () => void;
}) {
  const d = daysUntil(item.expiryDate);
  const status = d <= 1 ? "red" : d <= 3 ? "yellow" : "green";
  const statusCls =
    status === "red"
      ? "bg-destructive text-destructive-foreground"
      : status === "yellow"
      ? "bg-warning text-warning-foreground"
      : "bg-success text-success-foreground";

  const predicted = Math.max(0, d + (status === "green" ? 1 : status === "yellow" ? 0 : -1));

  return (
    <Card className="overflow-hidden">
      <img src={item.image} alt={`${item.name} listing photo`} className="h-40 w-full object-cover" />
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="truncate">{item.name}</CardTitle>
          <span className={`px-2 py-1 rounded text-xs ${statusCls}`}>{d} day{d !== 1 ? "s" : ""} left</span>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground space-y-1">
        <p>Quantity: <span className="text-foreground font-medium">{item.quantity}</span></p>
        <p>Category: {item.category}</p>
        <p>AI predicted freshness: <span className="text-foreground font-medium">~{predicted} day{predicted !== 1 ? "s" : ""}</span></p>
        <p>Trust rating: <span className="text-foreground font-medium">{item.trustRating.toFixed(1)} / 5</span></p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button onClick={onSchedule}>Schedule pickup</Button>
        <Button variant="outline" onClick={onReport}>Report</Button>
      </CardFooter>
    </Card>
  );
}
