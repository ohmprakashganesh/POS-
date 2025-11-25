import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import toast, { Toaster } from 'react-hot-toast';
import { 
  MagnifyingGlassIcon, 
} from '@heroicons/react/24/outline';
import { productsData } from '@/data/mockData';
import { useCart } from '../../context/CartContext';
import Input from '@/features/ui/Input';

const Pos = () => {
  const [t]= useTranslation("cashier");

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
   const {addToCart}=useCart();

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const filteredProducts = products.filter(product =>{
    const term=searchTerm.toLowerCase();
    return(
  product.name.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)||
    product.price.toString().includes(term)
    );
  });
  


  return (
    <div className="h-full w-full flex flex-col lg:flex-row gap-6">
      {/* Left Panel - Product Selection */}
      <div className="flex-1  border-b-muted-foreground ">
        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder={t("general.searchProducts")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className=" border w-full max-w-sm   bg-white dark:bg-dark border-muted/40  rounded-lg focus:border-muted"
            />
          </div>
        </div>
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-5">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => {addToCart(product),toast.success("successfully added to cart")}}
            className="group relative cursor-pointer flex flex-col bg-white dark:bg-dark shadow-sm rounded-md"
          >
            {/* Product image */}
            <div  className="p-2 grow flex bg-white dark:bg-dark flex-col ">
              <img
                src={
                  product.image ||
                  "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80"
                }
                alt={product.name}
                className="inline-block w-full aspect-[16/9]  rounded-md"
              />
             <Toaster
  containerClassName="top-5 right-5"
  toastOptions={{
    className:
      "bg-white dark:bg-dark text-black dark:text-white shadow-lg rounded-md",
  }}
/>

              {/* Product Details */}
              <div className="mt-1.5 grow  flex flex-col justify-between">
                <h3 className="text-lg font-semibold line-clamp-2 leading-tight">
                  {product.name}
                </h3>
                <div className="details">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-muted-hover ">{t("products.rs")}</span>
                    <span className="text-md text-muted-hover font-bold">
                      {product.price}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-muted/40">
                    <span className="text-xs text-muted-hover">{t("products.available")}</span>
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
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Pos;

