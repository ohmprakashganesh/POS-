import Input from "@/features/ui/Input";
import { newUsers } from "../../mockdata/mockAdminData";
import { useEffect, useState } from "react";
import Button from "@/features/ui/Button";
import { X, XCircle } from "lucide-react";
import { Check } from "lucide-react";
import { BillViewer } from "./BillView";

import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";

export const NewUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showBill, setShowBill] = useState(false);
const [billImage, setBillImage] = useState("");

  //  fetch only the new user
  useEffect(() => {
    try {
      if (newUsers) {
        setUsers(newUsers);
      }
    } catch (error) {
      console.log("unable to fetch new users")
    }
  }, []);
  const filtered = users.filter(
    (s) => {
      const term = search.toLowerCase();
      return (
        s.name.toLowerCase().includes(term) ||
        s.email.toLowerCase().includes(term)
      )
    }
  );

  function rejectRequest(uid) {
    // call the reject api
    alert("request rejected")
  }
  function acceptRequest(uid) {
    // call the reject api
    alert("request accepted")
  }

  function showStatement(img) {
  setBillImage(img);
  setShowBill(true);
}

function closeStatement() {
  setShowBill(false);
  setBillImage("");
}

function downloadBill() {
  const link = document.createElement("a");
  link.href = billImage;
  link.download = "bill.jpg";
  link.click();
}







  return (
    <>
     <div className="relative">
      <MagnifyingGlassIcon className="absolute size-5 text-muted top-1/2 left-2 -translate-y-1/2"/>
       <Input
        type="text"
        placeholder="Search potential users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm  my-2 pl-9 bg-white dark:bg-dark "
      />
     </div>

      <div className="overflow-x-auto shadow-md rounded-md">
        <BillViewer
  show={showBill}
  billImage={billImage}
  onClose={closeStatement}
  onDownload={downloadBill}
/>
        <table className="table">
  <thead>
    <tr className="table-head-row">
      <th className="table-th">SN</th>
      <th className="table-th">Name</th>
      <th className="table-th">Email</th>
      <th className="table-th">Plan</th>
      <th className="table-th">Bill</th>
      <th className="table-th">Date Created</th>
      <th className="table-th">Actions</th>
    </tr>
  </thead>

  <tbody className="rounded-md">
    {filtered.map((u, i) => (
      <tr key={u.id} className="table-body-row">
        <td className="table-td">{i + 1}</td>
        <td className="table-td">{u.name}</td>
        <td className="table-td">{u.email}</td>

        <td className="table-td">
          <span className="text-sm rounded-full">{u.plan}</span>
        </td>

        <td className="table-td">
          <div className="w-[25px] flex justify-center h-[25px]">
            <img
              className="w-[70%] h-[70%] my-auto mx-auto rounded-md cursor-pointer"
              onClick={() => showStatement(u.bill)}
              src={u.bill}
            />
          </div>
        </td>

        <td className="table-td">{u.dateCreated}</td>

        <td className="table-td flex gap-2 justify-center items-center">
          <div className="flex space-x-3">
            <button
              onClick={() => acceptRequest(u.id)}
              className="p-1 text-secondary hover:bg-primary hover:text-primary-foreground rounded"
            >
              <Check size={15} />
            </button>

            <button
              onClick={() => rejectRequest(u.id)}
              className="px-1 py-1 text-destructive hover:bg-destructive hover:text-destructive-foreground rounded"
            >
              <X size={15} />
            </button>
          </div>
        </td>
      </tr>
    ))}

    {filtered.length === 0 && (
      <tr>
        <td colSpan="6" className="p-4 text-center text-gray-500">
          No potential users found.
        </td>
      </tr>
    )}
  </tbody>
</table>

      </div>
    </>
  )

};