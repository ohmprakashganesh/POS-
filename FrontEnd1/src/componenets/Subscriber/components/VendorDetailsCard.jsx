import React, { useEffect, useState } from "react";
import { Building2, MapPin, Phone, CreditCard, Package, DollarSign, FileText, Wallet } from "lucide-react";
import { VENDORS } from "@/data/mockData";
import { useParams } from "react-router-dom";
const VendorDetailsCard = () => {

  

  const { id } = useParams(); // get '4' from /vendor/4
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    const foundVendor = VENDORS.find((ven) => ven.id == id); // find single vendor
    setVendor(foundVendor);
  }, [id]);

  if (!vendor) return <div className="text-center p-6">Vendor not found or loading...</div>;


  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 p-6 hover:shadow-xl transition duration-300">
      
      {/* Header Section with Icon and Name */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="bg-green-100 p-4 rounded-full mb-3">
          <Building2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{vendor.name}</h2>
        <p className="text-sm text-gray-500 mt-1">Vendor Details Overview</p>
      </div>

      {/* Vendor Information */}
      <div className="space-y-3 text-gray-700 text-sm">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-green-500" />
          <span><strong>Address:</strong> {vendor.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-green-500" />
          <span><strong>Phone:</strong> {vendor.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-green-500" />
          <span><strong>PAN:</strong> {vendor.PAN}</span>
        </div>
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-green-500" />
          <span><strong>Total Products:</strong> {vendor.total_product}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-green-500" />
          <span><strong>Total Cost:</strong> NPR {vendor.total_cost}</span>
        </div>
        <div className="flex items-center gap-2">
          <Wallet className="w-4 h-4 text-green-500" />
          <span><strong>Total Paid:</strong> NPR {vendor.total_paid}</span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-green-500" />
          <span><strong>Total Due:</strong> NPR {vendor.total_due}</span>
        </div>
      </div>

      {/* Payment Slip Button */}
      <div className="mt-6 text-center">
        <a
          href={vendor.payment_slip_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
        >
          <FileText className="w-4 h-4 mr-2" />
          View Payment Slip
        </a>
      </div>
    </div>
  );
};

export default VendorDetailsCard;
