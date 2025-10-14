import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon, UserIcon } from '@heroicons/react/24/outline';
import { customersData } from '../../../data/mockData';

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
          to="/c-customers/add"
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


    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
  <table className="min-w-full text-sm text-gray-700">
    <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
      <tr>
        <th className="px-4 py-3 text-left">Name</th>
        <th className="px-4 py-3 text-left">Phone</th>
        <th className="px-4 py-3 text-left">Email</th>
        <th className="px-4 py-3 text-left">Address</th>
        <th className="px-4 py-3 text-center">Total Orders</th>
        <th className="px-4 py-3 text-center">Total Spent</th>
        <th className="px-4 py-3 text-center">Actions</th>
      </tr>
    </thead>

    <tbody>
      {filteredCustomers.map((customer) => (
        <tr
          key={customer.id}
          className="border-t hover:bg-gray-50 transition duration-150"
        >
          {/* Customer Name + Icon */}
          <td className="px-4 py-3 flex items-center space-x-3">
            <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
              <UserIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{customer.name}</p>
              <p className="text-xs text-gray-500">Customer</p>
            </div>
          </td>

          {/* Phone */}
          <td className="px-4 py-3">{customer.phone}</td>

          {/* Email */}
          <td className="px-4 py-3 truncate max-w-[200px]">{customer.email}</td>

          {/* Address */}
          <td className="px-4 py-3 truncate max-w-[180px]">{customer.address}</td>

          {/* Total Orders */}
          <td className="px-4 py-3 text-center font-medium text-gray-800">12</td>

          {/* Total Spent */}
          <td className="px-4 py-3 text-center font-semibold text-green-600">
            $2,450.00
          </td>

          {/* Actions */}
          <td className="px-4 py-3 text-center">
            <div className="flex justify-center space-x-2">
              <Link
                to={`/c-customers/edit/${customer.id}`}
                className="p-1.5 rounded-full hover:bg-blue-50 text-blue-600 hover:text-blue-800 transition"
              >
                <PencilIcon className="h-4 w-4" />
              </Link>
            
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
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