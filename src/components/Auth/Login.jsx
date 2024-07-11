import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        data
      );
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      onLogin();
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <form
      className="border p-8 flex flex-col gap-4 rounded-lg shadow-md w-[600px] mt-8 mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="firstName" className="text-lg font-medium text-gray-800">
        First Name
      </label>
      <input
        type="text"
        id="firstName"
        {...register("firstName", { required: true })}
        className={`border p-2 rounded-md ${
          errors.firstName ? "border-red-500" : ""
        }`}
        placeholder="Enter your first name"
      />
      {errors.firstName && (
        <p className="text-red-500">First name is required</p>
      )}

      <label htmlFor="password" className="text-lg font-medium text-gray-800">
        Password
      </label>
      <input
        type="password"
        id="password"
        {...register("password", { required: true })}
        className={`border p-2 rounded-md ${
          errors.password ? "border-red-500" : ""
        }`}
        placeholder="Enter your password"
      />
      {errors.password && <p className="text-red-500">Password is required</p>}

      <div className="flex items-center gap-x-3">
        <p>Dont have an account?</p>
        <Link to="/" className="text-blue-600">
          Register
        </Link>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
