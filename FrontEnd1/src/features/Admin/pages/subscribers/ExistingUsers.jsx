import Input from "@/features/ui/Input";
import { PencilIcon, Shield, ShieldBan, TrashIcon } from "lucide-react";
import { existingUsers } from "../../mockdata/mockAdminData";
import { useEffect, useState } from "react";
import { OptionComponent, SelectComponent } from "@/features/ui/Select";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const ExistingUsers = () => {
  const [users,setUsers] = useState(()=>existingUsers ? existingUsers : []);
  const [filteredUsers,setFilteredUsers]=useState(users)
  const [search, setSearch] = useState("");
useEffect(() => {
  if (search.trim().length !== 0) {
    const filtered = users.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredUsers(filtered);
  } else {
    setFilteredUsers(users);
  }
}, [users, search]);

  // Handle status toggle
  const handleToggle = (id) => {
     const updated = users.map((u) =>
      u.id === id ? { ...u, active:!u.active } : u
    );
    setUsers(updated);
  };

  const handleDelete=(id)=>{
    setUsers(prev=>(prev.filter(s=>s.id!==id)))
  }

  return (
    <>
     <div className="relative">
      <MagnifyingGlassIcon className="absolute size-5 text-muted top-1/2 left-2 -translate-y-1/2"/>
       <Input
        type="text"
        placeholder="Search existing subscribers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      className="max-w-lg my-2 pl-9 bg-white dark:bg-dark "
      />
     </div>
     

      <div className="overflow-x-auto shadow-md rounded-md">
     <table className="w-full border-collapse shadow-md rounded-md">
  <thead>
    <tr className="table-head-row">
      <th className="table-th">SN</th>
      <th className="table-th">Name</th>
      <th className="table-th">Email</th>
      <th className="table-th">Status</th>
      <th className="table-th">Plan</th>
      <th className="table-th">Expire</th>
      <th className="table-th">Actions</th>
    </tr>
  </thead>

  <tbody>
    {filteredUsers.map((s, i) => (
      <tr key={s.id} className="table-body-row">
        <td className="table-td">{i + 1}</td>

        <td className="table-td">{s.name}</td>
        <td className="table-td">{s.email}</td>

        {/* --------update status -------- */}
        <td >
          <span className={` rounded-full  px-2 text-sm ${s.active ? "bg-green-100 text-constructive":"bg-red-100 text-destructive"}`}>
          {s.active ? "Active" : "Inactive"}
          </span>
        </td>

        <td className="table-td">{s.plan}</td>
        <td className="table-td">67 days</td>

        {/* ACTION BUTTONS */}
        <td className="table-td flex justify-center items-center space-x-2">
          <button
          title={s.active ? "deactivate":"activate"}
            onClick={() => handleToggle(s.id)}
            className="p-1.5 text-tertiary hover:bg-tertiary/30 rounded-full transform-colors"
          >
            {s.active ? <Shield className="size-4"/> :<ShieldBan className="size-4"/> }
          </button>

          <button
            onClick={() => handleDelete(s.id)}
            className="p-1.5 text-destructive rounded-full hover:bg-destructive/30"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </td>
      </tr>
    ))}

    {filteredUsers.length === 0 && (
      <tr>
        <td colSpan="7" className="p-4  text-center text-muted">
          No subscribers found.
        </td>
      </tr>
    )}
  </tbody>
</table>

      </div>
    </>
  );
};
