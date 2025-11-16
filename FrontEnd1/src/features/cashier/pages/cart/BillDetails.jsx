import Button from "@/features/ui/Button";
import React, { useEffect, useRef, useState } from "react";
import { QRGenerator } from "./Qrgenreator";
import { customersData } from '@/data/mockData';

const BillDetails = ({ bill, onClose }) => {
  const today = new Date().toISOString().split("T")[0];
  const[customers,setCustomers]=useState([])
  useEffect(()=>{
      setCustomers(customersData);
  },[]);
  if (!bill) return null;
  const {
    items,
    customerId,
    subtotal,
    discountRate,
    discountAmount,
    netAmount,
    payment,
    qrPlaceholder,
  } = bill;
  console.log(payment.paymentType?payment.paymentType:"cashhh");
   
const customer = customers.find((e) => e.id == customerId);

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
            h2, h3, p { text-align: center; margin: 4px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 5px; }
            th, td {
              padding: 3px;
              text-align: left;
              border-bottom: 1px dashed #ccc;
            }
            .right { text-align: right; }
            .total {
              border-top: 1px solid #000;
              font-weight: bold;
              padding-top: 5px;
            }
            img { display: block; margin: 6px auto; width: 120px; height: 120px; }
            @media print {
              @page { size: 80mm auto; margin: 0; }
              body { margin: 0; }
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

  return (
    <div className="fixed inset-0 flex justify-center items-center w-screen h-screen bg-black/70 z-50 p-4">
      <div className="flex w-full h-fit justify-center overflow-y-scroll">
        <div className="bg-primary-foreground text-muted rounded-lg shadow-lg p-4 w-[300px] flex flex-col">
          
          {/* Printable bill part */}
          <div ref={printRef}>
            <h2 className="text-lg font-bold text-center text-muted-hover mb-2">🧾 Supermarket Bill</h2>
            <p className="text-center text-sm mb-2">Thank you for shopping with us!</p>

            {/* Customer Info */}
            {customer && (
              <div className="text-xs mb-2">
                <p><strong>Name:</strong> {customer.name}</p>
                <p><strong>Phone:</strong> {customer.phone}</p>
                 <p><strong>Date:</strong> {today}</p>

              </div>
            )}

            {/* Items Table */}
            <table className="w-full text-sm border-t border-t-muted/40">
              <thead>
                <tr className="font-semibold text-muted-hover border-b border-b-muted/40">
                  <th>Item</th>
                  <th className="right">Qty</th>
                  <th className="right">Price</th>
                  <th className="right">Total</th>
                </tr>
              </thead>
              <tbody>
                {items?.map((p, i) => (
                  <tr key={i}>
                    <td>{p.name}</td>
                    <td className="right">{p.quantity}</td>
                    <td className="right"> {p.price}</td>
                    <td className="right">{(p.quantity * p.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="text-sm mt-2  border-t border-t-muted/40 pt-2">
              <p className="flex justify-between">
                <span>Subtotal:</span> <span>Rs. {subtotal.toFixed(2)}</span>
              </p>

              <p className="flex justify-between">
                <span>Discount ({discountRate}%):</span>
                <span>Rs. {discountAmount.toFixed(2)}</span>
              </p>

              <p className="flex justify-between font-bold border-t border-t-muted/40 pt-2">
                <span>Net Total:</span>
                <span>Rs. {netAmount.toFixed(2)}</span>
              </p>
              <p>payment Type : <span>{payment.paymentType}</span></p> 
              
            </div>
            {/* QR Code */}
            {payment?.qrImage && (
              <div className="mt-3 text-center">
                <img
                  className="w-[80px] h-[80px]"
                  src={payment.qrImage || qrPlaceholder}
                  alt="QR Code"
                />
              </div>
            )}
            <QRGenerator bill={bill?bill:""} type={"bill"}   />
            <p className="text-center text-xs mt-3">Visit again! 😊</p>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex justify-between gap-2">
            <Button onClick={handlePrint}  className="bg-primary hover:bg-primary-hover text-white w-1/2">
              🖨️ Print
            </Button>
            <Button onClick={onClose} className="bg-destructive hover:bg-destructive-hover text-white w-1/2">
              ❌ Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillDetails;
