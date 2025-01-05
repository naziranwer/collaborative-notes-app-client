import React, { useState, useEffect, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import API from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const InvitePage = () => {
  const { noteId, permission } = useParams();
  const { user } = useContext(AuthContext);
  const [note, setNote] = useState(null);
  const [isCollaborator, setIsCollaborator] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await API.get(`/notes/${noteId}`);
        setNote(data);

        const isCollaborator =
          data &&
          (user._id === data.createdBy._id ||
            data.collaborators.some(
              (collaborator) => collaborator.userId === user._id
            ));

        setIsCollaborator(isCollaborator);
      } catch (err) {
        console.error(
          "Failed to fetch note:",
          err.response?.data?.error || err.message
        );
      }
    };

    fetchNote();
  }, [noteId, user._id]);

  //   useEffect(() => {
  //     if (isCollaborator) {
  //       return <Navigate to={`/notes/${noteId}`} replace />;
  //     }
  //   }, [isCollaborator, noteId]);

  const handleAddCollaborators = async () => {
    try {
      await API.put(`/notes/${noteId}/invitation`, {
        permission: permission,
        collaboratorId: user._id,
      });
      toast.success("Collaborators added successfully!");
      setIsCollaborator(true);
    } catch (err) {
      console.error(
        "Failed to add collaborators:",
        err.response?.data?.error || err.message
      );
      toast.error("Failed to add collaborators.");
    }
  };

  if (isCollaborator) {
    return <Navigate to={`/notes/${noteId}`} replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Invitation to Collaborate</h2>
        <p className="mb-4">
          You have been invited to collaborate on this note.
        </p>
        <button
          onClick={handleAddCollaborators}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Accept Invitation
        </button>
      </div>
    </div>
  );
};

export default InvitePage;
