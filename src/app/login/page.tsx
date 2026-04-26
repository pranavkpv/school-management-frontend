"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, GraduationCap, Loader2, AlertCircle } from "lucide-react";
import { getDashboardRoute } from "@/lib/auth";
import { loginUser } from "@/api/authApi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Alert } from "@/components/ui/alert";


export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await loginUser({ email: email.trim(), password });
      if (data.success) {
        const role = data.role;
        router.push(getDashboardRoute(role));
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4">

      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(224,255,79,0.2) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 w-full max-w-sm">

        {/* Logo mark */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
            <GraduationCap className="h-6 w-6 text-[#e0ff4f]" />
          </div>
        </div>

        {/* shadcn Card */}
        <Card className="border-white/10 bg-white/[0.03] shadow-2xl backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl font-bold text-white">
              Welcome back
            </CardTitle>
            <CardDescription className="text-white/40">
              Sign in to your school account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4" noValidate>

              {/* Email */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-xs font-medium uppercase tracking-wider text-white/40"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="admin@school.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="border-white/10 bg-white/5 text-white placeholder:text-white/20 focus-visible:border-[#e0ff4f]/40 focus-visible:ring-[#e0ff4f]/20 disabled:opacity-50"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="password"
                  className="text-xs font-medium uppercase tracking-wider text-white/40"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="border-white/10 bg-white/5 pr-10 text-white placeholder:text-white/20 focus-visible:border-[#e0ff4f]/40 focus-visible:ring-[#e0ff4f]/20 disabled:opacity-50"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword((p) => !p)}
                    tabIndex={-1}
                    className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-white/30 hover:bg-transparent hover:text-white/60"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Error alert */}
              {error && (
                <Alert
                  variant="destructive"
                  className="border-red-500/20 bg-red-500/10 text-red-400 [&>svg]:text-red-400"
                >
                  <AlertCircle className="h-3.5 w-3.5" />
                  <p className="text-xs">
                    {error}
                  </p>
                </Alert>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="mt-1 w-full bg-[#e0ff4f] font-semibold text-black hover:bg-[#d4f040] hover:shadow-[0_0_20px_rgba(224,255,79,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in…
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="pt-0">
            <p className="w-full text-center text-xs text-white/20">
              Secure login · School Management System
            </p>
          </CardFooter>
        </Card>

        <p className="mt-6 text-center text-xs text-white/20">
          &copy; {new Date().getFullYear()} School Management System
        </p>
      </div>
    </div>
  );
}