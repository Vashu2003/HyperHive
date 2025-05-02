import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Plus, Search, Folder, Menu, X } from "lucide-react";
import { useGroups } from "../context/GroupContext";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const { groups, loading, error } = useGroups();

  const isActive = (groupId) => location.pathname.includes(`/groups/${groupId}`);

  // 🔍 Filter groups based on searchTerm
  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden p-3 text-muted-foreground hover:text-primary transition absolute top-3 left-4 z-50"
      >
        <Menu className="w-6 h-6" />
      </button>

      <aside
        className={`lg:w-64 w-80 fixed lg:relative top-0 left-0 h-full border-r border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark p-4 space-y-4 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 lg:block z-40`}
      >
        {/* Close (Mobile) */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 text-muted-foreground hover:text-primary transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 text-text-light dark:text-text-dark font-mono text-lg">
          <Folder className="w-5 h-5" />
          <span>Projects</span>
        </div>

        {/* Create Group */}
        <button className="w-full flex items-center gap-2 text-sm text-primary text-mono hover:underline transition font-mono">
          <Plus className="w-4 h-4" />
          Create Project
        </button>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full font-mono px-3 py-2 rounded-xl bg-muted-light dark:bg-muted-dark text-sm text-text-light dark:text-text-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground" />
        </div>

        {/* Group List */}
        <ul className="space-y-2">
          {loading && <li className="text-sm text-mono text-muted-foreground">Loading...</li>}
          {error && <li className="text-sm text-red-500">{error}</li>}
          {!loading && !error && filteredGroups.length === 0 && (
            <li className="text-sm text-muted-foreground">No matching projects.</li>
          )}
          {!loading &&
            !error &&
            filteredGroups.map((group) => (
              <li key={group._id}>
                <Link
                  to={`/groups/${group._id}`}
                  className={`block px-3 py-2 rounded-xl text-sm font-mono transition ${
                    isActive(group._id)
                      ? "bg-muted-light dark:bg-muted-dark text-primary"
                      : "text-text-light dark:text-text-dark hover:bg-muted-light/70 dark:hover:bg-muted-dark/70"
                  }`}
                >
                  {group.name}
                </Link>
              </li>
            ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
