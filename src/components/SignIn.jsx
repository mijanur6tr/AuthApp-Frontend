import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ContextStore } from "../context/contextStore";

export const SignIn = () => {
  const {setToken} = useContext(ContextStore)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    
  } = useForm();

  const onSubmit = async (data) => {
    
    try {
      console.log(data)
      const res = await axios.post("http://localhost:3000/api/user/login", data);
      console.log(res.data)
      if (res.data.success) {
        setToken(res.data.token)
        localStorage.setItem("token", res.data.token);
        navigate("/")
        toast.success("Signed in successfully!");
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error in log in");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-700">Sign In</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Identifier */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username / Email / Phone
            </label>
            <input
              placeholder="Enter username, email, or phone"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              {...register("identifier", { required: "Identifier is required" })}
            />
            {errors.identifier && (
              <p className="text-red-500 text-sm mt-1">{errors.identifier.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition duration-200"
          >
            Sign In
          </button>

          <p className="text-sm text-center text-gray-600 mt-3">
            Don't have an account?{" "}
            <span onClick={()=>navigate("/signup")} className="text-green-500 hover:underline cursor-pointer">Create One</span>
          </p>
        </form>
      </div>
    </div>
  );
};
