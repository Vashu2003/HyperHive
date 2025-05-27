import React, { useState } from "react";
import { Download, Edit, Trash2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const NoteList = ({ notes, onEdit, onDelete }) => {
  const { user } = useAuth();
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);

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
          className="border border-border-dark dark:border-border-light rounded-xl p-4 bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark hover:bg-background-light dark:hover:bg-background-dark cursor-pointer transition-all duration-300 ease-in-out hover:shadow-md"
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
                className="text-blue-600 hover:text-blue-800"
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
                    setShowPermissionDialog(true);
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
                    setShowPermissionDialog(true);
                  }
                }}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>

              {showPermissionDialog && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
                  <div className="bg-muted-light dark:bg-muted-dark text-text-light dark:text-text-dark p-6 rounded-xl shadow-xl max-w-md text-center">
                    <h2 className="text-lg text-red-600 font-semibold mb-2 font-mono">
                      Permission Denied
                    </h2>
                    <p className="mb-4 font-mono">
                      Only the owner of this attachment can edit or delete it.
                    </p>
                    <button
                      onClick={() => setShowPermissionDialog(false)}
                      className="px-4 py-2 bg-muted-dark dark:bg-muted-light text-text-dark dark:text-text-light font-mono rounded-full hover:bg-background-dark dark:hover:bg-background-light transition"
                    >
                      Got it
                    </button>
                  </div>
                </div>
              )}
            </>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
