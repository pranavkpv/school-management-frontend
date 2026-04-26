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
 Button
} from "@/components/ui/button";

import {
 Label
} from "@/components/ui/label";

import {
 StudentPayload,
 StudentData
} from "@/api/studentApi";

type ClassOption = {
 _id:string;
 className:string;
};

type Props = {
 open:boolean;
 onOpenChange:(v:boolean)=>void;
 editData?:StudentData|null;
 classes:ClassOption[];
 onSubmit:(
  payload:StudentPayload
 )=>Promise<void>;
};

export function StudentFormDialog({
 open,
 onOpenChange,
 editData,
 classes,
 onSubmit
}:Props){

const [form,setForm]=useState<StudentPayload>({
 name:"",
 classId:"",
 rollNumber:0,
 age:0,
 contactInfo:"",
 email:""
});

const [loading,setLoading]=useState(false);

useEffect(()=>{
 if(open && editData){
  setForm({
   name:editData.name,
   classId:editData.classId._id,
   rollNumber:editData.rollNumber,
   age:editData.age,
   contactInfo:editData.contactInfo,
   email:editData.userId.email
  });
 }

 if(open && !editData){
   setForm({
    name:"",
    classId:"",
    rollNumber:0,
    age:0,
    contactInfo:"",
    email:""
   });
 }

},[open,editData]);

const handleChange=(
 key:keyof StudentPayload,
 value:string
)=>{
 setForm(prev=>({
  ...prev,
  [key]:
   key==="rollNumber" ||
   key==="age"
   ? Number(value)
   : value
 }));
};

const handleSubmit=async(
 e:React.FormEvent
)=>{
 e.preventDefault();

 setLoading(true);

 try{
   await onSubmit(form);
   onOpenChange(false);
 }
 finally{
   setLoading(false);
 }
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
 "Edit Student":
 "Add Student"}
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
<Label>Class</Label>

<select
value={form.classId}
onChange={e=>
handleChange(
"classId",
e.target.value
)}
className="w-full border rounded p-2"
>
<option value="">
Select Class
</option>

{classes.map(c=>(
<option
key={c._id}
value={c._id}
>
{c.className}
</option>
))}
</select>

</div>

<Input
placeholder="Roll Number"
value={form.rollNumber}
onChange={e=>
handleChange(
"rollNumber",
e.target.value
)}
/>

<Input
placeholder="Age"
value={form.age}
onChange={e=>
handleChange(
"age",
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
<Button
type="submit"
disabled={loading}
>
Save
</Button>
</DialogFooter>

</form>

</DialogContent>
</Dialog>
);
}