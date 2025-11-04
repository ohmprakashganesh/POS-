import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { customersData } from "../../../../data/mockData";
import Input from "@/componenets/ui/Input";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  useEffect(() => {
    // In real app, this would be an API call
    setCustomers(customersData);
    setFilteredCustomers(customersData);
  }, []);

  useEffect(() => {
    const filtered = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [searchTerm, customers]);

  const handleDelete = (customerId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter((c) => c.id !== customerId));
    }
  };

  return (
    <div className="space-y-2 ">
      <div className="flex flex-col  sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-muted">Manage your customer database</p>
        </div>
        <Link
          to="/customers/add"
          className="inline-flex items-center gap-2 px-4 py-2 font-semibold bg-secondary text-secondary-foreground hover:bg-secondary-hover rounded-md"
        >
          <PlusIcon className="h-5 w-5 " strokeWidth={2.5} />
          Add Customer
        </Link>
      </div>
      {/* Search */}
      <div className="relative max-w-md  my-6">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted" />
        <Input
          type="text"
          placeholder="Search customers by name, phone, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 bg-white"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-md shadow-sm">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="uppercase  text-xs text-left font-semibold bg-secondary text-secondary-foreground">
            <tr>
              <th className="p-4 w-6">S.N</th>
              <th className="p-4">Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Email</th>
              <th className="p-4">Address</th>
              <th className="p-4">Total Orders</th>
              <th className="p-4">Total Spent</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((customer, index) => (
              <tr key={customer.id} className="hover:bg-background">
                <td className="px-4 py-3 truncate max-w-[180px]">
                  {index + 1}
                </td>
                {/* Customer Name + Icon */}
                <td className="px-4 py-3 flex items-center gap-2">
                  <UserIcon className="size-9 p-1.5 bg-primary/10 rounded-full text-primary" />
                  <div>
                    <p className="font-semibold ">{customer.name}</p>
                    <p className="text-xs text-muted">Customer</p>
                  </div>
                </td>

                {/* Phone */}
                <td className="px-4 py-3">{customer.phone}</td>

                {/* Email */}
                <td className="px-4 py-3 truncate max-w-[200px]">
                  {customer.email}
                </td>

                {/* Address */}
                <td className="px-4 py-3 truncate max-w-[180px]">
                  {customer.address}
                </td>

                {/* Total Orders */}
                <td className="px-4 py-3 font-semibold">12</td>

                {/* Total Spent */}
                <td className="px-4 py-3 font-semibold text-green-600">
                  $2,450.00
                </td>

                {/* Actions */}
                <td className="px-4 py-3 flex items-center gap-2">
                  <Link
                    to={`/customers/edit/${customer.id}`}
                    className="p-1.5 rounded-full hover:bg-primary/10 text-primary"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(customer.id)}
                    className="p-1.5 rounded-full hover:bg-red-50 text-red-600 hover:text-red-800 transition"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredCustomers.length === 0 && (
          <div className="text-center min-h-50 flex items-center justify-center flex-col">
            <UserIcon className="mx-auto h-12 w-12 text-muted" />
            <h3 className="mt-2 text-sm font-semibold">No customers found</h3>
            <p className="mt-1 text-sm text-muted">
              {searchTerm
                ? "Try changing your search criteria."
                : "Get started by creating your first customer."}
            </p>
            {!searchTerm && (
              <div className="mt-6">
                <Link
                  to="/customers/add"
                  className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Add Customer
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerList;
