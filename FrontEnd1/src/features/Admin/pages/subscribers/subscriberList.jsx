
// import Input from "@/features/ui/Input";
// import { DeleteIcon, Edit3Icon, EditIcon, FilterXIcon, SaveIcon } from "lucide-react";
// import React, { useState } from "react";

// const SubscriberList = () => {
//   const [subscribers, setSubscribers] = useState([
//     { id: 1, name: "John Doe", email: "john@example.com", active: true, plan:'pro' ,start:"2022.12.5",expiry:'2026.04.22'},
//     { id: 2, name: "Alice Smith", email: "alice@example.com", active: false,plan:'basic',start:"2022.12.5",expiry:'2026.04.22' },
//     { id: 3, name: "Robert Lee", email: "robert@example.com", active: true,plan:'enterprise' ,start:"2022.12.5",expiry:'2026.04.22'},
//   ]);

//   const [search, setSearch] = useState("");
//   const [newSubscriber, setNewSubscriber] = useState({ name: "", email: "" });
//   const [editSubscriber, setEditSubscriber] = useState(null);
// const [list, setList] = useState(null); // store hovered subscriber ID

//   // ✅ Add new subscriber
//   // const handleAdd = () => {
//   //   if (!newSubscriber.name || !newSubscriber.email) return alert("Please fill all fields");
//   //   const newSub = {
//   //     id: Date.now(),
//   //     ...newSubscriber,
//   //     active: true,
//   //   };
//   //   setSubscribers([...subscribers, newSub]);
//   //   setNewSubscriber({ name: "", email: "" });
//   // };

//   // ✅ Delete subscriber
//   const handleDelete = (id) => {
//     if (!window.confirm("Delete this subscriber?")) return;
//     setSubscribers(subscribers.filter((s) => s.id !== id));
//   };

//   // ✅ Toggle active/inactive
//   const handleToggle = (id) => {
//     setSubscribers(
//       subscribers.map((s) =>
//         s.id === id ? { ...s, active: !s.active } : s
//       )
//     );
//   };

//   // ✅ Save edit
//   const handleSave = () => {
//     setSubscribers(
//       subscribers.map((s) =>
//         s.id === editSubscriber.id ? editSubscriber : s
//       )
//     );
//     setEditSubscriber(null);
//   };

//   // ✅ Filtered list
//   const filtered = subscribers.filter(
//     (s) =>
//       s.name.toLowerCase().includes(search.toLowerCase()) ||
//       s.email.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//       <div className="min-w-2xl max-w-full mx-auto bg-background text-muted-hover rounded-xl shadow p-2">
//         <h1 className="text-2xl font-semibold mb-4 ">Subscriber Management</h1>

//         {/* 🔍 Search */}
//         <Input
//           type="text"
//           placeholder="Search by name or email..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full p-2 mb-4 border border-muted/40 rounded-lg focus:outline-none focus:ring-2 "
//         />

//         {/* 📋 Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-primary text-left text-background ">
//                 <th className="p-3">SN</th>
//                 <th className="p-3">Name</th>
//                 <th className="p-3 ">Email</th>
//                 <th className="lg:p-3 md:p-1">Status</th>
//                <th className="lg:p-3 md:p-1">plan</th>
//                 <th className="lg:p-3 md:p-1">expire </th>
//                 <th className="p-3 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map((s, i) => (
//                 <tr key={s.id} className="border border-b-muted/40 bg-primary-foreground hover:bg-gray-50">
//                   <td className="p-3">{i + 1}</td>

