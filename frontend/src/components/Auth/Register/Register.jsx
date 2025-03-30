import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { TextInput } from "../TextInput";

const Register = () => {
  const navigate = useNavigate();
  const [confirmPass, setConfirmPass] = useState("");
  const initialErrors = {
    email: "",
    password: "",
  };
  const [errors, setErrors] = useState(initialErrors);
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const handleData = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((pre) => ({ ...pre, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (data.password !== confirmPass) {
      return;
    }

    try {
      setErrors(initialErrors);
      const sendingRequest = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await sendingRequest.json();
      console.log(res);

      if (!sendingRequest.ok) {
        setErrors(res.errors || initialErrors);
        console.log(res.errors);
        // toast.error("Something please try again")
        return;
      }

      toast.success(res.msg);
      navigate("/login");
    } catch (error) {
      console.log(`ERROR : ${error}`);
    }
  };

  return (
    <div className="block w-11/12 mx-auto p-6 mt-5">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Register
      </h5>
      <form onSubmit={submit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <TextInput
            label="First Name"
            error={errors.fname}
            name="fname"
            onChanage={handleData}
            placeholder="John"
            required={true}
            type="text"
            value={data.fname}
          />
          <TextInput
            label="Last Name"
            error={errors.lname}
            name="lname"
            onChanage={handleData}
            placeholder="doe"
            required={true}
            type="text"
            value={data.lname}
          />
        </div>
        <TextInput
          label="Email address"
          error={errors.email}
          name="email"
          onChanage={handleData}
          placeholder="john.doe@company.com"
          required={true}
          type="email"
          value={data.email}
        />
        <TextInput
          label="Password"
          error={errors.password}
          name="password"
          onChanage={handleData}
          placeholder="•••••••••"
          required={true}
          type="password"
          value={data.password}
        />
        {data.password !== confirmPass && (
          <p className="text-red-500">
            Password does not match with confirm password.
          </p>
        )}
        <TextInput
          label="Confirm password"
          name="confirm_password"
          onChanage={(e) => setConfirmPass(e.target.value)}
          placeholder="•••••••••"
          required={true}
          type="password"
          value={confirmPass}
        />

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
