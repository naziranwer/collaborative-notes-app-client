import React, { useCallback, useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";
import socket from "../../utils/socket";
import { AuthContext } from "../../context/AuthContext";
import Avatar from "../Avatar";

const Editor = ({ canEdit, content, onUpdate, activeUsers, noteId }) => {
  const [editorContent, setEditorContent] = useState(content);
  const [cursors, setCursors] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (content !== editorContent) {
      setEditorContent(content);
    }
  }, [content]);

  const debouncedUpdate = useCallback(
    debounce((newContent) => {
      onUpdate(newContent);
    }, 2000),
    []
  );

  const handleContentChange = (newContent) => {
    setEditorContent(newContent);
    debouncedUpdate(newContent);
  };

  const handleSave = () => {
    onUpdate(editorContent);
    toast.success("Note saved successfully!");
  };

  const handleCursorChange = (range) => {
    if (range) {
      socket.emit("cursorPosition", { noteId, userId: user._id, range });
    }
  };
  useEffect(() => {
    socket.on("cursorPosition", ({ userId, range }) => {
      setCursors((prevCursors) => ({
        ...prevCursors,
        [userId]: range,
      }));
    });

    return () => {
      socket.off("cursorPosition");
    };
  }, []);

  const uniqueActiveUsers = Array.from(
    new Set(activeUsers.map((user) => user.id))
  ).map((id) => activeUsers.find((user) => user.id === id));

  return (
    <div className="mt-6">
      <div className="flex justify-end items-center px-0 space-x-3">
        {uniqueActiveUsers.length && (
          <h3 className="text-lg font-semibold">Active Collaborators:</h3>
        )}
        <div className="flex ">
          {uniqueActiveUsers.slice(0, 3).map((user) => (
            <div key={user.id} className="text-gray-700">
              <Avatar name={user.name} />
            </div>
          ))}
          {uniqueActiveUsers.length > 3 && (
            <div className="text-gray-700 flex items-center justify-center bg-gray-800 text-white rounded-full w-10 h-10 font-bold">
              +{uniqueActiveUsers.length - 3}
            </div>
          )}
        </div>
      </div>
      <ReactQuill
        value={editorContent}
        onChange={handleContentChange}
        //onChangeSelection={handleCursorChange}
        readOnly={!canEdit}
        theme="snow"
        className="bg-white p-4  shadow-md"
      />
      {/* {Object.entries(cursors).map(([userId, range]) => (
        <div
          key={userId}
          style={{
            position: "absolute",
            top: range.index * 20, // Adjust based on your editor's line height
            left: range.index * 10, // Adjust based on your editor's character width
            backgroundColor: "yellow",
            padding: "2px 4px",
            borderRadius: "4px",
          }}
        >
          {activeUsers.find((user) => user.id === userId)?.name}
        </div>
      ))} */}
      {/* {canEdit && (
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="bg-secondary font-semibold text-white py-2 px-4 rounded-lg hover:bg-primary transition duration-300"
          >
            Save
          </button>
        </div>
      )} */}
    </div>
  );
};

export default Editor;
