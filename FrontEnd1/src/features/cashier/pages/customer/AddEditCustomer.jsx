
import React, { useState, useEffect } from 'react';
import { customersData } from '@/data/mockData';
import { useForm } from '../../context/FormContext';
import Input from '@/features/ui/Input';
import Button from '@/features/ui/Button';
import { fa, tr } from 'zod/v4/locales';

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
    alert("successful");
    setIsLoading(false);
    closeCustomerForm(true);
    

   
  };
  return (
    <div className="fixed inset-0 bg-prim flex  items-center justify-center z-50">
      {/* Theme-aware popup */}
      <div className="bg-card w-1/3 bg-white dark:bg-dark max-w-xl mx-4 rounded-xl shadow-lg p-6 
                      overflow-y-auto max-h-[90vh] text-muted border border-border">

        <div className="flex items-center  justify-between mb-4">
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
          <div className="flex flex-col text-muted-hover  space-y-4">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium  mb-1">
                Full Name *
              </label>
              <Input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className=" "
                placeholder="Enter customer name"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number *
              </label>
              <Input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
          
                placeholder="98XXXXXXXX"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium  mb-1">
                Email Address
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
           
                placeholder="customer@example.com"
              />
            </div>

            {/* Address */}
           <div>
  <label className="block text-sm font-medium text-muted-hover mb-1">
    Address
  </label>

  <textarea
    name="address"
    rows={3}
    value={formData.address}
    onChange={handleChange}
    className="
      w-full 
      border 
      border-muted/60 
      rounded-md 
      px-3 py-2
      focus:border-primary-hover/40
      focus:outline-none 
      focus:ring-0
    "
    placeholder="Enter customer address "
  />
</div>

          </div>

          {/* Buttons */}
          <div className="flex    md:space-x-10 sm:space-x-2   ">
            <Button
              onClick={() => closeCustomerForm()}
              type="button"
              className="w-full max-w-sm bg-destructive hover:bg-destructive-hover"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full max-w-sm"
            >
              {isLoading ? 'Saving...' : isEdit ? 'Update' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditCustomer;
