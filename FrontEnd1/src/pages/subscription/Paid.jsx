import { ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';

import { useNavigate } from 'react-router-dom'

const Paid = () => {
     
 const { subscriptionStatus, updateSubscription } = useAuth();
 const [status, setStatus] = useState(subscriptionStatus)
    useEffect(()=>{
 updateSubscription('active');
    },[]);
  
    const navigate= useNavigate();
     
  return (
    <div className=' w-full h-screen  flex justify-center items-center '>
         <div className='w-1/3 h-fit p-10 bg-gray-300  '>
         <h1 className='text-xl '>Thank You</h1>
         <h1>   success fully  completed the PayMent </h1>
          
        <h1>    Account will be activated with 12 To 14 hours</h1> 
         <h1>  credentials will be provided through Gmail</h1> 
         <div>
        <button
        onClick={() => navigate("/")} 
        className="w-full outline bg-green-500 hover:text-white py-3 mt-6 flex items-center justify-center text-sm text-black transition duration-150"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home Page
      </button>
         </div>
              
         </div>
      

    </div>
  )
}

export default Paid
