"use client";

import {
 useEffect,
 useState,
 useCallback
} from "react";

import {
 Plus,
 Pencil,
 Trash2
} from "lucide-react";

import {
 Button
} from "@/components/ui/button";

import {
 Input
} from "@/components/ui/input";

import {
 PageHeader
} from "@/components/shared/page-header";

import {
 DataTable,
 TableColumn
} from "@/components/shared/data-table";

import {
 DeleteDialog
} from "@/components/shared/DeleteDialog";

import {
 StudentFormDialog
} from "@/components/student/student-form-dialog";

import {
 getStudents,
 createStudent,
 updateStudent,
 deleteStudent,
 StudentData,
 StudentPayload
} from "@/api/studentApi";

import {
 getClasses
} from "@/api/classApi";

export default function StudentsPage(){

const [rows,setRows]=
useState<StudentData[]>([]);

const [classes,setClasses]=
useState<any[]>([]);

const [search,setSearch]=
useState("");

const [formOpen,setFormOpen]=
useState(false);

const [editTarget,setEditTarget]=
useState<StudentData|null>(null);

const [deleteOpen,setDeleteOpen]=
useState(false);

const [deleteTarget,setDeleteTarget]=
useState<StudentData|null>(null);

const fetchData=
useCallback(async()=>{

 const students=
 await getStudents(search);

 const cls=
 await getClasses();

 setRows(students.data);
 setClasses(cls);

},[search]);

useEffect(()=>{
 fetchData();
},[fetchData]);

const handleSubmit=async(
 payload:StudentPayload
)=>{
 if(editTarget){

 const updated=
 await updateStudent(
   editTarget._id,
   payload
 );

 setRows(prev=>
  prev.map(r=>
   r._id===updated._id
   ? updated
   : r
 ));

 }
 else{

 const created=
 await createStudent(
  payload
 );

 setRows(prev=>[
  ...prev,
  created
 ]);

 }
};

const handleDelete=
async()=>{
 if(!deleteTarget) return;

 await deleteStudent(
  deleteTarget._id
 );

 setRows(prev=>
 prev.filter(
  r=>r._id!==deleteTarget._id
 )
 );
};

const columns:
Array<TableColumn<StudentData>>=[
{
key:"name",
label:"Name"
},
{
key:"classId",
label:"Class",
render:(row)=>
 row.classId.className
},
{
key:"rollNumber",
label:"Roll"
},
{
key:"age",
label:"Age"
},
{
key:"contactInfo",
label:"Contact"
},
{
key:"actions",
label:"Actions",
render:(row)=>(
<div className="flex gap-2">

<Button
size="sm"
variant="outline"
onClick={()=>{
 setEditTarget(row);
 setFormOpen(true);
}}
>
<Pencil className="w-4 h-4"/>
</Button>

<Button
size="sm"
variant="destructive"
onClick={()=>{
 setDeleteTarget(row);
 setDeleteOpen(true);
}}
>
<Trash2 className="w-4 h-4"/>
</Button>

</div>
)
}
];

return(
<div className="space-y-6">

<PageHeader
title="Students"
description="Manage students"
action={{
 label:"Add Student",
 onClick:()=>{
   setEditTarget(null);
   setFormOpen(true);
 },
 icon:<Plus/>
}}
/>

<div className="flex gap-2">
<Input
value={search}
onChange={e=>
setSearch(
e.target.value
)}
placeholder="Search"
/>

<Button
onClick={fetchData}
>
Search
</Button>
</div>

<DataTable
columns={columns}
rows={rows}
/>

<StudentFormDialog
open={formOpen}
onOpenChange={setFormOpen}
editData={editTarget}
classes={classes}
onSubmit={handleSubmit}
/>

<DeleteDialog
open={deleteOpen}
onOpenChange={setDeleteOpen}
itemName={deleteTarget?.name || ""}
onConfirm={handleDelete}
/>

</div>
);
}