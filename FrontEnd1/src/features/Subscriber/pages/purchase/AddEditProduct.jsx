import React, { useState, useEffect, useMemo } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { ArrowLeftIcon } from "@heroicons/react/20/solid"; // Assuming Heroicons
import { DUMMY_PRODUCTS, VENDORS as Vendors } from "@/data/mockData"; // Adjust path as needed
import Button from "@/features/ui/Button";
import Input from "@/features/ui/Input";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";



const categories = [
    "Electronics",
    "Accessories",
    "Audio",
    "Computers",
    "Mobile",
    "Home",
];

const AddEditProduct = () => {
  const { t } = useTranslation(["form"]); 
  
  const productSchema = z.object({
    name: z.string().min(1, t("purchase.name.required")),
    vendor: z.string().min(1, t("purchase.vendor.required")),
    category: z.string().min(1, t("purchase.category.required")),
    sku: z.string().min(1, t("purchase.sku.required")),
    purchase_date: z.string().min(1, t("purchase.purchaseDate.required")),
    
    cost: z.coerce.number({
        invalid_type_error: t("purchase.cost.typeError") 
      })
      .min(0.01, t("purchase.cost.required")) 
      .default(0),
      
    price: z.coerce.number({
        invalid_type_error: t("purchase.price.typeError")
      })
      .min(0.01, t("purchase.price.required"))
      .default(0),
      
    stock: z.coerce.number({
        invalid_type_error: t("purchase.stock.typeError")
      })
      .min(0, t("purchase.stock.required")) 
      .default(0),

    image: z.any().optional(), 
    expiry_date: z.string().optional(),
    description: z.string().optional(),
    
  }).refine(data => data.price >= data.cost, {
    message: t("purchase.price.minCostError"),
    path: ["price"], 
  });
  const location = useLocation();
  const navigate = useNavigate();
  

  const from = location.state?.from || "/products"; 
  const { id } = useParams();
  const isEdit = Boolean(id);

  const productData = useMemo(() => 
    isEdit ? DUMMY_PRODUCTS.find((prod) => prod.id == id) : null, 
    [id, isEdit]
  );
  
  const [imagePreview, setImagePreview] = useState(""); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch, 
    setValue, 
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
        name: "",
        vendor: "",
        category: "",
        price: 0.01,
        cost: 0.01,
        stock: 0,
        sku: "",
        description: "",
        purchase_date: new Date().toISOString().substring(0, 10), 
        expiry_date: "",
    }
  });

  const watchedPrice = watch("price");
  const watchedCost = watch("cost");
  const watchedStock = watch("stock");
  const watchedCategory = watch("category");

  useEffect(() => {
    if (isEdit && productData) {
        reset({
            name: productData.name || "",
            vendor: productData.vendor || "",
            category: productData.category || "",
            price: productData.selling_price || 0.01,
            cost: productData.purchase_price || 0.01,
            stock: productData.stock || 0,
            sku: productData.sku || "",
            description: productData.description || "",
            purchase_date: productData.purchase_date || "",
            expiry_date: productData.expiry_date || "",
        });
        setImagePreview(productData.image || "");
    }
  }, [isEdit, productData, reset]);


  const generateSKU = () => {
    const prefix = watchedCategory 
      ? watchedCategory.substring(0, 3).toUpperCase()
      : "PRO";
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    

    setValue("sku", `${prefix}-${random}`, { shouldValidate: true, shouldDirty: true });
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {

      setValue("image", file, { shouldValidate: true, shouldDirty: true });

      setImagePreview(URL.createObjectURL(file)); 
    } else {
        setValue("image", undefined, { shouldValidate: true, shouldDirty: true });
        setImagePreview("");
    }
  };



  const onSubmit = async (data) => {
    setError("");
    setIsLoading(true);
    
    setTimeout(() => {
      console.log(isEdit ? "Product updated:" : "Product added:", data);
      setIsLoading(false);
      toast.success(isEdit ? "Product successfully updated!" : "Product successfully added!");
      
      navigate(from, { replace: true });
      
    }, 1000);
  };


  const cost = parseFloat(watchedCost || 0);
  const price = parseFloat(watchedPrice || 0);
  const stock = parseFloat(watchedStock || 0);
  const profitPerUnit = (price - cost).toFixed(2);
  const profitMargin = price > 0 ? (((price - cost) / price) * 100).toFixed(1) : (0).toFixed(1);
  const totalStockValue = (cost * stock).toFixed(2);


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to={from}
            className="p-2 text-muted bg-primary/10 hover:bg-primary/30 rounded-full"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">
              {isEdit ?t("purchase.titleUpdate") : t("purchase.titleCreate")}
            </h1>
            <p className="text-muted">
              {isEdit
                ? t("purchase.subtitleUpdate")
                : t("purchase.subtitleCreate")}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive border border-destructive px-4 py-3 rounded-md">
          * {error}
        </div>
      )}

      <div className="bg-white dark:bg-dark rounded-md shadow-sm overflow-hidden">

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div className="space-y-5">
              <Input
                label={t("purchase.name.label")}
                type="text"
                id="name"
                placeholder={t("purchase.name.placeholder")}
                {...register("name")} 
                error={errors.name?.message} 
              />
              <div>
                <label htmlFor="vendor" className="block mb-1">
                 {t("purchase.vendor.label")}
                </label>
                <select
                  id="vendor"
                  className={`w-full px-3 py-2 border ${errors.vendor ? "border-destructive" : "border-muted/40"} outline-none rounded-lg focus:ring-2 focus:ring-primary`}
                  {...register("vendor")} 
                >
                  <option value="" className="bg-white dark:bg-dark"> {t("purchase.vendor.placeholder")}
