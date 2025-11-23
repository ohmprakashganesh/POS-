import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { customersData } from "@/data/mockData";
import Input from "@/features/ui/Input";
import { useTranslation } from "react-i18next";

const CustomerList = () => {
  const {t}=useTranslation()
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
    <div className="space-y-2  ">
      <div className="flex flex-col  sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("customer.title")}</h1>
          <p className="text-muted">{t("customer.description")}</p>
        </div>
        <Link
          to="/customers/add"
          className="inline-flex items-center gap-2 px-4 py-2 font-semibold bg-primary hover:bg-primary-hover text-primary-foreground rounded-md"
        >
          <PlusIcon className="h-5 w-5 " strokeWidth={2.5} />
          {t("customer.addCustomer")}
        </Link>
      </div>
      {/* Search */}
      <div className="relative max-w-md  my-6">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted" />
        <Input
          type="text"
          placeholder={t("customer.search")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 bg-white dark:bg-dark"
        />
      </div>

      <div className="overflow-x-auto flex rounded-md shadow-sm">
        <table className="table">
          <thead >
            <tr className="table-head-row">
              <th className="table-th">{t("customer.sn")}</th>
              <th className=" table-th">{t("customer.name")}</th>
              <th className="table-th">{t("customer.phone")}</th>
              <th className="table-th">{t("customer.email")}</th>
              <th className="table-th">{t("customer.address")}</th>
              <th className="table-th">{t("customer.totalOrders")}</th>
              <th className=" table-th">{t("customer.totalSpent")}</th>
              <th className="table-th">{t("customer.actions")}</th>
            </tr>
          </thead>

          <tbody className="table-body">
            {filteredCustomers.map((customer, index) => (
              <tr key={customer.id} className="table-body-row">
                <td className="table-td">
                  {index + 1}
                </td>
                {/* Customer Name + Icon */}
                <td className="table-td">
            {customer.name}
            
                </td>

                {/* Phone */}
                <td className="table-td">
                  {customer.phone}</td>

                {/* Email */}
                <td className="table-td">
                  {customer.email}
                </td>

                {/* Address */}
                <td className="table-td">
                  {customer.address}
                </td>

                {/* Total Orders */}
                <td className="table-td">
                  12</td>

                {/* Total Spent */}
                <td className=" table-td text-constructive">
                  2,450.00
                </td>

                {/* Actions */}
                <td className=" table-td flex gap-2">
                  <Link
                    to={`/customers/edit/${customer.id}`}
                    className="p-1.5 rounded-full hover:bg-primary/10 text-primary"
                  >
                    <PencilIcon className="action-icon" />
                  </Link>
                  <button
                    onClick={() => handleDelete(customer.id)}
                    className="p-1.5 rounded-full hover:bg-red-50 text-destructive dark:text-destructive-hover transition"
                  >
                    <TrashIcon className="action-icon" />
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
