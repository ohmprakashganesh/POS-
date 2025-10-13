// src/components/SubscriptionComponent.jsx
import React from 'react';
import PricingCard from './PricingCard';
import { pricingPlans } from '../../data/mockData/pricingPlans'; // Import the data

const SubscriptionComponent = () => {
  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose a plan that’s right for your business
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Simple, transparent pricing that grows with you.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default SubscriptionComponent;