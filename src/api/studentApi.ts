import { apiFetch } from "@/lib/api-client";

export type StudentData = {
  _id: string;
  name: string;

  classId: {
    _id: string;
    className: string;
  };
  userId:{
    _id:string;
    email:string
  }

  rollNumber: number;
  age: number;
  contactInfo: string;
};

export type StudentPayload = {
  name: string;
  classId: string;
  rollNumber: number;
  age: number;
  contactInfo: string;
  email: string;
};

type StudentResponse = {
  data: StudentData[];
  total: number;
  page: number;
  pages: number;
};

export async function getStudents(
 search = ""
): Promise<StudentResponse> {

 return apiFetch(
   `/admin/student?search=${search}`
 );
}

export async function createStudent(
 payload: StudentPayload
): Promise<StudentData>{

 return apiFetch(
   "/admin/student",
   {
    method:"POST",
    body:JSON.stringify(payload)
   }
 );
}

export async function updateStudent(
 id:string,
 payload:StudentPayload
):Promise<StudentData>{
  console.log(payload)

 return apiFetch(
   `/admin/student/${id}`,
   {
    method:"PATCH",
    body:JSON.stringify(payload)
   }
 );
}

export async function deleteStudent(
 id:string
){
 await apiFetch(
   `/admin/student/${id}`,
   {
     method:"DELETE"
   }
 );
}