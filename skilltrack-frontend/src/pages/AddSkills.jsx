import { useState } from "react";
import axios from "axios";
import { FaPlus, FaCode } from "react-icons/fa";

const AddSkill = () => {

  const [skillName, setSkillName] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [duration, setDuration] = useState("");

  const employeeId = Number(localStorage.getItem("employeeId"));

  const handleAddSkill = async (e) => {

    e.preventDefault();

    if (!skillName || !category || !level || !duration) {
      alert("Please fill all fields");
      return;
    }

    try {

      await axios.post(
        "http://localhost:8080/api/employee/skills/add",
        {
          employeeId,
          skillName,
          category,
          level,
          progressPercentage: 0,
          targetDurationDays: Number(duration)
        }
      );

      alert("Skill added successfully!");

      setSkillName("");
      setCategory("");
      setLevel("");
      setDuration("");

    } catch (error) {
      console.error(error);
      alert("Error adding skill");
    }

  };

  return (

    <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow text-gray-900 dark:text-gray-100">

      <div className="flex items-center gap-3 mb-6">

        <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 p-2 rounded-lg">
          <FaCode />
        </div>

        <h1 className="text-xl font-semibold">
          Add New Skill
        </h1>

      </div>

      <form onSubmit={handleAddSkill}>

        {/* Skill Name */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 dark:text-gray-300 font-medium">
            Skill Name
          </label>

          <input
            type="text"
            placeholder="Enter skill name"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            className="w-full mt-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 rounded outline-none focus:border-blue-500"
          />
        </div>

        {/* Category */}
        <div className="mb-4">

          <label className="text-sm text-gray-600 dark:text-gray-300 font-medium">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mt-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 rounded outline-none focus:border-blue-500"
          >

            <option value="">Select Category</option>
            <option value="Programming">Programming</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
            <option value="DevOps">DevOps</option>
            <option value="General">General</option>

          </select>

        </div>

        {/* Level */}
        <div className="mb-4">

          <label className="text-sm text-gray-600 dark:text-gray-300 font-medium">
            Level
          </label>

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full mt-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 rounded outline-none focus:border-blue-500"
          >

            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>

          </select>

        </div>

        {/* Duration */}
        <div className="mb-6">

          <label className="text-sm text-gray-600 dark:text-gray-300 font-medium">
            Target Duration (Days)
          </label>

          <input
            type="number"
            placeholder="Enter duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full mt-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 rounded outline-none focus:border-blue-500"
          />

        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >

          <FaPlus />
          Add Skill

        </button>

      </form>

    </div>

  );

};

export default AddSkill;