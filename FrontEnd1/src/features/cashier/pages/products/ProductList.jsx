import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Translation, useTranslation } from "react-i18next";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";
import { productsData } from "@/data/mockData";
import { EllipsisVerticalIcon } from "lucide-react";
import Input from "@/features/ui/Input";
import { OptionComponent, SelectComponent } from "@/features/ui/Select";

const ProductList = () => {
  const {t}=useTranslation("cashier");
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
      <div className=" rounded-lg  ">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ">
          <div className="relative">
            <Input
              type="text"
              placeholder={t("products.searchProducts")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-dark"
            />
          </div>

          <SelectComponent
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white dark:bg-dark"
          >
            {categories.map((category) => (
              <OptionComponent  key={category} value={category}>
               {category === "all" ?t("general.allCategories") : category}
              </OptionComponent>
            ))}
          </SelectComponent>
        </div>
      </div>
      <div >
        {/* Grid Container */}
       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-5">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group relative flex flex-col bg-white dark:bg-black border-muted/40 shadow-sm rounded-md"
          >
            <div className="top-options  w-full flex items-center justify-between p-2 h-12">
              {/* Stock badge */}
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${product.stock <= 10
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                  }`}                                   
              >
                {product.stock <= 10 ? product.stock == 0 ? t("products.outOfStock") : t("products.inStock"): t("products.inStock") }
              </span>
            </div>
            
            {/* Product image */}
            <Link to={`/c-product/${product.id}`} className="p-2 grow flex flex-col ">
              <img
                src={
                  product.image ||
                  "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80"
                }
                alt={product.name}
                className="inline-block w-full aspect-video  rounded-md"
              />
              {/* Product Details */}
              <div className="mt-1.5 grow  flex flex-col justify-between">
                <h3 className="text-lg font-semibold line-clamp-2 text-muted-hover leading-tight">
                  {product.name}
                </h3>
                <div className="details">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-muted">{t("products.rs")}</span>
                    <span className="text-md text-muted-hover font-bold">
                      {product.price}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-muted/40">
                    <span className="text-xs text-muted">{t("products.available")}</span>
                    <span
                      className={`text-sm font-semibold ${product.stock <= 10
                          ? "text-red-600"
                          : "text-green-600"
                        }`}
                    >
                      {product.stock} {t("products.units")}
                    </span>
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
