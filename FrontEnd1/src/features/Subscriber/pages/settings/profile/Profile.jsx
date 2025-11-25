import { companyData } from '@/data/mockData';

  import React from 'react';
import { Mail, Phone, MapPin, Building2, CreditCard, Users, CalendarDays, Clock, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '@/features/ui/Button';

const StatusBadge = ({ status }) => {


  let color = 'bg-gray- text-gray-800';
  if (status === 'Active') color = 'bg-green-100 text-green-700 ';
  if (status === 'Expired') color = 'bg-red-100 text-red-700 border-red-300';
  if (status === 'Trial') color = 'bg-yellow-100 text-yellow-700 border-yellow-300';

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold border ${color}`}>
      {status === 'Active' && <CheckCircle className="w-4 h-4" />}
      {status}
    </span>
  );
};

// Helper component for detail rows
const DetailRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 py-2 border-b border-muted/20 last:border-b-0">
    <Icon className="w-5 h-5 text-primary/70" />
    <div>
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className="text-base font-semibold">{value}</p>
    </div>
  </div>
);

const CompanyProfile = () => {
  const company = companyData[0] || {};
  const {
    name,
    type,
    pan,
    email,
    phone,
    address,
    logoUrl,
    subscription,
  } = company;

    const {t} = useTranslation("subscriber");
    const navigate=useNavigate();

  const daysRemaining = (subscription && subscription.endDate) 
    ? Math.ceil((new Date(subscription.endDate) - new Date()) / (1000 * 60 * 60 * 24))
    : 'N/A';
  // -----------------------------------------------------------------

  // Fallback for when data hasn't loaded (e.g., initial state from a real API call)
  if (!company.id) {
    return <div className="p-8 text-center text-gray-500">Loading company data...</div>;
  }
  return (
    <div className="container mx-auto ">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">
          {name} Profile Overview
        </h1>
        <p className="text-muted">Manage your company details and subscription status.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: COMPANY DETAILS --- */}
        <div className="lg:col-span-2 bg-white dark:bg-dark p-6 rounded-xl shadow-md space-y-6">
          <h2 className="text-xl font-bold border-b pb-3 mb-4">
            Company Information
          </h2>

          {/* Logo and Name */}
          <div className="flex items-center gap-4 border-b pb-4">
            <img 
              src={logoUrl} 
              alt={` Logo`} 
              className="w-20 h-20 rounded-lg object-cover border" 
            />
            <div>
              <p className="text-xl font-extrabold">{name}</p>
              <p className="text-muted font-medium">{type} - PAN: {pan}</p>
            </div>
            {/* Action button */}
            <div className="ml-auto">
              {/* Assuming Button is importe` */}
              <Button onClick={()=>navigate(`/signUp/${company.id}`)}  >
                Update 
              </Button>
            </div>
          </div>
          
          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <DetailRow icon={Mail} label="Email Address" value={email} />
            <DetailRow icon={Phone} label="Phone Number" value={phone} />
            <DetailRow icon={Building2} label="Business Type" value={type} />
            <DetailRow icon={CreditCard} label="PAN/VAT Number" value={pan} />
          </div>
          
          {/* Address */}
          <div className="pt-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary/70 mt-1" />
              <div>
                <p className="text-sm font-medium text-muted">Business Address</p>
                <p className="text-base font-semibold">{address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: SUBSCRIPTION STATUS --- */}
        <div className="lg:col-span-1 bg-white dark:bg-dark p-6 rounded-xl shadow-md h-fit space-y-6">
          <h2 className="text-xl font-bold border-b pb-3">
            Subscription Status
          </h2>
          
          {/* Plan Name & Status */}
          <div className="flex flex-col gap-2">
            <p className="text-lg font-bold flex justify-between items-center">
              {subscription.planName}
            </p>
            <StatusBadge status={subscription.status} />
          </div>

          {/* Key Dates and Usage */}
          <div className="space-y-3 pt-3 border-t border-muted/20">
            {/* Start Date */}
            <div className="flex items-center justify-between">
              <div className='flex items-center gap-2 text-muted'>
                <CalendarDays className="w-5 h-5" />
                Start Date:
              </div>
              <span className='font-semibold'>{subscription.startDate}</span>
            </div>

            {/* End Date */}
            <div className="flex items-center justify-between">
              <div className='flex items-center gap-2 text-muted'>
                <CalendarDays className="w-5 h-5" />
                Renewal Date:
              </div>
              <span className='font-semibold'>{subscription.endDate}</span>
            </div>

            {/* Days Remaining */}
            <div className="flex items-center justify-between text-lg font-bold py-2 bg-primary/10 rounded-md px-3">
              <div className='flex items-center gap-2 text-primary'>
                <Clock className="w-5 h-5" />
                Days Remaining:
              </div>
              <span>{daysRemaining} days</span>
            </div>

            {/* User Capacity */}
            <div className="flex items-center justify-between border-t border-muted/20 pt-3">
              <div className='flex items-center gap-2 text-muted'>
                <Users className="w-5 h-5" />
                User Capacity:
              </div>
              <span className='font-semibold'>{subscription.users} / {subscription.maxUsers} Users</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CompanyProfile;