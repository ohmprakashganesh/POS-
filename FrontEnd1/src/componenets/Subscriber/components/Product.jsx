import React from 'react'

const Product = () => {


// --- Mock Product Data ---
const productData = {
  id: 1,
  name: "Premium Wireless Noise-Cancelling Headphones",
  price: 199.99,
  // NOTE: Replace this with a real image URL
  imageUrl: "https://via.placeholder.com/600x600?text=Product+Image", 
  shortDescription: "Experience crystal-clear audio with deep bass and comfortable over-ear cushions.",
  description: "Crafted for audiophiles and travelers alike, these headphones deliver an unmatched listening experience. They feature advanced active noise cancellation (ANC), a 30-hour battery life, and a quick-charge function that gives you 5 hours of playback in just 15 minutes. The ergonomic design ensures long-term comfort, making them perfect for long flights or marathon coding sessions.",
  rating: 4.8,
  inStock: true,
  options: [
    { type: 'Color', values: ['Black', 'Silver', 'Midnight Blue'] },
    { type: 'Size', values: ['Standard'] },
  ]
};


  // State to manage user selection (e.g., color)
  const [selectedColor, setSelectedColor] = useState(productData.options[0].values[0]);

  return (
    // Main Container: Centered, max width, padding, white background, shadow
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-10 bg-white shadow-xl rounded-2xl">
      
      {/* 1. TOP SECTION: Left Image, Right Details */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 mb-10">
        
        {/* LEFT SIDE: Image Column (2/5 width on desktop) */}
        <div className="md:col-span-2">
          <div className="w-full h-auto overflow-hidden rounded-lg shadow-2xl">
            <img 
              src={productData.imageUrl} 
              alt={productData.name} 
              className="w-full aspect-square object-cover" 
            />
          </div>
        </div>

        {/* RIGHT SIDE: Details Column (3/5 width on desktop) */}
        <div className="md:col-span-3 space-y-6">
          
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            {productData.name}
          </h1>

          {/* Price and Rating */}
          <div className="flex items-center justify-between border-b pb-4 border-gray-100">
            <p className="text-4xl font-bold text-red-600">
              ${productData.price.toFixed(2)}
            </p>
            <div className="flex items-center space-x-2 text-yellow-500">
              <span className="text-xl">★★★★★</span>
              <span className="text-lg font-medium">
                {productData.rating} / 5
              </span>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-lg text-gray-600">
            {productData.shortDescription}
          </p>

          {/* Product Options */}
          <div className="space-y-5">
            {productData.options.map((option) => (
              <div key={option.type}>
                <label className="text-base font-semibold text-gray-900 block mb-2">
                  {option.type}: 
                  <span className="ml-2 font-normal text-gray-600">
                     {option.type === 'Color' ? selectedColor : option.values[0]} 
                  </span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {option.values.map((value) => (
                    <button 
                      key={value}
                      onClick={() => option.type === 'Color' && setSelectedColor(value)}
                      className={`
                        px-4 py-2 border rounded-full text-sm font-medium transition duration-150 ease-in-out
                        ${option.type === 'Color' && value === selectedColor 
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' 
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }
                      `}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="pt-4">
            {productData.inStock ? (
              <button 
                className="w-full py-4 text-xl font-bold text-white bg-green-600 rounded-xl shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition ease-in-out duration-200"
              >
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

      {/* 2. BOTTOM SECTION: Full-Width Description */}
      <div className="mt-8 pt-8 border-t border-gray-300">
        <h2 className="text-3xl font-bold mb-5 text-gray-900">
          Detailed Product Description
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed space-y-4">
          {productData.description}
        </p>
      </div>
    </div>
  );
};



export default Product
