import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";

const CompletedSkills = () => {

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetchCompletedSkills();
  }, []);

  const fetchCompletedSkills = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8080/api/employee/skills/dashboard/completed"
      );

      setSkills(res.data);

    } catch (error) {

      console.error("Error fetching completed skills:", error);

    }

  };

  return (

    <div className="p-2">

      <h1 className="text-3xl font-bold mb-8">
        Completed Skills
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {skills.map((skill) => (

          <div
            key={skill.id}
            className="bg-white shadow-lg rounded-xl p-6 border hover:shadow-xl transition"
          >

            <div className="flex justify-between items-center mb-4">

              <h2 className="text-xl font-semibold">
                {skill.skillName}
              </h2>

              <FaCheckCircle className="text-green-500 text-xl" />

            </div>

            <p className="text-gray-500 mb-3">
              Category: {skill.category}
            </p>

            <p className="text-gray-500 mb-3">
              Started: {skill.startDate}
            </p>

            <p className="text-gray-500 mb-3">
              Target: {skill.targetDate}
            </p>

            <div className="mt-4">

              <div className="flex justify-between mb-1 text-sm">

                <span>Progress</span>
                <span>100%</span>

              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">

                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{ width: "100%" }}
                ></div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default CompletedSkills;