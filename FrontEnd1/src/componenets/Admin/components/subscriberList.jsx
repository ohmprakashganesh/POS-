
import React, { useState } from "react";

const SubscriberList = () => {
  const [subscribers, setSubscribers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", active: true, plan:'pro' ,start:"2022.12.5",expiry:'2026.04.22'},
    { id: 2, name: "Alice Smith", email: "alice@example.com", active: false,plan:'basic',start:"2022.12.5",expiry:'2026.04.22' },
    { id: 3, name: "Robert Lee", email: "robert@example.com", active: true,plan:'enterprise' ,start:"2022.12.5",expiry:'2026.04.22'},
  ]);

  const [search, setSearch] = useState("");
  const [newSubscriber, setNewSubscriber] = useState({ name: "", email: "" });
  const [editSubscriber, setEditSubscriber] = useState(null);
const [list, setList] = useState(null); // store hovered subscriber ID

  // ✅ Add new subscriber
  const handleAdd = () => {
    if (!newSubscriber.name || !newSubscriber.email) return alert("Please fill all fields");
    const newSub = {
      id: Date.now(),
      ...newSubscriber,
      active: true,
    };
    setSubscribers([...subscribers, newSub]);
    setNewSubscriber({ name: "", email: "" });
  };

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

  // ✅ Filtered list
  const filtered = subscribers.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
      <div className="min-w-2xl max-w-full mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Subscriber Management</h1>

        {/* 🔍 Search */}
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

   

        {/* 📋 Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700">
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3 ">Email</th>
                <th className="p-3">Status</th>
               <th className="p-3">plan</th>
                <th className="p-3">expire after</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{i + 1}</td>

                  <td className="p-3">
                    {editSubscriber?.id === s.id ? (
                      <input
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
                      <input
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

                   <td className="p-3">
                   
                    {  s.plan}
                 
                  </td>
                   <td className="p-3">
                   
                   67 days
                 
                  </td>
                 <td className="p-3 text-center md:block hidden space-x-2">
               
                  {editSubscriber?.id === s.id ? (
                    <button
                      onClick={handleSave}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditSubscriber(s)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  )}

                  <button
                   onMouseEnter={() => setStatus(s.id)}
                   onMouseLeave={() => setStatus(null)}
                    onClick={() => handleToggle(s.id)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                   update status
                  </button>

                  <button
                    onClick={() => handleDelete(s.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button> 
                </td> 
                    <td
                onMouseEnter={() => setList(s.id)}
                onMouseLeave={() => setList(null)}
      className="p-3 text-center flex md:hidden justify-center relative"
    >
      <button 
     
      className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600">
        Actions
      </button>

      {/* Dropdown menu on hover */}
      {list ===s.id && (
        <ul className="absolute top-12 bg-white shadow-lg border rounded-md p-2 space-y-2 z-10">
          {editSubscriber?.id === s.id && (
            <li>
              <button
                onClick={handleSave}
                className="w-full px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
            </li>
          ) 
          }

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
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No subscribers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default SubscriberList;
