// components/BillViewer.jsx
import React from "react";

export const BillViewer = ({ show, billImage, onClose, onDownload }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-10">
      <div className="bg-white dark:bg-black rounded-xl p-4 shadow-xl  max-w-[90%] w-fit h-fit max-h-[90%] overflow-hidden flex flex-col">
        
        {/* BILL IMAGE */}
        <div className="flex justify-center items-center flex-grow overflow-auto">
          <img
            src={billImage}
            className="max-w-full max-h-full rounded-lg border"
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
