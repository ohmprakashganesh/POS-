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

  // Handle pencil click
  const handleEdit = (id) => {
    setEditId(id);
  };

  // Handle dropdown change (Active/Inactive)
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
            <tr className="bg-secondary text-secondary-foreground text-left ">
              <th className="pl-2 py-2">SN</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Plan</th>
              <th>Expire</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody >
            {filtered.map((s, i) => (
              <tr
                key={s.id}
                className="border border-muted/40 dark:hover:bg-black/15 bg-white dark:bg-dark hover:bg-primary-foreground/30"
              >
                <td className="p-3">{i + 1}</td>

                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.email}</td>

                {/* --------update status -------- */}
                <td className="p-3">
                  {editId === s.id ? (
                    <SelectComponent
                      autoFocus
                      onChange={(e) => handleStatusChange(s.id, e.target.value)}
                      className="px-2 py-1 border-muted/40 rounded border  focus:ring-2"
                      defaultValue={s.active ? "active" : "inactive"}
                    >
                      <OptionComponent value="active"> Active

                      </OptionComponent>
                       <OptionComponent value="Inactive"> Active
                      </OptionComponent>
                    </SelectComponent>
                  ) : (
                    <span
                      className={`px-2 py-1 text-sm rounded-full ${
                        s.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {s.active ? "Active" : "Inactive"}
                    </span>
                  )}
                </td>

                <td className="p-3">{s.plan}</td>
                <td className="p-3">67 days</td>

                {/* ACTION BUTTONS */}
                <td className="p-3 flex justify-center items-center space-x-2">
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
