import { useEffect, useState } from "react";
import NotesList from "../components/Notes/NotesList";
import NoteCreator from "../components/Notes/NoteCreator";
import API from "../utils/api";
import Modal from "../components/Modal";
import { toast } from "react-toastify";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  const handleNoteCreated = (newNote) => {
    setNotes((prevNotes) => {
      const noteIndex = prevNotes.findIndex((note) => note._id === newNote._id);
      if (noteIndex !== -1) {
        // Update existing note
        const updatedNotes = [...prevNotes];
        updatedNotes[noteIndex] = newNote;
        return updatedNotes;
      } else {
        // Add new note
        return [...prevNotes, newNote];
      }
    });
    setIsModalOpen(false);
    toast.success("Note saved successfully!");
  };

  const handleEditNote = (note) => {
    setCurrentNote(note);
    setIsModalOpen(true);
  };

  const handleAddNote = () => {
    setCurrentNote(null);
    setIsModalOpen(true);
  };
  const handleDeleteNote = async (noteId) => {
    try {
      await API.delete(`/notes/${noteId}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
      toast.success("Note deleted successfully!");
    } catch (err) {
      console.error(
        "Failed to delete note:",
        err.response?.data?.error || err.message
      );
      toast.error(`${err.message} - Failed to delete note`);
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await API.get("notes");
        setNotes(data);
      } catch (err) {
        console.error(
          "Failed to fetch notes:",
          err.response?.data?.error || err.message
        );
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-0">
      <div className="w-full mx-auto bg-white p-8 shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Welcome to PeerNotes
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Create and manage your notes collaboratively.
        </p>
        <div className="mb-8 text-center">
          <button
            onClick={handleAddNote}
            className="bg-button text-white font-semibold p-4 rounded-full hover:bg-[#9b2426] transition duration-300 w-20 h-20"
          >
            Add Note
          </button>
        </div>
        <NotesList
          notes={notes}
          onEditNote={handleEditNote}
          onDeleteNote={handleDeleteNote}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteCreator onNoteCreated={handleNoteCreated} note={currentNote} />
      </Modal>
    </div>
  );
};

export default Home;
