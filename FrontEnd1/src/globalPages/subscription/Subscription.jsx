import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { ArrowRight, HandIcon, Move3dIcon, MoveRight } from 'lucide-react';
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
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <CheckIcon className="mx-auto size-16 bg-secondary/30 rounded-full p-2 text-secondary" strokeWidth={2.5} />
            <h1 className="mt-4 text-3xl font-bold">Subscription Active</h1>
            <p className="text-muted">
              Your Professional plan is currently active and in good standing.
            </p>
          </div>

          <div className="mt-8 bg-white dark:bg-dark rounded-md shadow-sm p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className='left-section'>
                <h3 className="text-lg font-semibold ">Current Plan</h3>
                <div className="mt-2 p-4 bg-primary/10 rounded-md border border-primary/50">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-primary">Professional</span>
                    <span className="text-2xl font-bold text-primary">$79</span>
                  </div>
                  <p className="text-sm text-primary/70 mt-1">per month</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Billing Information</h3>
                <div className="mt-2 space-y-2 text-sm text-muted">
                  <p><strong>Status:</strong> <span className="text-constructive">Active</span></p>
                  <p><strong>Next Billing Date:</strong> February 15, 2024</p>
                  <p><strong>Payment Method:</strong> eSewa (•••• 4242)</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-muted/40">
              <h3 className="text-lg font-semibold mb-4">Plan Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plans.pro.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckIcon className="size-5 outline-constructive outline rounded-full p-0.5 text-constructive mr-2" />
                    <span className="text-muted font-normal">{feature}</span>
                  </div>
                ))}
              </div>
              <div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
                <Button destructive onClick={()=>cancelSub() }>
                Cancel Subscription
                
              </Button>
              <Button outline>
                Update Payment Method
              </Button>
               <Button> <Link to='/subscriber'>Go to Dashboard</Link> </Button>

            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 px-4 sm:px-3 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center pt-5">
          <h1 className="text-3xl font-bold">Choose Your Plan</h1>
          <p className="text-muted">
            Select the plan that works best for your business
          </p>
        </div>



        {/* Plans Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(plans).map(([key, plan]) => (
            <div
              key={key}
              className={`bg-white dark:bg-dark rounded-md shadow-sm ${
                selectedPlan === key ? 'border border-constructive' : ''
              } p-6 relative`}
            >
              {selectedPlan === key && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <span className="bg-constructive text-constructive-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Popular
                  </span>
                </div>
              )}

              <h3 className="text-xl font-bold">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold">
                  ${billingCycle? plan.monthly:"100"}
                </span>
                <span className=" text-xl font-semibold text-secondary ml-2">
                 /{plan.time} Months
                </span>
              </div>

              <Button
                onClick={() => setSelectedPlan(key)}
                className={`w-full py-3 my-2 ${
                  selectedPlan === key
                    ? 'bg-constructive text-constructive-foreground hover:bg-constructive-hover'
                    : 'bg-background text-foreground hover:bg-neutral-200 dark:hover:bg-neutral-800'
                }`}
              >
                {selectedPlan === key ? 'Selected' : 'Select Plan'}
              </Button>

              <div className="mt-4 space-y-3">
                <h4 className="font-semibold">Features included:</h4>
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-muted text-sm">{feature}</span>
                  </div>
                ))}
                {plan.limitations.length > 0 && (
                  <>
                    <h4 className="font-semibold  mt-4">Limitations:</h4>
                   
                  </>
                )}
                 {/* <div className='w-full text-center  p-3 bg-green-800 rounded-sm font-semibold  cursor-pointer  text-white' onClick={()=>navigate(`/payment/${plan.name}`)}> Enroll      <ArrowRight className="w-4 h-4 mr-2" /></div> */}
                   <Button secondary className='w-full py-3' onClick={()=>navigate(`/signUp`)}> Enroll<ArrowRight strokeWidth={2.5}/></Button>

              </div>
            </div>
          ))}
        </div>
       

      </div>

    </div>
  );
};

export default Subscription;