import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../component/Loader";
import { axiosInstance, endPoints } from "../api/axios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoader(true);
      try {
        const response = await axiosInstance.post(endPoints.auth.sendOtp, {
          email: email.trim().toLowerCase()
        });

        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/verify-otp", { state: { emailOrPhone: email.trim().toLowerCase() } });
        }
      } catch (error) {
        console.error("Error in OTP request:", error);
        const errorMessage = error.message || "Something went wrong. Please try again.";
        
        // Show more specific error messages
        if (errorMessage.includes("Email not found")) {
          toast.error("This email is not registered. Please check your email address or sign up.");
        } else if (errorMessage.includes("Too many attempts")) {
          toast.error("Please wait a few minutes before trying again.");
        } else {
          toast.error(errorMessage);
        }
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    <div className="w-full max-w-xs md:max-w-md lg:max-w-lg p-10 bg-white shadow rounded-md mx-auto border">
      <h2 className="text-3xl font-semibold mb-3 text-gray-800">Forgot Password</h2>
      <p className="text-[#4F4F4F] text-sm mb-4">
        Enter your email and we'll send you an OTP to reset your password.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-1"
            htmlFor="email"
          >
            Email <span className="text-[#E74C3C]">*</span>
          </label>
          <input
            type="email"
            id="email"
            className={`w-full px-4 py-2 border ${
              errors.email ? "border-[#E74C3C]" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-1 focus:ring-slate-600`}
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) validate();
            }}
            required
          />
          {errors.email && (
            <p className="text-[#E74C3C] text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full font-semibold py-2 mt-4 px-4 rounded-md ${
            loader ? "bg-gray-400" : "bg-[#4DC3AB] hover:bg-[#43b8a0]"
          } text-white transition-colors duration-200`}
          disabled={loader}
        >
          {!loader ? "Get OTP" : <Loader />}
        </button>

        <p className="mt-4 text-center text-gray-600">
          <Link to="/" className="text-red-500 hover:underline">
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgetPassword;
