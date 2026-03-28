import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/layout/sidebar";
import { MenuHamburger } from "./components/layout/menuHambuguer";

export function Layout() {
  return (
    <div className="flex min-h-screen">
      <MenuHamburger />
      
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <main className="flex-1 p-6 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}