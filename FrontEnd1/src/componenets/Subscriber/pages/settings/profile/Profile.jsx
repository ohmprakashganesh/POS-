import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  Facebook,
  Instagram,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DevicePhoneMobileIcon } from "@heroicons/react/24/outline";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const business = {
    id: 1,
    name: "Glow Beauty & Spa",
    category: "Beauty & Wellness",
    description:
      "Glow Beauty & Spa offers luxurious skincare, massage, and wellness treatments designed to rejuvenate your body and mind. Our experienced staff ensures an unforgettable self-care experience.",
    address: "123 Lakeside Street, Kathmandu, Nepal",
    phone: "+977 9801234567",
    email: "contact@glowspa.com",
    website: "https://glowspa.com",
    customer: 200,
    cashier: 20,
    joined: "January 2022",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
  };

  // Mock data for the profile page
  const profileData = {
    adminID: "KME-0001",
    userName: "Kode Made Eazy",
    role: "Administrator",
    phone: "+234703-331-5307",
    email: "admin@kode.com",
    registeredDate: "July 12th, 2023",
    lastLogin: "Wednesday 12th, July, 2023 @ 11:07:22 am",
    userRegistrationDate: "July 12th, 2023",
    companyName: "Kode Made Eazy POS",
    companyEmail: "kodemade@pos.ocm",
    companyPhone: "010101010",
    companyAddress: "Sample address",
    // Assuming a placeholder image for the profile picture
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
  };
  return (
    user && (
      //  <div className="min-h-screen bg-gray-100 py-10 px-5 flex justify-center">
      //       <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl">
      //         {/* Header Section */}
      //         <div className="flex flex-col md:flex-row items-center gap-8 border-b pb-6">
      //           <img
      //             src={business.image}
      //             alt="Business"
      //             className="w-40 h-40 rounded-full object-cover shadow-md"
      //           />
      //           <div className="text-center md:text-left">
      //             <h1 className="text-3xl font-bold text-gray-800">{business.name}</h1>
      //             <p className="text-gray-500">{business.category}</p>
      //             <p className="text-sm text-gray-400 mt-1">Joined {business.joined}</p>
      //           </div>
      //         </div>

      //         {/* Description */}
      //         <div className="mt-6">
      //           <h2 className="text-lg font-semibold text-gray-800 mb-2">About</h2>
      //           <p className="text-gray-600 leading-relaxed">{business.description}</p>
      //         </div>

      //         {/* Contact & Info */}
      //         <div className="grid md:grid-cols-2 gap-6 mt-8">
      //           <div className="space-y-3">
      //             <h2 className="text-lg font-semibold text-gray-800">Contact Info</h2>
      //             <p className="flex items-center text-gray-600">
      //               <MapPin className="w-5 h-5 mr-2 text-blue-500" /> {business.address}
      //             </p>
      //             <p className="flex items-center text-gray-600">
      //               <Phone className="w-5 h-5 mr-2 text-blue-500" /> {business.phone}
      //             </p>
      //             <p className="flex items-center text-gray-600">
      //               <Mail className="w-5 h-5 mr-2 text-blue-500" /> {business.email}
      //             </p>
      //           </div>
      //         </div>

      //         {/* Action Buttons */}
      //         <div className="mt-8 flex justify-center md:justify-end gap-4">
      //           <button onClick={navigate(`/profile/edit/${business.id}`)} className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
      //             Edit Profile
      //           </button>
      //           <button className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
      //             Message
      //           </button>
      //         </div>
      //       </div>
      //     </div>

      <div className=" bg-gray-50 min-h-screen">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
          My Profile
        </h1>

        {/* Main Profile Grid */}
        <div className="flex justify-center items-center">
          {/* === Left Column: Profile and Authentication Details === */}
          <div className="bg-white gap-3 flex flex-col p-6 grid-cols-6 col-span-6 rounded-lg shadow-md border border-gray-100">

            <div className="flex flex-col  mb-3 items-center ">
              <logo className="w-25 h-25 text-center items-center flex justify-center rounded-full bg-red-500">
                hello
              </logo>
            </div>
            <div className="flex justify-center flex-col items-center">
              <p>om Beakery and Custmatic</p>
              <p>availe for you </p>
              <p>barhadashu 2 new roead </p>
            </div>
            <div>
              <p>
                phone: <span></span>
              </p>
              <p>
                email:<span></span>
              </p>
              <p>
                role : <span></span>
              </p>
            </div>

            <div  className=" border-t-2  w-full">
             <h1 className=" mb-3 font-semibold ">
            Auth Details
             </h1>
              <p className="grid grid-cols-2">
                <p className="flex flex-col">
                 <span>Last Login:</span>
                <span>Registered On:</span>
                </p>

               <p className="flex flex-col">
                 <span>Wednesday 12 th , 2025 @11:09:22 am</span>
                 <span>july 12th, 2023</span>
               </p>
                 </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
export default Profile;
