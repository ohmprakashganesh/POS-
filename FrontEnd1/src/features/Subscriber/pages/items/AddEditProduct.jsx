import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { DUMMY_PRODUCTS } from "@/data/mockData";

import { VENDORS as Vendors } from "@/data/mockData";
import Button from "@/features/ui/Button";
import Input from "@/features/ui/Input";
import { OptionComponent, SelectComponent } from "@/features/ui/Select";
const AddEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const product = DUMMY_PRODUCTS.filter((prod) => prod.id == id);
  const [formData, setFormData] = useState({
    name: "",
    vendor: "",
    category: "",
    price: "",
    cost: "",
    stock: "",
    sku: "",
    description: "",
    image: "",
    purchase_date: "",
    expiry_date: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (isEdit && product) {
      setFormData({
        name: product.name || "",
        vendor: product.vendor || "",
        category: product.category || "",
        price: product.selling_price?.toString() || "", // ✅ map selling_price → price
        cost: product.purchase_price?.toString() || "", // ✅ map purchase_price → cost
        stock: product.stock?.toString() || "",
        sku: product.sku || "",
        description: product.description || "",
        image: product.image || "",
        purchase_date: product.purchase_date,
        expiry_date: product.expiry_date || "", // ✅ map expiry_date → expiry
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateSKU = () => {
    const prefix = formData.category
      ? formData.category.substring(0, 3).toUpperCase()
      : "PRO";
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    setFormData((prev) => ({
      ...prev,
      sku: `${prefix}-${random}`,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (parseFloat(formData.stock) < 0) {
      setError("Stock cannot be negative");
      return;
    }

    if (parseFloat(formData.price) < 0 || parseFloat(formData.cost) < 0) {
      setError("Price and cost cannot be negative");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Product saved:", formData);
      setIsLoading(false);
      navigate("/products");
    }, 1000);
  };

  const categories = [
    "Electronics",
    "Accessories",
    "Audio",
    "Computers",
    "Mobile",
    "Home",
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/products"
            className="p-2 text-muted bg-primary/10 hover:bg-primary/30 rounded-full"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">
              {isEdit ? "Edit Product" : "Add New Product"}
            </h1>
            <p className="text-muted">
              {isEdit
                ? "Update product information"
                : "Add a new product to your inventory"}
            </p>
          </div>
          <div></div>
        </div>
      </div>

      {error && (
        <div className="bg-white dark:bg-dark text-destructive px-4 py-3 rounded-md">
          * {error}
        </div>
      )}

      <div className="bg-white dark:bg-dark rounded-md shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-5">
              <Input
                label="Product Name *"
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
              />

                <div>
                <label htmlFor="category" className="block  mb-1">
                  Vendor *
                </label>
                <select
                  id="vendor"
                  name="vendor"
                  required
                  value={formData.vendor}
                  onChange={handleChange}
                 className="w-full px-3 py-2 border border-muted/40 focus:border-none outline-none rounded-lg focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a Vendor</option>
                  {Vendors.map(vendor => (
                    <option key={vendor.id} value={vendor.name}>{vendor.name}</option>
                  ))}
                </select>
              </div>

               <div>
                <label htmlFor="category" className="block mb-1">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-muted/40 focus:border-none outline-none rounded-lg focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Cost Price ($) *"
                  type="number"
                  id="cost"
                  name="cost"
                  step="0.01"
                  min="0"
                  required
                  value={formData.cost}
                  onChange={handleChange}
                  placeholder="0.00"
                />
                <Input
                  label=" Sale Price ($) *"
                  type="number"
                  id="price"
                  name="price"
                  step="0.01"
                  min="0"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label=" purchase Date"
                  type="date"
                  id="purchase"
                  name="purchase"
                  value={formData.purchase_date}
                  onChange={handleChange}
                  placeholder="0.00"
                />
                <Input
                  label="Expiry Date"
                  type="date"
                  id="expiry"
                  name="expiry"
                  value={formData.expiry_date}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              </div>
              <Input
                label="Stock Quantity *"
                type="number"
                id="stock"
                name="stock"
                min="0"
                required
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
              />
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              <div className="flex gap-2 items-end">
                <div className="grow">
                  <Input
                    label="SKU CODE *"
                    type="text"
                    id="sku"
                    name="sku"
                    required
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="e.g., ELEC-12345"
                  />
                </div>

                <Button type="button" onClick={generateSKU} secondary>
                  Generate
                </Button>
              </div>
              <Input
                label="Product Image"
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setFormData((prev) => ({
                      ...prev,
                      image: file, // store file object
                      imagePreview: URL.createObjectURL(file), // create preview URL
                    }));
                  }
                }}
              />

              {formData.imagePreview && (
                <div>
                  <label className="block text-sm font-medium text-muted mb-1">
                    Image Preview
                  </label>
                  <div className="w-32 h-32 rounded-lg overflow-hidden">
                    <img
                      src={formData.imagePreview}
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
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-muted/40 rounded-md outline-none focus:border-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter product description..."
                />
              </div>
            </div>
          </div>

          {/* Profit Calculation */}
          {formData.price && formData.cost && (
            <div className="bg-white dark:bg-dark rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Profit Calculation</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted">Profit per unit:</span>
                  <div className="font-semibold text-constructive">
                    $
                    {(
                      parseFloat(formData.price) - parseFloat(formData.cost)
                    ).toFixed(2)}
                  </div>
                </div>
                <div>
                  <span className="text-muted">Profit margin:</span>
                  <div className="font-semibold text-constructive">
                    {(
                      ((parseFloat(formData.price) -
                        parseFloat(formData.cost)) /
                        parseFloat(formData.price)) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </div>
                <div>
                  <span className="text-muted">Total stock value:</span>
                  <div className="font-semibold">
                    $
                    {(
                      parseFloat(formData.cost) *
                      parseFloat(formData.stock || 0)
                    ).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-6 border-t border-muted/40">
            <Link
              to="/products"
              className="px-4 py-2 border border-muted/40 text-muted rounded-lg"
            >
              Cancel
            </Link>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? "Saving..."
                : isEdit
                ? "Update Product"
                : "Add Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditProduct;
