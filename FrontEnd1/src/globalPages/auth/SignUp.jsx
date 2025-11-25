import Button from "@/features/ui/Button";
import Input from "@/features/ui/Input";
import { companyData } from "@/data/mockData";
// NOTE: Removed the unused custom imports
// import { OptionComponent, SelectComponent } from "@/features/ui/Select"; 
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";

const SignUp = ({}) => {
  const {id}=useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "", // This value is now bound to the <select>
    pan: "",
    phone: "",
    businessName: "",
    address: "",
    file: null,
  });
   useEffect(()=>{
    if(id && companyData.length >0){
      const company= companyData.find((obj)=>obj.id===id);
      console.log(company);
        if(company){
          setFormData({
            name: company.name,
            email: company.email,
            type: company.type,
            pan: company.pan,
            phone: company.phone,
            address: company.address,
          })
        }
      }
    },[]);
  // Corrected 'cusmatic' typo
  const businessTypes = ["cosmetic", "mechanic", "retail", "medical", "sport"];

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      // Handles native <input>, <textarea>, and <select>
      setFormData({ ...formData, [name]: value });
    }
  };
  const validateForm = () => {
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccessMsg("Account created successfully! Redirecting...");
      navigate("/payment");
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
    {id && (
      <Link 
          to={"/profile"}
          className="bg-primary/10 absolute z-40 text-left ml-0 hover:bg-primary/30 rounded-full"
        >
          <ArrowLeftIcon className="size-10 p-2" strokeWidth={2.5} />
        </Link>
    )}
        
    <div className="min-h-screen flex items-center justify-center  px-4">
    
      <div className="w-full md:w-[50%] bg-white dark:bg-dark rounded-xl shadow-sm md:px-4 px-2 lg:px-4 py-5">
        
        {/* Header */}
        <div className="text-center mb-3">
          <h1 className="text-3xl font-extrabold  tracking-tight">
            Register Your Company
          </h1>
          <p className="text-muted mt-1 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-medium hover:text-primary-hover"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-2 rounded-lg border border-destructive bg-destructive/10 px-4 py-2 text-destructive text-sm" role="alert">
            * {error}
          </div>
        )}
        {successMsg && (
          <div className="mb-4 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-green-700 text-sm" role="status">
            {successMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-2 text-sm">
            {/* Name (Business Name) */}
            <Input label="Business Name *" name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your business name"/>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PAN */}
            <Input
              label="PAN / VAT Number *"
              name="pan"
              type="text"
              value={formData.pan}
              onChange={handleChange}
              placeholder="E.g. 48305B"
            />

            {/* Business Type: Now using native <select> */}
            <div className="w-full">
              <label className="block mb-1">Business Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                // Tailwind classes for standard select styling (adjust as needed)
                className="w-full border border-muted/40 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent"
              >
                <option value="">Select Business Type</option>
                {businessTypes.map((item, ind) => (
                  <option key={ind} value={item}>
                    {/* Capitalize for presentation */}
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Email and Phone: Grouped in one row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <Input label="Email Address *"  name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@company.com" />
                {/* Phone */}
            <Input label="Phone Number *"  name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+977 98XXXXXXXX"/>

            </div>

          {/* Address */}
          <div>
            <label className="block mb-1">
              Business Address
            </label>
            <textarea
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleChange}
              placeholder="E.g. Barhadashi 4, Jhapa, Nepal"
              className="w-full border border-muted/40 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent"
            ></textarea>
          </div>

          {/* File Upload */}
          <Input label="Upload Logo *" name="file"
              type="file"
              accept="image/*"
              onChange={handleChange}
              // Tailwind styles for file input
             className="cursor-pointer focus:outline-none p-0 file:mr-3 file:py-3 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary-hover transition duration-150 ease-in-out"
              />
          {/* Terms */}
          <div className="flex items-start gap-2 pt-2">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 mt-1 text-primary border-muted/40 rounded focus:ring-primary"
            />
            <label htmlFor="terms" className="text-sm text-muted">
              I agree to the{" "}
              <a href="#" className="text-primary font-medium hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
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
          </Button>
        </form>
      </div>
    </div>
    </>
  );
};

export default SignUp;