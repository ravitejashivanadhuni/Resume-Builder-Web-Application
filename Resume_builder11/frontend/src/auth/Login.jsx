import { signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider, githubProvider } from "../../firebase";
import eyeSlash from "../../public/assets/eye-slash.svg";
import eye from "../../public/assets/eye.svg";
import { axiosInstance, endPoints } from "../api/axios";
import Loader from "../component/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loader, setLoader] = useState(false);
  const [googleLoader, setGoogleLoader] = useState(false);
  const [githubLoader, setGithubLoader] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      try {
        setLoader(true);
        const { data } = await axiosInstance.post(
          endPoints.auth.login,
          { email, password },
          { withCredentials: true }
        );
        toast.success(data.message);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        const { role } = data.user;
        setLoader(false);
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "user") {
          navigate("/user");
        } else if (role === "recruiter") {
          navigate("/recruiter");
        }
      } catch (error) {
        setLoader(false);
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Something went wrong. Please try again.";
        toast.error(errorMessage);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoader(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const { data } = await axiosInstance.post(
        endPoints.auth.loginWithGoogle,
        { email: user.email, users: user },
        { withCredentials: true }
      );
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      const { role } = data.user;
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "user") {
        navigate("/user");
      } else if (role === "recruiter") {
        navigate("/recruiter");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setGoogleLoader(false);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setGithubLoader(true);
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;

      const { data } = await axiosInstance.post(
        endPoints.auth.loginWithGoogle, // Reusing the same endpoint since the structure is similar
        { email: user.email, users: user },
        { withCredentials: true }
      );
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      const { role } = data.user;
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "user") {
        navigate("/user");
      } else if (role === "recruiter") {
        navigate("/recruiter");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setGithubLoader(false);
    }
  };

  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-gray-500 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-[#4DC3AB] focus:outline-none"
        />
        {errors.email && <span className="text-red-500">{errors.email}</span>}
      </div>

      <div className="relative">
        <label htmlFor="password" className="block text-gray-500 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-[#4DC3AB] focus:outline-none pr-10"
          />
          <img
            src={showPassword ? eye : eyeSlash}
            alt="Toggle password visibility"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
          />
        </div>
        {errors.password && (
          <span className="text-red-500">{errors.password}</span>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="form-checkbox h-4 w-4 text-green-600 border-gray-300 rounded"
          />
          <label htmlFor="rememberMe" className="ml-2 text-gray-500">
            Remember me
          </label>
        </div>
        <Link to="/forgot-password" className="text-red-500">
          Forgot password?
        </Link>
      </div>

      <div className="space-y-4">
        <button
          type="button"
          onClick={handleLogin}
          className="w-full py-2 bg-[#4DC3AB] hover:bg-[#43b8a0] text-white rounded-lg"
          disabled={loader}
        >
          {!loader ? "Login" : <Loader />}
        </button>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full py-2 border flex justify-center items-center gap-3 border-[#4DC3AB] rounded-lg text-[#4DC3AB] hover:bg-gray-50"
          disabled={googleLoader}
        >
          {!googleLoader ? (
            <>
              <img
                src="/assets/google.svg"
                className="me-2"
                width={"25px"}
                alt="google"
                title="Google"
              />
              Login with Google
            </>
          ) : (
            <Loader />
          )}
        </button>

        <button
          type="button"
          onClick={handleGithubSignIn}
          className="w-full py-2 border flex justify-center items-center gap-3 border-[#4DC3AB] rounded-lg text-[#4DC3AB] hover:bg-gray-50"
          disabled={githubLoader}
        >
          {!githubLoader ? (
            <>
              <svg className="w-6 h-6 me-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Login with GitHub
            </>
          ) : (
            <Loader />
          )}
        </button>
      </div>
    </form>
  );
};

export default Login;
