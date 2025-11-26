import React, { useState, useMemo } from "react";
import { Search, CheckCircle, XCircle, AlertTriangle, EyeIcon, Shield, ShieldBan } from "lucide-react";
import { companyData } from "@/data/mockData";
import Input from "@/features/ui/Input";
import { useNavigate } from "react-router-dom";
const STATUS_OPTIONS = ["All",'Active', 'Expired'];

const StatusBadge = ({ status }) => {
  let color = "bg-gray-200 text-gray-700 border-gray-300";
  let Icon = AlertTriangle;

  if (status === "Active") {
    color = "bg-green-100 text-green-700 border-green-300";
    Icon = CheckCircle;
  } else if (status === "Expired") {
    color = "bg-red-100 text-red-700 border-red-300";
    Icon = XCircle;
  }

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold border ${color}`}>
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
};

const Companies = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState(companyData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const[selectedStatus,setSelectedStatus]=useState();

  const itemsPerPage = 5;

 const filteredData = useMemo(() => {
  let data = companies;

  const s = searchTerm?.trim().toLowerCase();
  const ss = selectedStatus?.toLowerCase();

  // --- SEARCH FILTER ---
  if (s) {
    data = data.filter((c) =>
      c.name.toLowerCase().includes(s) ||
      c.type.toLowerCase().includes(s) ||
      c.subscriber?.email?.toLowerCase().includes(s)
    );
  }

  // --- STATUS FILTER ---
  if (ss && ss !== "all") {
    data = data.filter((c) =>
      c.subscription.status.toLowerCase() === ss
    );
  }

  return data;
}, [searchTerm, companies, selectedStatus]);


  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

const handleAction = (id) => {
  setCompanies((prev) =>
    prev.map((item) =>
      item.id === id
        ? {
            ...item,
            subscription: {
              ...item.subscription,
              status:
                item.subscription.status === "Active"
                  ? "Expired"
                  : "Active",
            },
          }
        : item
    )
  );
};


  return (
    <div className="min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Admin Company Monitoring</h1>
          <p className="text-gray-500">Overview of all registered companies and subscription status.</p>
        </div>

      <div className="flex  md:flex-row gap-5 w-full">
  {/* Search Box with Icon */}
  <div className="relative mb-4 w-full md:w-sm">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />

    <Input
      type="text"
      placeholder="Search by name, email, or type..."
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
      }}
      className="w-full pl-10 bg-white dark:bg-dark pr-4 py-2  rounded-lg"
    />
  </div>

  {/* Status Filter */}
  <select
    value={selectedStatus}
    onChange={(e) => setSelectedStatus(e.target.value)}
    className="bg-white text-muted dark:bg-dark w-full max-w-sm px-4 border border-muted/40  h-10  rounded-lg 
    focus:outline-primary/40
    focus:border
    active:outline
    active:ring-1
    active:border-primary/40"
  >
    {STATUS_OPTIONS.map((item, index) => (
      <option key={index} value={item}>
        {item === "all" ? t("item.all") : item}
      </option>
    ))}
  </select>
</div>


        <div className="overflow-x-auto">
          <table className="w-full shadow-sm">
            <thead>
              <tr>
                <th>SN</th>
                <th>Company</th>
                <th>Type</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Renewal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((c,ind) => (
                <tr key={ind} onClick={() => navigate(`/companies/detail/${c.id}`)}>
  <td>{ind + 1}</td>
  <td className="flex gap-2">
    <img src={c.logoUrl} alt="" className="w-8 h-8 rounded-full border" />
    <div>
      <div>{c.name}</div>
      <div className="text-xs text-muted">{c.subscriber.email}</div>
    </div>
  </td>
  <td>{c.type}</td>
  <td>{c.subscription.planName}</td>
  <td>
    <StatusBadge status={c.subscription.status} />
  </td>
  <td>{c.subscription.endDate}</td>
  {/* Action TD - prevent row click */}
  <td onClick={(e) => e.stopPropagation()}>
    <div className="flex gap-2">
      <button
        onClick={() => navigate(`/companies/detail/${c.id}`)}
        className="text-secondary hover:text-secondary-hover"
      >
        <EyeIcon size={18} />
      </button>
      <button
        onClick={() => handleAction(c.id)}
        className="text-red-600 hover:text-red-900 text-xs"
      >
        {c.subscription.status === "Active" ? <Shield size={18} /> : <ShieldBan size={18} />}
      </button>
    </div>
  </td>
</tr>

                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-gray-500">
                    No companies found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-end items-center mt-6">
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
             <span className="px-3 py-1">{currentPage}</span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
