import React, { useState } from 'react';
import { supportRequests } from '../../mockdata/mockAdminData';
import { OptionComponent, SelectComponent } from '@/features/ui/Select';

const STATUS_OPTIONS = ['New', 'In Progress', 'Resolved'];

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
    <div className=" rounded-md   border-muted/40 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-dark dark:text-white mb-6 border-b pb-3">
        Admin Support Dashboard
      </h2>
      
      {!requests || requests==null ? (
        <div className="text-center py-10 text-muted border border-muted/40  rounded-md">
          No support requests currently available.
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-md">
          <table className="min-w-full divide-y divide-muted/40">
            <thead className="bg-secondary w-screen shrink h-10 text-secondary-foreground">
              <tr>
                {tableHeaders.map((head,ind)=>(
                <th  key={ind} className="px-2 py-3  text-left text-xs font-medium uppercase tracking-wider">
                 {head}
                </th>
                ))}
              </tr>
            </thead>
               <tbody className=" w-screen divide-y divide-muted/40 shrink  bg-white dark:bg-dark text-muted-hover">
              {requests.map((request) => (
                <tr  className=''
                >
                  <td className="px-2  ">
                    {request.userId}
                  </td>
                  <td className="px-2  ">
                    {request.category}
                  </td>

                  <td className="px-2  ">
                    {request.requestDate ? request.requestDate.toLocaleString().slice(0,10) : 'N/A'}
                  </td>
                  <td className="px-2  ">
                    {request.servedDate ? request.servedDate.toLocaleString().slice(0,10) : 'N/A'}
                  </td>
                  <td className="px-2  ">
                    <span className={`px-2  inline-flex text-xs leading-5 font-bold rounded-full shadow-inner ${
                      request.status === 'New' ? 'bg-red-100 dark:bg-primary-foreground dark:text-muted-hover text-red-700' :
                      request.status === 'In Progress' ? 'bg-yellow-100 dark:bg-primary-foreground dark:text-muted-hover text-yellow-700' :
                      'bg-green-100 dark:bg-primary-foreground dark:text-muted-hover text-green-700'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-2 w-10  ">
                     <SelectComponent
                     className='h-1.5 focus:ring-0 outline-0 border-0 '
                        id="timeRange"
                      value={request.status}
                      onChange={(e) => updateRequestStatus(request.id, e.target.value)}
                     
                      >
                         {STATUS_OPTIONS.map(status => (
                      <OptionComponent className="truncate w-10 text-xs w-full "  key={status}  value={status}>{status}  </OptionComponent>
                      ))}
                
                      </SelectComponent>

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


