/**
 * Decodes a JWT token payload without verifying the signature.
 * Verification is done server-side; this is client-side role extraction only.
 */
export function decodeToken(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = parts[1];
    // Base64url → Base64
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function getRoleFromToken(token: string): string | null {
  const payload = decodeToken(token);
  if (!payload) return null;
  return (payload.role as string) || null;
}

export function getDashboardRoute(role: string): string {
  switch (role.toLowerCase()) {
    case "admin":
      return "/admin/dashboard";
    case "teacher":
      return "/teacher/dashboard";
    case "student":
      return "/student/dashboard";
    default:
      return "/login";
  }
}