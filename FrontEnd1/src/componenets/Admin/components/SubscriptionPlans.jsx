import React, { useState } from "react";
import { plans as initialPlans } from "@/data/mockData";

const PlanManagement = () => {
  const [plant2, setPlans] = useState(initialPlans);
  const [editKey, setEditKey] = useState(null);
  const [newPlan, setNewPlan] = useState({
    id: "",
    name: "",
    duration: "",
    features: "",
    limitations: "",
  });

  // Delete plan
  const handleDelete = (key) => {
    if (!window.confirm(`Delete ${plant2[key].name} plan?`)) return;
    const updated = { ...plant2 };
    delete updated[key];
    setPlans(updated);
  };

  // Save edit
  const handleSave = (key) => {
    setPlans({
      ...plant2,
      [key]: {
        ...plant2[key],
        name: newPlan.name || plant2[key].name,
        duration: newPlan.duration || plant2[key].duration,
        features: newPlan.features
          ? newPlan.features.split(",").map((f) => f.trim())
          : plant2[key].features,
        limitations: newPlan.limitations
          ? newPlan.limitations.split(",").map((l) => l.trim())
          : plant2[key].limitations,
      },
    });
    setEditKey(null);
    setNewPlan({ id: "", name: "", duration: "", features: "", limitations: "" });
  };

  // Add new plan
  const handleAdd = () => {
    if (!newPlan.id || !newPlan.name) return alert("Enter key and name for the plan!");
    setPlans({
      ...plant2,
      [newPlan.id]: {
        name: newPlan.name,
        duration: newPlan.duration,
        features: newPlan.features
          ? newPlan.features.split(",").map((f) => f.trim())
          : [],
        limitations: newPlan.limitations
          ? newPlan.limitations.split(",").map((l) => l.trim())
          : [],
      },
    });
    setNewPlan({ id: "", name: "", duration: "", features: "", limitations: "" });
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">Manage Subscription Plans</h1>

      {/* Add/Edit Plan Section */}
      <div className="mb-6 border p-4 rounded-lg bg-gray-50">
        <h2 className="font-semibold mb-2">
          {editKey ? "Edit Existing Plan" : "Add New Plan"}
        </h2>

        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Plan Key (e.g., silver)"
            value={editKey ? editKey : newPlan.id}
            onChange={(e) => setNewPlan({ ...newPlan, id: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Name"
            value={newPlan.name}
            onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Duration (months)"
            value={newPlan.duration}
            onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Features (comma separated)"
            value={newPlan.features}
            onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value })}
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            placeholder="Limitations (comma separated)"
            value={newPlan.limitations}
            onChange={(e) => setNewPlan({ ...newPlan, limitations: e.target.value })}
            className="p-2 border rounded w-full"
          />
          <button
            onClick={editKey ? () => handleSave(editKey) : handleAdd}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {editKey ? "Save" : "Add"}
          </button>
        </div>
      </div>

      {/* Plans Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="p-3">SN</th>
              <th className="p-3">Name</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Features</th>
              <th className="p-3">Limitations</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(plant2).map(([key, plan], index) => (
              <tr key={key} className="border-b hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{plan.name}</td>
                <td className="p-3">{plan.time || plan.duration}</td>
                <td className="p-3">
                  <ul className="list-disc pl-5">
                    {plan.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </td>
                <td className="p-3">
                  {plan.limitations.length ? (
                    <ul className="list-disc pl-5">
                      {plan.limitations.map((l, i) => (
                        <li key={i}>{l}</li>
                      ))}
                    </ul>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => {
                      setEditKey(key);
                      setNewPlan({
                        name: plan.name,
                        duration: plan.time || plan.duration,
                        features: plan.features.join(", "),
                        limitations: plan.limitations.join(", "),
                      });
                    }}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(key)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanManagement;
