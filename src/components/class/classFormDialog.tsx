"use client";

import { useEffect, useState } from "react";
import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogFooter
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

import type {
 ClassData,
 ClassPayload
} from "@/api/classApi";

type Props = {
 open: boolean;
 onOpenChange: (open: boolean)=>void;
 editData?: ClassData | null;
 onSubmit: (payload: ClassPayload)=>Promise<void>;
};

export function ClassFormDialog({
 open,
 onOpenChange,
 editData,
 onSubmit
}: Props){

 const isEdit = !!editData;

 const [className,setClassName] = useState("");
 const [feesPerMonth,setFeesPerMonth] = useState("");
 const [startDate,setStartDate] = useState("");
 const [durationMonths,setDurationMonths] = useState("");

 const [loading,setLoading] = useState(false);
 const [error,setError] = useState<string | null>(null);

 useEffect(()=>{
   if(open){
     setClassName(editData?.className ?? "");
     setFeesPerMonth(
       editData?.feesPerMonth?.toString() ?? ""
     );

     setStartDate(
       editData?.startDate
         ? editData.startDate.slice(0,10)
         : ""
     );

     setDurationMonths(
       editData?.durationMonths?.toString() ?? ""
     );

     setError(null);
   }
 },[open,editData]);

 const handleSubmit = async(
   e:React.FormEvent
 )=>{
   e.preventDefault();

   if(
     !className ||
     !feesPerMonth ||
     !startDate ||
     !durationMonths
   ){
     setError("All fields required");
     return;
   }

   setLoading(true);

   try{

     await onSubmit({
       className: className.trim(),
       feesPerMonth: Number(feesPerMonth),
       startDate,
       durationMonths: Number(durationMonths)
     });

     onOpenChange(false);

   }catch(err:any){
     setError(
       err.message || "Something went wrong"
     );
   }finally{
     setLoading(false);
   }
 };

 return(
  <Dialog
    open={open}
    onOpenChange={onOpenChange}
  >
   <DialogContent className="border-white/10 bg-[#0a0a0a] text-white sm:max-w-md">

    <DialogHeader>
      <DialogTitle>
        {isEdit ? "Edit Class" : "Add Class"}
      </DialogTitle>
    </DialogHeader>

    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >

      <div>
        <Label>Class Name</Label>
        <Input
          value={className}
          onChange={(e)=>
            setClassName(e.target.value)
          }
        />
      </div>

      <div>
        <Label>Fees Per Month</Label>
        <Input
          type="number"
          value={feesPerMonth}
          onChange={(e)=>
            setFeesPerMonth(
              e.target.value
            )
          }
        />
      </div>

      <div>
        <Label>Start Date</Label>
        <Input
          type="date"
          value={startDate}
          onChange={(e)=>
            setStartDate(
              e.target.value
            )
          }
        />
      </div>

      <div>
        <Label>Duration (Months)</Label>
        <Input
          type="number"
          value={durationMonths}
          onChange={(e)=>
            setDurationMonths(
              e.target.value
            )
          }
        />
      </div>

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}

      <DialogFooter>

        <Button
         type="button"
         variant="ghost"
         onClick={()=>
          onOpenChange(false)
         }
        >
         Cancel
        </Button>

        <Button
         type="submit"
         disabled={loading}
         className="bg-[#e0ff4f] text-black"
        >
         {loading ? (
          <>
           <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
           Saving...
          </>
         ) : (
           isEdit
           ? "Update Class"
           : "Create Class"
         )}
        </Button>

      </DialogFooter>

    </form>

   </DialogContent>
  </Dialog>
 )
}