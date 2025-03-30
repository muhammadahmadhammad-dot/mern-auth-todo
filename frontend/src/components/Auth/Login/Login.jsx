import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { TextInput } from "./../TextInput";

const Login = () => {
  const navigate = useNavigate();
  const initialErrors = {
    email: "",
    password: "",
  };

  const [error, setError] = useState(initialErrors)
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handelData = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((pre) => ({ ...pre, [name]: value }));
  };
  const handelForm = async (e) => {
    setError(initialErrors)
    e.preventDefault();

    console.log(data);
    try {
      const sending = await fetch("http://localhost:3000/api/login-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Sends cookies (needed for sessions & authentication).
        credentials: "include",
        body: JSON.stringify(data),
      });

      const res = await sending.json();
      console.log(res);

      if (!sending.ok) {
        setError(res.errors || initialErrors);
        toast.error(res.error);
        return;
      }

      console.log(sending);
      toast.success("Your are Login Successfully.");
      navigate("/");
    } catch (error) {
      console.log("error : " + error);
    }
  };
  return (
    <div className="block w-1/2 mx-auto p-6 mt-5">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Login
      </h5>
      <form onSubmit={handelForm}>
        <TextInput
          label=" Email address"
          error={error.email}
          name="email"
          onChanage={handelData}
          placeholder="john.doe@company.com"
          required={false}
          type="email"
          value={data.email}
        />
        <TextInput
          label="Password"
          error={error.password}
          name="password"
          onChanage={handelData}
          placeholder="•••••••••"
          required={false}
          type="password"
          value={data.password}
        />

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
