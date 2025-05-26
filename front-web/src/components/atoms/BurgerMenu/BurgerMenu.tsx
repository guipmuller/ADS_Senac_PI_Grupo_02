import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.log("Erro ao fazer logout", error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 focus:outline-none group"
        aria-label="Menu"
      >
        <div className="w-6 flex flex-col items-end gap-1.5">
          <span
            className={`block h-0.5 bg-[#348a89] transition-all duration-300 ease-out ${
              isOpen
                ? "w-full rotate-45 translate-y-1.5"
                : "w-full group-hover:w-4/5"
            }`}
          ></span>
          <span
            className={`block h-0.5 bg-[#348a89] transition-all duration-200 ease-out ${
              isOpen ? "opacity-0" : "w-4/5 group-hover:w-full"
            }`}
          ></span>
          <span
            className={`block h-0.5 bg-[#348a89] transition-all duration-300 ease-out ${
              isOpen
                ? "w-full -rotate-45 -translate-y-1.5"
                : "w-3/5 group-hover:w-4/5"
            }`}
          ></span>
        </div>
      </button>

      {/* Overlay e Menu */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b">
          <h3 className="font-bold">Menu</h3>
        </div>
        <nav className="p-4">
          <Link
            href="/home"
            className="block py-3 border-b hover:text-[#2c7472]"
          >
            Home
          </Link>
          <Link
            href="/my-schedules"
            className="block py-3 border-b hover:text-[#2c7472]"
          >
            Meus agendamentos
          </Link>
            <button
              className="flex items-center p-4 w-full rounded-md mt-2 justify-center bg-black hover:bg-[#333] transition-colors duration-500 text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
        </nav>
      </div>
    </div>
  );
};

export default BurgerMenu;
