import React from "react";

const Avatar = ({ name }) => {
  const getInitials = (name) => {
    const names = name.split(" ");
    const initials = names.map((n) => n[0]).join("");
    return initials.toUpperCase();
  };

  return (
    <div
      title={name}
      className="bg-gray-800 cursor-pointer text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4"
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
