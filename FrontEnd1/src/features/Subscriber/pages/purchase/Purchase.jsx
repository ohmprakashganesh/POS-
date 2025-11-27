

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {  Link, useLocation } from "react-router-dom";
import { purchase as data } from "@/data/mockData";
import { Eye, PencilIcon, PlusIcon, Trash, TrashIcon } from "lucide-react";
import { Image } from "lucide-react";
import { useTranslation } from "react-i18next";
import PurchaseDetailsCard from "./PurchaseDetailsCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Input from "@/features/ui/Input";

const Purchase = ({ back }) => {

  const [searchTerm,setSearchTerm]=useState("");
  const {t}= useTranslation("subscriber");
  const [purchaseData, setPurchaseData] = useState([])
   const location=useLocation();
   const returnPath=location.pathname;
  useEffect(() => {
    try {
      if (data) {
        setPurchaseData(data)
      }
    } catch (error) {
      console.log("unable to find purchase data")
    }
  }, [])

  if (back) setBackState(true);

  //purchase details card
  const [activePurchase,setActivePurchase]=useState(null)
  const onClose=useCallback(()=>{
      setActivePurchase(null)
  },[])


    function handleDelete(id){
      alert("add api to delete later, action triggered")
    }

    //filter 
      const filtered =useMemo(()=>{
          const term= searchTerm.toLowerCase();
          return purchaseData.filter((obj)=>{
           return(
              obj.name.toLowerCase().includes(term) ||
              obj.vendor.includes(term) ||
              obj.category.toLowerCase().includes(term)||
              obj.price.toString().includes(term) ||
               obj.purchase_date.toLowerCase().includes(term)
            )
           });
      }, [searchTerm, purchaseData]);
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




      <div className="overflow-x-auto  rounded-md shadow-sm">
        <table>
          <thead >
            <tr>
              <th>{t("purchase.th.sn")}</th>
              <th >{t("purchase.th.vendor")}</th>
              <th >{t("purchase.th.product")}</th>
              <th>{t("purchase.th.category")}</th>
              <th>{t("purchase.th.costRs")}</th>
              <th>{t("purchase.th.saleRs")}</th>
              <th>{t("purchase.th.purchaseDate")}</th>
              <th>{t("purchase.th.expiryDate")}</th>
              <th>{t("purchase.th.quantity")}</th>
              <th>{t("purchase.th.actions")}</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((product, key) => (
              <tr key={product.id} onClick={()=>setActivePurchase(product)}>
                <td >{key + 1}</td>
                <td >{product.name}</td>
                <td >{product.vendor}</td>
                <td >{product.category}</td>
                <td >{product.cost}</td>
                <td >{product.price}</td>
                <td >{product.purchase_date}</td>
                <td >
                  {product.expiry_date || "-"}
                </td>
                <td>{product.stock}</td>
                <td onClick={(e)=> e.stopPropagation()} className="flex items-center gap-2 ">
                  <Link
                  to={`/products/edit/${product.id}`}
                 state={{from:returnPath}}
                    className="p-1.5 rounded-full hover:bg-primary/10 text-primary"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={(e) =>{ handleDelete(product.id),e.stopPropagation()}}
                    className="p-1.5 rounded-full hover:bg-destructive/10 text-destructive dark:text-destructive-hover transition"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                  <Eye onClick={(e)=>{setActivePurchase(product),e.stopPropagation();}} className="size-4 text-secondary"/>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>

    {!!activePurchase && <PurchaseDetailsCard onClose={onClose} purchase={activePurchase}/> }
    </div>
  );
};

export default Purchase;
