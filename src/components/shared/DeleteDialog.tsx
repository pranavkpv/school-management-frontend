"use client";

import { useState } from "react";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

type DeleteDialogProps = {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   itemName: string;
   onConfirm: () => Promise<void>;
};

export function DeleteDialog({
   open,
   onOpenChange,
   itemName,
   onConfirm,
}: DeleteDialogProps) {
   const [loading, setLoading] = useState(false);

   const handleConfirm = async () => {
      setLoading(true);
      try {
         await onConfirm();
         onOpenChange(false);
      } finally {
         setLoading(false);
      }
   };

   return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
         <AlertDialogContent className="border-white/10 bg-[#0a0a0a] text-white">
            <AlertDialogHeader>
               <AlertDialogTitle className="text-white">Delete Class</AlertDialogTitle>
               <AlertDialogDescription className="text-white/40">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-white">{itemName}</span>? This
                  action cannot be undone.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel
                  disabled={loading}
                  className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
               >
                  Cancel
               </AlertDialogCancel>
               <AlertDialogAction
                  disabled={loading}
                  onClick={handleConfirm}
                  className="bg-red-500 text-white hover:bg-red-600"
               >
                  {loading ? (
                     <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deleting…
                     </>
                  ) : (
                     "Delete"
                  )}
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}