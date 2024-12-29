import { useNavigate } from "react-router-dom";

const NotesList = ({ notes, onEditNote, onDeleteNote }) => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Your Notes
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes?.map((note) => (
          <div key={note._id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {note.title}
            </h2>
            <div className="flex justify-between items-center py-2">
              <button
                onClick={() => navigate(`/notes/${note._id}`)}
                className="bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-700 transition duration-300 mb-2"
              >
                Open In Editor
              </button>
              <div className="flex justify-between space-x-2">
                <button onClick={() => onEditNote(note)}>Edit</button>
                <button onClick={() => onDeleteNote(note._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesList;
