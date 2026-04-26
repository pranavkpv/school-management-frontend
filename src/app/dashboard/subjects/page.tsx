"use client";

import { useEffect,useState,useCallback } from "react";

import {
 Plus,
 Pencil,
 Trash2,
 MoreHorizontal
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {
 DataTable,
 TableColumn
} from "@/components/shared/data-table";

import {
 PageHeader
} from "@/components/shared/page-header";

import {
 DeleteDialog
} from "@/components/shared/DeleteDialog";

import {
 SubjectFormDialog
} from "@/components/subject/SubjectFormDialog";

import {
 SubjectData,
 SubjectPayload,
 getSubjects,
 createSubject,
 updateSubject,
 deleteSubject
} from "@/api/subjectApi";

export default function SubjectsPage(){

 const [rows,setRows] =
 useState<SubjectData[]>([]);

 const [loading,setLoading] =
 useState(true);

 const [formOpen,setFormOpen] =
 useState(false);

 const [editTarget,setEditTarget] =
 useState<SubjectData | null>(null);

 const [deleteOpen,setDeleteOpen] =
 useState(false);

 const [deleteTarget,setDeleteTarget] =
 useState<SubjectData | null>(null);

 const fetchSubjects = useCallback(
 async()=>{
   setLoading(true);

   try{
    const data =
      await getSubjects();

    setRows(data);

   }finally{
    setLoading(false);
   }
 },[]
 );

 useEffect(()=>{
   fetchSubjects();
 },[fetchSubjects]);

 const handleAdd=()=>{
   setEditTarget(null);
   setFormOpen(true);
 };

 const handleEdit=(
   row:SubjectData
 )=>{
   setEditTarget(row);
   setFormOpen(true);
 };

 const handleDeleteClick=(
   row:SubjectData
 )=>{
   setDeleteTarget(row);
   setDeleteOpen(true);
 };

 const handleFormSubmit = async(
   payload:SubjectPayload
 )=>{

  if(editTarget){

   const updated =
    await updateSubject(
      editTarget._id,
      payload
    );

   setRows(prev=>
    prev.map(r=>
      r._id===updated._id
      ? updated
      : r
    )
   );

  }else{

   const created =
    await createSubject(payload);

   setRows(prev=>[
    ...prev,
    created
   ]);

  }

 };

 const handleConfirmDelete=
 async()=>{

  if(!deleteTarget) return;

  await deleteSubject(
    deleteTarget._id
  );

  setRows(prev=>
   prev.filter(
    r=>r._id!==deleteTarget._id
   )
  );
 };

 const columns:
 Array<TableColumn<SubjectData>> = [

 {
   key:"name",
   label:"Subject Name",
   render:(row)=>(
    <span className="font-medium text-white">
      {row.name}
    </span>
   )
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
       <MoreHorizontal className="h-4 w-4"/>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent
      align="end"
      className="border-white/10 bg-[#0d0d0d]"
    >

      <DropdownMenuItem
       onClick={()=>
        handleEdit(row)
       }
      >
       <Pencil className="mr-2 h-4 w-4"/>
       Edit
      </DropdownMenuItem>

      <DropdownMenuItem
       onClick={()=>
        handleDeleteClick(row)
       }
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
    title="Subjects"
    description="Manage subjects."
    action={{
      label:"Add Subject",
      onClick:handleAdd,
      icon:<Plus className="h-4 w-4"/>
    }}
   />

   <DataTable
    columns={columns}
    rows={rows}
    loading={loading}
    emptyText="No subjects yet."
   />

   <SubjectFormDialog
    open={formOpen}
    onOpenChange={setFormOpen}
    editData={editTarget}
    onSubmit={handleFormSubmit}
   />

   <DeleteDialog
    open={deleteOpen}
    onOpenChange={setDeleteOpen}
    itemName={
      deleteTarget?.name ?? ""
    }
    onConfirm={handleConfirmDelete}
   />

  </div>
 );
}