//                   <td className="p-3">
//                     {editSubscriber?.id === s.id ? (
//                       <input
//                         type="text"
//                         value={editSubscriber.name}
//                         onChange={(e) =>
//                           setEditSubscriber({
//                             ...editSubscriber,
//                             name: e.target.value,
//                           })
//                         }
//                         className="p-1 border rounded"
//                       />
//                     ) : (
//                       s.name
//                     )}
//                   </td>
//                   <td className="p-3">
//                     {editSubscriber?.id === s.id ? (
//                       <input
//                         type="text"
//                         value={editSubscriber.email}
//                         onChange={(e) =>
//                           setEditSubscriber({
//                             ...editSubscriber,
//                             email: e.target.value,
//                           })
//                         }
//                         className="p-1 border rounded"
//                       />
//                     ) : (
//                       s.email
//                     )}
//                   </td>

//                   <td className="p-3">
//                     <span
//                       className={`px-2 py-1 text-sm rounded-full ${
//                         s.active
//                           ? "bg-green-100 text-green-700"
//                           : "bg-red-100 text-red-600"
//                       }`}
//                     >
//                       {s.active ? "Active" : "Inactive"}
//                     </span>
//                   </td>

//                    <td className="p-3">
                   
//                     {  s.plan}
                 
//                   </td>
//                    <td className="p-3">
                   
//                    67 days
                 
//                   </td>
//                  <td className="p-3 text-center md:block hidden space-x-2">
               
//                   {editSubscriber?.id === s.id ? (
//                     <button
//                       onClick={handleSave}
//                       className={`px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 `}
//                     >
//                     save
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => setEditSubscriber(s)}
//                       className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//                     >
//                       <EditIcon className="lg:hidden w-3 h-3 xl:hidden block"/>
//                       <span className="lg:block xl:block hidden">Edit</span>
                      
//                     </button>
//                   )}

//                   <button
//                    onMouseEnter={() => setStatus(s.id)}
//                    onMouseLeave={() => setStatus(null)}
//                     onClick={() => handleToggle(s.id)}
//                     className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//                   >
//                     <FilterXIcon className="lg:hidden w-3 h-3 xl:hidden block"/>
//                       <span className="lg:block xl:block hidden">status</span>
//                   </button>

//                   <button
//                     onClick={() => handleDelete(s.id)}
//                     className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                   >
//                     <DeleteIcon className="lg:hidden w-3 h-3 xl:hidden block"/>
//                       <span className="lg:block xl:block hidden">Delete</span>
//                   </button> 
//                 </td> 
//                     <td
//                 onMouseEnter={() => setList(s.id)}
//                 onMouseLeave={() => setList(null)}
//       className="p-3 text-center flex md:hidden justify-center relative"
//     >
//       <button 
     
//       className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600">
//         Actions
//       </button>

//       {/* Dropdown menu on hover */}
//       {list ===s.id && (
//         <ul className="absolute top-12 bg-white shadow-lg border rounded-md p-2 space-y-2 z-10">
//           {editSubscriber?.id === s.id && (
//             <li>
//               <button
//                 onClick={handleSave}
//                 className="w-full px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//               >
//                 Save
//               </button>
//             </li>
//           ) 
//           }

//           <li>
//             <button
//               onClick={() => handleToggle(s.id)}
//               className="w-full px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//             >
//               {s.active ? "Deactivate" : "Activate"}
//             </button>
//           </li>

//           <li>
//             <button
//               onClick={() => handleDelete(s.id)}
//               className="w-full px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//             >
//               Delete
//             </button>
//           </li>
//         </ul>
//       )}
//     </td>
//                 </tr>
//               ))}
//               {filtered.length === 0 && (
//                 <tr>
//                   <td colSpan="5" className="p-4 text-center text-gray-500">
//                     No subscribers found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//   );
// };

// export default SubscriberList;


import Input from "@/features/ui/Input";
import { DeleteIcon, Edit3Icon, EditIcon, FilterXIcon, SaveIcon, UsersIcon, UserPlusIcon } from "lucide-react";
import React, { useState } from "react";
import { NewUsers } from "./NewUsers"; 
import { ExistingUsers } from "./ExistingUsers";

