import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon, UserIcon } from '@heroicons/react/24/outline';
import { customersData } from '../../data/mockData';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  useEffect(() => {
    // In real app, this would be an API call
    setCustomers(customersData);
    setFilteredCustomers(customersData);
  }, []);

  useEffect(() => {
    const filtered = customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [searchTerm, customers]);

  const handleDelete = (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(c => c.id !== customerId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">Manage your customer database</p>
        </div>
        <Link
          to="/customers/add"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Customer
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="relative max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers by name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                  <p className="text-sm text-gray-500">Customer</p>
                </div>
              </div>
              <div className="flex space-x-1">
                <Link
                  to={`/customers/edit/${customer.id}`}
                  className="p-1 text-blue-600 hover:text-blue-900"
                >
                  <PencilIcon className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => handleDelete(customer.id)}
                  className="p-1 text-red-600 hover:text-red-900"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-600">
                <span className="w-20">Phone:</span>
                <span className="font-medium">{customer.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="w-20">Email:</span>
                <span className="font-medium truncate">{customer.email}</span>
              </div>
              <div className="flex items-start text-gray-600">
                <span className="w-20">Address:</span>
                <span className="font-medium flex-1">{customer.address}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Total Orders:</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-500">Total Spent:</span>
                <span className="font-semibold text-green-600">$2,450.00</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
          <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No customers found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm 
              ? 'Try changing your search criteria.'
              : 'Get started by creating your first customer.'
            }
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <Link
                to="/customers/add"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Customer
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerList;