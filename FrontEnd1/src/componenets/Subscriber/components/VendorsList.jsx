

import React, { useState, useEffect, use } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon, UserIcon, EyeIcon } from '@heroicons/react/24/outline';
import { VENDORS } from '../../../data/mockData';
import { useNavigate } from 'react-router-dom';

const Vendor = () => {
  const navigate= useNavigate();
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVendors, setFilteredVendors] = useState([]);

  useEffect(() => {
    // In real app, this would be an API call
    setVendors(VENDORS);
    setFilteredVendors(VENDORS);
  }, []);

  useEffect(() => {
    const filtered = vendors.filter(vendor =>
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.phone.includes(searchTerm) ||
      vendor.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVendors(filtered);
  }, [searchTerm, vendors]);

  const handleDelete = (vendorId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setVendors(vendors.filter(c => c.id !== vendorId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">vendors</h1>
          <p className="text-gray-600">Manage your vendor database</p>
        </div>
        <Link
          to="/vendor/add"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add vendor
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="relative max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search vendors by name, phone, or email..."
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
        <th className='max-w-6 w-6'>SN</th>
        <th className="px-4 py-3 text-left">Name</th>
        <th className="px-4 py-3 text-left">Address</th>
        <th className="px-4 py-3 text-center">Total Products</th>
        <th className="px-4 py-3 text-center">Total Expenses</th>
        <th className="px-4 py-3 text-center"> total Paid</th>
        <th className="px-4 py-3 text-center">ACtions</th>

        



      </tr>
    </thead>

    <tbody>
      {filteredVendors.map((vendor,key) => (
        <tr
          key={vendor.id}
          className="border-t hover:bg-gray-50 transition duration-150"
        >
                   <td className="px-4 py-3 truncate max-w-[180px]">{key+1}</td>

          <td className="px-4 py-3 flex items-center space-x-3">
            <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
              <UserIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{vendor.name}</p>
            </div>
          </td>
          {/* Address */}
          <td className="px-4 py-3 truncate max-w-[180px]">{vendor.address}</td>


          
       

          
          {/* Phone */}
          <td className="px-4 py-3">{vendor.total_product}</td>

          
          {/* Phone */}
          <td className="px-4 py-3">{vendor.total_cost}</td>

                    <td className="px-4 py-3">{vendor.total_paid}</td>


         

          {/* Actions */}
          <td className="px-4 py-3 text-center">
            <div className="flex justify-center space-x-2">
              <Link
                to={`/vendor/edit/${vendor.id}`}
                className="p-1.5 rounded-full hover:bg-blue-50 text-blue-600 hover:text-blue-800 transition"
              >
                <PencilIcon className="h-4 w-4" />
              </Link>
              <button
                onClick={() => handleDelete(vendor.id)}
                className="p-1.5 rounded-full hover:bg-red-50 text-red-600 hover:text-red-800 transition"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
               <button  
                onClick={() =>navigate(`/vendor/detail/${vendor.id}`) }
                className="p-1.5 rounded-full hover:bg-red-50 text-red-600 hover:text-red-800 transition"
              >
                <EyeIcon className="h-4 w-4" />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      {filteredVendors.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
          <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No vendor found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm 
              ? 'Try changing your search criteria.'
              : 'Get started by creating your first vendors.'
            }
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <Link
                to="/vendor/add"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add vendor
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Vendor;
