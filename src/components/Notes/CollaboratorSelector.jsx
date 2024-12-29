import API from "../../utils/api";
import React, { useEffect, useState } from "react";
import Select from "react-select";

const CollaboratorSelector = ({ noteId, onCollaboratorsSelected }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await API.get("users/");
        setUsers(data.map((user) => ({ value: user._id, label: user.name })));
      } catch (err) {
        console.error(
          "Failed to fetch users:",
          err.response?.data?.error || err.message
        );
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (selectedOptions) => {
    setSelectedUsers(selectedOptions);
    onCollaboratorsSelected(selectedOptions);
  };

  return (
    <Select
      value={selectedUsers}
      onChange={handleChange}
      options={users}
      className="w-full"
      placeholder="Select collaborators..."
    />
  );
};

export default CollaboratorSelector;
