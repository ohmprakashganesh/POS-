import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
// Ensure the path to your mock data is correct!
import { productsData } from '@/data/mockData'; 
import Button from '@/features/ui/Button';
import { useCart } from '../../context/CartContext';
const CProduct = () => {
  // Get the product id from the URL, e.g., /product/8
  const { id } = useParams();
  const productId = parseInt(id, 10); // Convert URL string to a number

  // Find product by id
  const productData = productsData.find((p) => p.id === productId);
  const {addToCart}= useCart();
  

  // --- Product Not Found Error Handler ---
  if (!productData) {
    return (
      <div className="max-w-5xl mx-auto p-6 sm:p-8 lg:p-12 bg-primary-foreground shadow-xl rounded-2xl text-center">
        <p className="text-2xl font-bold text-red-500 dark:text-red-400">
          Product not found.
        </p>
        <p className="text-lg mt-2 text-gray-600 dark:text-gray-400">
          Please check the product ID in the URL. ID received: {id}
        </p>
      </div>
    );
  }

  // --- State for selected tag (if tags exist) ---
  const [selectedTag, setSelectedTag] = useState(
    productData.tags ? productData.tags[0] : ""
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-10 bg-primary-foreground shadow-lg rounded-2xl">
      {/* TOP SECTION: Image and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 mb-8 lg:mb-12">
        {/* IMAGE SECTION */}
        <div className="lg:col-span-2 flex justify-center items-center">
          <div className="w-full max-w-md overflow-hidden rounded-lg shadow-2xl">
            <img
              src={productData.image}
              alt={productData.name}
              className="w-full h-auto aspect-square object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className="lg:col-span-3 space-y-6 text-muted-hover ">
          
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {productData.name}
          </h1>

          {/* Price and Rating */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
            <p className="text-3xl sm:text-4xl font-bold text-secondary">
              ${productData.price.toFixed(2)}
            </p>
          </div>

          {/* Meta Info */}
          <div className="space-y-1 text-muted">
            <p className="text-lg text-muted">
              <span className="font-semibold">Category:</span>{" "}
              {productData.category}
            </p>
            <p className="text-lg ">
              <span className="font-semibold">SKU :</span>{" "}
              {productData.sku}
            </p>
            <p className="text-lg ">
              <span className="font-semibold">Total stock:</span>{" "}
              {productData.stock}
            </p>
          </div>

          {/* Tags (if they exist) */}
          {productData.tags && (
            <div>
              <label className="text-base font-semibold text-muted-hover block mb-3">
                Tags:
                <span className="ml-2 font-normal text-muted">
                  {selectedTag}
                </span>
              </label>
              <div className="flex flex-wrap gap-2">
              </div>
            </div>
          )}
          <div>
            <Button  onClick={() => {
      addToCart(productData); 
      alert("clicked"); 
    }}className="lg:w-1/2 md:w-1/2 w-full   ">Add To Cart </Button>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-5 text-muted-hover">
          Product Details
        </h2>
        <p className="text-base sm:text-lg text-muted leading-relaxed">
          This product is from {productData.source}. It belongs to the{" "}
          <span className="font-semibold text-muted">
            {productData.category}
          </span>{" "}
          category and is highly rated by customers.
        </p>
        </div>
      </div>
    </div>
  );
};

export default CProduct;