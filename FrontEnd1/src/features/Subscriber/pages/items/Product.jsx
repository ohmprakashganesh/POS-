import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { DUMMY_PRODUCTS } from '@/data/mockData';
import Button from '@/features/ui/Button';
import { ArrowLeftIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Product = () => {
  const {t}=useTranslation("subscriber");
  const { id } = useParams();
  const productId = parseInt(id, 10); 

  // Find product by id
  const productData = DUMMY_PRODUCTS.find((p) => p.id === productId);

  if (!productData) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-10 bg-white dark:bg-dark shadow-xl rounded-2xl text-center">
        <p className="text-2xl font-bold text-destructive">Product not found.</p>
      </div>
    );
  }


  return (
    <>
      <Link
    to="/products"
    className="flex items-center mb-6 size-10 p-2 text-muted bg-primary/10 hover:bg-primary/30 rounded-full"
  >
    <ArrowLeftIcon className="h-full w-full" strokeWidth={2.5} />
  </Link>

  {/* MAIN GRID */}
  <div className="grid grid-cols-1 md:grid-cols-5 gap-5 lg:gap-10">

    {/* Image */}
    <div className="md:col-span-2">
      <div className="w-full overflow-hidden rounded-2xl shadow-2xl">
        <img
          src={productData.image}
          alt={productData.name}
          className="w-full aspect-square object-cover"
        />
      </div>
    </div>

    {/* Details */}
    <div className="md:col-span-3 space-y-3">

      {/* Title */}
      <h1 className="text-3xl lg:text-5xl font-extrabold">
        {productData.name}
      </h1>

      {/* Price */}
      <p className="text-3xl font-bold text-secondary">
        <span className="text-dark dark:text-white mr-2">  {t("itemDetail.rs")}</span>
        {productData.price.toFixed(2)}
      </p>

      {/* Stock Status Banner */}
      <div>
        {productData.stock < 1 ? (
          <p className="text-xl font-semibold bg-destructive/10 text-destructive px-4 py-2 border border-destructive rounded-lg text-center">
           {t("itemDetail.outOfStock")}
          </p>
        ) : productData.stock < 50 ? (
          <p className="text-xl bg-tertiary/10 text-tertiary font-semibold p-4 border border-tertiary-hover rounded-lg text-center">
             {t("itemDetail.lowStock")}
          </p>
        ) : productData.stock > 500 ? (
          <p className="text-xl bg-secondary/10 text-secondary font-semibold p-4 border border-secondary-hover rounded-lg text-center">
               {t("itemDetail.enoughStock")}
          </p>
        ) : null}
      </div>

      {/* INFO GRID */}
      <div className="grid text-muted-hover grid-cols-2 gap-x-6 gap-y-1 text-lg font-semibold">
        <p><span className="">{t("productDetail.category")}:</span> {productData.category}</p>
        <p><span>{t("productDetail.supplier")}:</span> {productData.supplier}</p>
        <p><span>{t("productDetail.sku")}:</span> {productData.sku}</p>
        <p><span>{t("productDetail.purchasePrice")}:</span> {productData.purchase_price}</p>
        <p><span>{t("productDetail.stock")}:</span> {productData.stock}</p>
        <p><span>{t("productDetail.purchaseDate")}:</span> {productData.purchase_date}</p>
        <p><span>{t("productDetail.expiryDate")}:</span> {productData.expiry_date}</p>
      </div>
    </div>

  </div>

  {/* Description */}
  <div className="pt-5 mt-3 border-t border-muted/20">
    <h2 className="text-3xl font-bold mb">  {t("itemDetail.title")}</h2>
    <p className="text-muted text-xl leading-relaxed">
     {productData.description}  
       </p>
  </div>

</>
  )
}
export default Product;