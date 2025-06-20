import React, { useState, useEffect } from "react";
import NotesUploadModal from "./NotesUploadModal";
import NoteList from "./NoteList";
import { Upload, NotebookPen } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import GuestRestrictionDialog from "../GuestRestrictionDialog";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const Notes = ({ groupId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);
  const [modalError, setModalError] = useState("");
  const [showGuestDialog, setShowGuestDialog] = useState(false); // ✅ Dialog toggle
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);

  const { isGuest } = useAuth(); // ✅ Guest check

  const handleOpenModal = () => {
    if (isGuest) return setShowGuestDialog(true); // ✅ Restrict guest
    setEditNote(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditNote(null);
    setIsModalOpen(false);
    setModalError("");
  };

  const fetchNotes = async () => {
    try {
      const noteService = (await import("../../services/noteService")).default;
      const data = await noteService.getGroupNotes(groupId);
      setNotes(data);
    } catch (error) {
      console.error("Failed to fetch notes:", error.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [groupId]);

  const handleUnauthorized = () => setShowPermissionDialog(true);

  const handleUploadOrUpdate = async (formData) => {
    if (isGuest) return setShowGuestDialog(true); // ✅ Restrict guest

    const noteService = (await import("../../services/noteService")).default;
    setModalError("");

    try {
      if (editNote?._id) {
        const updated = await noteService.updateNote(editNote._id, formData);
        setNotes((prev) =>
          prev.map((n) => (n._id === updated._id ? updated : n))
        );
      } else {
        formData.append("groupId", groupId);
        await noteService.createNote(formData);
        await fetchNotes();
      }

      handleCloseModal();
    } catch (error) {
      console.error(error);
      setModalError("Failed to save note.");
    }
  };

  const handleEdit = (note) => {
    if (isGuest) return setShowGuestDialog(true); // ✅ Restrict guest
    setEditNote(note);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (isGuest) return setShowGuestDialog(true); // ✅ Restrict guest
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmed) return;

    try {
      const noteService = (await import("../../services/noteService")).default;
      await noteService.deleteNote(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="p-4 max-h-[540px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex font-mono items-center gap-2 text-text-light dark:text-text-dark">
          <NotebookPen className="w-6 h-6 text-primary dark:text-primary-dark" />
          Attachments
        </h2>
        <button
          onClick={handleOpenModal}
          className="p-2 bg-primary dark:bg-primary-dark text-text-dark dark:text-text-light rounded-lg hover:bg-primary/70 dark:hover:bg-primary-dark/70 transition"
        >
          <Upload className="w-5 h-5" color="currentColor" />
        </button>
      </div>

      <NotesUploadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleUploadOrUpdate}
        initialData={editNote}
        error={modalError}
      />

      <NoteList
        notes={notes}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onUnauthorized={handleUnauthorized}
      />

      <GuestRestrictionDialog
        isOpen={showGuestDialog}
        onClose={() => setShowGuestDialog(false)}
      />

      <AnimatePresence>
        {showPermissionDialog && (
          <>
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-60 flex items-center justify-center"
              onClick={() => setShowPermissionDialog(false)}
            >
              <div
                className="bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark p-6 rounded-2xl shadow-2xl w-full max-w-sm text-center space-y-5"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-semibold text-error font-mono select-none">
                  Permission Denied
                </h2>
                <p className="text-sm text-text-light dark:text-text-dark leading-relaxed font-mono select-none">
                  Only the <strong>owner</strong> of this attachment can edit or
                  delete it.
                </p>
                <button
                  onClick={() => setShowPermissionDialog(false)}
                  className="px-5 py-2 text-sm text-text-light dark:text-text-dark bg-muted-light dark:bg-muted-dark rounded-xl hover:bg-muted-light/70 dark:hover:bg-muted-dark/70 transition font-mono"
                  autoFocus
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notes;
