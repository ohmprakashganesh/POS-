import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { DUMMY_PRODUCTS } from '@/data/mockData';

const Product = () => {
  // Get the product id from the URL
  const { id } = useParams();
  const productId = parseInt(id, 10); // Convert to number

  // Find product by id
  const productData = DUMMY_PRODUCTS.find((p) => p.id === productId);

  // If no product found, show a message
  if (!productData) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-10 bg-white shadow-xl rounded-2xl text-center">
        <p className="text-2xl font-bold text-red-500">Product not found.</p>
      </div>
    );
  }

  // State to manage selected tag (optional) 
  const [selectedTag, setSelectedTag] = useState(
    productData.tags ? productData?.tags[0] : ""
  );

  return (
   <div className="max-w-6xl  mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-lg rounded-2xl">
  {/* TOP SECTION */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 ">
    {/* Image */}
    <div>
      <div className="w-full overflow-hidden rounded-xl shadow-lg">
        <img
          src={productData.image}
          alt={productData.name}
          className="w-full h-auto object-cover aspect-square sm:aspect-video"
        />
      </div>
    </div>

    {/* Details */}
    <div className="space-y-5">
      <h1 className="text-2xl   sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">
        {productData.name}
      </h1>

      {/* Price */}
      <div className="flex items-center justify-between border-b pb-3 border-gray-200">
        <p className="text-3xl sm:text-4xl font-bold text-orange-500">
          Rs. {productData.price.toFixed(2)}
        </p>
      </div>

      {/* Source & Stock */}
      <div className="space-y-1">
        <p className="text-base sm:text-lg text-gray-700">
          <span className="font-semibold">Source:</span> {productData.source}
        </p>
        <p className="text-base sm:text-lg text-gray-700">
          <span className="font-semibold">Current Stock:</span>{" "}
          {productData.stock}
        </p>
        <p className='text-base sm:text-lg text-gray-700'>SKU: {productData.sku}</p>
      </div>

      {/* Tags */}
      {productData.tags && (
        <div className="space-y-2">
          <label className="text-base font-semibold text-gray-900 block">
            Tags:
            <span className="ml-2 font-normal text-gray-600">
              {selectedTag}
            </span>
          </label>
          <div className="flex flex-wrap gap-2">
            {productData.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 border rounded-full text-sm font-medium transition duration-150 ease-in-out ${
                  tag === selectedTag
                    ? "bg-orange-500 text-white border-orange-500 shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CP & SP */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-base sm:text-lg text-gray-800 font-medium">
        <p>
          Cost Price:{" "}
          <span className="bg-red-100 px-3 py-1 rounded-full">
            ${productData.purchase_price}
          </span>
        </p>
        <p>
          Selling Price:{" "}
          <span className="bg-green-100 px-3 py-1 rounded-full">
            ${productData.selling_price}
          </span>
        </p>
      </div>

      {/* Action */}
      <div className="pt-3">
        {productData.stock > 0 ? (
          <button className="w-full py-3 text-lg sm:text-xl font-semibold text-white bg-green-600 rounded-xl shadow-md hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-400 transition duration-200">
            Stock Available
          </button>
        ) : (
          <p className="text-lg sm:text-xl font-bold text-red-500 p-3 border border-red-400 rounded-lg text-center">
            Currently Out of Stock
          </p>
        )}
      </div>
    </div>
  </div>

  {/* BOTTOM SECTION */}
  <div className=" border-t border-gray-200">
    <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-orange-500">
      Product Details
    </h2>
    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
      {productData.description}
    </p>
  </div>
</div>

  );
};



export default Product
