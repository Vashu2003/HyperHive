import React, { useEffect, useState } from "react";
import noteService from "../../services/noteService";
import NotesUploadModal from "./NotesUploadModal";
import { useAuth } from "../../context/AuthContext";
import { Download, Edit, Trash2 } from "lucide-react";

const NoteList = ({ groupId }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await noteService.getGroupNotes(groupId);
        setNotes(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load notes");
      } finally {
        setLoading(false);
      }
    };

    if (groupId) fetchNotes();
  }, [groupId]);

  const handleEdit = (note) => {
    setEditNote(note);
    setModalOpen(true);
  };

  const handleUpdate = async (formData) => {
    if (!editNote?._id) return;

    setSaving(true);
    setFormError("");

    try {
      const updated = await noteService.updateNote(editNote._id, formData);
      setNotes((prev) =>
        prev.map((n) => (n._id === editNote._id ? updated : n))
      );
    } catch (err) {
      console.error(err);
      setFormError("Update failed");
    } finally {
      setSaving(false);
      setEditNote(null);
    }
  };

  const handleDelete = async (noteId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmed) return;

    try {
      await noteService.deleteNote(noteId);
      setNotes((prev) => prev.filter((note) => note._id !== noteId));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (loading) return <p className="text-gray-500">Loading notes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (notes.length === 0)
    return (
      <p className="text-gray-400">No notes uploaded for this group yet.</p>
    );

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {notes.map((note) => (
          <div
            key={note._id}
            className="border border-border-dark dark:border-border-light rounded-xl p-4 bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark hover:bg-background-light dark:hover:bg-background-dark cursor-pointer transition-all duration-300 ease-in-out hover:shadow-md"
          >
            <h3 className="text-lg font-semibold font-mono">{note.title}</h3>
            <p className="text-sm text-gray-500 mb-2 font-mono">
              By: {note.createdBy?.name || "Unknown"}
            </p>
            <p className="text-sm mb-2 font-mono">{note.content?.substring(0, 100)}...</p>

            <div className="flex justify-end items-center space-x-2 mt-4">
              {note.fileUrl && (
                <a
                  href={note.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Download className="w-5 h-5" />
                </a>
              )}

              {user?._id === note.createdBy?._id && (
                <>
                  <button
                    onClick={() => handleEdit(note)}
                    className="text-yellow-500 hover:text-yellow-600"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <NotesUploadModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditNote(null);
          setFormError("");
        }}
        initialData={editNote}
        onSubmit={handleUpdate}
        loading={saving}
        error={formError}
      />
    </>
  );
};

export default NoteList;
