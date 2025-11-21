import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { CheckIcon, HomeModernIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { ArrowRight, HandIcon, HomeIcon, Move3dIcon, MoveRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { plans } from '@/data/mockData';
import Button from '@/features/ui/Button';

const Subscription = () => {
  const navigate= useNavigate();
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
      <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <CheckIcon className="mx-auto h-16 w-16 text-green-500" />
            <h1 className="mt-4 text-3xl font-bold text-dark dark:text-white">Subscription Active</h1>
            <p className="mt-2 text-muted-hover">
              Your Professional plan is currently active and in good standing.
            </p>
          </div>

          <div className="mt-8 bg-white dark:bg-dark rounded-lg shadow-sm border  p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-dark dark:text-white ">Current Plan</h3>
                <div className="mt-2 p-4 bg-background   shadow-md ">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-blue-900 ">Professional</span>
                    <span className="text-2xl font-bold text-blue-600">$79</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">per month</p>
                </div>
              </div>

              <div >
                <h3 className="text-lg font-semibold text-dark dark:text-white">Billing Information</h3>
                <div className="mt-2 space-y-2 text-sm text-muted-hover className='mt-2 p-4 bg-background   shadow-md rounded-lg ">
                  <p><strong>Status:</strong> <span className="text-green-600">Active</span></p>
                  <p><strong>Next Billing Date:</strong> February 15, 2024</p>
                  <p><strong>Payment Method:</strong> eSewa (•••• 4242)</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 ">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan Features</h3>
              <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
                {plans.pro.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <div>
              </div>
            </div>
            <div className="mt-6 flex justify-center   ">
               <Button className='w-full max-w-sm gap-5 '>  <Link to='/subscriber' className='flex gap-5'> <p> Move To Home</p><HomeIcon/> </Link> </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-3 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Choose Your Plan</h1>
          <p className="mt-2 text-gray-600">
            Select the plan that works best for your business
          </p>
        </div>



        {/* Plans Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(plans).map(([key, plan]) => (
            <div
              key={key}
              className={`bg-white rounded-lg shadow-sm border-2 ${
                selectedPlan === key ? 'border-green-500' : 'border-gray-200'
              } p-6 relative`}
            >
              {selectedPlan === key && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Popular
                  </span>
                </div>
              )}

              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">
                  ${billingCycle? plan.monthly:"100"}
                </span>
                <span className=" text-xl font-semibold text-emerald-800 ml-2">
                 /{plan.time} Months
                </span>
              </div>

              <button
                onClick={() => setSelectedPlan(key)}
                className={`w-full mt-6 py-3 px-4 cursor-pointer rounded-lg font-semibold ${
                  selectedPlan === key
                    ? 'bg-green-600 text-white '
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {selectedPlan === key ? 'Selected' : 'Select Plan'}
              </button>

              <div className="mt-6 space-y-3">
                <h4 className="font-semibold text-gray-900">Features included:</h4>
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
                {plan.limitations.length > 0 && (
                  <>
                    <h4 className="font-semibold text-gray-900 mt-4">Limitations:</h4>
                   
                  </>
                )}
                 {/* <div className='w-full text-center  p-3 bg-green-800 rounded-sm font-semibold  cursor-pointer  text-white' onClick={()=>navigate(`/payment/${plan.name}`)}> Enroll      <ArrowRight className="w-4 h-4 mr-2" /></div> */}
                   <div className='w-full text-center  p-3 bg-green-800 rounded-sm font-semibold  cursor-pointer  text-white' onClick={()=>navigate(`/signUp`)}> Enroll      <ArrowRight className="w-4 h-4 mr-2" /></div>

              </div>
            </div>
          ))}
        </div>
       

      </div>

    </div>
  );
};

export default Subscription;