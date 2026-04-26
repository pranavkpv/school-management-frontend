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

import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue
} from "@/components/ui/select";

import { Loader2 } from "lucide-react";

import {
 AssignmentData,
 AssignmentPayload
} from "@/api/assignmentApi";

import { getClasses } from "@/api/classApi";
import { getTeachers } from "@/api/teacherApi";
import { getSubjects } from "@/api/subjectApi";

type ClassItem = {
 _id:string;
 className:string;
};

type TeacherItem = {
 _id:string;
 name:string;
};

type SubjectItem = {
 _id:string;
 name:string;
};

type Props = {
 open:boolean;
 onOpenChange:(open:boolean)=>void;
 editData?:AssignmentData | null;
 onSubmit:(payload:AssignmentPayload)=>Promise<void>;
};

export function AssignmentFormDialog({
 open,
 onOpenChange,
 editData,
 onSubmit
}:Props){

 const [classId,setClassId] =
 useState("");

 const [teacherId,setTeacherId] =
 useState("");

 const [subjectId,setSubjectId] =
 useState("");

 const [classes,setClasses] =
 useState<ClassItem[]>([]);

 const [teachers,setTeachers] =
 useState<TeacherItem[]>([]);

 const [subjects,setSubjects] =
 useState<SubjectItem[]>([]);

 const [loading,setLoading] =
 useState(false);

 const isEdit = !!editData;


 useEffect(()=>{

   if(!open) return;

   const init = async()=>{

     try{

      const [c,t,s] =
      await Promise.all([
        getClasses(),
        getTeachers(),
        getSubjects()
      ]);

      setClasses(c);
      setTeachers(t);
      setSubjects(s);

      // IMPORTANT:
      // Set selected ids AFTER options loaded
      setClassId(
        editData?.classId?._id || ""
      );

      setTeacherId(
        editData?.teacherId?._id || ""
      );

      setSubjectId(
        editData?.subjectId?._id || ""
      );

     }catch(err){
      console.error(err);
     }

   };

   init();

 },[open,editData]);


 const handleSave = async()=>{

   if(
      !classId ||
      !teacherId ||
      !subjectId
   ){
      return;
   }

   setLoading(true);

   try{

     await onSubmit({
       classId,
       teacherId,
       subjectId
     });

     onOpenChange(false);

   }finally{
     setLoading(false);
   }

 };


 return(
  <Dialog
   open={open}
   onOpenChange={onOpenChange}
  >

   <DialogContent className="bg-[#0a0a0a] text-white border-white/10">

    <DialogHeader>
      <DialogTitle>
       {
        isEdit
        ? "Edit Assignment"
        : "Add Assignment"
       }
      </DialogTitle>
    </DialogHeader>


    <div className="space-y-4">

      {/* CLASS */}

      <Select
       value={classId}
       onValueChange={(value)=>
         setClassId(value || "")
       }
      >

        <SelectTrigger>

          <SelectValue placeholder="Select class">
            {
             classes.find(
              c => c._id === classId
             )?.className
            }
          </SelectValue>

        </SelectTrigger>

        <SelectContent>

          {
           classes.map((c)=>(
            <SelectItem
             key={c._id}
             value={c._id}
            >
              {c.className}
            </SelectItem>
           ))
          }

        </SelectContent>

      </Select>


      {/* TEACHER */}

      <Select
       value={teacherId}
       onValueChange={(value)=>
         setTeacherId(value || "")
       }
      >

       <SelectTrigger>

         <SelectValue placeholder="Select teacher">
           {
            teachers.find(
             t => t._id === teacherId
            )?.name
           }
         </SelectValue>

       </SelectTrigger>

       <SelectContent>

        {
         teachers.map((t)=>(
          <SelectItem
           key={t._id}
           value={t._id}
          >
           {t.name}
          </SelectItem>
         ))
        }

       </SelectContent>

      </Select>


      {/* SUBJECT */}

      <Select
       value={subjectId}
       onValueChange={(value)=>
         setSubjectId(value || "")
       }
      >

       <SelectTrigger>

         <SelectValue placeholder="Select subject">
           {
            subjects.find(
             s => s._id === subjectId
            )?.name
           }
         </SelectValue>

       </SelectTrigger>

       <SelectContent>

        {
         subjects.map((s)=>(
          <SelectItem
           key={s._id}
           value={s._id}
          >
            {s.name}
          </SelectItem>
         ))
        }

       </SelectContent>

      </Select>

    </div>


    <DialogFooter>

      <Button
       variant="ghost"
       onClick={()=>
         onOpenChange(false)
       }
      >
        Cancel
      </Button>

      <Button
       onClick={handleSave}
       disabled={loading}
      >
       {
        loading
        ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
            Saving...
          </>
        )
        : "Save"
       }
      </Button>

    </DialogFooter>

   </DialogContent>

  </Dialog>
 )

}