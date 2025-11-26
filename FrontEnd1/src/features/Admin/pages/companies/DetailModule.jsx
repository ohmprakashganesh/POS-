import { CalendarDays, Settings, User, Clock, CheckCircle, XCircle, AlertTriangle, Users, ArrowLeft, LogInIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { companyData } from "@/data/mockData";
import { useEffect, useState } from "react";


const DetailsModal = () => {
  const navigate= useNavigate();
  
      const {id}=useParams();
    const [company,setCompany]=useState([]);
      const [loading, setLoading] = useState(true);


    useEffect(()=>{
        if(companyData){
            setCompany(companyData);
            setLoading(false);
        }
    },[id]);
    
const c = company?.find((obj) => obj.id == id);

if(loading || !c){
  return(
    <div className="p-6 text-center text-gray-500">
        Loading company details...
      </div>
  )

}





  const formatDate = (iso) =>
    iso ? new Date(iso).toISOString().split("T")[0] : "N/A";

  const formatDateTime = (iso) =>
    iso
      ? new Date(iso).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "N/A";

  const StatusBadge = ({ status }) => {
    let color = "bg-gray-200 text-muted-hover ";
    let Icon = AlertTriangle;

    if (status === "Active") {
      color = "bg-green-100 text-green-700 ";
      Icon = CheckCircle;
    } else if (status === "Expired") {
      color = "bg-red-100 text-red-700 ";
      Icon = XCircle;
    } else if (status === "Trial" || status === "Pending") {
      color = "bg-yellow-100 text-yellow-700";
      Icon = AlertTriangle;
    }

    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold border ${color}`}
      >
        <Icon className="w-3 h-3" />
        {status}
      </span>
    );
  };

  const DetailRow = ({ icon: Icon, label, value }) => (
    <div className="flex  items-center gap-4 py-1  ">
      {Icon && <Icon className="w-4 h-4 text-primary flex-shrink-0" />}
      <p className="text-sm font-medium text-muted-hover flex-grow">{label}</p>
      <p className="text-sm font-semibold text-muted break-all">{value}</p>
    </div>
  );
  return (
   
      <div
        className=" rounded-xl w-full  max-h-[90vh] overflow-y-auto "
        onClick={(e) => e.stopPropagation()}
      >  <div>

          <ArrowLeft onClick={()=> navigate("/companies")} size={25} className="rounded-full font-bold bg-gray-300 dark:bg-gray-700 mb-2 p-2 w-fit h-fit" />
        </div>
        
        {/* Header */}
        <div className="p-4 sticky top-0 bg-white dark:bg-dark ">
        
          <h3 className="text-2xl font-bold flex items-center gap-3">
            <img src="use the link " alt="add the logo "  className="w-6 h-6 text-primary" />
            {c.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {c.type} | PAN: {c.panVatNumber}
          </p>
        </div>

        <div className=" pt-2  shadow-sm space-y-2">
          {/* Subscription */}
          <div className=" rounded-lg p-4 bg-white dark:bg-dark">
            <h4 className="text-lg font-semibold mb-3  flex items-center gap-2">
              <CalendarDays className="w-5 h-5" /> Subscription & Renewal
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <DetailRow icon={CalendarDays} label="Plan Name" value={c.subscription.planName} />

              <DetailRow
                label="Status"
                value={<StatusBadge status={c.subscription.status} />}
              />

              <DetailRow
                icon={CalendarDays}
                label="Start Date"
                value={formatDate(c.subscription.startDate)}
              />

              <DetailRow
                icon={CalendarDays}
                label="Renewal Date"
                value={formatDate(c.subscription.endDate)}
              />

              <DetailRow
                icon={Users}
                label="User Capacity"
                value={`${c.subscription.users} / ${c.subscription.maxUsers}`}
              />

              <DetailRow
                icon={Clock}
                label="Payment Cycle"
                value={`${c.subscription.paymentCycle} (${c.subscription.cost} ${c.subscription.currency})`}
              />
            </div>
          </div>

          {/* Subscriber Info */}
          <div className=" bg-white dark:bg-dark rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-3  flex items-center gap-2">
              <User className="w-5 h-5" /> Subscriber Details
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <DetailRow icon={User} label="User ID" value={c.subscriber.userId} />
              <DetailRow icon={CalendarDays} label="Signup Date" value={formatDate(c.subscriber.signupDate)} />
              <DetailRow icon={User} label="Email" value={c.subscriber.email} />
              <DetailRow icon={User} label="Phone" value={c.subscriber.phone} />
            </div>
          </div>

          {/* Metrics */}
          <div className=" rounded-lg p-4 bg-white dark:bg-dark">
            <h4 className="text-lg font-semibold mb-3 text-muted-hover flex items-center gap-2">
              <Clock className="w-5 h-5" /> Usage Metrics
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
              <DetailRow icon={Clock} label="Last Login" value={formatDateTime(c.metrics.lastLogin)} />
              <DetailRow icon={Users} label="Storage Used" value={`${c.metrics.storageUsedGB} GB`} />
              <DetailRow icon={Users} label="Invoices Generated" value={c.metrics.totalInvoicesGenerated} />
            </div>
          </div>

          {/* Address */}
          <div className=" bg-white dark:bg-dark rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-3 text-muted-hover">Address</h4>
            <p className="text-sm text-gray-600">{c.address}</p>
          </div>
        </div>
      </div>

  );
};

export default DetailsModal;
