import { Users, UserCheck, Building2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Overview of school operations." />

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard title="Total Students" value={0} hint="Wire to /dashboard/stats" icon={<Users className="size-4 text-muted-foreground" />} />
        <StatCard title="Total Teachers" value={0} hint="Wire to /dashboard/stats" icon={<UserCheck className="size-4 text-muted-foreground" />} />
        <StatCard title="Total Classes" value={0} hint="Wire to /dashboard/stats" icon={<Building2 className="size-4 text-muted-foreground" />} />
      </section>
    </div>
  );
}
