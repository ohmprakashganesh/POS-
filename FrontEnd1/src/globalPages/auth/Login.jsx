import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { EyeIcon, EyeSlashIcon, TvIcon } from "@heroicons/react/24/outline";
import { AlignRight, CheckIcon, PyramidIcon } from "lucide-react"; // AlignRight might not be directly used in the form, but keeping it as it was in your imports.
import Input from "@/features/ui/Input";
import Button from "@/features/ui/Button";

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
        navigate("/");
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
    <div className="login min-h-screen w-full flex flex-row-reverse">
      <div className="left-section w-full p-2 flex items-center justify-center">
      <div className="left-section w-full mx-auto max-w-120  flex flex-col justify-center items-center ">
      <p className="flex items-center font-bold gap-2 text-3xl mb-4">
        <PyramidIcon strokeWidth={2.5} /> <span> SMART-BILL </span>
      </p>
      <div className="text-center mb-3">
      <p className="text-2xl font-semibold">Welcome Back!</p>  
      <p className="text-muted text-sm">Sign in to access your account</p>
      </div>
    
        <div className="mt-4 py-1 px-8  w-full">
          {error && (
            <div
              className="mb-4 rounded-lg border border-destructive bg-destructive/10 px-4 py-3 text-destructive text-sm"
            >
              * {error}
            </div>
          )}

          {/* Password Login Form */}
          {loginMethod === "password" && (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <Input label=" Email address"  id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                    <div className="password-section relative">

              <Input label=" Password"  id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>

                      <button
                    type="button"
                    className="absolute inset-y-0 right-0 pt-7 pr-2 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                    </div>

              
                
                  <Link
                    to="/forgot-password"
                    className="text-right block font-medium text-primary hover:text-primary-hover"
                  >
                    Forgot your password?
                  </Link>
                  <Button  type="submit"
                  disabled={isLoading} className="w-full">
                     {isLoading ? "Signing in..." : "Sign in"}  
                  </Button>
            </form>
          )}
        </div>
      </div>
      </div>
      <div className="right-section hidden md:block w-full bg-constructive">
         <img
            src="https://images.unsplash.com/photo-1579547621113-e4d2719a4087?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Example image
            alt="Login Illustration"
            className="object-cover w-full h-full rounded-md"
          />
      </div>
    </div>
  );
};

export default Login;
