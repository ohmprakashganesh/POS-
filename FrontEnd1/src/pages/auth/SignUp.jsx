import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    pan: '',
    phone: '',
    businessName: '',
    address: '',
    file: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const navigate = useNavigate();

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Validate Input Fields
  const validateForm = () => {
    if (!formData.name.trim()) return 'Business Name is required';
    if (!formData.type.trim()) return 'Business Type is required';
    if (!formData.pan.trim()) return 'PAN Number is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      return 'Invalid email format';
    if (!formData.phone.match(/^\+?\d{7,15}$/))
      return 'Invalid phone number';
    if (!formData.file) return 'Please upload a logo file';
    return null;
  };

  // ✅ Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);


    //   const formDataToSend = new FormData();
    //   Object.keys(formData).forEach((key) => {
    //     formDataToSend.append(key, formData[key]);
    //   });

    //   // ✅ Replace with your actual backend URL
    //   const response = await fetch('http://localhost:8080/api/register', {
    //     method: 'POST',
    //     body: formDataToSend,
    //   });

    //   if (!response.ok) {
    //     throw new Error('Registration failed');
    //   }

    //   const data = await response.json();

      // if (data.success) {
      //   setSuccessMsg('Account created successfully! Redirecting...');
      //   setTimeout(() => navigate('/login'), 1500);
      // } else {
      //   setError(data.message || 'Registration failed');
      // }

          try {
          navigate('/payment');

    
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[url('../public/bg1.jpg')] bg-center bg-cover bg-no-repeat flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto bg-white sm:w-full sm:max-w-md shadow-lg rounded-lg">
        <div className="py-8 px-4 sm:px-10">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Register Company
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in to your existing account
            </Link>
          </p>

          {/* Error Message */}
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded">
              {error}
            </div>
          )}

          {/* Success Message */}
          {successMsg && (
            <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded">
              {successMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Business Name *
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter business name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Business Type *
              </label>
              <input
                name="type"
                type="text"
                placeholder="Enter type of business"
                value={formData.type}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                PAN Number *
              </label>
              <input
                name="pan"
                type="text"
                placeholder="48305B"
                value={formData.pan}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address *
              </label>
              <input
                name="email"
                type="email"
                placeholder="chiyabari@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number *
              </label>
              <input
                name="phone"
                type="tel"
                placeholder="+97712645879"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Business Address
              </label>
              <textarea
                name="address"
                rows={3}
                placeholder="Barhadashi 4 Jhapa, Nepal"
                value={formData.address}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Logo *
              </label>
              <input
                name="file"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-900"
              >
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Terms and Conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
