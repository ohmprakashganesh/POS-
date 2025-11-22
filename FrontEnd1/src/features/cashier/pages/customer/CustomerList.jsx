
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   PlusIcon,
//   MagnifyingGlassIcon,
//   PencilIcon,
//   TrashIcon,
//   UserIcon,
// } from "@heroicons/react/24/outline";
//  import { customersData } from '@/data/mockData';
// import Input from "@/features/ui/Input";
// import AddEditCustomer from "./AddEditCustomer";
// import { useTranslation } from "react-i18next";
// import { useForm } from "../../context/FormContext";
// const CustomerList = () => {
//   const { openForm, openCustomerForm}=useForm();
//   const {t}=useTranslation("cashier");
//   const [customers, setCustomers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredCustomers, setFilteredCustomers] = useState([]);
  
//     const headers = [
//     t("customers.tableHeaders.sn"),
//     t("customers.tableHeaders.name"),
//     t("customers.tableHeaders.phone"),
//     t("customers.tableHeaders.email"),
//     t("customers.tableHeaders.address"),
//     t("customers.tableHeaders.totalOrders"),
//     t("customers.tableHeaders.totalSpent"),
//     t("customers.tableHeaders.actions"),
//   ];

//   useEffect(() => {
//     // In real app, this would be an API call
//     setCustomers(customersData);
//     setFilteredCustomers(customersData);
//   }, []);

//   useEffect(() => {
//     const filtered = customers.filter(
//       (customer) =>
//         customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         customer.phone.includes(searchTerm) ||
//         customer.email.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredCustomers(filtered);
//   }, [searchTerm, customers]);

//   const handleDelete = (customerId) => {
//     if (window.confirm("Are you sure you want to delete this customer?")) {
//       setCustomers(customers.filter((c) => c.id !== customerId));
//     }
//   };
//   return (
//     <div >
//     {openForm && (
//       <div className="fixed inset-0 cursor-pointer bg-black/60 z-50 flex items-center justify-center">
//         <AddEditCustomer />
//       </div>
//     )}
//     <div className="space-y-2 ">
//       <div className="flex flex-col  sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-2xl font-bold">{t("customers.customers")}</h1>
//           <p className="text-muted">{t("customers.manageCustomers")}</p>
//         </div>
//         <button onClick={()=>openCustomerForm()}
//           className="inline-flex items-center cursor-pointer gap-2 px-4 py-2 font-semibold bg-primary hover:bg-primary-hover text-primary-foreground rounded-md"
//         >
//           <PlusIcon className="h-5 w-5" strokeWidth={2.5} />
//           {t("customers.addCustomer")}
//         </button>
//       </div>
      
//       {/* Search */}
//       <div className="relative max-w-md  my-6">
//         <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted" />
//         <Input
//           type="text"
//           placeholder={t("customers.search")}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="pl-9 bg-white"
//         />
//       </div>

//      {/* Table section */}
//       <div className="overflow-x-auto bg-white rounded-md shadow-sm">
//         <table className="min-w-full text-sm text-gray-700">
//           <thead className="uppercase  text-xs text-left font-semibold text-secondary-foreground bg-secondary ">
//            <tr >
//             {headers.map((field,ind)=>(
//               <th key={ind} className="p-4">{field}</th>
//             ))}
//                </tr>
//           </thead>

//           <tbody>
//             {filteredCustomers.map((customer, index) => (
//               <tr key={customer.id} className="hover:bg-background">
//                 <td className="px-4 py-3 truncate max-w-[180px]">
//                   {index + 1}
//                 </td>
//                 {/* Customer Name + Icon */}
//                 <td className="px-4 py-3 flex items-center gap-2">
//                   <UserIcon className="size-9 p-1.5 bg-primary/10 rounded-full text-primary" />
//                   <div>
//                     <p className="font-semibold ">{customer.name}</p>
//                     <p className="text-xs text-muted">Customer</p>
//                   </div>
//                 </td>

//                 {/* Phone */}
//                 <td className="px-4 py-3">{customer.phone}</td>

//                 {/* Email */}
//                 <td className="px-4 py-3 truncate max-w-[200px]">
//                   {customer.email}
//                 </td>

//                 {/* Address */}
//                 <td className="px-4 py-3 truncate max-w-[180px]">
//                   {customer.address}
//                 </td>

//                 {/* Total Orders */}
//                 <td className="px-4 py-3 font-semibold">12</td>

//                 {/* Total Spent */}
//                 <td className="px-4 py-3 font-semibold text-green-600">
//                   $2,450.00
//                 </td>

