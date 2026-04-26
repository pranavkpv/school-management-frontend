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
 SubjectData,
 SubjectPayload
} from "@/api/subjectApi";

type Props = {
 open:boolean;
 onOpenChange:(open:boolean)=>void;
 editData?:SubjectData | null;
 onSubmit:(payload:SubjectPayload)=>Promise<void>;
};

export function SubjectFormDialog({
 open,
 onOpenChange,
 editData,
 onSubmit
}:Props){

 const [name,setName] = useState("");
 const [loading,setLoading] = useState(false);
 const [error,setError] = useState<string | null>(null);

 const isEdit = !!editData;

 useEffect(()=>{
   if(open){
     setName(editData?.name ?? "");
     setError(null);
   }
 },[open,editData]);

 const handleSubmit = async(
   e:React.FormEvent
 )=>{
   e.preventDefault();

   if(!name.trim()){
     setError("Subject name required");
     return;
   }

   setLoading(true);

   try{
     await onSubmit({
       name:name.trim()
     });

     onOpenChange(false);

   }catch(err:any){
     setError(
       err.message || "Failed"
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
   <DialogContent className="border-white/10 bg-[#0a0a0a] text-white">

    <DialogHeader>
      <DialogTitle>
       {isEdit
         ? "Edit Subject"
         : "Add Subject"}
      </DialogTitle>
    </DialogHeader>

    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >

      <div>
        <Label>Subject Name</Label>
        <Input
         value={name}
         onChange={(e)=>
          setName(e.target.value)
         }
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm">
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
        ) : isEdit ? (
          "Update"
        ) : (
          "Create"
        )}
       </Button>

      </DialogFooter>

    </form>

   </DialogContent>
  </Dialog>
 )
}