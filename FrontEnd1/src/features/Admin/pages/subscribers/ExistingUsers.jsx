import Input from "@/features/ui/Input";
import { DeleteIcon, EditIcon, FilterIcon } from "lucide-react";

  export const ExistingUsers = ({ data, search, handleDelete, handleToggle, editSubscriber, setEditSubscriber, handleSave, setList, list }) => (
    <>
      {/* 🔍 Search for Subscribers */}
      <Input
        type="text"
        placeholder="Search existing subscribers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border border-muted/40 rounded-lg focus:outline-none focus:ring-2"
      />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-primary text-left text-background">
              <th className="p-3">SN</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="lg:p-3 md:p-1">Status</th>
              <th className="lg:p-3 md:p-1">Plan</th>
              <th className="lg:p-3 md:p-1">Expire</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((s, i) => (
              <tr key={s.id} className="border border-b-muted/40 bg-primary-foreground hover:bg-gray-50">
                <td className="p-3">{i + 1}</td>

                <td className="p-3">
                  {editSubscriber?.id === s.id ? (
                    <Input
                      type="text"
                      value={editSubscriber.name}
                      onChange={(e) =>
                        setEditSubscriber({
                          ...editSubscriber,
                          name: e.target.value,
                        })
                      }
                      className="p-1 border rounded"
                    />
                  ) : (
                    s.name
                  )}
                </td>
                <td className="p-3">
                  {editSubscriber?.id === s.id ? (
                    <Input
                      type="text"
                      value={editSubscriber.email}
                      onChange={(e) =>
                        setEditSubscriber({
                          ...editSubscriber,
                          email: e.target.value,
                        })
                      }
                      className="p-1 border rounded"
                    />
                  ) : (
                    s.email
                  )}
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${
                      s.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {s.active ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="p-3">{s.plan}</td>
                <td className="p-3">67 days</td> {/* Keeping '67 days' as per your original code */}

                {/* Desktop/Larger screen actions */}
                <td className="p-3 text-center md:table-cell hidden space-x-2">
                  {editSubscriber?.id === s.id ? (
                    <button
                      onClick={handleSave}
                      className={`px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600`}
                    >
                      <SaveIcon className="lg:hidden w-3 h-3 xl:hidden block" />
                      <span className="lg:block xl:block hidden">Save</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditSubscriber(s)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      <EditIcon className="lg:hidden w-3 h-3 xl:hidden block" />
                      <span className="lg:block xl:block hidden">Edit</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleToggle(s.id)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    <FilterIcon className="lg:hidden w-3 h-3 xl:hidden block" />
                    <span className="lg:block xl:block hidden">Status</span>
                  </button>

                  <button
                    onClick={() => handleDelete(s.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <DeleteIcon className="lg:hidden w-3 h-3 xl:hidden block" />
                    <span className="lg:block xl:block hidden">Delete</span>
                  </button>
                </td>

                {/* Mobile/Smaller screen actions dropdown */}
                <td
                  onMouseEnter={() => setList(s.id)}
                  onMouseLeave={() => setList(null)}
                  className="p-3 text-center flex md:hidden justify-center relative"
                >
                  <button className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600">
                    Actions
                  </button>

                  {/* Dropdown menu on hover */}
                  {list === s.id && (
                    <ul className="absolute top-12 right-0 bg-white shadow-lg border rounded-md p-2 space-y-2 z-10 w-40">
                      {editSubscriber?.id === s.id ? (
                        <li>
                          <button
                            onClick={handleSave}
                            className="w-full px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            Save
                          </button>
                        </li>
                      ) : (
                        <li>
                          <button
                            onClick={() => setEditSubscriber(s)}
                            className="w-full px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Edit
                          </button>
                        </li>
                      )}
                      <li>
                        <button
                          onClick={() => handleToggle(s.id)}
                          className="w-full px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                          {s.active ? "Deactivate" : "Activate"}
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="w-full px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  )}
                </td>
              </tr>
            ))}
            {data.length === 0 && (
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