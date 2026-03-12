import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {

  const [employee, setEmployee] = useState(null);

  const employeeId = localStorage.getItem("employeeId"); 

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {

    try {

      const res = await axios.get(
        `http://localhost:8080/api/employee/${employeeId}`
      );

      setEmployee(res.data);
      

    } catch (error) {

      console.error(error);

    }

  };

  if (!employee) return <p>Loading...</p>;

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-8">
        My Profile
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-8 max-w-xl">

        <div className="flex items-center mb-6">

          <div className="w-16 h-16 bg-blue-600 text-white flex items-center justify-center rounded-full text-2xl font-bold">

            {employee.name.charAt(0)}

          </div>

          <div className="ml-4">

            <h2 className="text-xl font-semibold">
              {employee.name}
            </h2>

            <p className="text-gray-500">
              {employee.role}
            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 gap-4">

          <div>

            <p className="text-gray-500">Email</p>

            <p className="font-medium">
              {employee.email}
            </p>

          </div>

          <div>

            <p className="text-gray-500">Department</p>

            <p className="font-medium">
              {employee.department || "Not Assigned"}
            </p>

          </div>

          <div>

            <p className="text-gray-500">Role</p>

            <p className="font-medium">
              {employee.role}
            </p>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Profile;