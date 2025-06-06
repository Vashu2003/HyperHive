import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Plus, Search, Folder, Menu, X } from "lucide-react";
import { useGroups } from "../context/GroupContext";
import { useAuth } from "../context/AuthContext";
import CreateGroupModal from "../components/CreateGroupModal";
import GuestRestrictionDialog from "../components/GuestRestrictionDialog";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showGuestDialog, setShowGuestDialog] = useState(false);
  const location = useLocation();
  const { groups, loading, error } = useGroups();
  const { isGuest } = useAuth();

  const isActive = (groupId) => location.pathname.includes(`/groups/${groupId}`);

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateClick = () => {
    if (isGuest) {
      setShowGuestDialog(true);
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden p-3 text-muted-light dark:text-muted-dark hover:text-primary transition absolute top-3 left-4 z-50"
        aria-label="Toggle sidebar"
      >
        <Menu className="w-6 h-6" />
      </button>

      <aside
        className={`lg:w-64 w-80 fixed lg:relative top-0 left-0 h-full border-r border-border-light dark:border-border-dark space-y-2 shadow-lg lg:shadow-none p-6 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 lg:block z-40`}
      >
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 text-muted-light dark:text-muted-dark hover:text-primary transition"
          aria-label="Close sidebar"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Logo / Title */}
        <div className="flex items-center gap-2 text-text-light dark:text-text-dark font-semibold tracking-wide uppercase text-xs select-none">
          <Folder className="w-5 h-5" />
          <span className="font-mono text-xl">Projects</span>
        </div>

        {/* Create Project */}
        <button
          onClick={handleCreateClick}
          className="w-full flex items-center gap-2 text-sm text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-hover-dark font-semibold tracking-wide transition"
          aria-label="Create project"
        >
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
            className="w-full font-mono px-3 py-2 rounded-2xl bg-muted-light dark:bg-muted-dark text-sm text-text-light dark:text-text-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
            aria-label="Search projects"
          />
          <Search className="absolute right-3 top-2.5 w-4 h-4 text-muted-light dark:text-muted-dark pointer-events-none" />
        </div>

        {/* Group List */}
        <ul className="space-y-2 overflow-y-auto max-h-[calc(100vh-300px)] pr-2 scrollbar-thin scrollbar-thumb-primary/60 scrollbar-track-muted-light/40 dark:scrollbar-thumb-primary-dark/70 dark:scrollbar-track-muted-dark/30">
          {loading && (
            <li className="text-sm font-mono text-muted-light dark:text-muted-dark">Loading...</li>
          )}
          {error && <li className="text-sm text-error dark:text-error-dark">{error}</li>}
          {!loading && !error && filteredGroups.length === 0 && (
            <li className="text-sm text-muted-light dark:text-muted-dark">No matching projects.</li>
          )}
          {!loading &&
            !error &&
            filteredGroups.map((group) => (
              <li key={group._id}>
                <Link
                  to={`/groups/${group._id}`}
                  className={`block px-3 py-2 rounded-2xl text-base font-mono transition ${
                    isActive(group._id)
                      ? "bg-primary dark:bg-primary-dark text-text-dark dark:text-text-light font-semibold"
                      : "text-text-light dark:text-text-dark hover:bg-muted-light/70 dark:hover:bg-muted-dark/60"
                  }`}
                >
                  {group.name}
                </Link>
              </li>
            ))}
        </ul>
      </aside>

      {/* Modals */}
      <CreateGroupModal isOpen={showModal} onClose={() => setShowModal(false)} />
      <GuestRestrictionDialog isOpen={showGuestDialog} onClose={() => setShowGuestDialog(false)} />
    </>
  );
};

export default Sidebar;
