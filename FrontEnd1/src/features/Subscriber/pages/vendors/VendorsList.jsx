import React, { useState, useEffect, use } from "react";
import { Link } from "react-router-dom";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  UserIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { VENDORS } from "../../../../data/mockData";
import { useNavigate } from "react-router-dom";
import Input from "@/features/ui/Input";
import { useTranslation } from "react-i18next";

const Vendor = () => {
  const {t}=useTranslation()
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVendors, setFilteredVendors] = useState([]);

  useEffect(() => {
    // In real app, this would be an API call
    setVendors(VENDORS);
    setFilteredVendors(VENDORS);
  }, []);

  useEffect(() => {
    const filtered = vendors.filter(
      (vendor) =>
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.phone.includes(searchTerm) ||
        vendor.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVendors(filtered);
  }, [searchTerm, vendors]);

  const handleDelete = (vendorId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setVendors(vendors.filter((c) => c.id !== vendorId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("vendor.title")}</h1>
          <p className="text-muted">{t("vendor.description")}</p>
        </div>
        <Link
          to="/vendor/add"
          className="inline-flex items-center gap-2 px-3 py-2 font-semibold bg-primary hover:bg-primary-hover text-primary-foreground rounded-md"
        >
          <PlusIcon className="h-5 w-5" strokeWidth={2.5} />
          {t("vendor.addVendor")}
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-muted" />
        <Input
          type="text"
          placeholder={t("vendor.search")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9  bg-white dark:bg-dark"
        />
      </div>

      <div className="overflow-x-auto   rounded-md shadow-sm">
        <table className="table">
          <thead>
            <tr className="table-head-row">
              <th className="table-th">{t("vendor.sn")}</th>
              <th className="table-th">{t("vendor.name")}</th>
              <th className="table-th">{t("vendor.address")}</th>
              <th className="table-th">{t("vendor.totalProducts")}</th>
              <th className="table-th">{t("vendor.totalExpenses")}</th>
              <th className="table-th">{t("vendor.totalPaid")}</th>
             <th className="table-th">Total Due</th>

              <th className=" table-th text-center">{t("vendor.actions")}</th>
            </tr>
          </thead>
          <tbody className="table-tbody">
            {filteredVendors.map((vendor, key) => (
              <tr key={vendor.id} className=" table-body-row">
                <td className=" table-td">{key + 1}</td>

                <td className="table-td ">

              {vendor.name}
                </td>

                <td className="table-td  ">
                  {vendor.address}
                </td>

                <td className="table-td ">{vendor.total_product}</td>

                <td className="table-td ">{vendor.total_cost}</td>

                <td className="table-td ">{vendor.total_paid}</td>
               <td className="table-td ">{vendor.total_due}</td>


                {/* Actions */}
                <td className="table-td  flex items-center gap-2">
                  <Link
                    to={`/vendor/edit/${vendor.id}`}
                    className="p-1.5 rounded-full hover:primary/10 text-primary"
                  >
                    <PencilIcon className="action-icon" />
                  </Link>
                  <button
                    onClick={() => handleDelete(vendor.id)}
                    className="p-1.5 rounded-full hover:bg-destructive/10 text-destructive"
                  >
                    <TrashIcon className="action-icon" />
                  </button>
                  <Link
                    to={`/vendor/detail/${vendor.id}`}
                    className="p-1.5 rounded-full hover:bg-secondary/10 text-secondary"
                  >
                    <EyeIcon className="action-icon" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredVendors.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-50">
            <UserIcon className="mx-auto h-12 w-12 text-muted" />
            <h3 className="mt-2 font-semibold">No vendor found</h3>
            <p className="mt-1 text-sm text-muted">
              {searchTerm
                ? "Try changing your search criteria."
                : "Get started by creating your first vendors."}
            </p>
            {!searchTerm && (
              <div className="mt-6">
                <Link
                  to="/vendor/add"
                  className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Add vendor
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Vendor;