const SubscriberList = () => {
  // 👥 Existing Subscribers Data
  const [subscribers, setSubscribers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", active: true, plan: 'pro', start: "2022.12.5", expiry: '2026.04.22' },
    { id: 2, name: "Alice Smith", email: "alice@example.com", active: false, plan: 'basic', start: "2022.12.5", expiry: '2026.04.22' },
    { id: 3, name: "Robert Lee", email: "robert@example.com", active: true, plan: 'enterprise', start: "2022.12.5", expiry: '2026.04.22' },
  ]);

  // 🆕 Hypothetical New/Potential Users Data (for demonstration)
  const [potentialUsers, setPotentialUsers] = useState([
    { id: 101, name: "Emily Clark", email: "emily@potential.com", source: 'Trial Signup', created: "2024.11.01" },
    { id: 102, name: "David Wilson", email: "david@potential.com", source: 'Waitlist', created: "2024.10.15" },
    { id: 103, name: "Maria Garcia", email: "maria@potential.com", source: 'Unfinished Checkout', created: "2024.11.10" },
  ]);

  // State to manage which view is active: 'subscribers' or 'potential'
  const [activeView, setActiveView] = useState('subscribers');

  const [search, setSearch] = useState("");
  const [editSubscriber, setEditSubscriber] = useState(null);
  const [list, setList] = useState(null); // store hovered subscriber ID for mobile action menu

  // --- Common Logic (Delete, Toggle, Save) ---

  // ✅ Delete subscriber
  const handleDelete = (id) => {
    if (!window.confirm("Delete this subscriber?")) return;
    setSubscribers(subscribers.filter((s) => s.id !== id));
  };

  // ✅ Toggle active/inactive
  const handleToggle = (id) => {
    setSubscribers(
      subscribers.map((s) =>
        s.id === id ? { ...s, active: !s.active } : s
      )
    );
  };

  // ✅ Save edit
  const handleSave = () => {
    setSubscribers(
      subscribers.map((s) =>
        s.id === editSubscriber.id ? editSubscriber : s
      )
    );
    setEditSubscriber(null);
  };

  // ✅ Filtered list for Subscribers
  const filteredSubscribers = subscribers.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Filtered list for Potential Users
  const filteredPotentialUsers = potentialUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // --- Table Components ---

  // Component for rendering the Subscribers table
  // const SubscribersTable = ({ data, search, handleDelete, handleToggle, editSubscriber, setEditSubscriber, handleSave, setList, list }) => (
  //   <>
  //     {/* 🔍 Search for Subscribers */}
  //     <Input
  //       type="text"
  //       placeholder="Search existing subscribers..."
  //       value={search}
  //       onChange={(e) => setSearch(e.target.value)}
  //       className="w-full p-2 mb-4 border border-muted/40 rounded-lg focus:outline-none focus:ring-2"
  //     />

  //     <div className="overflow-x-auto">
  //       <table className="w-full border-collapse">
  //         <thead>
  //           <tr className="bg-primary text-left text-background">
  //             <th className="p-3">SN</th>
  //             <th className="p-3">Name</th>
  //             <th className="p-3">Email</th>
  //             <th className="lg:p-3 md:p-1">Status</th>
  //             <th className="lg:p-3 md:p-1">Plan</th>
  //             <th className="lg:p-3 md:p-1">Expire</th>
  //             <th className="p-3 text-center">Actions</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {data.map((s, i) => (
  //             <tr key={s.id} className="border border-b-muted/40 bg-primary-foreground hover:bg-gray-50">
  //               <td className="p-3">{i + 1}</td>

  //               <td className="p-3">
  //                 {editSubscriber?.id === s.id ? (
  //                   <input
  //                     type="text"
  //                     value={editSubscriber.name}
  //                     onChange={(e) =>
  //                       setEditSubscriber({
  //                         ...editSubscriber,
  //                         name: e.target.value,
  //                       })
  //                     }
  //                     className="p-1 border rounded"
  //                   />
  //                 ) : (
  //                   s.name
  //                 )}
  //               </td>
  //               <td className="p-3">
  //                 {editSubscriber?.id === s.id ? (
  //                   <input
  //                     type="text"
  //                     value={editSubscriber.email}
  //                     onChange={(e) =>
  //                       setEditSubscriber({
  //                         ...editSubscriber,
  //                         email: e.target.value,
  //                       })
  //                     }
  //                     className="p-1 border rounded"
  //                   />
  //                 ) : (
  //                   s.email
  //                 )}
  //               </td>

  //               <td className="p-3">
  //                 <span
  //                   className={`px-2 py-1 text-sm rounded-full ${
  //                     s.active
  //                       ? "bg-green-100 text-green-700"
  //                       : "bg-red-100 text-red-600"
  //                   }`}
  //                 >
  //                   {s.active ? "Active" : "Inactive"}
  //                 </span>
  //               </td>

  //               <td className="p-3">{s.plan}</td>
  //               <td className="p-3">67 days</td> {/* Keeping '67 days' as per your original code */}

  //               {/* Desktop/Larger screen actions */}
  //               <td className="p-3 text-center md:table-cell hidden space-x-2">
  //                 {editSubscriber?.id === s.id ? (
  //                   <button
  //                     onClick={handleSave}
  //                     className={`px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600`}
  //                   >
  //                     <SaveIcon className="lg:hidden w-3 h-3 xl:hidden block" />
  //                     <span className="lg:block xl:block hidden">Save</span>
  //                   </button>
  //                 ) : (
  //                   <button
  //                     onClick={() => setEditSubscriber(s)}
  //                     className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
  //                   >
  //                     <EditIcon className="lg:hidden w-3 h-3 xl:hidden block" />
  //                     <span className="lg:block xl:block hidden">Edit</span>
  //                   </button>
  //                 )}

  //                 <button
  //                   onClick={() => handleToggle(s.id)}
  //                   className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
  //                 >
  //                   <FilterXIcon className="lg:hidden w-3 h-3 xl:hidden block" />
  //                   <span className="lg:block xl:block hidden">Status</span>
  //                 </button>

  //                 <button
  //                   onClick={() => handleDelete(s.id)}
  //                   className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
  //                 >
  //                   <DeleteIcon className="lg:hidden w-3 h-3 xl:hidden block" />
  //                   <span className="lg:block xl:block hidden">Delete</span>
  //                 </button>
  //               </td>

  //               {/* Mobile/Smaller screen actions dropdown */}
  //               <td
  //                 onMouseEnter={() => setList(s.id)}
  //                 onMouseLeave={() => setList(null)}
  //                 className="p-3 text-center flex md:hidden justify-center relative"
  //               >
  //                 <button className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600">
  //                   Actions
  //                 </button>

  //                 {/* Dropdown menu on hover */}
  //                 {list === s.id && (
  //                   <ul className="absolute top-12 right-0 bg-white shadow-lg border rounded-md p-2 space-y-2 z-10 w-40">
  //                     {editSubscriber?.id === s.id ? (
  //                       <li>
  //                         <button
  //                           onClick={handleSave}
  //                           className="w-full px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
  //                         >
  //                           Save
  //                         </button>
  //                       </li>
  //                     ) : (
  //                       <li>
  //                         <button
  //                           onClick={() => setEditSubscriber(s)}
  //                           className="w-full px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
  //                         >
  //                           Edit
  //                         </button>
  //                       </li>
  //                     )}
  //                     <li>
  //                       <button
  //                         onClick={() => handleToggle(s.id)}
  //                         className="w-full px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
  //                       >
  //                         {s.active ? "Deactivate" : "Activate"}
  //                       </button>
  //                     </li>
  //                     <li>
  //                       <button
  //                         onClick={() => handleDelete(s.id)}
  //                         className="w-full px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
  //                       >
  //                         Delete
  //                       </button>
  //                     </li>
  //                   </ul>
  //                 )}
  //               </td>
  //             </tr>
  //           ))}
  //           {data.length === 0 && (
  //             <tr>
  //               <td colSpan="7" className="p-4 text-center text-gray-500">
  //                 No subscribers found.
  //               </td>
  //             </tr>
  //           )}
  //         </tbody>
  //       </table>
  //     </div>
  //   </>
  // );

  // Component for rendering the Potential Users table
  // const PotentialUsersTable = ({ data, search }) => (
  //   <>
  //     {/* 🔍 Search for Potential Users */}
  //     <Input
  //       type="text"
  //       placeholder="Search potential users..."
  //       value={search}
  //       onChange={(e) => setSearch(e.target.value)}
  //       className="w-full p-2 mb-4 border border-muted/40 rounded-lg focus:outline-none focus:ring-2"
  //     />

  //     <div className="overflow-x-auto">
  //       <table className="w-full border-collapse">
  //         <thead>
  //           <tr className="bg-primary text-left text-background">
  //             <th className="p-3">SN</th>
  //             <th className="p-3">Name</th>
  //             <th className="p-3">Email</th>
  //             <th className="p-3">Source</th>
  //             <th className="p-3">Date Created</th>
  //             <th className="p-3 text-center">Actions</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {data.map((u, i) => (
  //             <tr key={u.id} className="border border-b-muted/40 bg-primary-foreground hover:bg-gray-50">
  //               <td className="p-3">{i + 1}</td>
  //               <td className="p-3">{u.name}</td>
  //               <td className="p-3">{u.email}</td>
  //               <td className="p-3">
  //                 <span className="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
  //                   {u.source}
  //                 </span>
  //               </td>
  //               <td className="p-3">{u.created}</td>
  //               <td className="p-3 text-center">
  //                 <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm">
  //                   Convert to Subscriber
  //                 </button>
  //               </td>
  //             </tr>
  //           ))}
  //           {data.length === 0 && (
  //             <tr>
  //               <td colSpan="6" className="p-4 text-center text-gray-500">
  //                 No potential users found.
  //               </td>
  //             </tr>
  //           )}
  //         </tbody>
  //       </table>
  //     </div>
  //   </>
  // );

  return (
    <div className="min-w-2xl max-w-full mx-auto bg-background text-muted-hover rounded-xl shadow p-4">
      <h1 className="text-2xl font-semibold mb-4">Subscriber Management</h1>

      {/* ↔️ Tab/Section Switcher */}
      <div className="flex space-x-4 mb-6 border-b border-muted/40">
        <button
          onClick={() => {
            setActiveView('subscribers');
            setSearch('');
            setEditSubscriber(null);
          }}
          className={`pb-2 px-3 flex items-center space-x-2 transition-colors ${
            activeView === 'subscribers'
              ? 'border-b-2 border-primary text-primary font-medium'
              : 'text-gray-500 hover:text-primary'
          }`}
        >
          <UsersIcon className="w-4 h-4" />
          <span>Existing Subscribers ({subscribers.length})</span>
        </button>
        <button
          onClick={() => {
            setActiveView('potential');
            setSearch('');
          }}
          className={`pb-2 px-3 flex items-center space-x-2 transition-colors ${
            activeView === 'potential'
              ? 'border-b-2 border-primary text-primary font-medium'
              : 'text-gray-500 hover:text-primary'
          }`}
        >
          <UserPlusIcon className="w-4 h-4" />
          <span>New/Potential Users ({potentialUsers.length})</span>
        </button>
      </div>

      {/* 📋 Conditional Table Rendering */}
      {activeView === 'subscribers' ? (
        <ExistingUsers
          data={filteredSubscribers}
          search={search}
          handleDelete={handleDelete}
          handleToggle={handleToggle}
          editSubscriber={editSubscriber}
          setEditSubscriber={setEditSubscriber}
          handleSave={handleSave}
          setList={setList}
          list={list}
        />
      ) : (
        <NewUsers data={filteredPotentialUsers} search={search} />
      )}
    </div>
  );
};

export default SubscriberList;