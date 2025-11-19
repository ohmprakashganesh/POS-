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
    <div className="w-full mx-auto md:p-4  p-2    rounded-lg">
      <div className="flex flex-wrap lg:justify-between justify-between ">
        <h1 className="text-2xl font-semibold mb-6">Manage Subscription Plans</h1>
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
        <table className="w-full border-separate border-spacing-y-1 ">
          <thead>
            <tr className="bg-secondary p-5 text-center text-secondary-foreground">
              {tableHeaders.map((header, index) => (
                <th
                  key={index}
                  className={`py-3 text-center mx-auto px-2 ${header === "Actions" ? "text-center" : "text-center"}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white  rounded-md text-muted-hover dark:bg-dark">
            {Object.entries(plans2).map(([key, plan], index) => (
              <tr key={key} className="gap-2 justify-center items-center  my-auto ">
                <td className="md:p-3 px-1">{index + 1}</td>
                <td className="md:p-3 ">{plan.name}</td>
                <td className="p-3">{plan.time || plan.duration}</td>
                <td className="p-3 shrink-0">
                  <ul className="list-disc shrink-0 pl-5">
                    {plan.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </td>
                <td className="p-3">
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
                <td className="box md:space-x-2 space-x-1 ">
                  <button
                    onClick={() => {
                      setEditKey(key);
                      setOpenForm(true);
                    }}
                    className="px-1 py-1   hover:bg-primary  dark:text-muted-hover rounded "
                  >
                    <PencilIcon className="h-5 w-5 text-primary hover:text-primary-foreground  " />
                  </button>
                  <button
                    onClick={() => handleDelete(key)}
                    className="px-1 py-1 hover:bg-destructive  dark:text-muted-hover rounded "
                  >
                    <Trash2Icon className="h-5 w-5 text-destructive hover:text-primary-foreground " />
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
