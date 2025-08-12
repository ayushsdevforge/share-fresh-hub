import { InventoryItem } from "./InventoryCard";

export default function AlertsBanner({ items }: { items: InventoryItem[] }) {
  if (!items.length) return null;
  return (
    <aside className="rounded-md border bg-warning/10 p-3 text-sm">
      <strong className="text-warning">Expiry alert:</strong> {items.length} item{items.length !== 1 ? "s" : ""} expiring soon.
    </aside>
  );
}
