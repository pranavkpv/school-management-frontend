import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type EntityFormDialogProps = {
  triggerLabel: string;
  title: string;
  description?: string;
  children: ReactNode;
  submitLabel?: string;
};

export function EntityFormDialog({
  triggerLabel,
  title,
  description,
  children,
  submitLabel = "Save",
}: EntityFormDialogProps) {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>{triggerLabel}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>
        <div className="space-y-4">{children}</div>
        <DialogFooter>
          <Button type="button">{submitLabel}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
