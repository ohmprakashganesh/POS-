// PrintButton.jsx
import React from "react";

const PrintButton = ({ printRef, t }) => {
  const handlePrint = () => {
    if (!printRef.current) return;
    const printContent = printRef.current;
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write("<html><head><title>Sales Report</title></head><body>");
    printWindow.document.write(printContent.outerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <button
      className="px-4 py-2 border rounded hover:bg-gray-100"
      onClick={handlePrint}
    >
      {t("report.printReport")}
    </button>
  );
};

export default PrintButton;
