// src/components/PricingCard.jsx
import React from 'react';

// Tailwind CSS Icon for Checkmark
const CheckIcon = () => (
  <svg 
    className="w-5 h-5 text-indigo-500 mr-2 flex-shrink-0" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
      d="M5 13l4 4L19 7"
    ></path>
  </svg>
);

const PricingCard = ({ plan }) => {
  // Apply a distinct border/shadow for the popular plan
  const cardClasses = plan.isPopular
    ? "border-4 border-indigo-600 shadow-xl scale-105"
    : "border border-gray-200 shadow-lg";

  return (
    <div className={`
      flex flex-col p-6 mx-auto max-w-lg text-center 
      text-gray-900 bg-white rounded-xl ${cardClasses} 
      transform transition duration-300 hover:shadow-2xl hover:scale-[1.02]
    `}>
      <h3 className="mb-4 text-2xl font-semibold">{plan.name}</h3>
      
      {/* Popular Badge */}
      {plan.isPopular && (
        <span className="bg-indigo-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4 inline-block self-center">
          Most Popular
        </span>
      )}

      {/* Price */}
      <div className="flex justify-center items-baseline my-8">
        <span className="mr-2 text-5xl font-extrabold">{plan.price}</span>
        <span className="text-gray-500 dark:text-gray-400">{plan.duration}</span>
      </div>

      {/* Feature List */}
      <ul role="list" className="mb-8 space-y-4 text-left">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <CheckIcon />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button 
        type="button"
        className={`
          mt-auto py-3 px-5 text-sm font-medium rounded-lg 
          text-center transition duration-200 ease-in-out
          ${plan.buttonClass}
        `}
      >
        {plan.buttonText}
      </button>
    </div>
  );
};

export default PricingCard;