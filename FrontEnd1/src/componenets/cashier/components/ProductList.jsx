import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";
import { productsData } from "../../../data/mockData";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [product, setProduct] = useState(null);
  const col = "";
  useEffect(() => {
    // In real app, this would be an API call
    setProducts(productsData);
    setFilteredProducts(productsData);
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);
  const categories = ["all", ...new Set(products.map((p) => p.category))];

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== productId));
    }
  };
  const handleUpdate = (product) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProduct(product);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>

          <div className="text-sm text-gray-600 flex items-center">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        {/* Grid Container */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-2">
          {filteredProducts.map((product) => (
            // Product Card
            <div
              key={product.id}
              className=" rounded-lg  shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {/* Checkbox and Product Image */}
              <div className="relative p-4 pb-0 flex flex-col items-center">
                <img
                  src={
                    product.image ||
                    "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80"
                  }
                  alt={product.name}
                  className="w-full hover:scale-110 rounded-md hover:rounded-t-xl transition-all duration-300 max-h-48 object-contain mb-3"
                  style={{ objectFit: "contain" }}
                />
              </div>

              <div className="p-2 pt-0">
                <h3 className="text-sm font-semibold text-gray-900 mb-">
                  {product.name}
                </h3>
                <div className=" text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Price</span>
                    <span className="font-medium text-gray-900">
                      {product.price}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="">stock</span>
                    <span
                      className={`font-medium ${
                        product.stock <= 10
                          ? "text-red-600"
                          : "text-green-700"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </div>
                </div>
              </div>

            
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