//                 {/* Actions */}
//                 <td className="px-4 py-3 flex items-center gap-2">
//                    <span onClick={()=>openCustomerForm(customer.id)}> <PencilIcon className="h-4 w-4 cursor-pointer" /></span>
//                   <button
//                     onClick={() => handleDelete(customer.id)}
//                     className="p-1.5 rounded-full hover:bg-red-50 text-red-600 cursor-pointer hover:text-red-800 transition"
//                   >
//                     <TrashIcon className="h-4 w-4" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {filteredCustomers.length === 0 && (
//           <div className="text-center min-h-50 flex items-center justify-center flex-col">
//             <UserIcon className="mx-auto h-12 w-12 text-muted" />
//             <h3 className="mt-2 text-sm font-semibold">No customers found</h3>
//             <p className="mt-1 text-sm text-muted">
//               {searchTerm
//                 ? "Try changing your search criteria."
//                 : "Get started by creating your first customer."}
//             </p>
//             {!searchTerm && (
//               <div className="mt-6">
//                 <Link
//                   to="/customers/add"
//                   className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md"
//                 >
//                   <PlusIcon className="h-5 w-5 mr-2" />
//                   Add Customer
//                 </Link>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//     </div>
//   );
// };

// export default CustomerList;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { customersData } from "@/data/mockData";
import Input from "@/features/ui/Input";
import AddEditCustomer from "./AddEditCustomer";
import { useTranslation } from "react-i18next";
import { useForm } from "../../context/FormContext";

const CustomerList = () => {
  const { openForm, openCustomerForm } = useForm();
  const { t } = useTranslation("cashier");
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const headers = [
    t("customers.tableHeaders.sn"),
    t("customers.tableHeaders.name"),
    t("customers.tableHeaders.phone"),
    t("customers.tableHeaders.email"),
    t("customers.tableHeaders.address"),
    t("customers.tableHeaders.totalOrders"),
    t("customers.tableHeaders.totalSpent"),
    t("customers.tableHeaders.actions"),
  ];

  useEffect(() => {
    setCustomers(customersData);
    setFilteredCustomers(customersData);
  }, []);

  useEffect(() => {
    const filtered = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [searchTerm, customers]);

  const handleDelete = (customerId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter((c) => c.id !== customerId));
    }
  };

  return (
    <div >
      {openForm && (
        <div className="fixed inset-0 cursor-pointer bg-black/60 z-50 flex items-center justify-center">
          <AddEditCustomer />
        </div>
      )}

      <div className="" >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h1 className="text-2xl  font-bold text-dark dark:text-white">
              {t("customers.customers")}
            </h1>
            <p className="text-muted">{t("customers.manageCustomers")}</p>
          </div>

          {/* Add Customer button */}
          <button
            onClick={() => openCustomerForm()}
            className="inline-flex items-center cursor-pointer gap-2 px-4 py-2 font-semibold 
            bg-primary hover:bg-primary-hover text-primary-foreground rounded-md"
          >
            <PlusIcon className="h-5 w-5" strokeWidth={2.5} />
            {t("customers.addCustomer")}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md my-3">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted" />
          <Input
            type="text"
            placeholder={t("customers.search")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-card border bg-white dark:bg-dark border-muted/40 text-foreground"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-card bg-white dark:bg-dark rounded-md shadow-sm border border-muted/40 ">
          <table className="min-w-full text-sm text-foreground">
            <thead className="uppercase text-xs text-secondary-foreground font-semibold bg-secondary">
              <tr>
                {headers.map((field, ind) => (
                  <th key={ind} className="px-2 py-3">
                    {field}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer, index) => (
                <tr key={customer.id} className="hover:bg-background ">
                  <td className="p-2 text-muted truncate max-w-[180px]">
                    {index + 1}
                  </td>

                  <td className="p-2 flex items-center gap-2">
                    <UserIcon className="size-7 p-1.5 bg-primary/10 rounded-full text-muted" />
                    <div>
                      <p className=" text-muted">{customer.name}</p>
                    </div>
                  </td>
                  <td className="p-2 text-muted py-3">{customer.phone}</td>

                  <td className="p-2 truncate text-muted max-w-[200px]">
                    {customer.email}
                  </td>

                  <td className="p-2 truncate text-muted max-w-[180px]">
                    {customer.address}
                  </td>

                  <td className="p-2 text-muted font-semibold">12</td>

                  <td className="p-2 font-semibold text-muted ">
                  {t("products.rs")} 2,450.00
                  </td>

                  <td className="p-2 flex items-center gap-2">
                    <span onClick={() => openCustomerForm(customer.id)}>
                      <PencilIcon className="h-4 w-4 cursor-pointer text-primary" />
                    </span>

                    <button
                      onClick={() => handleDelete(customer.id)}
                      className="p-1  rounded-full hover:bg-red-50 text-red-600 cursor-pointer hover:text-red-800 transition"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {filteredCustomers.length === 0 && (
            <div className="text-center min-h-50 flex items-center justify-center flex-col p-10 text-foreground">
              <UserIcon className="mx-auto h-12 w-12 text-muted" />
              <h3 className="mt-2 text-sm text-muted font-semibold">No customers found</h3>
              <p className="mt-1 text-sm text-muted">
                {searchTerm
                  ? "Try changing your search criteria."
                  : "Get started by creating your first customer."}
              </p>

              {!searchTerm && (
                <div className="mt-6">
                  <Link
                    to="/customers/add"
                    className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md"
                  >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Customer
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
