import React, { useState } from "react";
import NotesUploadModal from "./NotesUploadModal";
import NoteList from "./NoteList";
import { Upload, NotebookPen } from "lucide-react";
const Notes = ({ groupId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleUploadNote = async (formData) => {
    formData.append("groupId", groupId);

    try {
      // lazy import so we don't load API until needed
      const noteService = (await import("../../services/noteService")).default;
      await noteService.createNote(formData);
      // Optionally: trigger a re-fetch here
    } catch (error) {
      console.error("Upload failed:", error.message);
      throw error;
    }
  };

  return (
    <div className="p-4 max-h-[540px]">
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold flex font-mono items-center gap-2 text-text-light dark:text-text-dark">
          <NotebookPen className="w-6 h-6 text-blue-500" />
            Notes
        </h2>
        <button
          onClick={handleOpenModal}
          className="p-2 border bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark rounded-lg hover:bg-muted-light/70 dark:hover:bg-muted-dark/70 transition"
        >
          <Upload className="w-5 h-5" color="currentColor" />
        </button>
      </div>

      {/* Upload Modal */}
      <NotesUploadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleUploadNote}
      />

      {/* Notes list will go here in future */}
      <NoteList groupId={groupId} />
    </div>
  );
};

export default Notes;
