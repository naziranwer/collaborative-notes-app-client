import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "../components/Notes/Editor";
import API from "../utils/api";
import socket from "../utils/socket";
import { toast } from "react-toastify";
import CollaboratorSelector from "../components/Notes/CollaboratorSelector";

const NoteDetail = () => {
  const { noteId } = useParams(); // Access note ID from URL params
  const [note, setNote] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));

  // Fetch the note data when the component is mounted
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await API.get(`notes/${noteId}`);
        setNote(data);
      } catch (err) {
        console.error(
          "Failed to fetch note:",
          err.response?.data?.error || err.message
        );
      }
    };

    fetchNote();
  }, [noteId]);

  // Join the socket room for this note to receive updates
  useEffect(() => {
    if (noteId) {
      socket.on("connect", () => {
        // Log successful connection
      });

      socket.emit("joinNote", { noteId });

      // Listen for updates to the note content
      socket.on("noteUpdated", (updatedNote) => {
        setNote((prevNote) => ({ ...prevNote, content: updatedNote.content }));
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected"); // Debug on disconnect
      });
    }
  }, [noteId]);

  const canEdit =
    note &&
    (user._id === note.createdBy._id ||
      note.collaborators.some(
        (collaborator) =>
          collaborator.userId === user._id && collaborator.permission === "edit"
      ));
  // Handle updating the note content
  const handleNoteUpdate = (updatedContent) => {
    socket.emit("updateNote", {
      noteId,
      content: updatedContent,
      userId: user._id,
    });
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  const handleCollaboratorsSelected = (collaborators) => {
    setSelectedCollaborators(collaborators);
  };

  const handleAddCollaborators = async () => {
    try {
      const collaboratorIds = selectedCollaborators.value;
      await API.put(`/notes/${noteId}/collaborators`, {
        permission: selectedRole,
        collaboratorId: collaboratorIds,
      });
      toast.success("Collaborators added successfully!");
    } catch (err) {
      console.error(
        "Failed to add collaborators:",
        err.response?.data?.error || err.message
      );
      toast.error(err.response?.data?.error || "Failed to add collaborators.");
    }
  };

  const handleVersionSelect = (version) => {
    setSelectedVersion(version);
  };

  const handleRevertToVersion = async () => {
    if (!selectedVersion) return;

    try {
      await API.put(`/notes/${noteId}/revert/${selectedVersion}`);
      setNote((prevNote) => ({
        ...prevNote,
        content: selectedVersion.content,
      }));
      toast.success("Note reverted to selected version successfully!");
    } catch (err) {
      console.error(
        "Failed to revert to selected version:",
        err.response?.data?.error || err.message
      );
      toast.error("Failed to revert to selected version.");
    }
  };

  if (!note) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white p-6">
      <div className=" mx-auto bg-white p-8 rounded-lg ">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          {note.title}
        </h1>
        <div className="flex justify-between items-center ">
          <div className="p-4">
            <p>
              <span className="font-semibold">Created by: </span>{" "}
              {note.createdBy.name} on{" "}
              {new Date(note.createdAt).toLocaleString()}
            </p>
            <p>
              {" "}
              <span className="font-semibold">Last updated on :</span>{" "}
              {new Date(note.updatedAt).toLocaleString()}
            </p>
          </div>
          {showDropdown ? (
            <div className=" p-4">
              <CollaboratorSelector
                noteId={noteId}
                onCollaboratorsSelected={handleCollaboratorsSelected}
              />
              <div className="mt-4">
                <select
                  value={selectedRole}
                  onChange={(e) => handleRoleChange(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="view">Viewer</option>
                  <option value="edit">Editor</option>
                </select>
                <button
                  onClick={handleAddCollaborators}
                  className="mt-2 bg-button font-semibold text-white py-2 px-4 rounded-lg hover:bg-[#9b2426] transition duration-300"
                >
                  Add Collaborators
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <button
                onClick={() => setShowDropdown(true)}
                className="bg-button text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#9b2426] transition duration-300"
              >
                Add Colloaborator
              </button>
            </div>
          )}
        </div>
        <Editor
          canEdit={canEdit}
          content={note.content}
          onUpdate={handleNoteUpdate}
        />
        <div>
          <h2 className="text-xl font-semibold text-center text-gray-800 mt-4 mb-2">
            Version History
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {note.versionHistory.map((version, index) => (
              <div
                key={version._id}
                className="bg-gray-100 p-4 rounded-lg shadow-md relative group"
              >
                <p className="text-gray-800">
                  {new Date(version.timestamp).toLocaleString()}
                </p>
                <button
                  onClick={() => handleVersionSelect(index)}
                  className="text-blue-600 hover:underline"
                >
                  Select this version
                </button>
                <button
                  onClick={() => handleRevertToVersion(version)}
                  className="absolute top-6 right-2 bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition duration-300 opacity-0 group-hover:opacity-100"
                >
                  Revert to this Version
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
