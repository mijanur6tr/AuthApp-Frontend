import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ContextStore } from "../context/contextStore";

export const SignUp = () => {

  const { url, setToken, login} = useContext(ContextStore)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },

  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(url + "/api/user/signup", data);
      if (res.data.success) {
        setToken(res.data.token)
        localStorage.setItem("token", res.data.token);
        toast.success("Signup successful and logged in automatically!");
        navigate("/")
      } else {
        toast.error(res.data.message || "Signup failed");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 ">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-8 mt-5">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Create an Account</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your full name"
              {...register("fullName", { required: "Full name is required" })}
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="example@mail.com"
              {...register("email")}
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your phone number"
              {...register("phoneNumber", { required: "Phone number is required" })}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter a strong password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>

          <p className="text-sm text-center text-gray-600 mt-3">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} className="text-blue-500 hover:underline cursor-pointer">Sign in</span>
          </p>
        </form>

       
        <div className="pt-4">

          <div className="flex items-center gap-2 mb-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
          <button
            onClick={() => login()}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md py-2 px-4 hover:shadow-md transition duration-200 bg-white text-gray-700 font-medium"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </div>


      </div>
    </div>
  );
};
