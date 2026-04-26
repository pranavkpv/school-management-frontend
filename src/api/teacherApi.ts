import { apiFetch } from "@/lib/api-client";

export type TeacherData = {
 _id:string;

 name:string;

 subjectId:{
   _id:string;
   name:string;
 };

 experience:number;

 contactInfo:string;

 userId:{
   _id:string;
   email:string;
 };
};

export type TeacherPayload = {
 name:string;
 subjectId:string;
 experience:number;
 contactInfo:string;
 email:string;
};

export async function getTeachers():
Promise<TeacherData[]>{

 return apiFetch(
  "/admin/teacher"
 );
}

export async function createTeacher(
 payload:TeacherPayload
):Promise<TeacherData>{

 return apiFetch(
  "/admin/teacher",
  {
   method:"POST",
   body:JSON.stringify(payload)
  }
 );
}

export async function updateTeacher(
 id:string,
 payload:TeacherPayload
):Promise<TeacherData>{

 return apiFetch(
  `/admin/teacher/${id}`,
  {
   method:"PATCH",
   body:JSON.stringify(payload)
  }
 );
}

export async function deleteTeacher(
 id:string
){
 await apiFetch(
  `/admin/teacher/${id}`,
  {
   method:"DELETE"
  }
 );
}