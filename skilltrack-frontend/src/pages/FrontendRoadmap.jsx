import { FaCheckCircle } from "react-icons/fa";

const FrontendRoadmap = () => {

  const roadmap = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Next.js",
    "TypeScript"
  ];

  return (

    <div className="text-gray-900 dark:text-gray-100">

      <h1 className="text-2xl font-bold mb-6">
        Frontend Development Roadmap
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {roadmap.map((skill, index) => (

          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex items-center gap-3"
          >

            <FaCheckCircle className="text-green-500"/>

            <span className="font-medium">
              {skill}
            </span>

          </div>

        ))}

      </div>

    </div>

  );

};

export default FrontendRoadmap;