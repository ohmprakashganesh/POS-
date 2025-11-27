import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { DUMMY_PRODUCTS } from "../../../../data/mockData";
import { OptionComponent, SelectComponent } from "@/features/ui/Select";
import Input from "@/features/ui/Input";
import { useTranslation } from "react-i18next";


const ProductList = () => {
    const location=useLocation();
   const returnPath=location.pathname;
   const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [product, setProduct] = useState(null);
  const[langState,setLangState]=useState(false);
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h1 className="text-2xl font-bold uppercase">
            {t("item.title")}
          </h1>
          <p className="text-muted">{t("item.description")}</p>
        </div>
         <Link
              to="/products/add"
              state={{from:returnPath}}
              className="inline-flex gap-2 items-center px-4 py-2 text-primary-foreground font-semibold hover:bg-primary-hover bg-primary rounded-md  transition-colors"
            >
              <PlusIcon className="size-5" strokeWidth={3} />
            {t("dashboard.quickActions.addProduct")}
            </Link>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted" />
          <Input placeholder={t("item.search")} value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} className="pl-9  bg-white dark:bg-dark" />

        </div>
        <SelectComponent value={selectedCategory} setLangState={setLangState} langState={langState} onChange={(e) => setSelectedCategory(e.target.value)} placeholder="Select a Category" className="bg-white dark:bg-dark">
          {categories.map((category, index) => (
            <OptionComponent key={index} value={category}>
              {category === "all" ? t("item.all") : category}
            </OptionComponent>
          ))}
        </SelectComponent>

      </div>


      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-5">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group  relative flex flex-col  bg-white dark:bg-dark shadow-sm rounded-md hover:-translate-y-px transition-transform"
          >
            <div className="top-options  w-full flex items-center justify-between p-2 h-12">
              {/* Stock badge */}
              <span
                className={`inline-flex  items-center px-2.5 py-1 rounded-full text-xs font-medium ${product.stock <= 10
                    ? "bg-destructive/15 hover:bg-destructive/20 text-destructive"
                    : "bg-constructive/15 hover:bg-constructive/20 text-constructive"
                  }`}
              >
                {product.stock <= 10 ? product.stock == 0 ? t("item.outOfStock") : t("item.lowStock") : t("item.inStock")}
              </span>

              {/* Three-dot menu */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown(product.id);
                }}
                className="p-2 rounded-full hover:bg-black/10 text-muted hover:text-muted-hover"
              >
                <EllipsisVerticalIcon className="h-5 w-5" />
              </button>

              {openDropdownId === product.id && <>
                <div
                  className="absolute animate-fade-slide-in z-100 right-2 top-12  w-44 bg-background  rounded-md shadow-lg  overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Link
                    to={`/products/edit/${product.id}`}
                    state={{ product }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-muted hover:bg-primary/30 hover:text-primary transition-colors duration-200"
                  >
                    <span>✏️</span> Edit
                  </Link>

                  <button
                    onClick={() => handleUpdate(product)}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-muted hover:bg-destructive/30 hover:text-destructive transition-colors duration-200 border-t border-gray-100"
                  >
                    <span>🗑️</span> Delete
                  </button>
                </div>
                <div className="overlay absolute  inset-0 z-50" onClick={() => toggleDropdown(product.id)} />
              </>
              }

            </div>
            
            {/* Product image */}
            <Link to={`/product/${product.id}`} className="p-2 grow flex flex-col ">
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
                <h3 className="text-lg font-semibold line-clamp-2 leading-tight">
                  {product.name}
                </h3>
                <div className="details">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-muted">{t("item.rs")}</span>
                    <span className="text-xl text-muted-hover font-bold">
                      {product.price}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <span className="text-xs text-muted">{t("item.available")}</span>
                    <span
                      className={`text-sm font-semibold ${product.stock <= 10
                          ? "text-red-600"
                          : "text-green-600"
                        }`}
                    >
                      {product.stock} {t("item.units")}
                    </span>
                  </div>
                </div>

              </div>
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProductList;
