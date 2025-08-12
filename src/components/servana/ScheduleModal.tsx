import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { InventoryItem } from "./InventoryCard";
import { useState } from "react";

export default function ScheduleModal({
  open,
  onOpenChange,
  item,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: InventoryItem | null;
  onConfirm: () => void;
}) {
  const [datetime, setDatetime] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule pickup / drop-off</DialogTitle>
          <DialogDescription>
            Coordinate a safe and convenient time with the sharer.
          </DialogDescription>
        </DialogHeader>
        {item && (
          <div className="space-y-3">
            <Input type="datetime-local" value={datetime} onChange={(e) => setDatetime(e.target.value)} aria-label="Pickup date and time" />
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes (e.g., meet at lobby)" />
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
