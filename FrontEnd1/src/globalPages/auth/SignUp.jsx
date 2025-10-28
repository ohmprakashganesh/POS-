import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    pan: "",
    phone: "",
    businessName: "",
    address: "",
    file: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    // Note: The original validation message for 'name' checked for 'Business Name'
    // but the input label says 'Business Name *' and state uses 'name'. I'm
    // preserving the original logic, assuming 'name' in state is 'Business Name'.
    if (!formData.name.trim()) return "Business Name is required";
    if (!formData.type.trim()) return "Business Type is required";
    if (!formData.pan.trim()) return "PAN Number is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      return "Invalid email format";
    if (!formData.phone.match(/^\+?\d{7,15}$/))
      return "Invalid phone number";
    if (!formData.file) return "Please upload a logo file";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      // Mock success (replace later with API)
      // Simulate an async operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccessMsg("Account created successfully! Redirecting...");
      navigate("/payment");
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  //  handling the input field design
  const inputClassName = "w-full rounded-lg border-0 bg-gray-100 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 text-gray-800 transition duration-150 ease-in-out placeholder-gray-500";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <div className="w-full md:w-[40%] bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Register Your Company
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-red-600 text-sm" role="alert">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="mb-4 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-green-700 text-sm" role="status">
            {successMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Name, Type, PAN: Grouped in one row for better visual balance */}
          <div className="grid grid-cols-1 gap-6">
            {/* Name (Business Name) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Business Name *
              </label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your business name"
                className={inputClassName}
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Business Type *
              </label>
              <input
                name="type"
                type="text"
                value={formData.type}
                onChange={handleChange}
                placeholder="Enter type of business"
                className={inputClassName}
              />
            </div>
            
            {/* PAN */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                PAN Number *
              </label>
              <input
                name="pan"
                type="text"
                value={formData.pan}
                onChange={handleChange}
                placeholder="E.g. 48305B"
                className={inputClassName}
              />
            </div>
          </div>

          {/* Email and Phone: Grouped in one row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@company.com"
                className={inputClassName}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+977 98XXXXXXXX"
                className={inputClassName}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Business Address
            </label>
            <textarea
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleChange}
              placeholder="E.g. Barhadashi 4, Jhapa, Nepal"
              className={inputClassName}
            ></textarea>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Upload Logo *
            </label>
            <input
              name="file"
              type="file"
              accept="image/*"
              onChange={handleChange}
              // Adjusted file input styling to match the flat/no-border theme
              className="block w-full text-sm text-gray-800 border-0 rounded-lg cursor-pointer bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition duration-150 ease-in-out"
            />
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 pt-2">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{" "}
              <a href="#" className="text-blue-600 font-medium hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:from-blue-700 hover:to-blue-600 focus:ring-4 focus:ring-blue-300 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-8"
          >
            {isLoading ? (
                <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                </span>
            ) : (
                "Create Account"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;