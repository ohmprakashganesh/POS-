import React, { useMemo, useState } from 'react';
import { supportRequests } from '../../mockdata/mockAdminData';
import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
const STATUS_OPTIONS = ["All",'New', 'Progress', 'Resolved'];
const tableHeaders = [
  "Request ID",
  "Category",
  "Request Date",
  "Served Date",
  "Status",
  "Action"
];


const SupportReq = () => {
  const[selectedStatus,setSelectedStatus]=useState();
  const location= useLocation();
  const  navigate= useNavigate();
  const returnPath= location.state?.from;  
   const [requests, setRequests] = useState(supportRequests);

      const filtered= useMemo(()=>{
        if(!selectedStatus || selectedStatus.toLowerCase()==="all") return requests;
       
        const term= selectedStatus.toLowerCase();

        return requests.filter(
          (req)=>
            req.status.toLowerCase()===term
        );
         
      },[selectedStatus,requests])

  // Function to handle local status updates AND API integration
  const updateRequestStatus = async (requestId, newStatus) => {

    //  Update the state immediately for a smooth user experience
    setRequests(prevRequests => 
      prevRequests.map(request => 
        request.id === requestId ? { ...request, status: newStatus } : request
      )
    );
    try { 
      //implement the api here
      console.log(` call to update ${requestId} to ${newStatus}`)
    } catch (error) {
      console.error('API Update Error:', error);
    }
  };

  return (
    <div className=" rounded-md  max-w-6xl mx-auto">
      {returnPath && (
         <div>
          <ArrowLeft onClick={()=> navigate(`${returnPath}`)} size={25} className="rounded-full cursor-pointer font-bold bg-gray-300 dark:bg-gray-700 mb-2 p-2 w-fit h-fit" />
        </div>
      )}
      <h2 className="text-2xl font-bold text-dark dark:text-white  pb-3">
        Admin Support Dashboard
      </h2>
      
      {!requests || requests==null ? (
        <div className="text-center py-10 text-muted   rounded-md">
          No support requests currently available.
        </div>
      ) : (

      <div className="flex  flex-col  w-full">
  {/* Search Box with Icon */}
  <div className="relative mb-4 w-full md:w-sm">
        <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} placeholder="Select a status"
        className="bg-white py-2 text-muted dark:bg-dark w-full max-w-sm px-4 h-10 rounded-lg
    border border-muted/40
    focus:outline-none
    focus:ring-2
    focus:border-transparent 
   focus:ring-primary
    transition-all duration-150" >

                {STATUS_OPTIONS.map((item, index) => (
                  <option key={index} value={item} className="">
                    {item === "all" ? t("item.all") : item}
                  </option>
                ))}
              </select>
     </div>
          <table className="min-w-full divide-y divide-muted/40">
            <thead className="">
              <tr>
                {tableHeaders.map((head,ind)=>(
                <th  key={ind}>
                 {head}
                </th>
                ))}
              </tr>
            </thead>
               <tbody className=" w-screen shrink  bg-white dark:bg-dark text-muted-hover">
              {filtered.map((request) => (
                <tr
                >
                  <td >
                    {request.userId}
                  </td>
                  <td>
                    {request.category}
                  </td>

                 <td >
                    {request.requestDate ? request.requestDate.toLocaleString().slice(0,10) : 'N/A'}
                  </td>
                 <td>
                    {request.servedDate ? request.servedDate.toLocaleString().slice(0,10) : 'N/A'}
                  </td>
                 <td >
                    <span className={` px-2 inline-flex text-xs leading-5  rounded-full shadow-inner ${
                      request.status === 'New' ? 'bg-red-100  text-red-700' :
                      request.status === 'inProgress' ? 'bg-yellow-100  r text-yellow-700' :
                      'bg-green-100   text-green-700'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className=" w-15 text-xs  ">
                     <select
                     className='outline-none'
                        id="timeRange"
                      value={request.status}
                      onChange={(e) => updateRequestStatus(request.id, e.target.value)}
                      >
                         {STATUS_OPTIONS.map(status => (
                      <option className="truncate w-15 text-xs "  key={status}  value={status}>{status}  </option>
                      ))}
                      </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default SupportReq;

// --- Main Application Component (Wrapper) ---


