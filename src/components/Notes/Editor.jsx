import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

const Editor = ({ canEdit, content, onUpdate }) => {
  const [editorContent, setEditorContent] = useState(content);

  useEffect(() => {
    if (content !== editorContent) {
      setEditorContent(content);
    }
  }, [content]);

  const handleContentChange = (newContent) => {
    setEditorContent(newContent);
  };

  const handleSave = () => {
    onUpdate(editorContent);
    toast.success("Note saved successfully!");
  };

  return (
    <div className="mt-6">
      <ReactQuill
        value={editorContent}
        onChange={handleContentChange}
        readOnly={!canEdit}
        theme="snow"
        className="bg-white p-4  shadow-md"
      />
      {canEdit && (
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="bg-secondary font-semibold text-white py-2 px-4 rounded-lg hover:bg-primary transition duration-300"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Editor;
