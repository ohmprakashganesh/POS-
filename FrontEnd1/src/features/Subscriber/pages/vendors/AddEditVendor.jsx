import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { VENDORS } from '@/data/mockData';
import {z} from 'zod';
import Button  from '@/features/ui/Button';
import Input  from '@/features/ui/Input';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().optional(),
});
const AddEditVendor = () => {
  const {t}=useTranslation("form")
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting },
    } = useForm({
      resolver: zodResolver(formSchema),
    });
  const [error, setError] = useState("");
  useEffect(() => {
        if (isEdit) {
          const vendor = VENDORS.find((c) => c.id === parseInt(id));
          if (!vendor) return;
          reset({
            name: vendor.name,
            phone: vendor.phone,
            address: vendor.address,
          });
        }
      }, [id, isEdit, reset]);

 

  const onSubmit = async (data) => {
    try {
      // const response=await createnewvendor or edit existing vendor
      console.log("Vendor Data:", data);
      navigate("/vendors");
    }catch (err) {
  setError(`Failed to save vendor: ${err.message}`);
  };
  }

  return (
    <>
       <div className="flex items-center space-x-4">
              <Link
                to="/vendors"
                className="bg-primary/10 hover:bg-primary/30 rounded-full"
              >
                <ArrowLeftIcon className="size-10 p-2" strokeWidth={2.5} />
              </Link>
              <div>
                <h1 className="text-2xl font-bold">
                  {isEdit ? t("vendor.titleUpdate") :t("vendor.titleCreate")}
                </h1>
                <p className="text-muted">
                  {isEdit
                    ? t("vendor.subtitleUpdate")
                    : t("vendor.subtitleCreate")}
                </p>
              </div>
            </div>
               <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-5xl my-5 rounded-md mx-auto bg-white dark:bg-dark p-5 space-y-3"
      >
        <div className="border-b border-muted/40 pb-2">
          <h1 className="font-bold text-2xl">{t("vendor.detailsHeader")}</h1>
          <p className="text-muted">
            {isEdit? t("vendor.detailsSubHeaderUpdate"):t("vendor.detailsSubHeaderCreate")}
    
          </p>
        </div>
        <Input
          id="name"
          type="text"
          placeholder={t("vendor.name.placeholder")}
          label={t("vendor.name.label")}
          {...register("name")}
          disabled={isSubmitting}
          error={errors.name?.message}
        />
        <Input
          id="phone"
          type="tel"
          placeholder={t("vendor.phone.placeholder")}
          label={t("vendor.phone.label")}
          {...register("phone")}
          disabled={isSubmitting}
          error={errors.phone?.message}
        />
        <div className="address">
           <label htmlFor="addressInput" className="block mb-1  capitalize">{t("vendor.address.label")}</label>
           <textarea {...register("address")} rows="3" name="address" id="addressInput" disabled={isSubmitting} placeholder={t("vendor.address.placeholder")}className="w-full border border-muted/40 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed" />
          {errors.address?.message && <p className="text-destructive text-sm mt-1">*{errors.address.message}</p>}
        </div>
        {error && <p className="text-destructive text-sm">*{error}</p>}
        <div className="flex justify-end gap-3">
          <Link
            to="/vendors"
            className="px-4 py-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive-hover"
          >
            {t("vendor.buttons.cancel")}
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? t("vendor.buttons.saving")
              : isEdit
              ? t("vendor.buttons.updateVendor")
              : t("vendor.buttons.addVendor")}
          </Button>
        </div>
      </form>
</>
  );
};

export default AddEditVendor;