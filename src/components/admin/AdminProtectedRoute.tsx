import { Navigate } from "react-router-dom";
import { useAdminSession, ADMIN_EMAIL } from "@/hooks/useAdmin";

export default function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, isAdmin, loading } = useAdminSession();
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }
  if (!session || session.user.email?.toLowerCase() !== ADMIN_EMAIL || !isAdmin) {
    return <Navigate to="/admin" replace />;
  }
  return <>{children}</>;
}