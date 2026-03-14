import { useEffect, useState } from "react";
import axios from "axios";

const ConsistencyTracker = () => {

  const [records, setRecords] = useState([]);
  const employeeSkillId = 1; // later you can get dynamically

  useEffect(() => {
    fetchConsistency();
  }, []);

  const fetchConsistency = async () => {

    try {

      const res = await axios.get(
        `http://localhost:8080/api/consistency/${employeeSkillId}`
      );

      setRecords(res.data);

    } catch (error) {

      console.error("Error fetching consistency:", error);

    }

  };

  const markStudy = async () => {

    try {

      await axios.post(
        "http://localhost:8080/api/consistency/mark",
        {
          employeeSkillId: employeeSkillId,
          date: new Date().toISOString().split("T")[0],
          studied: true
        }
      );

      fetchConsistency();

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div className="p-6 text-gray-900 dark:text-gray-100">

      <h1 className="text-2xl font-bold mb-6">
        Consistency Tracker
      </h1>

      <button
        onClick={markStudy}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
      >
        Mark Studied Today
      </button>

      <div className="bg-white dark:bg-gray-800 rounded shadow p-6">

        <table className="w-full border border-gray-200 dark:border-gray-700">

          <thead className="bg-gray-100 dark:bg-gray-700">

            <tr>
              <th className="p-3 border border-gray-200 dark:border-gray-700">Date</th>
              <th className="p-3 border border-gray-200 dark:border-gray-700">Studied</th>
              <th className="p-3 border border-gray-200 dark:border-gray-700">Action</th>
            </tr>

          </thead>

          <tbody>

            {records.map((record) => (

              <tr key={record.id}>

                <td className="border border-gray-200 dark:border-gray-700 p-3">
                  {record.date}
                </td>

                <td className="border border-gray-200 dark:border-gray-700 p-3">

                  {record.studied ? (
                    <span className="text-green-600 font-semibold">
                      Yes
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      No
                    </span>
                  )}

                </td>

                <td className="border border-gray-200 dark:border-gray-700 p-3">

                  <button
                    onClick={async () => {

                      await axios.delete(
                        `http://localhost:8080/api/consistency/${record.id}`
                      );

                      fetchConsistency();

                    }}
                    className="text-red-500"
                  >
                    Delete

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default ConsistencyTracker;