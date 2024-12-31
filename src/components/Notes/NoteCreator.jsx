import React, { useState, useEffect } from "react";
import API from "../../utils/api";

const NoteCreator = ({ onNoteCreated, note }) => {
  const [title, setTitle] = useState(note ? note.title : "");
  const [content, setContent] = useState(note ? note.content : "");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleCreateOrUpdateNote = async () => {
    setIsCreating(true);
    setError(null);
    try {
      if (note) {
        // Update existing note
        const { data } = await API.put(`/notes/${note._id}`, {
          title,
          content,
        });
        onNoteCreated(data);
      } else {
        // Create new note
        const { data } = await API.post("/notes", { title, content });
        onNoteCreated(data);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save note");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        {note ? "Edit Note" : "Create Note"}
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Content</label>
        <textarea
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        onClick={handleCreateOrUpdateNote}
        disabled={isCreating}
        className={`px-4 py-2 bg-button text-white font-semibold rounded-md ${
          isCreating ? "opacity-50 cursor-not-allowed" : "hover:bg-[#9b2426]"
        }`}
      >
        {isCreating
          ? note
            ? "Updating..."
            : "Creating..."
          : note
          ? "Update Note"
          : "Create Note"}
      </button>
    </div>
  );
};

export default NoteCreator;
