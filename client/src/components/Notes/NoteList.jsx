import React from "react";
import { Download, Edit, Trash2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const NoteList = ({ notes, onEdit, onDelete, onUnauthorized }) => {
  const { user } = useAuth();

  if (!notes) return null;
  if (notes.length === 0)
    return (
      <p className="text-gray-400">
        No attachments uploaded for this group yet.
      </p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {notes.map((note) => (
        <div
          key={note._id}
          className="border border-border-dark dark:border-border-light rounded-xl p-4 bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark hover:bg-transparent dark:hover:bg-transparent cursor-pointer transition-all duration-300 ease-in-out hover:shadow-md"
        >
          <h3 className="text-lg font-semibold font-mono">{note.title}</h3>
          <p className="text-sm text-gray-500 mb-2 font-mono">
            By: {note.createdBy?.name || "Unknown"}
          </p>
          <p className="text-sm mb-2 font-mono">
            {note.content?.substring(0, 100)}...
          </p>

          <div className="flex justify-end items-center space-x-2 mt-4">
            {note.fileUrl && (
              <a
                href={note.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary dark:text-primary-dark hover:text-primary-hover dark:hover:text-primary-hover-dark"
              >
                <Download className="w-5 h-5" />
              </a>
            )}

            <>
              <button
                onClick={() => {
                  if (user?._id === note.createdBy?._id) {
                    onEdit(note);
                  } else {
                    onUnauthorized();
                  }
                }}
                className="text-yellow-500 hover:text-yellow-600"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  if (user?._id === note.createdBy?._id) {
                    onDelete(note._id);
                  } else {
                    onUnauthorized();
                  }
                }}
                className="text-error dark:text-error-dark hover:text-error-hover dark:hover:text-error-hover-dark"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
