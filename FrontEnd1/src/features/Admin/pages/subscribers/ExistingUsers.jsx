import Input from "@/features/ui/Input";
import { PencilIcon, TrashIcon } from "lucide-react";
import { existingUsers } from "../../mockdata/mockAdminData";
import { useEffect, useState } from "react";
import { OptionComponent, SelectComponent } from "@/features/ui/Select";

export const ExistingUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    try {
      if (existingUsers) {
        setUsers(existingUsers);
      }
    } catch (error) {
      console.log("unable to fetch new users");
    }
  }, []);

  const filtered = users.filter((s) => {
    const term = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(term) ||
      s.email.toLowerCase().includes(term)
    );
  });

  const handleEdit = (id) => {
    setEditId(id);
  };

  const handleStatusChange = (id, value) => {
    const updated = users.map((u) =>
      u.id === id ? { ...u, active: value === "active" } : u
    );
    setUsers(updated);
    setEditId(null); // hide dropdown
  };

  return (
    <>
      <Input
        type="text"
        placeholder="Search existing subscribers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm p-2 mb-4 bg-white dark:bg-dark border border-muted/40 rounded-lg focus:outline-none focus:ring-2"
      />

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
    {filtered.map((s, i) => (
      <tr key={s.id} className="table-body-row">
        <td className="table-td">{i + 1}</td>

        <td className="table-td">{s.name}</td>
        <td className="table-td">{s.email}</td>

        {/* --------update status -------- */}
        <td className="table-td">
          {editId === s.id ? (
            <SelectComponent
              autoFocus
              onChange={(e) => handleStatusChange(s.id, e.target.value)}
              className=" border-muted/40 rounded border focus:ring-2"
              defaultValue={s.active ? "active" : "inactive"}
            >
              <OptionComponent value="active">Active</OptionComponent>
              <OptionComponent value="inactive">Inactive</OptionComponent>
            </SelectComponent>
          ) : (
            <span
              className={`px-2 text-xs rounded-full ${
                s.active
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {s.active ? "Active" : "Inactive"}
            </span>
          )}
        </td>

        <td className="table-td">{s.plan}</td>
        <td className="table-td">67 days</td>

        {/* ACTION BUTTONS */}
        <td className="table-td flex justify-center items-center space-x-2">
          <button
            onClick={() => handleEdit(s.id)}
            className="px-1 py-1 text-primary rounded hover:bg-primary hover:text-primary-foreground"
          >
            <PencilIcon className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleDelete(s.id)}
            className="px-1 py-1 text-destructive rounded hover:bg-red-600 hover:text-primary-foreground"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </td>
      </tr>
    ))}

    {filtered.length === 0 && (
      <tr>
        <td colSpan="7" className="p-4 text-center text-gray-500">
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
