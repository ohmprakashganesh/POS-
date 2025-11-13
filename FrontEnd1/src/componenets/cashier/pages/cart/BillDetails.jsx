import Button from "@/componenets/ui/Button";
import React, { useRef } from "react";

const BillDetails = ({  subtotal, discount, netAmount, qrPlaceholder, onClose }) => {
  const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Bill</title>
          <style>
            body {
              font-family: 'Courier New', monospace;
              font-size: 12px;
              width: 80mm;
              margin: 0 auto;
              padding: 10px;
            }
            h2, h3, p {
              text-align: center;
              margin: 4px 0;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 5px;
            }
            th, td {
              padding: 3px;
              text-align: left;
              border-bottom: 1px dashed #ccc;
            }
            .right {
              text-align: right;
            }
            .total {
              border-top: 1px solid #000;
              font-weight: bold;
              padding-top: 5px;
            }
            img {
              display: block;
              margin: 6px auto;
              width: 120px;
              height: 120px;
            }
            @media print {
              @page {
                size: 80mm auto;
                margin: 0;
              }
              body {
                margin: 0;
              }
            }
          </style>
        </head>
        <body>${printContents}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };
const products = [
    { id: 1, name: "Milk", quantity: 2, unitPrice: 60 },
    { id: 2, name: "Bread", quantity: 1, unitPrice: 50 },
    { id: 3, name: "Eggs", quantity: 12, unitPrice: 10 },
  ];
  return (
    <div className="fixed inset-0 flex justify-center items-center w-screen h-screen bg-black/70 z-50 p-4">
      <div className="flex w-full h-fit justify-center overflow-y-scroll">

      <div className="bg-white rounded-lg shadow-lg p-4 w-[320px] flex flex-col">
        {/* Bill content area */}
        <div ref={printRef}>
          <h2 className="text-lg font-bold text-center mb-2">🧾 Supermarket Bill</h2>
          <p className="text-center text-sm mb-2">Thank you for shopping with us!</p>

          {/* Items Table */}
          <table className="w-full text-sm border-t border-gray-300">
            <thead>
              <tr className="font-semibold border-b border-gray-300">
                <th className="text-left">Item</th>
                <th className="text-right">Qty</th>
                <th className="text-right">Price</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={i}>
                  <td>{p.name}</td>
                  <td className="text-right">{p.quantity?"5":"6"}</td>
                  <td className="text-right">{p.unitPrice ?"500":"400"}</td>
                  <td className="text-right">{p.quantity * p.unitPrice ? "44":"5454"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="text-sm mt-2 border-t border-gray-300 pt-2">
            <p className="flex justify-between">
              <span>Subtotal:</span> <span>Rs. {subtotal?"44":"444"}</span>
            </p>
            <p className="flex justify-between">
              <span>Discount:</span> <span>Rs. {discount ? "55":"44"}</span>
            </p>
            <p className="flex justify-between font-bold border-t border-gray-300 pt-2">
              <span>Net Total:</span> <span>Rs. {netAmount ?"df":"dkfj"}</span>
            </p>
          </div>

          {/* QR Code */}
          <div className="mt-3 text-center flex justify-center w-full h-[]">
            <img className="w-[50px] h-[50px]"  src={qrPlaceholder} alt="QR Code" />
          </div>

          <p className="text-center text-xs mt-3">Visit again! 😊</p>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex justify-between gap-2">
          <Button
            onClick={handlePrint}
            className="bg-green-600 hover:bg-green-700 text-white w-1/2"
          >
            🖨️ Print Bill
          </Button>
          <Button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white w-1/2"
          >
            ❌ Cancel
          </Button>
        </div>
      </div>
    </div>
          </div>
  );
};

export default BillDetails;
