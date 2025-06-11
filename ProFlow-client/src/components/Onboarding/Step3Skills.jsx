import React, { useState } from "react";
import { use } from "react";
import { Link, useNavigate } from "react-router-dom";

const allSkills = [
  "React",
  "Node.js",
  "Figma",
  "Python",
  "Java",
  "UI/UX",
  "C++",
  "MongoDB",
  "Cloud",
  "DevOps",
  "SQL",
  "Machine Learning"
];
const Step3Skills = ({ next, back, updateData }) => {
    const [selectedSkills, setSelectedSkills] = useState([]);
    const navigate= useNavigate();

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit=()=>{
    navigate("/dashboard");
  }


  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">What are your skills?</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {allSkills.map((skill) => (
          <button
            key={skill}
            onClick={() => toggleSkill(skill)}
            className={`px-3 py-2 rounded-full text-sm border border-purple-100 ${
              selectedSkills.includes(skill)
                ? "bg-purple-600 text-white"
                : "bg-purple-50 text-gray-800"
            }`}
          >
            {skill}
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={back} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Back</button>
        <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-900"
            >
            Get Started
        </button>
      </div>
    </div>
  );
};

export default Step3Skills;
