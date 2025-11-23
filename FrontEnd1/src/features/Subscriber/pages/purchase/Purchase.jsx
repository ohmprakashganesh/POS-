

import React, { useState, useEffect } from "react";
import {  Link, useParams, useLocation } from "react-router-dom";
import { purchase } from "@/data/mockData";
import { PencilIcon, PlusIcon, Trash, TrashIcon } from "lucide-react";
import { Image } from "lucide-react";
import test from "@/assets/test.png";
import { useTranslation } from "react-i18next";

const Purchase = ({ back }) => {
  const {t}= useTranslation("subscriber");
  const [purchaseData, setPurchaseData] = useState([])
   const location=useLocation();
   const returnPath=location.pathname;
  useEffect(() => {
    try {
      if (purchase) {
        setPurchaseData(purchase)

      }
    } catch (error) {
      console.log("unable to find purchase data")
    }
  }, [])
  const { id } = useParams();
  const isEdit = Boolean(id);
  if (back) setBackState(true);



  return (
    <div className="space-y-6">
       <div className="flex flex-row  justify-between sm:items-center gap-2">    
          <div>
              <h1 className="text-2xl font-bold uppercase">
              {t("purchase.subTitle")}
              </h1>
              <p className="text-muted">  {t("purchase.description")}</p>
            </div>
            <Link
              to="/products/add"
              state={{from:returnPath}}
              className="inline-flex gap-2 items-center px-4 py-2 text-primary-foreground font-semibold hover:bg-primary-hover bg-primary rounded-md  transition-colors"
            >
              <PlusIcon className="size-5" strokeWidth={3} />
             {t("purchase.button")}
            </Link>
          </div>
      <div className="overflow-x-auto  rounded-md shadow-sm">
        <table className="table ">
          <thead >
            <tr className="table-head-row">
              <th className="table-th">{t("purchase.th.sn")}</th>
              <th className="table-th" >{t("purchase.th.vendor")}</th>
              <th className="table-th" >{t("purchase.th.product")}</th>
              <th className="table-th">{t("purchase.th.category")}</th>
              <th className="table-th">{t("purchase.th.costRs")}</th>
              <th className="table-th">{t("purchase.th.saleRs")}</th>
              <th className="table-th">{t("purchase.th.purchaseDate")}</th>
              <th className="table-th">{t("purchase.th.expiryDate")}</th>
              <th className="table-th">{t("purchase.th.stock")}</th>
              <th className="table-th">{t("purchase.th.sku")}</th>
              <th className="table-th">{t("purchase.th.image")}</th>
              <th className="table-th">{t("purchase.th.actions")}</th>
            </tr>
          </thead>

          <tbody>
            {purchaseData.map((product, key) => (
              <tr key={product.id} className="table-body-row">
                <td className="table-td">{key + 1}</td>
                <td className="table-td ">{product.name}</td>
                <td className="table-td ">{product.vendor}</td>
                <td className="table-td ">{product.category}</td>
                <td className="table-td">{product.cost}</td>
                <td className="table-td">{product.price}</td>
                <td className="table-td ">{product.purchase_date}</td>
                <td className="table-td">
                  {product.expiry_date || "-"}
                </td>
                <td className="table-td">{product.stock}</td>
                <td className="table-td">{product.sku}</td>

                <td className="table-td">
                  <img
                    src={test}
                    alt={product.name}
                    className="h-8 w-8 object-cover  rounded-md border border-muted/40"
                  />
                </td>
                <td className="table-td flex items-center gap-2">
                  <Link
                  to={`/products/edit/${product.id}`}
                 state={{from:returnPath}}
                    className="p-1.5 rounded-full hover:bg-primary/10 text-primary"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-1.5 rounded-full hover:bg-destructive/10 text-destructive dark:text-destructive-hover transition"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
    </div>
  );
};

export default Purchase;
