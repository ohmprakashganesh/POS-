import React, { useState } from "react";

const initialPlans = {
  basic: {
    name: "Basic",
    monthly: 29,
    yearly: 290,
    features: [
      "Up to 100 products",
      "1 user account",
      "Basic reporting",
      "Email support",
      "Mobile POS access",
    ],
    limitations: ["No advanced analytics", "No API access", "Limited customer support"],
  }
};

const PlanManagement = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [editKey, setEditKey] = useState(null); // key of plan being edited
  const [newPlan, setNewPlan] = useState({
    key: "",
    name: "",
    monthly: "",
    yearly: "",
    features: "",
    limitations: "",
  });

  // Delete plan
  const handleDelete = (key) => {
    if (!window.confirm(`Delete ${plans[key].name} plan?`)) return;
    const updated = { ...plans };
    delete updated[key];
    setPlans(updated);
  };

  // Save edit
  const handleSave = (key) => {
    setPlans({
      ...plans,
      [key]: {
        ...plans[key],
        name: newPlan.name || plans[key].name,
        monthly: newPlan.monthly || plans[key].monthly,
        yearly: newPlan.yearly || plans[key].yearly,
        features: newPlan.features
          ? newPlan.features.split(",").map((f) => f.trim())
          : plans[key].features,
        limitations: newPlan.limitations
          ? newPlan.limitations.split(",").map((l) => l.trim())
          : plans[key].limitations,
      },
    });
    setEditKey(null);
    setNewPlan({ key: "", name: "", monthly: "", yearly: "", features: "", limitations: "" });
  };

  // Add new plan
  const handleAdd = () => {
    if (!newPlan.key || !newPlan.name) return alert("Enter key and name for the plan!");
    setPlans({
      ...plans,
      [newPlan.key]: {
        name: newPlan.name,
        monthly: parseFloat(newPlan.monthly),
        yearly: parseFloat(newPlan.yearly),
        features: newPlan.features ? newPlan.features.split(",").map((f) => f.trim()) : [],
        limitations: newPlan.limitations
          ? newPlan.limitations.split(",").map((l) => l.trim())
          : [],
      },
    });
    setNewPlan({ key: "", name: "", monthly: "", yearly: "", features: "", limitations: "" });
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">Manage Subscription Plans</h1>

      {/* Add New Plan */}
      <div className="mb-6 border p-4 rounded-lg bg-gray-50">
        {!editKey &&(
          <h2 className="font-semibold mb-2"> Add New Plan</h2>
        )}
         {editKey &&(
         <h2 className="font-semibold mb-2"> Edit Existing Plan </h2>
        )}
       
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Plan Key (e.g., silver)"
            value={ editKey? editKey:newPlan.key}
            onChange={(e) => setNewPlan({ ...newPlan, key: e.target.value })}
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
            type="number"
            placeholder="Monthly Price"
            value={newPlan.monthly}
            onChange={(e) => setNewPlan({ ...newPlan, monthly: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Yearly Price"
            value={newPlan.yearly}
            onChange={(e) => setNewPlan({ ...newPlan, yearly: e.target.value })}
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
            onClick={handleAdd}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {editKey?(
              <h1>SAVE </h1>
            ):<h1>ADD</h1>}

            
          </button>
        </div>
      </div>


{/* plat table ======================================================================= */}
      {/* Plans Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="p-3">Key</th>
              <th className="p-3">Name</th>
              <th className="p-3">Monthly</th>
              <th className="p-3">Yearly</th>
              <th className="p-3">Features</th>
              <th className="p-3">Limitations</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(plans).map((key) => (
              <tr key={key} className="border-b hover:bg-gray-50">
                <td className="p-3">{key}</td>
                <td className="p-3">
                  {editKey === key ? (
                    <input
                      type="text"
                      value={newPlan.name}
                      onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                      className="p-1 border rounded"
                    />
                  ) : (
                    plans[key].name
                  )}
                </td>
                <td className="p-3">
                  {editKey === key ? (
                    <input
                      type="number"
                      value={newPlan.monthly}
                      onChange={(e) => setNewPlan({ ...newPlan, monthly: e.target.value })}
                      className="p-1 border rounded"
                    />
                  ) : (
                    `$${plans[key].monthly}`
                  )}
                </td>
                <td className="p-3">
                  {editKey === key ? (
                    <input
                      type="number"
                      value={newPlan.yearly}
                      onChange={(e) => setNewPlan({ ...newPlan, yearly: e.target.value })}
                      className="p-1 border rounded"
                    />
                  ) : (
                    `$${plans[key].yearly}`
                  )}
                </td>
                <td className="p-3">
                  {editKey === key ? (
                    <input
                      type="text"
                      value={newPlan.features}
                      onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value })}
                      className="p-1 border rounded w-full"
                    />
                  ) : (
                    <ul className="list-disc pl-5">
                      {plans[key].features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  )}
                </td>
                <td className="p-3">
                  {editKey === key ? (
                    <input
                      type="text"
                      value={newPlan.limitations}
                      onChange={(e) => setNewPlan({ ...newPlan, limitations: e.target.value })}
                      className="p-1 border rounded w-full"
                    />
                  ) : plans[key].limitations.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {plans[key].limitations.map((l, i) => (
                        <li key={i}>{l}</li>
                      ))}
                    </ul>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="p-3 text-center space-x-2">
                  {editKey === key ? (
                    <button
                      onClick={() => handleSave(key)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditKey(key);
                        setNewPlan({
                          name: plans[key].name,
                          monthly: plans[key].monthly,
                          yearly: plans[key].yearly,
                          features: plans[key].features.join(", "),
                          limitations: plans[key].limitations.join(", "),
                        });
                      }}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  )}
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
