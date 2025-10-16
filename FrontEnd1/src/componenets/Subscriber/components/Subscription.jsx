import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Subscription = () => {
  const { user, subscriptionStatus, updateSubscription } = useAuth();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [isProcessing, setIsProcessing] = useState(false);
 const [status, setStatus] = useState(subscriptionStatus)
  
   const  cancelSub=()=>{
       const data= "deActive"
         setStatus("deActive")
         localStorage.setItem('pos_subscription',data);
    }

   const sts= localStorage.getItem('pos_subscription');



  const plans = {
    basic: {
      name: 'Basic',
      monthly: 29,
      yearly: 290, // 2 months free
      features: [
        'Up to 100 products',
        '1 user account',
        'Basic reporting',
        'Email support',
        'Mobile POS access'
      ],
      limitations: [
        'No advanced analytics',
        'No API access',
        'Limited customer support'
      ]
    },
    pro: {
      name: 'Professional',
      monthly: 79,
      yearly: 790, // 2 months free
      features: [
        'Up to 500 products',
        '5 user accounts',
        'Advanced reporting',
        'Priority support',
        'API access',
        'Custom branding',
        'Inventory forecasting'
      ],
      limitations: []
    },
    enterprise: {
      name: 'Enterprise',
      monthly: 199,
      yearly: 1990, // 2 months free
      features: [
        'Unlimited products',
        '20+ user accounts',
        'Custom reporting',
        '24/7 phone support',
        'Full API access',
        'White-label solution',
        'Dedicated account manager'
      ],
      limitations: []
    }
  };

  const handleSubscribe = async (plan) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      updateSubscription('active');
      setIsProcessing(false);
      alert('Subscription activated successfully!');
    }, 2000);
  };

  const handlePayment = (gateway) => {
    // In real app, this would integrate with eSewa/Khalti
    alert(`Redirecting to ${gateway} payment...`);
    handleSubscribe(selectedPlan);
  };

  if (sts === 'active') {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <CheckIcon className="mx-auto h-16 w-16 text-green-500" />
            <h1 className="mt-4 text-3xl font-bold text-gray-900">Subscription Active</h1>
            <p className="mt-2 text-gray-600">
              Your Professional plan is currently active and in good standing.
            </p>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
                <div className="mt-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-blue-900">Professional</span>
                    <span className="text-2xl font-bold text-blue-600">$79</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">per month</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">Billing Information</h3>
                <div className="mt-2 space-y-2 text-sm text-gray-600">
                  <p><strong>Status:</strong> <span className="text-green-600">Active</span></p>
                  <p><strong>Next Billing Date:</strong> February 15, 2024</p>
                  <p><strong>Payment Method:</strong> eSewa (•••• 4242)</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plans.pro.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Update Payment Method
              </button>
              <button onClick={()=>cancelSub() }className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Cancel Subscription
                
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Choose Your Plan</h1>
          <p className="mt-2 text-gray-600">
            Select the plan that works best for your business
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="mt-8 flex justify-center">
          <div className="bg-white rounded-lg p-1 border border-gray-200">
          </div>
        </div>

        {/* Plans Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(plans).map(([key, plan]) => (
            <div
              key={key}
              className={`bg-white rounded-lg shadow-sm border-2 ${
                selectedPlan === key ? 'border-blue-500' : 'border-gray-200'
              } p-6 relative`}
            >
              {selectedPlan === key && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Popular
                  </span>
                </div>
              )}

              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">
                  ${billingCycle === 'monthly' ? plan.monthly : plan.yearly}
                </span>
                <span className="text-gray-600 ml-2">
                  /{billingCycle === 'monthly' ? 'month' : 'year'}
                </span>
              </div>

              {billingCycle === 'yearly' && (
                <p className="mt-2 text-green-600 text-sm font-medium">
                  Save ${(plan.monthly * 12 - plan.yearly)} per year
                </p>
              )}

              <button
                onClick={() => setSelectedPlan(key)}
                className={`w-full mt-6 py-3 px-4 rounded-lg font-semibold ${
                  selectedPlan === key
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {selectedPlan === key ? 'Selected' : 'Select Plan'}
              </button>

              <div className="mt-6 space-y-3">
                <h4 className="font-semibold text-gray-900">Features included:</h4>
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
                {plan.limitations.length > 0 && (
                  <>
                    <h4 className="font-semibold text-gray-900 mt-4">Limitations:</h4>
                    {plan.limitations.map((limitation, index) => (
                      <div key={index} className="flex items-center">
                        <XMarkIcon className="h-5 w-5 text-red-500 mr-2" />
                        <span className="text-gray-700 text-sm">{limitation}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Payment Section */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Complete Subscription</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Selected Plan</h4>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{plans[selectedPlan].name}</span>
                  <span className="text-xl font-bold text-blue-600">
                    ${billingCycle === 'monthly' ? plans[selectedPlan].monthly : plans[selectedPlan].yearly}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {billingCycle === 'monthly' ? 'Per month' : 'Per year'}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Payment Method</h4>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handlePayment('eSewa')}
                  disabled={isProcessing}
                  className="p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 flex items-center justify-center disabled:opacity-50"
                >
                  <span className="font-semibold text-orange-600">eSewa</span>
                </button>
                <button
                  onClick={() => handlePayment('Khalti')}
                  disabled={isProcessing}
                  className="p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 flex items-center justify-center disabled:opacity-50"
                >
                  <span className="font-semibold text-purple-600">Khalti</span>
                </button>
              </div>
            </div>
          </div>

          {isProcessing && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                <span className="text-blue-700">Processing payment...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subscription;