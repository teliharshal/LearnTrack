import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">

      {/* Title */}
      <h1 className="text-5xl font-bold text-indigo-600 mb-2">
        SkillTrack
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 mb-14 text-lg">
        Track employee skills and stay consistent.
      </p>

      {/* Cards */}
      <div className="flex gap-10">

        {/* Login Card */}
        <Link to="/login">
          <div className="w-72 p-6 bg-white rounded-xl border shadow-sm hover:shadow-lg transition cursor-pointer">

            <h2 className="text-xl font-semibold mb-3">
              Login →
            </h2>

            <p className="text-gray-500 text-sm">
              Access your dashboard and track your progress.
            </p>

          </div>
        </Link>

        {/* Register Card */}
        <Link to="/register">
          <div className="w-72 p-6 bg-white rounded-xl border shadow-sm hover:shadow-lg transition cursor-pointer">

            <h2 className="text-xl font-semibold mb-3">
              Register →
            </h2>

            <p className="text-gray-500 text-sm">
              Create a new account and start your journey.
            </p>

          </div>
        </Link>

      </div>

    </div>
  );
};

export default Home;