import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { AlignRight } from "lucide-react";
import Input from "@/componenets/ui/Input";
import Button from "@/componenets/ui/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginMethod, setLoginMethod] = useState("password"); // 'password' or 'otp'
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const user = localStorage.getItem("pos_user");
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("pos_user");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.role) return;

      if (user?.role === "admin") {
        navigate("/admin");
      } else if (user?.role === "subscriber") {
        navigate("/subscriber");
      } else if (user) {
        navigate("/pos");
      }
    } catch (error) {
      console.warn("failed to parse pos user form localstorage", error);
    }
  }, [navigate]);

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

    // Simulate OTP sending
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleOtpLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate OTP verification
    setTimeout(async () => {
      const result = await login("otp-user@example.com", "dummy-password");
      if (result.success) {
        navigate("/");
      } else {
        setError("Invalid OTP");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">
              POS
            </span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-muted">
          Or{" "}
          <Link
            to="/signup"
            className="font-medium text-primary hover:text-primary-hover"
          >
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Login Method Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setLoginMethod("password")}
              className={`flex-1 py-2 px-4 text-center font-medium text-sm ${
                loginMethod === "password"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-muted hover:text-muted-hover"
              }`}
            >
              Email & Password
            </button>
            <button
              onClick={() => setLoginMethod("otp")}
              className={`flex-1 py-2 px-4 text-center font-medium text-sm ${
                loginMethod === "otp"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted hover:text-muted-hover"
              }`}
            >
              Mobile OTP
            </button>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {loginMethod === "password" ? (
            <form onSubmit={handlePasswordLogin} className="space-y-6">
              <Input
                label="Email address"
                id="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="relative">
                <Input
                  label="Password"
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute top-3/4 -translate-y-3/4 right-3 flex items-center text-muted"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 " />
                  ) : (
                    <EyeIcon className="h-5 w-5 " />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-primary hover:text-primary"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </form>
          ) : (
            <form
              onSubmit={otpSent ? handleOtpLogin : handleSendOtp}
              className="space-y-6"
            >
              <Input
                label="Mobile Number"
                id="phone"
                name="phone"
                type="tel"
                placeholder="+977 98XXXXXXXX"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={otpSent}
              />
              {otpSent && (
                <div>
                  <Input
                    label="Enter OTP"
                    id="otp"
                    name="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    OTP sent to {phone}.{" "}
                    <button
                      type="button"
                      className="text-primary hover:text-primary-hover"
                    >
                      Resend OTP
                    </button>
                  </p>
                </div>
              )}

              <div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading
                    ? "Processing..."
                    : otpSent
                    ? "Verify OTP"
                    : "Send OTP"}
                </Button>
              </div>
            </form>
          )}

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              Demo credentials: <br />
              Email: admin@example.com | Password: any password works
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
