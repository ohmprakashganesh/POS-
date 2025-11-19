
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
//   const [search, setSearch] = useState("");
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
import Button from "@/features/ui/Button";

const SubscriberList = () => {
  // 👥 Existing Subscribers Data
 

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

  return (
    <div className="min-w-2xl max-w-full mx-auto bg-background text-muted-hover rounded-xl shadow p-2">
      <h1 className="text-2xl text-muted-hover font-semibold mb-5">Subscriber Management</h1>

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
          <Button>
           <UsersIcon className="w-4 h-4" />
          <span>Existing Subscribers</span>
          </Button>
         
        </button>
        <div
          onClick={() => {
            setActiveView('potential');
          }}
          className={`pb-2 px-3 flex items-center space-x-2 transition-colors ${
            activeView === 'potential'
              ? 'border-b-2 border-primary text-primary font-medium'
              : 'text-gray-500 hover:text-primary'
          }`}
        >
           <Button>
          <UserPlusIcon className="w-4 h-4" />
         <span>New/Potential Users </span> 
          </Button>
            </div>
        
      </div>

      {/* 📋 Conditional Table Rendering */}
      {activeView === 'subscribers' ? (
        <ExistingUsers/>
      ) : (
        <NewUsers />
      )}
    </div>
  );
};

export default SubscriberList;