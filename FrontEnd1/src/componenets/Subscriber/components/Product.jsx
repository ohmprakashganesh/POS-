import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { DUMMY_PRODUCTS } from "../../../data/mockData";

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
    productData.tags ? productData.tags[0] : ""
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-10 bg-white shadow-xl rounded-2xl">
      {/* TOP SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 mb-10">
        {/* Image */}
        <div className="md:col-span-2">
          <div className="w-full h-auto overflow-hidden rounded-lg shadow-2xl">
            <img
              src={productData.image}
              alt={productData.name}
              className="w-full aspect-square object-cover"
            />
          </div>
        </div>

        {/* Details */}
        <div className="md:col-span-3 space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            {productData.name}
          </h1>

          {/* Price & Rating */}
          <div className="flex items-center justify-between border-b pb-4 border-gray-100">
            <p className="text-4xl font-bold text-red-600">
              ${productData.price.toFixed(2)}
            </p>
            <div className="flex items-center space-x-2 text-yellow-500">
              <span className="text-xl">★★★★★</span>
              <span className="text-lg font-medium">
                {productData.rating} / 5 ({productData.reviews} reviews)
              </span>
            </div>
          </div>

          {/* Source & Minimum Order */}
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Source:</span> {productData.source}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Minimum Order:</span>{" "}
            {productData.minOrder}
          </p>

          {/* Tags */}
          {productData.tags && (
            <div className="space-y-2">
              <label className="text-base font-semibold text-gray-900 block mb-2">
                Tags:
                <span className="ml-2 font-normal text-gray-600">
                  {selectedTag}
                </span>
              </label>
              <div className="flex flex-wrap gap-3">
                {productData.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 border rounded-full text-sm font-medium transition duration-150 ease-in-out ${
                      tag === selectedTag
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-lg"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-4">
            {productData.minOrder > 0 ? (
              <button className="w-full py-4 text-xl font-bold text-white bg-green-600 rounded-xl shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition ease-in-out duration-200">
                Add to Cart
              </button>
            ) : (
              <p className="text-2xl font-bold text-red-500 p-4 border border-red-500 rounded-lg text-center">
                Currently Out of Stock
              </p>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="mt-8 pt-8 border-t border-gray-300">
        <h2 className="text-3xl font-bold mb-5 text-gray-900">
          Product Details
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed space-y-4">
          This product is from {productData.source}. It belongs to the{" "}
          {productData.category} category and is highly rated by customers.
        </p>
      </div>
    </div>
  );
};

export default Product;
