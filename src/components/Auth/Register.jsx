import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        data
      );
      console.log(response);
      toast.success(
        "User registered successfully! Check your email for the password."
      );
      reset();
    } catch (error) {
      console.error("Error registering user", error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <form
      className="border p-8 flex flex-col gap-3 rounded-lg shadow-md w-[600px] mt-8 mx-auto"
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

      <label htmlFor="lastName" className="text-lg font-medium text-gray-800">
        Last Name
      </label>
      <input
        type="text"
        id="lastName"
        {...register("lastName", { required: true })}
        className={`border p-2 rounded-md ${
          errors.lastName ? "border-red-500" : ""
        }`}
        placeholder="Enter your last name"
      />
      {errors.lastName && <p className="text-red-500">Last name is required</p>}

      <label htmlFor="email" className="text-lg font-medium text-gray-800">
        Email Address
      </label>
      <input
        type="email"
        id="email"
        {...register("email", { required: true })}
        className={`border p-2 rounded-md ${
          errors.email ? "border-red-500" : ""
        }`}
        placeholder="Enter your email address"
      />
      {errors.email && <p className="text-red-500">Email is required</p>}

      <label
        htmlFor="mobileNumber"
        className="text-lg font-medium text-gray-800"
      >
        Mobile Number
      </label>
      <input
        type="tel"
        id="mobileNumber"
        {...register("mobileNumber", { required: true })}
        className={`border p-2 rounded-md ${
          errors.mobileNumber ? "border-red-500" : ""
        }`}
        placeholder="Enter your mobile number"
      />
      {errors.mobileNumber && (
        <p className="text-red-500">Mobile number is required</p>
      )}

      <div className="flex items-center gap-x-3">
        <p>Already have an account?</p>
        <Link to="/login" className="text-blue-600">
          Login
        </Link>
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
