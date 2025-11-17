import React, { useState } from "react";
import { plans as initialPlans } from "@/data/mockData";
import PlanForm from "./PlanForm";
import Button from "@/features/ui/Button";

const PlanManagement = () => {
  const [plant2, setPlans] = useState(initialPlans);
  const [editKey, setEditKey] = useState(null);
  const[openForm, setOpenForm]=useState(false);


  // Delete plan
  const handleDelete = (key) => {
    if (!window.confirm(`Delete ${plant2[key].name} plan?`)) return;
    const updated = { ...plant2 };
    delete updated[key];
    setPlans(updated);
  };

 

  return (
    <div className="w-full mx-auto md:p-6  p-2  bg-primary-foreground shadow rounded-lg">
      <div className="flex flex-wrap lg:justify-between justify-between ">
              <h1 className="text-2xl font-semibold mb-6">Manage Subscription Plans</h1>
              <Button onClick={()=>setOpenForm(true)} className=" md:w-2/12 w-auto lg:h-2/12 h-10">Add Plan</Button>
      </div>

      {/* Add/Edit Plan Section */}
      {
        openForm &&(
        <PlanForm/>
        )
      }

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
