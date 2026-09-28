import { Link, NavLink } from "react-router";

export function TopNav() {
  return (
    <header style={{ backgroundColor: "#3aac96" }} className="fixed top-0 left-0 right-0 z-50 border-b border-black/10 text-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/scc-logo.png"
            alt="SCC Logo"
            className="h-9 w-9 rounded-full object-cover bg-white"
          />
          <span className="hidden text-sm font-medium tracking-wide text-white sm:inline">
            The Future of Sustainability Consulting Workshop
          </span>
        </Link>
        <nav className="flex gap-1 bg-white/10 p-1 rounded-lg">
          <NavLink
            to="/frameworks"
            className={({ isActive }) =>
              `px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                isActive ? "bg-white text-[#3aac96]" : "text-white hover:bg-white/20"
              }`
            }
          >
            Overview
          </NavLink>
          <NavLink
            to="/case"
            className={({ isActive }) =>
              `px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                isActive ? "bg-white text-[#3aac96]" : "text-white hover:bg-white/20"
              }`
            }
          >
            Case Challenge
          </NavLink>
          <NavLink
            to="/assessment"
            className={({ isActive }) =>
              `px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                isActive ? "bg-white text-[#3aac96]" : "text-white hover:bg-white/20"
              }`
            }
          >
            Assessment
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

