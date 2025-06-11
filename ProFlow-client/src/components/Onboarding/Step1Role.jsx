import React, { useState } from "react";

const roles = [
    "Developer",
    "Software Engineer",
    "Project Manager",
    "Team Lead",
    "UI/UX Designer",
    "Graphic Designer",
    "Content Creator",
    "DevOps Engineer",
    "Marketing Manager",
    "Business Analyst",
    "Operations Manager",
    "Freelancer",
    "Student",
    "Other"
  ];
  
  
const Step1Role = ({ next, updateData }) => {
  const [selected, setSelected] = useState("");

  const handleNext = () => {
    if (selected) {
      updateData({ role: selected });
      next();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">What best describes you?</h2>
      <div className="grid grid-cols-2 gap-4">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => setSelected(role)}
            className={`border p-3 rounded-lg hover:shadow ${
              selected === role ? "border-purple-500 bg-purple-100" : ""
            }`}
          >
            {role}
          </button>
        ))}
      </div>
      <button
        className={`mt-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-900 ${selected? "bg-black hover:bg-gray-900" : "bg-gray-800 cursor-not-allowed"}`}
        onClick={handleNext}
        disabled={!selected}
      >
        Next
      </button>
    </div>
  );
};

export default Step1Role;
