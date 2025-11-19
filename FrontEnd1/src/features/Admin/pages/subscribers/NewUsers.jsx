import Input from "@/features/ui/Input";
import { newUsers } from "../../mockdata/mockAdminData";
import { useEffect, useState } from "react";
import Button from "@/features/ui/Button";
import { X, XCircle } from "lucide-react";
import { Check } from "lucide-react";
import { BillViewer } from "./BillView";

import { XCircleIcon } from "@heroicons/react/24/outline";

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

      <Input
        type="text"
        placeholder="Search potential users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className=" mb-4 max-w-sm "
      />

      <div className="overflow-x-auto">
        <BillViewer
  show={showBill}
  billImage={billImage}
  onClose={closeStatement}
  onDownload={downloadBill}
/>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-primary  text-left text-wrap text-background">
              <th className="pl-2 py-2">SN</th>
              <th >Name</th>
              <th >Email</th>
              <th >Plan</th>
              <th >Bill</th>
              <th >Date Created</th>
              <th className="pr-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => (
              <tr key={u.id} className="border border-muted/40 dark:hover:bg-black/15 border-b-muted/40 bg-primary-foreground hover:bg-primary-foreground/30">
                <td className="pl-2 py-3">{i + 1}</td>
                <td >{u.name}</td>
                <td >{u.email}</td>
                <td >
                  <span className="px-2 py-1 text-sm rounded-full">
                    {u.plan}
                  </span>
                </td>
                <td >
                  <div className="w-[50px]  flex justify-center h-[50px]">
<img
  className="w-[70%] h-[70%] my-auto mx-auto rounded-md cursor-pointer"
  onClick={() => showStatement(u.bill)}
  src={u.bill}
/>

                  </div>
                </td>
                <td  >{u.dateCreated} </td>

                <td className="flex gap-2  py-3 pr-3 justify-center items-center" >
                  <div className="flex space-x-3">
                    <button onClick={() => acceptRequest(u.id)} className="p-1 text-secondary hover:bg-primary hover:text-primary-foreground rounded">
                      <Check size={15} />
                    </button>
                    <button onClick={() => rejectRequest(u.id)} className="px-1 py-1 text-destructive hover:bg-destructive hover:text-destructive-foreground rounded">
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