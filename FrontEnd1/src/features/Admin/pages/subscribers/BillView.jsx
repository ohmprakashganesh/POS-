// components/BillViewer.jsx
import React from "react";

export const BillViewer = ({ show, billImage, onClose, onDownload }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-10">
      <div className=" rounded-xl p-4 shadow-xl  w-[80%]   h-full overflow-hidden flex items-center  flex-col">
        
        {/* BILL IMAGE */}
        <div className="flex flex-1 w-[80%]  h-full justify-center items-center  overflow-hidden">
          <img
            src={billImage}
            className="w-full h-full  object-contain  rounded-lg "
          />
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center  space-x-3 mt-4">
          <button
            onClick={onDownload}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-80"
          >
            Download
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-80"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
