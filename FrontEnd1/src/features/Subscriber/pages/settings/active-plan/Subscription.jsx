import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../../contexts/AuthContext';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { plans } from '@/data/mockData';
import Button from '@/features/ui/Button';
import { useNavigate } from 'react-router-dom';


const Subscription = () => {
  const navigate=useNavigate()
  const { user, subscriptionStatus, updateSubscription } = useAuth();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [isProcessing, setIsProcessing] = useState(false);
 const [status, setStatus] = useState(subscriptionStatus)
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
      <div className="h-[calc(100dvh-80px)] flex  flex-col justify-center items-center lg:justify-start lg:py-40">
            <CheckIcon className="mx-auto bg-primary/10 rounded-full p-3 h-16 w-16 text-green-500" />
            <h1 className="mt-4 text-3xl font-bold">You're Fully Active </h1>
            <p className="my-2 text-muted text-lg">
              Your Professional plan is currently active and in good standing.
            </p>
             <Button onClick={()=>navigate('/publicSubscription')}> Manage Subscription</Button>
          </div>
    );
  }
  if (sts === 'trail') {
    return (
      <div className="h-[calc(100dvh-80px)] flex flex-col items-center justify-center lg:justify-start lg:py-40">
            <CheckIcon className="mx-auto bg-primary/10 rounded-full p-3 h-16 w-16 text-green-500" />
            <h1 className="text-3xl mt-4 font-bold">You're Currently Active</h1>
            <p className="text-muted text-lg my-2">
               Experience everything. Upgrade to continue without limits.
            </p>
            <Button onClick={()=>navigate('/publicSubscription')}>Get Full Access</Button>
          </div>
      
      // <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      //   <div className="max-w-3xl  mx-auto">
      //     <div className="text-center">
      //       <CheckIcon className="mx-auto h-16 w-16 p-2 bg-primary/10 rounded-full text-green-500" />
      //       <h1 className="mt-4 text-3xl font-bold text-gray-900"> Currently Active</h1>
      //       <p className="mt-2 text-gray-600">
      //         Your on Trail period 
      //       </p>
      //       <button   onClick={()=>navigate('/publicSubscription')} className="w-full outline bg-green-300 hover:font-semibold cursor-pointer hover:bg-green-500 hover:text-white py-3 mt-6 flex items-center justify-center text-sm text-black transition duration-15">
      //   </button>
      //     </div>
      //   </div>
      // </div>
    );
  }
};

export default Subscription;