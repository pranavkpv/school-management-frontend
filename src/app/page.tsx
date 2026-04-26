import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-semibold">School Management System</h1>
        <p className="text-muted-foreground">
          Next.js + shadcn frontend scaffold for the MERN machine test.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link className={buttonVariants()} href="/login">
            Go to Login
          </Link>
          <Link className={buttonVariants({ variant: "outline" })} href="/dashboard">
            Open Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
