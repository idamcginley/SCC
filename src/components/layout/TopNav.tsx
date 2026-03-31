import { Link } from "react-router";

export function TopNav() {
  return (
    <header style={{ backgroundColor: "#3aac96" }} className="fixed top-0 left-0 right-0 z-50 border-b border-black/10 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/scc-logo.png"
            alt="SCC Logo"
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="hidden text-xs font-medium tracking-wide text-white/80 sm:inline">
            The Future of Sustainability Consulting Workshop
          </span>
        </Link>
      </div>
    </header>
  );
}

