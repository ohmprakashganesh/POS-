import React, { useState } from "react";

const InvoiceViewer = ({ setInvoice, invoice }) => {
  // Static invoice data
  const data = {
    billId: "BBSM-2025-10-14-001245",
    branch: {
      name: " BHATBHATENI SUPERMARKET-MAHARAJGANJ",
      address: "MAHARAJGANJ, Kathmandu, Nepal",
      type: "TAX INVOICE",
      contact: "+977-1-4721234",
    },
    cashier: {
      id: "EMP-0192",
      name: "Sita Shrestha",
    },
    customer: {
      name: "Ganesh Prasad",
      phone: "9801234567",
      address: "jhapa",
    },
    items: [
      {
        itemCode: "ITM-1001",
        name: "Sunflower Oil 1L",
        category: "Grocery",
        quantity: 2,
        unit: "pcs",
        unitPrice: 420,
        discount: 5,
        total: 798,
      },
      {
        itemCode: "ITM-2035",
        name: "Rice 25kg (Mansuli)",
        category: "Grocery",
        quantity: 1,
        unit: "bag",
        unitPrice: 1850,
        discount: 0,
        total: 1850,
      },
      {
        itemCode: "ITM-5021",
        name: "Colgate Toothpaste 150g",
        category: "Personal Care",
        quantity: 2,
        unit: "pcs",
        unitPrice: 135,
        discount: 10,
        total: 243,
      },
    ],
    subtotal: 2891,
    discountTotal: 77,
    vatPercent: 13,
    grandTotal: 3267,
    payment: {
      type: "Card",
      bank: "Nabil Bank",
      transactionId: "TXN-BB-20251014001245",
    },
    timestamp: "2025-10-14T11:35:22",
    remarks: "Thank you for shopping with Bhatbhateni!",
  };

  // ----- Download CSV -----
  const handleDownloadCSV = () => {
    const header = "Item,Quantity,Unit Price,Discount,Total\n";
    const rows = data.items
      .map(
        (i) =>
          `${i.name},${i.quantity},${i.unitPrice},${i.discount},${i.total}`
      )
      .join("\n");

    const csvContent =
      `Invoice ID: ${data.billId}\nCustomer: ${data.customer.name}\nDate: ${data.timestamp}\n\n` +
      header +
      rows +
      `\n\nSubtotal,,${data.subtotal}\nGrand Total,,${data.grandTotal}`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${data.billId}.csv`;
    link.click();
  };

  // ----- Download PDF -----
  const handleDownloadPDF = () => {
    const win = window.open("", "_blank");
    const html = `
      <html>
      <head>
        <title>Invoice ${data.billId}</title>
      </head>
      <body style="font-family: Arial; padding: 20px;">
        <div style="display:flex; flex-direction:column; align-items: center;">
              <p style="margin:0;">${data.branch.name}</p>
              <p style="margin:0;">${data.branch.address}</p>
              <p style="margin:0;">${data.branch.contact}</p>
         </div>
        <h2>Invoice #${data.billId}</h2>
        <p style="margin:0;"><strong>Customer:</strong> ${data.customer.name}</p>
        <p style="margin:0;"><strong>Phone:</strong> ${data.customer.phone}</p>
        <p style="margin:0;"><strong>Address:</strong> ${data.customer.address}</p>
        <p style="margin:0; padding-bottom:10px;"><strong>Date:</strong> ${data.timestamp}</p>
        <table border="1" cellspacing="0" cellpadding="6" style="width:100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Discount</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${data.items
              .map(
                (i) =>
                  `<tr><td>${i.name}</td><td>${i.quantity}</td><td>${i.unitPrice}</td><td>${i.discount}</td><td>${i.total}</td></tr>`
              )
              .join("")}
          </tbody>
        </table>
        <h3 style="text-align:right; margin-top: 10px;">Subtotal: ${data.subtotal}</h3>
        <h3 style="text-align:right;">Grand Total: ${data.grandTotal}</h3>
      </body>
      </html>`;
    win.document.write(html);
    win.document.close();
    win.print(); // user can save as PDF
  };

  return (
    <div className="p-6">
      {invoice && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark animate-fade-slide-in p-6 rounded-2xl shadow-lg max-w-[200] min-w-[200] relative">
            <button
              onClick={() => setInvoice(false)}
              className="absolute top-2 bg-gray-300 w-8 h-8 rounded-sm right-3 text-gray-600 hover:text-black text-xl"
            >
              ×
            </button>
            {/* header section */}

            <div className="header-section mb-3   text-sm font-serif">
              <p className="w-full text-center">{data.branch.name}</p>
              <p className="w-full text-center">{data.branch.address}</p>
              <p className="w-full text-center">{data.branch.contact}</p>
            </div>

            {/* Customer & Payment */}
            <div className="text-sm mb-2">
              <p><strong>BILL NO:</strong> {data.billId}</p>
              <p><strong>Date:</strong> {data.timestamp}</p>
              <p><strong>Customer:</strong> {data.customer.name}</p>
              <p><strong>Phone:</strong> {data.customer.phone}</p>
              <p><strong>Address:</strong> {data.customer.address}</p>
              <p><strong>Payment:</strong> {data.payment.type}</p>
            </div>

            {/* Items Table */}
            <table className="w-full mt-4 border border-black border-dotted border-collapse">
              <thead>
                <tr>
                  <th className="border border-black border-dotted p-1">SN</th>
                  <th className="border border-black border-dotted p-1">Item</th>
                  <th className="border border-black border-dotted p-1">Qty</th>
                  <th className="border border-black border-dotted p-1">Unit Price</th>
                  <th className="border border-black border-dotted p-1">Discount</th>
                  <th className="border border-black border-dotted p-1">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-black border-dotted p-1">{index + 1}</td>
                    <td className="border border-black border-dotted p-1">{item.name}</td>
                    <td className="border border-black border-dotted p-1">{item.quantity} {item.unit}</td>
                    <td className="border border-black border-dotted p-1">{item.unitPrice}</td>
                    <td className="border border-black border-dotted p-1">{item.discount}</td>
                    <td className="border border-black border-dotted p-1">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right mt-3 font-semibold">
              <p>Subtotal: Rs {data.subtotal}</p>
              <p>Grand Total: Rs {data.grandTotal}</p>
            </div>

            {/* Download Buttons */}
            <div className="mt-5 flex justify-center space-x-4">
              <button
                onClick={handleDownloadCSV}
                className="bg-secondary text-black hover:text-white px-4 py-2 rounded-lg hover:bg-secondary-hover transition"
              >
                Download CSV
              </button>
              <button
                onClick={handleDownloadPDF}
                className="bg-secondary text-black hover:text-white px-4 py-2 rounded-lg hover:bg-secondary-hover transition"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceViewer;
