import { Outlet, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
     <header>
       <Navbar />
     </header>

      <main className="flex-grow p-4">
        <Outlet />
      </main>

      <footer className="bg-gray-100 text-center py-3 text-sm">
        © {new Date().getFullYear()} Mi Sitio
      </footer>
    </div>
  );
}
