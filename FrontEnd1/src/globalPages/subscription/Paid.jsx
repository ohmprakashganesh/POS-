import { ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';

import { useNavigate } from 'react-router-dom'
import Button from '@/features/ui/Button';

const Paid = () => {
     
 const { subscriptionStatus, updateSubscription } = useAuth();
  useEffect(()=>{
 updateSubscription('active');
    },[]);
  
    const navigate= useNavigate();
     
  return (
    <div className=' w-full fixed inset-0 flex justify-center items-center '>
         <div className='w-[95%]  max-w-xl h-fit p-10 bg-white dark:bg-dark rounded-md shadow-sm'>
         <p className='text-xl font-semibold text-center mb-2'>Thank You</p>
         <p>   Success fully  completed the PayMent </p>
          
        <p>    Account will be activated with 12 To 14 hours</p> 
         <p>  credentials will be provided through Gmail</p> 
         <div>
          
        <Button
        onClick={() => navigate("/login")} 
        className="w-full mt-7"
      >
        <ArrowLeft strokeWidth={2.5}/>
        Back to Home Page
      </Button>
         </div>
              
         </div>
      

    </div>
  )
}

export default Paid
