import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  CubeIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { DUMMY_PRODUCTS } from "../../../data/mockData";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [product, setProduct] = useState(null);
  const col = "";

  const [openDropdownId, setOpenDropdownId] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };
  useEffect(() => {
    // In real app, this would be an API call
    setProducts(DUMMY_PRODUCTS);
    setFilteredProducts(DUMMY_PRODUCTS);
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
  console.log("category", categories);

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 uppercase">
            Products Inventory
          </h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <Link
          to="/products/add"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Product
        </Link>
      </div>
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
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>

          <div className="text-sm text-gray-600 flex items-center">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>
      </div>

      {/* product card  */}
     <div className="p-4 sm:p-6">
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-4 gap-2">
    {filteredProducts.map((product) => (
      <div
        key={product.id}
        className="relative rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white cursor-pointer"
      >
        {/* Three-dot menu */}
        <div className="absolute top-3 right-3 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent navigation when clicking menu
              toggleDropdown(product.id);
            }}
            className="p-1 rounded-full hover:bg-gray-100 shadow"
          >
            <EllipsisVerticalIcon className="h-6 w-6 text-gray-600 hover:text-black" />
          </button>

          {openDropdownId === product.id && (
            <div
              className="
                absolute right-0 mt-2 
                w-40 sm:w-44 md:w-48 lg:w-52 
                bg-white border border-gray-200 
                rounded-lg shadow-xl 
                z-50
              "
              onClick={(e) => e.stopPropagation()} // prevent route change when clicking inside dropdown
            >
              <Link
                to={`/products/edit/${product.id}`}
                state={{ product }}
                className="
                  block w-full text-left 
                  px-4 py-2 
                  text-sm sm:text-base 
                  text-gray-700 hover:bg-gray-100 
                  transition-colors duration-200
                "
              >
                Edit
              </Link>

              <button
                onClick={() => handleUpdate(product)}
                className="
                  w-full text-left 
                  px-4 py-2 
                  text-sm sm:text-base 
                  text-gray-700 hover:bg-gray-100 
                  transition-colors duration-200
                "
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Product Card Click → Navigate to Product Details */}
        <Link
          to={`/product/${product.id}`}
          className="block"
        >
          {/* Product Image */}
          <div className="p-4 pb-0 flex flex-col items-center">
            <img
              src={
                product.image ||
                "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80"
              }
              alt={product.name}
              className="w-full hover:scale-110 hover:rounded-t-xl transition-all duration-300 max-h-48 object-contain mb-3"
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between h-full">
            <div className="p-2 pt-0 flex-1">
              <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 h-10">
                {product.name}
              </h3>
              <div className="text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-orange-700">
                    Rs. <span className="text-xl">{product.price}</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Stock</span>
                  <span
                    className={`font-medium ${
                      product.minOrder <= 10
                        ? "text-red-600"
                        : "text-green-700"
                    }`}
                  >
                    {product.minOrder}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default ProductList;
