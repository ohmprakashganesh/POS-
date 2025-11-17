import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { customersData } from "../../../../data/mockData";
import Input from "@/features/ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/features/ui/Button";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().optional(),
  address: z.string().optional(),
});

const AddEditCashier = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

    useEffect(() => {
      if (isEdit) {
        const customer = customersData.find((c) => c.id === parseInt(id));
        if (!customer) return;
        reset({
          name: customer.name,
          phone: customer.phone,
          email: customer.email,
          address: customer.address,
        });
      }
    }, [id, isEdit, reset]);

  const onSubmit = async (data) => {
    try {
      // const response=await createnewcashier or edit existing cashier
      console.log("Cashier Data:", data);
      navigate("/cashierList");
    }catch (err) {
  setError(`Failed to save cashier: ${err.message}`);
}
  };
  return (
    <>
      <div className="flex items-center space-x-4">
        <Link
          to="/cashierList"
          className="bg-primary/10 hover:bg-primary/30 rounded-full"
        >
          <ArrowLeftIcon className="size-10 p-2" strokeWidth={2.5} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">
            {isEdit ? "Update Cashier Profile" : "Create a New Cashier"}
          </h1>
          <p className="text-muted">
            {isEdit
              ? "Review and Update Cashier's details"
              : "Add a new Cashier to your system"}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-5xl my-10 rounded-md mx-auto bg-white p-5 space-y-5"
      >
        <div className="border-b border-b-gray-200 pb-2">
          <h1 className="font-bold text-2xl">Cashier Details</h1>
          <p className="text-muted">
            {isEdit? "Update necessary details":"Provide details for new cashier"}
    
          </p>
        </div>
        <Input
          id="name"
          placeholder="Enter cashier's name"
          label="Full Name *"
          {...register("name")}
          disabled={isSubmitting}
          error={errors.name?.message}
        />
        <Input
          id="phone"
          type="tel"
          placeholder="+977 98XXXXXXXX"
          label="Phone Number *"
          {...register("phone")}
          disabled={isSubmitting}
          error={errors.phone?.message}
        />
        <Input
          id="email"
          type="email"
          placeholder="cashier@example.com"
          label="Email Address"
          {...register("email")}
          disabled={isSubmitting}
          error={errors.email?.message}
        />
        <div className="address">
           <label htmlFor="addressInput" className="block mb-1  capitalize">Address</label>
           <textarea {...register("address")} rows="5" name="address" id="addressInput" disabled={isSubmitting} placeholder="Enter cashier's address" className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed" />
          {errors.address?.message && <p className="text-destructive text-sm mt-1">*{errors.address.message}</p>}
        </div>
        {error && <p className="text-destructive text-sm">*{error}</p>}
        <div className="flex justify-end gap-3">
          <Link
            to="/cashierList"
            className="px-4 py-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive-hover"
          >
            Cancel
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : isEdit
              ? "Update Cashier"
              : "Add Cashier"}
          </Button>
        </div>
      </form>

     
    </>
  );
};

export default AddEditCashier;
