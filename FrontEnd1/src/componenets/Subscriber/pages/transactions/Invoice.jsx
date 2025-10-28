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
    vatAmount: 376,
    grandTotal: 3267,
    payment: {
      type: "Card",
      bank: "Nabil Bank",
      transactionId: "TXN-BB-20251014001245",
    },
    timestamp: "2025-10-14T11:35:22",
    remarks: "Thank you for shopping with Bhatbhateni!",
  };

  // Generate and download CSV file
  const handleDownloadCSV = () => {
    const header = "Item,Quantity,Price\n";
    const rows = invoice.items
      .map((i) => `${i.name},${i.quantity},${i.price}`)
      .join("\n");
    const csvContent = header + rows + `\n\nTotal,,${invoice.total}`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${invoice.id}.csv`;
    link.click();
  };

  // Generate and download PDF file (using browser’s built-in print-to-PDF)
  const handleDownloadPDF = () => {
    const win = window.open("", "_blank");
    const html = `
      <html>
      <head>
        <title>Invoice ${invoice.id}</title>
      </head>
      <body style="font-family: Arial; padding: 20px;">
        <h2>Invoice #${invoice.id}</h2>
        <p><strong>Customer:</strong> ${invoice.customerName}</p>
        <p><strong>Date:</strong> ${invoice.date}</p>
        <table border="1" cellspacing="0" cellpadding="6" style="width:100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price ($)</th>
            </tr>
          </thead>
          <tbody>
            ${invoice.items
              .map(
                (i) =>
                  `<tr><td>${i.name}</td><td>${i.quantity}</td><td>${i.price}</td></tr>`
              )
              .join("")}
          </tbody>
        </table>
        <h3 style="text-align:right; margin-top: 10px;">Total: $${
          invoice.total
        }</h3>
      </body>
      </html>`;
    win.document.write(html);
    win.document.close();
    win.print(); // User can save as PDF
  };

  return (
    <div className="p-6">
      {invoice && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-[200] min-w-[200] relative">
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

            {/* section */}

            <div className="text-gray-black  text-sm">
              <p>BILL NO: {data.billId}</p>
              <p>transaction Date: {data.timestamp}</p>
            </div>

            {/* customer details */}
            <div className="text-gray-black  text-sm">
              <p>
                <strong>Name:</strong> {data.customer.name}
              </p>
              <p>
                <strong>phone:</strong> {invoice.phone}
              </p>
              <p>
                <strong>Address</strong> {invoice.address}
              </p>
            </div>
            <div>
              <p>payment:{data.payment.type} </p>
            </div>

            <table className="w-full mt-4 border border-black border-dotted border-collapse">
              <thead>
                <tr className=" border border-black border-dotted">
                  <td>sn </td>
                  <td className="border border-black border-dotted ">
                    product
                  </td>
                  <td className="border border-black border-dotted ">Qty </td>
                  <td className=" border border-black border-dotted">rate</td>
                  <td className=" border border-black border-dotted">amount</td>
                </tr>
              </thead>
              <tbody>
                {data.items.map((item, index) => (
                  <tr key={index} border border-black border-dotted>
                    <td className="p-2 border border-black border-dotted">
                      {index + 1}
                    </td>
                    <td className="p-2 border border-black border-dotted">
                      {item.name}
                    </td>
                    <td className="p-2 border border-black border-dotted">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="p-2 border border-black border-dotted">
                      {item.unitPrice}
                    </td>
                    <td className="p-2 border border-black border-dotted">
                      {item.total}{" "}
                    </td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 className="text-right mt-3 font-semibold">
              Total: Rs {data.subtotal}
            </h3>

            <div className="mt-5 flex justify-center space-x-4">
              <button
                onClick={handleDownloadCSV}
                className="bg-gray-400 text-black hover:text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Download CSV
              </button>
              <button
                onClick={handleDownloadPDF}
                className="bg-gray-400 text-black hover:text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
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
