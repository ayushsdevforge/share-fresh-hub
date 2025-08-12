import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InventoryItem } from "./InventoryCard";

export default function RecipeSuggestions({ items }: { items: InventoryItem[] }) {
  const ingredients = Array.from(new Set(items.flatMap((i) => i.name.split(" ")[0].toLowerCase())));
  const suggestions = generateMockRecipes(ingredients);

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Recipe Suggestions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {suggestions.map((s) => (
          <article key={s.title} className="rounded-md border p-3">
            <h3 className="font-medium">{s.title}</h3>
            <p className="text-muted-foreground">{s.desc}</p>
          </article>
        ))}
        {suggestions.length === 0 && (
          <p className="text-muted-foreground">Add items to see personalized recipes.</p>
        )}
      </CardContent>
    </Card>
  );
}

function generateMockRecipes(ingredients: string[]) {
  const base = [
    { title: "Tomato Bruschetta", desc: "Use ripe tomatoes, bread, and basil for a quick snack." },
    { title: "Banana Pancakes", desc: "Mash bananas with eggs and flour for fluffy pancakes." },
    { title: "Creamy Milk Porridge", desc: "Warm milk with oats and honey for comfort." },
  ];
  return base.filter((b) => ingredients.some((i) => b.title.toLowerCase().includes(i))).slice(0, 3);
}
