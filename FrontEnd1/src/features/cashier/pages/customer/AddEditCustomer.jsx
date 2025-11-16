// import React, { useState, useEffect } from 'react';
// import { customersData } from '@/data/mockData';
// import { useForm } from '../../context/FormContext';

// const AddEditCustomer = () => {
//   const {closeCustomerForm,editId}=useForm();
//   const isEdit = Boolean(editId);

//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     address: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (isEdit) {
//       const customer = customersData.find(c => c.id === parseInt(editId));
//       if (customer) {
//         setFormData({
//           name: customer.name,
//           phone: customer.phone,
//           email: customer.email,
//           address: customer.address
//         });
//       }
//     }
//   }, [editId, isEdit]);

//   const handleChange = (e) => {
//     if(error)setError("");
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

// const validateForm = () => {
//   if (!formData.name.trim()) {
//     setError("Name is required");
//     return false;
//   }
//   if (!formData.phone.trim()) {
//     setError("Phone number is required");
//     return false;
//   }
//   if (!/^\d{10}$/.test(formData.phone.trim())) {
//     setError("Phone number must be 10 digits");
//     return false;
//   }
//   if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
//     setError("Invalid email format");
//     return false;
//   }
//   return true;
// };


//   // Submit
//  const handleSubmit = (e) => {
//   e.preventDefault();
//   setError("");

//   // Validate first
//   if (!validateForm()) {
//     return; // 
//   }

//   setIsLoading(true);

//   setTimeout(() => {
//     //call the api 
//     console.log("Customer saved:", formData);
//     setIsLoading(false);
//     closeCustomerForm();
//   }, 1000);
// };

//   // Check if form is valid to enable submit button
//   const isFormValid =
//     formData.name.trim() &&
//     /^\d{10}$/.test(formData.phone.trim()) &&
//     (!formData.email || /\S+@\S+\.\S+/.test(formData.email));

//   return (
//   // Overlay background
//   <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 ">
//     {/* Centered white form container */}
// <div className="bg-white w-1/3 max-w-xl mx-4 rounded-xl shadow-lg p-6 overflow-y-auto max-h-[90vh] scrollbar-hide">
//       <div className="flex items-center justify-between mb-4">
//           <div className='flex w-full justify-center flex-col items-center'>
//             <h1 className="text-2xl font-bold text-gray-900">
//               {isEdit ? 'Edit Customer' : 'Add New Customer'}
//             </h1>
//             <p className="text-gray-600 text-center">
//               {isEdit ? 'Update customer information' : 'Add a new customer to your database'}
//             </p>
//           </div>
//       </div>

//       {/* Error Box */}
//       {error && (
//         <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
//           {error}
//         </div>
//       )}

//       {/* The Form */}
//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div className="flex flex-col space-y-4">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//               Full Name *
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               required
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Enter customer name"
//             />
//           </div>

//           <div>
//             <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
//               Phone Number *
//             </label>
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               required
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="+977 98XXXXXXXX"
//             />
//           </div>

//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="customer@example.com"
//             />
//           </div>

//           <div>
//             <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
//               Address
//             </label>
//             <textarea
//               id="address"
//               name="address"
//               rows={3}
//               value={formData.address}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Enter customer address"
//             />
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
//           <button
//           onClick={()=>closeCustomerForm()}
//             className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
//           >
//             {isLoading ? 'Saving...' : isEdit ? 'Update Customer' : 'Add Customer'}
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// );
// };

// export default AddEditCustomer;

import React, { useState, useEffect } from 'react';
import { customersData } from '@/data/mockData';
import { useForm } from '../../context/FormContext';

const AddEditCustomer = () => {
  const { closeCustomerForm, editId } = useForm();
  const isEdit = Boolean(editId);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      const customer = customersData.find(c => c.id === parseInt(editId));
      if (customer) {
        setFormData({
          name: customer.name,
          phone: customer.phone,
          email: customer.email,
          address: customer.address
        });
      }
    }
  }, [editId, isEdit]);

  const handleChange = (e) => {
    if (error) setError("");
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (!/^\d{10}$/.test(formData.phone.trim())) {
      setError("Phone number must be 10 digits");
      return false;
    }
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Invalid email format");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      console.log("Customer saved:", formData);
      setIsLoading(false);
      closeCustomerForm();
    }, 1000);
  };

  const isFormValid =
    formData.name.trim() &&
    /^\d{10}$/.test(formData.phone.trim()) &&
    (!formData.email || /\S+@\S+\.\S+/.test(formData.email));

  return (
    <div className="fixed inset-0 bg-prim flex bg-background items-center justify-center z-50">
      {/* Theme-aware popup */}
      <div className="bg-card w-1/3 max-w-xl mx-4 rounded-xl shadow-lg p-6 
                      overflow-y-auto max-h-[90vh] text-muted border border-border">

        <div className="flex items-center justify-between mb-4">
          <div className="flex w-full justify-center flex-col items-center">
            <h1 className="text-2xl font-bold text-muted-hover">
              {isEdit ? 'Edit Customer' : 'Add New Customer'}
            </h1>
            <p className="text-muted text-center">
              {isEdit ? 'Update customer information' : 'Add a new customer to your database'}
            </p>
          </div>
        </div>

        {/* Error box (theme aware) */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col  space-y-4">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-muted  mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg 
                           bg-background text-muted-hover  border border-muted/40
                           "
                placeholder="Enter customer name"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-muted  mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg 
                           bg-background text-muted-hover  border border-muted/40
                           "
                placeholder="98XXXXXXXX"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-muted  mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg 
                          bg-background text-muted-hover  border border-muted/40
                           "
                placeholder="customer@example.com"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-muted  mb-1">
                Address
              </label>
              <textarea
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg 
                          bg-background text-muted-hover  border border-muted/40
                           "
                placeholder="Enter customer address"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4  ">
            <button
              onClick={() => closeCustomerForm()}
              type="button"
              className="px-4 py-2 border border-border rounded-lg 
                         text-foreground bg-muted hover:bg-muted-hover"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg 
                         hover:bg-primary-hover disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : isEdit ? 'Update Customer' : 'Add Customer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditCustomer;
