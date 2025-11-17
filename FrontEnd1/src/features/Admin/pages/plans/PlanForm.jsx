import React, { useState } from 'react'
import { plans as initialPlans } from "@/data/mockData";
import Input from '@/features/ui/Input';

const PlanForm = ({editKey}) => {
      const [newPlan, setNewPlan] = useState({
    id: "",
    name: "",
    duration: "",
    features: "",
    limitations: "",
  });
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
      <div className="mb-6 border border-muted/40  p-4 rounded-lg bg-primary-foreground">
        <h2 className="font-semibold text-muted-hover  mb-2">
          {editKey ? "Edit Existing Plan" : "Add New Plan"}
        </h2>

        <div className="flex flex-col gap-2">
         <div className='flex gap-5'>
           <Input
            type="text"
            placeholder="Name"
            value={newPlan.name}
            onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
            className="p-2 border rounded"
          />
          <Input
            type="text"
            placeholder="Duration (months)"
            value={newPlan.duration}
            onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value })}
            className="p-2 border rounded"
          />
         </div>
         <div className='flex gap-3 mb-3 flex-col'>
          <Input
            type="text"
            placeholder="Features (comma separated)"
            value={newPlan.features}
            onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value })}
            className="p-2 border rounded w-full"
          />
          <Input
            type="text"
            placeholder="Limitations (comma separated)"
            value={newPlan.limitations}
            onChange={(e) => setNewPlan({ ...newPlan, limitations: e.target.value })}
            className="p-2 border rounded w-full min-w[90%]"
          />
         </div>
         <div className='flex w-full justify-between md:gap-10 md:justify-start lg:gap-10 lg:justify-start' >
         <button
            onClick={editKey ? () => handleSave(editKey) : handleAdd}
            className="px-4 py-2 md:w-2/8 lg:w-2/8  w-5/12 text-xl   bg-secondary text-secondary-foreground  rounded hover:bg-secondary-hover"
          >
            {editKey ? "Save" : "Submit"}
          </button>
          <button
            onClick={editKey ? () => handleSave(editKey) : handleAdd}
            className="px-4  py-2 md:w-2/8 lg:w-2/8  w-5/12 text-xl   bg-destructive text-background   rounded hover:bg-destructive-hover"
          >
             Cancel
          </button>
         </div>
         
        </div>
      </div>

  )
}

export default PlanForm
