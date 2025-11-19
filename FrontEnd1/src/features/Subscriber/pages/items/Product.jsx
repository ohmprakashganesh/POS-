import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { DUMMY_PRODUCTS } from '@/data/mockData';
import Button from '@/features/ui/Button';
import { ArrowLeftIcon } from 'lucide-react';

const Product = () => {
  // Get the product id from the URL
  const { id } = useParams();
  const productId = parseInt(id, 10); // Convert to number

  // Find product by id
  const productData = DUMMY_PRODUCTS.find((p) => p.id === productId);

  // If no product found, show a message
  if (!productData) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-10 bg-white dark:bg-dark shadow-xl rounded-2xl text-center">
        <p className="text-2xl font-bold text-destructive">Product not found.</p>
      </div>
    );
  }

  // State to manage selected tag (optional) 
  const [selectedTag, setSelectedTag] = useState(
    productData.tags ? productData?.tags[0] : ""
  );

  return (
    <>
      <Link
            to="/products"
            className="flex items-center justify-center mb-5 size-10 p-2 text-muted bg-primary/10 hover:bg-primary/30 rounded-full"
          >
            <ArrowLeftIcon className="h-full w-full" strokeWidth={2.5} />
          </Link>
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
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            {productData.name}
          </h1>

          {/* Price & Rating */}
          <div className="flex items-center justify-between border-b pb-4 border-muted/40">
            <p className="text-4xl font-bold text-destructive">
              ${productData.price.toFixed(2)}
            </p>
            <div className="flex items-center space-x-2 text-tertiary">
              <span className="text-xl">★★★★★</span>
              <span className="text-lg font-medium">
                {productData.rating} / 5 ({productData.reviews} reviews)
              </span>
            </div>
          </div>

          {/* Source & Minimum Order */}
          <p className="text-lg text-muted">
            <span className="font-semibold">Source:</span> {productData.source}
          </p>
          <p className="text-lg text-muted">
            <span className="font-semibold">Minimum Order:</span>{" "}
            {productData.minOrder}
          </p>

          {/* Tags */}
          {productData.tags && (
            <div className="space-y-2">
              <label className="text-base font-semibold  block mb-2">
                Tags:
                <span className="ml-2 font-normal text-muted">
                  {selectedTag}
                </span>
              </label>
              <div className="flex flex-wrap gap-3">
                {productData.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition duration-150 ease-in-out ${
                      tag === selectedTag
                        ? "bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm outline-none"
                        : "border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
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
              <Button className="bg-constructive hover:bg-constructive-hover text-constructive-foreground">
                Add to Cart
              </Button>
            ) : (
              <p className="text-2xl font-bold text-destructive p-4 border border-destructive rounded-lg text-center">
                Currently Out of Stock
              </p>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="pt-3 border-t border-muted/40">
        <h2 className="text-3xl font-bold">
          Product Details
        </h2>
        <p className="text-muted leading-relaxed space-y-4">
          This product is from {productData.source}. It belongs to the{" "}
          {productData.category} category and is highly rated by customers.
        </p>
      </div>
    </>
  );
};



export default Product
