"use client";

import {
 useEffect,
 useState,
 useCallback
} from "react";

import {
 Plus,
 Pencil,
 Trash2,
 MoreHorizontal
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
 DropdownMenu,
 DropdownMenuTrigger,
 DropdownMenuContent,
 DropdownMenuItem
} from "@/components/ui/dropdown-menu";

import {
 DataTable,
 TableColumn
} from "@/components/shared/data-table";

import { PageHeader }
from "@/components/shared/page-header";

import { DeleteDialog }
from "@/components/shared/DeleteDialog";

import {
 AssignmentData,
 AssignmentPayload,
 getAssignments,
 createAssignment,
 updateAssignment,
 deleteAssignment
} from "@/api/assignmentApi";
import { AssignmentFormDialog } from "@/components/assign/assignmentFormDialog";



export default function AssignmentPage(){

 const [rows,setRows] =
 useState<AssignmentData[]>([]);

 const [loading,setLoading] =
 useState(true);

 const [formOpen,setFormOpen] =
 useState(false);

 const [editTarget,setEditTarget] =
 useState<AssignmentData|null>(null);

 const [deleteOpen,setDeleteOpen] =
 useState(false);

 const [deleteTarget,setDeleteTarget] =
 useState<AssignmentData|null>(null);

 const fetchAssignments =
 useCallback(async()=>{

   setLoading(true);

   try{
      const data =
      await getAssignments();

      setRows(data);

   }finally{
      setLoading(false);
   }

 },[]);

 useEffect(()=>{
   fetchAssignments();
 },[fetchAssignments]);


 const handleSubmit =
 async(payload:AssignmentPayload)=>{

   if(editTarget){

     const updated =
     await updateAssignment(
       editTarget._id,
       payload
     );

     setRows(prev=>
      prev.map(item=>
       item._id===updated._id
       ? updated
       : item
      )
     );

   }else{

     const created =
     await createAssignment(payload);

     setRows(prev=>[
       ...prev,
       created
     ]);

   }

 };


 const handleDelete=
 async()=>{

   if(!deleteTarget)
    return;

   await deleteAssignment(
      deleteTarget._id
   );

   setRows(prev=>
     prev.filter(
       x=>x._id !== deleteTarget._id
     )
   );

 };


 const columns:
 Array<TableColumn<AssignmentData>> = [

   {
    key:"classId",
    label:"Class",
    render:(row)=>row.classId?.className
   },

   {
    key:"subjectId",
    label:"Subject",
    render:(row)=>row.subjectId?.name
   },

   {
    key:"teacherId",
    label:"Teacher",
    render:(row)=>row.teacherId?.name
   },

   {
    key:"actions",
    label:"",
    render:(row)=>(
      <DropdownMenu>

        <DropdownMenuTrigger>

          <Button
           variant="ghost"
           size="icon"
          >
            <MoreHorizontal/>
          </Button>

        </DropdownMenuTrigger>

        <DropdownMenuContent>

          <DropdownMenuItem
           onClick={()=>{
             setEditTarget(row);
             setFormOpen(true);
           }}
          >
            <Pencil className="mr-2 h-4 w-4"/>
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
           onClick={()=>{
             setDeleteTarget(row);
             setDeleteOpen(true);
           }}
          >
            <Trash2 className="mr-2 h-4 w-4"/>
            Delete
          </DropdownMenuItem>

        </DropdownMenuContent>

      </DropdownMenu>
    )
   }

 ];


 return(
  <div className="space-y-6 p-6">

    <PageHeader
      title="Assignments"
      description="Assign teacher and subject to classes"
      action={{
        label:"Add Assignment",
        onClick:()=>{
          setEditTarget(null);
          setFormOpen(true);
        },
        icon:<Plus className="h-4 w-4"/>
      }}
    />

    <DataTable
      columns={columns}
      rows={rows}
      loading={loading}
      emptyText="No assignments found"
    />

    <AssignmentFormDialog
      open={formOpen}
      onOpenChange={setFormOpen}
      editData={editTarget}
      onSubmit={handleSubmit}
    />

    <DeleteDialog
      open={deleteOpen}
      onOpenChange={setDeleteOpen}
      itemName={
        deleteTarget?.classId?.className || ""
      }
      onConfirm={handleDelete}
    />

  </div>
 )

}