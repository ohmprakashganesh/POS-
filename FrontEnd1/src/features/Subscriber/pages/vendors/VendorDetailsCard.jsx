import React, { useEffect, useState } from "react";
import { Building2, MapPin, Phone, CreditCard, Package, DollarSign, FileText, Wallet, ArrowLeft } from "lucide-react";
import { VENDORS } from "@/data/mockData";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
const VendorDetailsCard = () => {
  const {t}=useTranslation()
  const { id } = useParams(); // get '4' from /vendor/4
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    const foundVendor = VENDORS.find((ven) => ven.id == id); // find single vendor
    setVendor(foundVendor);
  }, [id]);

  if (!vendor) return <div className="text-center p-6">Vendor not found or loading...</div>;
  return (
    <div className="w-full relative">
       
       {/* go back button  */}
        <Link to="/vendors" className="absolute cursor-pointer rounded-full bg-primary/10 hover:bg-primary/30">
          <ArrowLeft className="size-10 p-2"/>
          </Link>      
      {/* Header Section with Icon and Name */}
      <div className="flex flex-col items-center text-center">
          <Building2 className="size-16 p-1 px-3.5 bg-secondary/10 rounded-full text-constructive" />
        <h2 className="text-2xl font-bold">{vendor.name}</h2>
        <p className="text-muted">{t("vendor.details.description")}</p>
      </div>
        {/* Financial Summary */}
  <div className="mb-5">
    <h3 className="font-semibold text-xl uppercase tracking-wide mb-2">{t("vendor.details.financialSummary")}</h3>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3  sm:gap-5">
      <div className=" bg-white dark:bg-dark rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-4 h-4 text-primary" />
          <span className="text-xs text-muted">{t("vendor.details.totalCost")}</span>
        </div>
        <p className="text-xl font-bold text-primary">NPR {vendor.total_cost}</p>
      </div>
      <div className=" bg-white dark:bg-dark rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Wallet className="w-4 h-4 text-secondary" />
          <span className="text-xs text-muted">{t("vendor.details.totalPaid")}</span>
        </div>
        <p className="text-xl font-bold text-secondary">NPR {vendor.total_paid}</p>
      </div>
      <div className=" bg-white dark:bg-dark rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-4 h-4 text-destructive" />
          <span className="text-xs text-muted">{t("vendor.details.totalDue")}</span>
        </div>
        <p className="text-xl font-bold text-destructive">NPR {vendor.total_due}</p>
      </div>
    </div>
    </div>

  <div className="grid grid-cols-1 gap-5 sm:grid-cols-5">
          {/* Contact Information Card */}
    <div className=" bg-white dark:bg-dark h-fit col-span-3 shadow-sm rounded-md p-5">
      <h3 className="text-sm font-semibold  uppercase tracking-wide mb-3">{t("vendor.details.contactInfo")}</h3>
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted">{t("vendor.details.address")}</p>
            <p className="text-sm">{vendor.address}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Phone className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted">{t("vendor.details.phone")}</p>
            <p className="text-sm">{vendor.phone}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CreditCard className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted">{t("vendor.details.PANNumber")}</p>
            <p className="text-sm">{vendor.PAN}</p>
          </div>
        </div>
      </div>
    </div>
    {/* Business Metrics Card */}
    <div className=" bg-white dark:bg-dark col-span-2 h-fit rounded-md p-5 shadow-sm">
      <h3 className="text-sm font-semibold uppercase tracking-wide mb-3">{t("vendor.details.businessMetrics")}</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-secondary" />
            <span className="text-sm text-muted">{t("vendor.details.products")}</span>
          </div>
          <span className="text-sm font-semibold">{vendor.total_product}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-secondary" />
            <span className="text-sm text-muted">{t("vendor.details.categories")}</span>
          </div>
          <span className="text-sm font-semibold">{vendor.total_categories}</span>
        </div>
      </div>
    </div>
  </div>
    </div>
  );
};

export default VendorDetailsCard;
