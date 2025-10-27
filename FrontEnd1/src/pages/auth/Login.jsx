import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { EyeIcon, EyeSlashIcon, TvIcon } from "@heroicons/react/24/outline";
import { AlignRight, CheckIcon, PyramidIcon } from "lucide-react"; // AlignRight might not be directly used in the form, but keeping it as it was in your imports.

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginMethod, setLoginMethod] = useState("password"); // 'password' or 'otp'
  const [otpSent, setOtpSent] = useState(false); // Added for OTP flow, assuming it's part of your future plan
  const { login } = useAuth();
  const navigate = useNavigate();

  // It's safer to parse user once and then check its properties.
  const user = (() => {
    try {
      const raw = localStorage.getItem("pos_user");
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.warn("failed to parse pos user from localstorage", error);
      return null;
    }
  })();

  useEffect(() => {
    if (user && user.role) {
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "subscriber") {
        navigate("/subscriber");
      } else {
        // Default or other roles
        navigate("/pos");
      }
    }
  }, [user, navigate]);

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await login(email, password);
    if (result.success) {
      if (result.user?.role === "admin") {
        navigate("/admin");
      } else if (result.user?.role === "subscriber") {
        navigate("/subscriber");
      } else {
        navigate("/pos");
      }
    } else {
      setError(result.error || "Login failed");
    }
    setIsLoading(false);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate OTP sending (replace with actual API call)
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
      // In a real app, you might navigate to an OTP verification page
      // or show an OTP input field here.
    }, 1000);
  };

  return (
    <div className="login min-h-screen w-full  bg-center bg-cover bg-no-repeat flex flex-col justify-center items-center">
      {/* Main container for the two columns */}
      <div className="w-full h-screen bg-white grid grid-cols-1 md:grid-cols-2 shadow-lg rounded-lg overflow-hidden ">
        {/* left Column: Login Form */}
        <div className=" items-center flex flex-col justify-center p-2">
          <div className="w-full flex  mt-8 justify-around">
            <p className="flex font-bold gap-2  ">
              <PyramidIcon /> <span> SMART-BILL </span>
            </p>
            <select className="border-2  rounded-md bg-gray-300 hover:border-primary-green px-2 py-1">
              <option className="font-bold text-black bg-gray-300" value="English">
          
                English <TvIcon color="green" />
              </option>
              <option value="Nepali">
                नेपाली <CheckIcon />
              </option>
            </select>
          </div>

          <div className="w-full md:w2/3 lg:w-2/3 mt-16 bg-white flex flex-col justify-center items-center ">
            <div className="text-center ">
              <div className=" mb-2"></div>
              <h2 className=" text-3xl font-bold text-gray-900">
                Lets Get Started
              </h2>
              <p className="text-gray-400 mt-4 ">Please Login to continue</p>
             
            </div>

            <div className="mt-4 bg-white py-1 px-8  w-full shadow sm:rounded-lg ">
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {/* Password Login Form */}
              {loginMethod === "password" && (
                <form onSubmit={handlePasswordLogin} className="space-y-2 ">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1 relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                     
                    </div>
                    <div className="text-sm">
                      <Link
                        to="/forgot-password"
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full mt-5 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-primary-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      {isLoading ? "Signing in..." : "Sign in"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center justify-center bg-green-400 p-8">
          <img
            src="https://images.unsplash.com/photo-1579547621113-e4d2719a4087?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Example image
            alt="Login Illustration"
            className="object-cover w-full h-full rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
