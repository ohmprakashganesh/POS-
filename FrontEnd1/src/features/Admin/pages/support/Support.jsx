import React, { useState } from 'react';
import { supportRequests } from '../../mockdata/mockAdminData';
import { OptionComponent, SelectComponent } from '@/features/ui/Select';

const STATUS_OPTIONS = ['New', 'inProgress', 'Resolved'];

const tableHeaders = [
  "Request ID",
  "Category",
  "Request Date",
  "Served Date",
  "Status",
  "Action"
];


const SupportReq = () => {
   const [requests, setRequests] = useState(supportRequests);

  // Function to handle local status updates AND API integration
  const updateRequestStatus = async (requestId, newStatus) => {

    //  Update the state immediately for a smooth user experience
    setRequests(prevRequests => 
      prevRequests.map(request => 
        request.id === requestId ? { ...request, status: newStatus } : request
      )
    );

    try {
      const apiEndpoint = `/api/support/request/${requestId}/status`; // <-- Replace with your actual API endpoint
      
      // Example of a fetch call to your backend
      console.log(` call to update ${requestId} to ${newStatus}`);

 
    } catch (error) {
      console.error('API Update Error:', error);
    }
  };

  return (
    <div className=" rounded-md  max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-dark dark:text-white  pb-3">
        Admin Support Dashboard
      </h2>
      
      {!requests || requests==null ? (
        <div className="text-center py-10 text-muted   rounded-md">
          No support requests currently available.
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-md">
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
              {requests.map((request) => (
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


