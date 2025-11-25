import React, { useState, useEffect, useMemo } from "react";
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

const CashierList = () => {
  const {t}=useTranslation()
  const [cashiers, setCashiers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCashiers, setFilteredCashiers] = useState([]);

  useEffect(() => {
    // In real app, this would be an API call
    setCashiers(customersData);
  }, [])


    const filtered =useMemo(()=>{
      const term= searchTerm.toLowerCase();
      return cashiers.filter((cashier)=>{
       return(
          cashier.name.toLowerCase().includes(term) ||
          cashier.phone.includes(term) ||
           cashier.email.toLowerCase().includes(term)||
           cashier.address.toLowerCase().includes(term)
        )
       });
  }, [searchTerm, cashiers]);

  const handleDelete = (cashierId) => {
    if (window.confirm("Are you sure you want to delete this cashier?")) {
      setCashiers(cashiers.filter((c) => c.id !== cashierId));
    }
  };

  return (
    <div className="space-y-6 ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("cashier.title")}</h1>
          <p className="text-muted">{t("cashier.description")}</p>
        </div>
        <Link
          to="/cashier/add"
          className="inline-flex items-center gap-2 px-4 py-2 font-semibold bg-primary hover:bg-primary-hover text-primary-foreground rounded-md"
        >
          <PlusIcon className="h-5 w-5" strokeWidth={2.5} />
          {t("cashier.addCashier")}
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted" />
        <Input
          type="text"
          placeholder={t("cashier.search")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 bg-white dark:bg-dark"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-md shadow-sm">
        <table className="table ">
          <thead>
            <tr className="table-head-row">
              <th className="table-th">{t("cashier.sn")}</th>
              <th className="table-th">{t("cashier.name")}</th>
              <th className="table-th">{t("cashier.phone")}</th>
              <th className="table-th">{t("cashier.email")}</th>
              <th className="table-th" >{t("cashier.address")}</th>
              <th className="table-th">{t("cashier.totalOrders")}</th>
              <th className="table-th">{t("cashier.totalSales")}</th>
              <th className="table-th">{t("cashier.actions")}</th>
            </tr>
          </thead>

          <tbody className="table-tbody">
            {filtered.map((cashier,index) => (
              <tr
                key={cashier.id}
                className="table-body-row"
              >
                 <td className="table-td">{index + 1}</td>
                {/* Name + Icon */}
                <td className="table-td">
               
                   {cashier.name}
                </td>

                {/* Phone */}
                <td className="table-td ">{cashier.phone}</td>

                {/* Email */}
                <td className="table-td ">
                  {cashier.email}
                </td>

                {/* Address */}
                <td className="table-td  ">
                  {cashier.address}
                </td>

                {/* Total Orders */}
                <td className= "table-td  "> {cashier.totalOrders}</td>

                {/* Total Sales */}
                <td className="table-td ">
                  {cashier.totalSales}
                </td>

                {/* Actions */}
                <td className="table-td  flex items-center gap-2">
                  <Link
                    to={`/cashier/edit/${cashier.id}`}
                    className="p-1.5 rounded-full hover:bg-primary/10 text-primary"
                  >
                    <PencilIcon className="action-icon" />
                  </Link>
                  <button
                    onClick={() => handleDelete(cashier.id)}
                    className="p-1.5 rounded-full hover:bg-red-50 text-destructive hover:text-destructive-hover transition"
                  >
                    <TrashIcon className="action-icon" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
     

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center min-h-50 flex items-center justify-center flex-col">
          <UserIcon className="mx-auto h-12 w-12 text-muted" />
          <h3 className="mt-2 font-semibold">
            No cashiers found
          </h3>
          <p className="mt-1 text-sm text-muted">
            {searchTerm
              ? "Try changing your search criteria."
              : "Get started by creating your first cashier."}
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <Link
                to="/cashiers/add"
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Cashier
              </Link>
            </div>
          )}
        </div>
      )}
       </div>
    </div>
  );
};

export default CashierList;
