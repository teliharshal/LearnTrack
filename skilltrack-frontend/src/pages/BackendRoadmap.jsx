const BackendRoadmap = () => {

  const roadmap = [
    "Java",
    "Spring Boot",
    "REST API",
    "Microservices",
    "Docker",
    "System Design"
  ];

  return (

    <div className="text-gray-900 dark:text-gray-100">

      <h1 className="text-2xl font-bold mb-6">
        Backend Development Roadmap
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {roadmap.map((skill, index) => (

          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
          >

            {skill}

          </div>

        ))}

      </div>

    </div>

  );

};

export default BackendRoadmap;