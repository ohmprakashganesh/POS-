import React, { useState } from 'react';

// --- Static Data and Constants ---

const STATUS_OPTIONS = ['New', 'In Progress', 'Resolved'];

// Mock data to simulate requests coming from a database
const initialRequests = [
  { id: 'req_1', userId: 'user_A001_dev', category: 'Staff Management', status: 'New', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  { id: 'req_2', userId: 'user_B045_prod', category: 'Inventory', status: 'In Progress', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5) },
  { id: 'req_3', userId: 'user_C102_test', category: 'Balances & Ledgers', status: 'Resolved', timestamp: new Date(Date.now() - 1000 * 60 * 15) },
  { id: 'req_4', userId: 'user_A001_dev', category: 'Profile Update', status: 'New', timestamp: new Date(Date.now() - 1000 * 60 * 3) },
  { id: 'req_5', userId: 'user_F990_stg', category: 'Customers/Suppliers', status: 'New', timestamp: new Date(Date.now() - 1000 * 60 * 55) },
];

// --- Support Requests Table Component ---

const SupportReq = () => {
   const [requests, setRequests] = useState(initialRequests);
  
  // Function to handle local status updates AND API integration
  const updateRequestStatus = async (requestId, newStatus) => {
    // 1. OPTIMISTIC UI UPDATE: Update the state immediately for a smooth user experience
    setRequests(prevRequests => 
      prevRequests.map(request => 
        request.id === requestId ? { ...request, status: newStatus } : request
      )
    );

    // 2. BACKEND API CALL INTEGRATION POINT
    try {
      const apiEndpoint = `/api/support/request/${requestId}/status`; // <-- Replace with your actual API endpoint
      
      // Example of a fetch call to your backend
      console.log(`Sending API call to update ${requestId} to ${newStatus}`);
      /*
      const response = await fetch(apiEndpoint, {
        method: 'PUT', // or PATCH
        headers: {
          'Content-Type': 'application/json',
          // Include authorization headers here (e.g., 'Authorization': 'Bearer YOUR_ADMIN_TOKEN')
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) {
        // If API call fails, revert the state to the previous status
        // and show an error message.
        throw new Error('Failed to update status on the backend.');
      }
      
      const result = await response.json();
      console.log('Backend update successful:', result);
      */
      
      // Simulate API delay and success for this static example
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log(`Simulated successful update for request ID: ${requestId}`);

    } catch (error) {
      console.error('API Update Error:', error);
      // 3. ERROR HANDLING: Revert the UI state if the backend update fails
      // setRequests(prevRequests => prevRequests.map(request => 
      //   request.id === requestId ? { ...request, status: <PREVIOUS_STATUS> } : request
      // ));
      alert('Error updating status. Please check the console.'); // Use a real toast/modal in production
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-2xl border border-gray-100 max-w-6xl mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-3">
        Admin Support Dashboard
      </h2>
      
      {requests.length === 0 ? (
        <div className="text-center py-10 text-gray-500 border-2 border-dashed rounded-lg">
          No support requests currently available.
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Requested By (User ID)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Requested At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr 
                  key={request.id} 
                  className={`transition-colors duration-200 ${
                    request.status === 'Resolved' ? 'bg-green-50 hover:bg-green-100' : 
                    request.status === 'In Progress' ? 'bg-yellow-50 hover:bg-yellow-100' : 'hover:bg-gray-50'
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 break-all w-48">
                    {request.userId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {request.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.timestamp ? request.timestamp.toLocaleString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full shadow-inner ${
                      request.status === 'New' ? 'bg-red-100 text-red-700' :
                      request.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <select
                      value={request.status}
                      // Note: We changed this to an async function
                      onChange={(e) => updateRequestStatus(request.id, e.target.value)}
                      className="mt-1 block w-32 py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm appearance-none cursor-pointer hover:border-indigo-500"
                    >
                      {STATUS_OPTIONS.map(status => (
                        <option key={status} value={status}>{status}</option>
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


