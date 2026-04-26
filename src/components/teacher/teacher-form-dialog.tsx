"use client";

import {
 useState,
 useEffect
} from "react";

import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogFooter
} from "@/components/ui/dialog";

import {
 Input
} from "@/components/ui/input";

import {
 Label
} from "@/components/ui/label";

import {
 Button
} from "@/components/ui/button";

import {
 TeacherPayload,
 TeacherData
} from "@/api/teacherApi";

type SubjectOption = {
 _id:string;
 name:string;
};

type Props = {
 open:boolean;
 onOpenChange:(v:boolean)=>void;
 editData?:TeacherData|null;
 subjects:SubjectOption[];
 onSubmit:(
  payload:TeacherPayload
 )=>Promise<void>;
};

export function TeacherFormDialog({
 open,
 onOpenChange,
 editData,
 subjects,
 onSubmit
}:Props){

const [form,setForm]=
useState<TeacherPayload>({
 name:"",
 subjectId:"",
 experience:0,
 contactInfo:"",
 email:""
});

useEffect(()=>{

 if(open && editData){
  setForm({
   name:editData.name,
   subjectId:
    editData.subjectId._id,
   experience:
    editData.experience,
   contactInfo:
    editData.contactInfo,
   email:editData.userId.email
  });
 }

 if(open && !editData){
  setForm({
   name:"",
   subjectId:"",
   experience:0,
   contactInfo:"",
   email:""
  });
 }

},[open,editData]);

const handleChange=(
 key:keyof TeacherPayload,
 value:string
)=>{
 setForm(prev=>({
  ...prev,
  [key]:
   key==="experience"
   ? Number(value)
   : value
 }));
};

const handleSubmit=
async(
e:React.FormEvent
)=>{
 e.preventDefault();

 await onSubmit(form);

 onOpenChange(false);
};

return(
<Dialog
open={open}
onOpenChange={onOpenChange}
>
<DialogContent>

<DialogHeader>
<DialogTitle>
{editData ?
 "Edit Teacher"
 :
 "Add Teacher"}
</DialogTitle>
</DialogHeader>

<form
onSubmit={handleSubmit}
className="space-y-4"
>

<div>
<Label>Name</Label>
<Input
value={form.name}
onChange={e=>
handleChange(
"name",
e.target.value
)}
/>
</div>

<div>
<Label>Subject</Label>

<select
value={form.subjectId}
onChange={e=>
handleChange(
"subjectId",
e.target.value
)}
className="w-full border rounded p-2"
>

<option value="">
Select Subject
</option>

{subjects.map(s=>(
<option
key={s._id}
value={s._id}
>
{s.name}
</option>
))}

</select>

</div>

<Input
placeholder="Experience"
value={form.experience}
onChange={e=>
handleChange(
"experience",
e.target.value
)}
/>

<Input
placeholder="Contact"
value={form.contactInfo}
onChange={e=>
handleChange(
"contactInfo",
e.target.value
)}
/>

<Input
placeholder="Email"
value={form.email}
onChange={e=>
handleChange(
"email",
e.target.value
)}
/>

<DialogFooter>
<Button type="submit">
Save
</Button>
</DialogFooter>

</form>

</DialogContent>
</Dialog>
);
}