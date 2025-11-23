import React, { useState } from "react";
import { plans as initialPlans } from "@/data/mockData";
import PlanForm from "./PlanForm";
import Button from "@/features/ui/Button";
import { tr } from "zod/v4/locales";
import { PencilIcon, Trash2Icon } from "lucide-react";

const PlanManagement = () => {
  const [plans2, setPlans2] = useState(initialPlans);
  const [editKey, setEditKey] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const tableHeaders = [
    "SN",
    "Name",
    "Duration",
    "Features",
    "Limitations",
    "Actions",
  ];

  // Delete plan
  const handleDelete = (key) => {
    //if ok then delete
    if (!window.confirm(`Delete ${plans2[key].name} plan?`)) return;
    const updated = { ...plans2 };
    delete updated[key];
    setPlans2(updated);
  };



  return (
    <div className="w-full mx-auto  rounded-lg">
      <div className="flex flex-wrap lg:justify-between justify-between ">
        <h1 className="text-2xl font-bold text-dark dark:text-white mb-4">Manage Subscription Plans</h1>
        {!openForm && (
          <Button onClick={() => setOpenForm(true)} className=" md:w-2/12 bg-primary text-primary-foreground w-auto lg:h-2/12 h-10">Add Plan</Button>
        )}
      </div>

      {/* Add/Edit Plan Section */}
      {
        openForm && (
          <PlanForm setOpenForm={setOpenForm} setEditKey={setEditKey} plans={plans2} setPlans={setPlans2} editKey={editKey ? editKey : null} />
        )
      }

      {/* Plans Table */}
      <div className="overflow-x-auto">
        <table className="table ">
          <thead>
            <tr className="table-head-row">
              {tableHeaders.map((header, index) => (
                <th
                  key={index}
                  className={`table-th `}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="table-tbody">
            {Object.entries(plans2).map(([key, plan], index) => (
              <tr key={key} className="table-head-tr ">
                <td className="table-td">{index + 1}</td>
                <td className="table-td">{plan.name}</td>
                <td className="table-td">{plan.time || plan.duration}</td>
                <td className="table-td shrink-0">
                  <ul className="list-disc shrink-0 pl-5">
                    {plan.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </td>
                <td className="table-td">
                  {plan.limitations.length ? (
                    <ul className="list-disc pl-5">
                      {plan.limitations.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="box md:space-x-2 table-td ">
                  <button
                    onClick={() => {
                      setEditKey(key);
                      setOpenForm(true);
                    }}
                    className="px-1 py-1   hover:bg-primary  dark:text-muted-hover rounded "
                  >
                    <PencilIcon className="action-icon text-primary hover:text-primary-foreground  " />
                  </button>
                  <button
                    onClick={() => handleDelete(key)}
                    className="px-1 py-1 hover:bg-destructive  dark:text-muted-hover rounded "
                  >
                    <Trash2Icon className="action-icon text-destructive hover:text-primary-foreground " />
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
