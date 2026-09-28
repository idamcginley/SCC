import { Link, NavLink } from "react-router";

export function TopNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col shadow-sm">
      {/* Top Row: Logo & Title */}
      <div style={{ backgroundColor: "#115e59" }} className="px-6 py-4 lg:px-8 text-white flex items-center gap-4">
        <Link to="/" className="flex items-center gap-4">
          <img
            src="/scc-logo.png"
            alt="Logo"
            className="h-12 w-12 object-contain bg-transparent"
          />
          <h1 className="text-2xl font-semibold tracking-wide">
            Sustainability Reporting Case
          </h1>
        </Link>
      </div>

      {/* Bottom Row: Navigation Tabs */}
      <nav style={{ backgroundColor: "#86a79b" }} className="flex px-6 lg:px-8 py-3 gap-12 text-black font-semibold text-sm sm:text-base">
        <NavLink
          to="/frameworks"
          className={({ isActive }) =>
            `transition-colors hover:text-black/70 ${isActive ? "text-black" : "text-black/80"}`
          }
        >
          Sustainability Reporting Resources
        </NavLink>
        <NavLink
          to="/case"
          className={({ isActive }) =>
            `transition-colors hover:text-black/70 ${isActive ? "text-black" : "text-black/80"}`
          }
        >
          Case
        </NavLink>
        <NavLink
          to="/assessment"
          className={({ isActive }) =>
            `transition-colors hover:text-black/70 ${isActive ? "text-black" : "text-black/80"}`
          }
        >
          Case Questions
        </NavLink>
      </nav>
    </header>
  );
}

