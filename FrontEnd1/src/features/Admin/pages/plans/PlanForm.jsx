import React, { useEffect, useState } from 'react'
import Input from '@/features/ui/Input';
import { plans } from '@/data/mockData';

const PlanForm = ({ editKey, setOpenForm, setEditKey }) => {
  const [newPlan, setNewPlan] = useState({
    id: "",
    name: "",
    duration: "",
    features: "",
    limitations: "",
  });

  // Load plan on edit
  useEffect(() => {
    if (editKey) {
      const editable = plans[editKey]; // <-- correct access for object

      if (editable) {
        setNewPlan({
          id: editKey,
          name: editable.name,
          duration: editable.time,
          features: editable.features.join(", "),
          limitations: editable.limitations.join(", "),
        });
      }
    }
  }, [editKey]);

  // Update existing plan
  const handleUpdate = () => {
    if (!plans[editKey]) return;

    plans[editKey] = {
      ...plans[editKey],
      name: newPlan.name,
      time: newPlan.duration,
      features: newPlan.features.split(",").map(f => f.trim()),
      limitations: newPlan.limitations.split(",").map(l => l.trim()),
    };

    setEditKey(null);
    setOpenForm(false);
  };

  // Add new plan
  const handleSubmit = () => {
    if (!newPlan.id) return alert("Plan ID is required!");

    plans[newPlan.id] = {
      id: Object.keys(plans).length + 1,
      name: newPlan.name,
      time: newPlan.duration,
      features: newPlan.features.split(",").map(f => f.trim()),
      limitations: newPlan.limitations.split(",").map(l => l.trim()),
    };

    setOpenForm(false);
  };

  return (
    <div className="mb-6 border border-muted/40 p-4 rounded-lg bg-primary-foreground">
      <h2 className="font-semibold text-muted-hover mb-2">
        {editKey ? "Edit Plan" : "Add New Plan"}
      </h2>

      <div className="flex flex-col gap-2">

        {/* ID + Name */}
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="Plan ID (e.g., basic, pro)"
            value={newPlan.id}
            disabled={!!editKey} // cannot change ID while editing
            onChange={(e) => setNewPlan({ ...newPlan, id: e.target.value })}
          />

          <Input
            type="text"
            placeholder="Name"
            value={newPlan.name}
            onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
          />
           <Input
          type="number"
          placeholder="Duration (months)"
          value={newPlan.duration}
          onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value })}
        />
        </div>

       

        {/* Features */}
        <Input
          type="text"
          placeholder="Features (comma separated)"
          value={newPlan.features}
          onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value })}
        />

        {/* Limitations */}
        <Input
          type="text"
          placeholder="Limitations (comma separated)"
          value={newPlan.limitations}
          onChange={(e) =>
            setNewPlan({ ...newPlan, limitations: e.target.value })
          }
        />

        {/* Buttons */}
        <div className="flex justify-between md:justify-start lg:justify-start gap-10 mt-4">
          <button
            onClick={editKey ? handleUpdate : handleSubmit}
            className="px-4 py-2 w-[45%] md:w-[20%] lg:w-[20%]  bg-secondary text-secondary-foreground rounded-lg"
          >
            {editKey ? "Update" : "Submit"}
          </button>

          <button
            onClick={() => setOpenForm(false)}
            className="px-4 py-2 w-[45%] md:w-[20%] lg:w-[20%] bg-destructive text-background rounded-lg"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default PlanForm;