</option>
                  {Vendors.map(vendor => (
                    <option className="bg-white dark:bg-dark" key={vendor.id} value={vendor.name}>{vendor.name}</option>
                  ))}
                </select>
                {errors.vendor && (
                  <p className="text-destructive text-sm mt-1">{errors.vendor.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="category" className="block mb-1">
             {t("purchase.category.label")}
                </label>
                <select
                  id="category"
                  className={`w-full px-3 py-2 border ${errors.category ? "border-destructive" : "border-muted/40"} outline-none rounded-lg focus:ring-2 focus:ring-primary`}
                  {...register("category")} 
                >
                  <option className="bg-white dark:bg-dark" value="">{t("purchase.category.placeholder")}</option>
                  {categories.map(category => (
                    <option className="bg-white dark:bg-dark" key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-destructive text-sm mt-1">{errors.category.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                label={t("purchase.cost.label")}
                  type="number"
                  id="cost"
                  step="0.01"
                  placeholder="0.00"
                  {...register("cost")} 
                  error={errors.cost?.message}
                />
                <Input
                  label={t("purchase.price.label")}
                  type="number"
                  id="price"
                  step="0.01"
                  placeholder="0.00"
                  {...register("price")} 
                  error={errors.price?.message}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label={t("purchase.purchaseDate.label")}
                  type="date"
                  id="purchase_date"
                  {...register("purchase_date")} 
                  error={errors.purchase_date?.message}
                />
                <Input
                  label={t("purchase.expiryDate.label")}
                  type="date"
                  id="expiry_date"
                  {...register("expiry_date")} 
                  error={errors.expiry_date?.message}
                />
              </div>
              <Input
                  label={t("purchase.stock.label")}
                type="number"
                id="stock"
                placeholder="0"
                {...register("stock")} 
                error={errors.stock?.message}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              <div className="flex gap-2 items-end">
                <div className="grow">
                  <Input
                  label={t("purchase.sku.label")}
                    type="text"
                    id="sku"
                    placeholder="e.g., ELEC-12345"
                    {...register("sku")} 
                    error={errors.sku?.message}
                  />
                </div>

                <Button type="button" onClick={generateSKU} secondary>
                  {t("purchase.buttons.generateSku")}
                </Button>
              </div>
              
              <Input
                label={t("purchase.image.label")}
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                error={errors.image?.message}
              />

              {imagePreview && (
                <div>
                  <label className="block text-sm font-medium text-muted mb-1">
                {t("purchase.image.previewLabel")}

                  </label>
                  <div className="w-32 h-32 rounded-lg overflow-hidden border border-muted/40">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="description" className="block mb-1">
                {t("purchase.description.label")}
                </label>
                <textarea
                  id="description"
                  rows={4}
                  {...register("description")} 
                  className={`w-full px-3 py-2 border ${errors.description ? "border-destructive" : "border-muted/40"} rounded-md outline-none focus:border-none focus:ring-2 focus:ring-primary`}
                 placeholder={t("purchase.description.placeholder")}

                />
                {errors.description && (
                  <p className="text-destructive text-sm mt-1">{errors.description.message}</p>
                )}
              </div>
            </div>
          </div>

          {price > 0 && cost > 0 && (
            <div className="bg-primary/5 dark:bg-dark/10 rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">💰   {t("purchase.calculations.header")}</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted">  {t("purchase.calculations.profitPerUnit")}</span>
                  <div className="font-semibold text-constructive">
                    ${profitPerUnit}
                  </div>
                </div>
                <div>
                  <span className="text-muted">  {t("purchase.calculations.profitMargin")}</span>
                  <div className="font-semibold text-constructive">
                    {profitMargin}%
                  </div>
                </div>
                <div>
                  <span className="text-muted">  {t("purchase.calculations.totalStockValue")}</span>
                  <div className="font-semibold">
                    ${totalStockValue}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-6 border-t border-muted/40">
            <Link
              to={from} 
              className="px-4 py-2 border border-muted/40 text-muted rounded-lg"
            >
          {t("purchase.buttons.cancel")}
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ?   t("purchase.buttons.saving")
                : isEdit
                ? t("purchase.buttons.update")
                :  t("purchase.buttons.add")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditProduct;