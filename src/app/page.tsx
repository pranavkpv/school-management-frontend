"use client";

import Link from "next/link";
import { GraduationCap, ArrowRight, Shield, Users, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-4">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow blob */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(224,255,79,0.4) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 text-center">
        {/* Badge */}
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-widest text-white/50 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-[#e0ff4f]" />
          School Management System
        </div>

        {/* Logo mark */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
          <GraduationCap className="h-8 w-8 text-[#e0ff4f]" />
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Manage Your
            <br />
            <span className="text-[#e0ff4f]">School Smarter</span>
          </h1>
          <p className="mx-auto max-w-md text-base text-white/40">
            A unified platform for admins, teachers, and students. Streamline everything from attendance to academics.
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { icon: Shield, label: "Admin Control" },
            { icon: Users, label: "Teacher Portal" },
            { icon: BookOpen, label: "Student Hub" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/60"
            >
              <Icon className="h-3.5 w-3.5 text-[#e0ff4f]" />
              {label}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/login"
            className="group flex items-center gap-2 rounded-xl bg-[#e0ff4f] px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-[#d4f040] hover:shadow-[0_0_30px_rgba(224,255,79,0.3)]"
          >
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/login"
            className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/70 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}