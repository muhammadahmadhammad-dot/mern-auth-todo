import React, { useEffect,useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../../contexts/AuthContext";

const Profile = () => {
  const { isAuthenticated, logout, authUser } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated,navigate]);

  return (
    <div className="w-9/12 mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {authUser?.fname} {authUser?.lname} Wellcome to our website
        </h5>
      </a>
      {isAuthenticated ? (
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <button onClick={logout} className="bg-red-500 text-white px-3 py-2">
            Logout
          </button>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero, quod
          adipisci deserunt enim omnis veniam ipsum expedita? Laudantium est
          ipsum cum atque sint magnam ullam cupiditate quae iure! Dolorem,
          sequi!
        </p>
      ) : (
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <p className="bg-red-500 text-white px-3 py-2">Please Login!</p>
        </p>
      )}
    </div>
  );
};

export default Profile;
