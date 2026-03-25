// Layout.tsx
import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/layout/sidebar";

export function Layout() {
  return (
    <div className="flex">
      <Sidebar />

      <main className="p-6 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}