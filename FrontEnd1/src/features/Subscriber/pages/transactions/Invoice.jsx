import Button from "@/features/ui/Button";
import { X } from "lucide-react";

const InvoiceViewer = ({ setInvoice, invoice }) => {

  // Static invoice data fetch the real data from the backend
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

  /**
   * Generates and downloads a CSV file containing itemized invoice data.
   */
  const handleDownloadCSV = () => {
    // ⚠️ Updated to use internal 'data' object
    const header = "Item,Quantity,Unit Price (Rs.),Total (Rs.)\n";
    const rows = data.items
      .map(
        (i) =>
          `${i.name},${i.quantity} ${i.unit},${i.unitPrice.toFixed(
            2
          )},${i.total.toFixed(2)}`
      )
      .join("\n");
    const totals = `\nSubtotal,,Rs. ${data.subtotal}\nVAT (${data.vatPercent}%),,Rs. ${data.vatAmount}\nDiscount,,Rs. ${data.discountTotal}\n\nGrand Total,,Rs. ${data.grandTotal}`;
    const csvContent = header + rows + totals;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    // ⚠️ Updated to use internal 'data.billId'
    link.download = `${data.billId}.csv`;
    link.click();
  };

  /**
   * Opens a new window with a printable HTML version of the invoice.
   * The user can then use the browser's print function to "Save as PDF".
   */
  const handleDownloadPDF = () => {
    // ⚠️ Updated to use internal 'data' object
    const win = window.open("", "_blank");
    const html = `
      <html>
      <head>
        <title>Invoice ${data.billId}</title>
        <style>
            body { font-family: 'Arial', sans-serif; padding: 20px; font-size: 12px; }
            h2 { font-size: 18px; margin-top: 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f0f0f0; }
            .right { text-align: right; }
            .total-section { width: 250px; margin-left: auto; margin-top: 20px; }
            .total-row { display: flex; justify-content: space-between; padding: 5px 0; }
            .grand-total { border-top: 2px solid #333; font-size: 14px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 20px;">${data.branch.name}</h1>
            <p style="margin: 0;">${data.branch.address}</p>
            <p style="margin: 0; font-weight: bold; color: #333;">${data.branch.type}</p>
        </div>
        
        <p><strong>Bill No:</strong> ${data.billId}</p>
        <p><strong>Date:</strong> ${data.timestamp.split("T")[0]}</p>
        <p><strong>Customer:</strong> ${data.customer.name} (Ph: ${data.customer.phone})</p>
        
        <table>
          <thead>
            <tr>
              <th style="width: 5%;">S.N</th>
              <th style="width: 45%;">Product</th>
              <th style="width: 15%;">Qty</th>
              <th class="right" style="width: 20%;">Rate (Rs.)</th>
              <th class="right" style="width: 15%;">Amount (Rs.)</th>
            </tr>
          </thead>
          <tbody>
            ${data.items
              .map(
                (i, index) =>
                  `<tr>
                    <td>${index + 1}</td>
                    <td>${i.name}</td>
                    <td>${i.quantity} ${i.unit}</td>
                    <td class="right">${i.unitPrice.toFixed(2)}</td>
                    <td class="right">${i.total.toFixed(2)}</td>
                  </tr>`
              )
              .join("")}
          </tbody>
        </table>
        
        <div class="total-section">
            <div class="total-row"><span>Subtotal:</span><span>Rs. ${data.subtotal.toFixed(2)}</span></div>
            <div class="total-row"><span>Discount:</span><span>- Rs. ${data.discountTotal.toFixed(2)}</span></div>
            <div class="total-row"><span>VAT (${data.vatPercent}%):</span><span>Rs. ${data.vatAmount.toFixed(2)}</span></div>
            <div class="total-row grand-total"><span>Grand Total:</span><span>Rs. ${data.grandTotal.toFixed(2)}</span></div>
        </div>

        <div style="text-align: center; margin-top: 30px; font-style: italic; color: #6c757d;">
            ${data.remarks}
        </div>
      </body>
      </html>`;

    win.document.write(html);
    win.document.close();
    win.print(); // Triggers the print dialog (where the user saves as PDF)
  };

  return (
    invoice && (
      <>
        {/* Overlay and Close Button */}
        <div
          className="overlay fixed inset-0 bg-black/30 dark:bg-black/70 z-50"
          onClick={() => setInvoice(false)}
        >
          <X
            strokeWidth={2.5}
            className="size-12 p-2 rounded-full text-primary-foreground hover:bg-black/40 absolute top-2 right-2 cursor-pointer"
            onClick={() => setInvoice(false)}
          />
        </div>

        {/* Modal/Viewer Container */}
        <div className="bill animate-fade-slide-in w-[95dvw] overflow-auto max-w-4xl max-h-4/5 bg-white dark:bg-dark shadow-sm p-3 z-50 rounded-md mx-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* Header Section */}
          <div className="text-center border-b border-muted/40 pb-4 mb-6">
            <h1 className="text-xl md:text-2xl font-bold mb-1">
              {data.branch.name}
            </h1>
            <p className="text-sm text-muted">{data.branch.address}</p>
            <p className="text-sm text-muted">Contact: {data.branch.contact}</p>

            <span className="inline-block mt-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
              TAX INVOICE
            </span>
          </div>

          {/* Invoice Details & Customer Info */}
          <div className="grid grid-cols-2 gap-5 mb-5">
            <div className="w-full">
              <h3 className="font-semibold text-sm uppercase tracking-wide mb-1">
                Invoice Details
              </h3>
              <div className="text-sm space-y-1">
                <p>
                  <span className="text-muted">Bill No:</span>{" "}
                  <span className="font-semibold">{data.billId}</span>
                </p>
                <p>
                  <span className="text-muted">Date:</span>{" "}
                  <span className="font-semibold">
                    {data.timestamp.split("T")[0]}
                  </span>
                </p>
                <p>
                  <span className="text-muted">Cashier:</span>{" "}
                  <span className="font-semibold">{data.cashier.name}</span>
                </p>
                <p>
                  <span className="text-muted">Payment:</span>{" "}
                  <span className="font-semibold">{data.payment.type}</span>
                </p>
              </div>
            </div>
            <div className="w-full">
              <h3 className="font-semibold text-sm uppercase tracking-wide mb-1">
                Customer Details
              </h3>
              <div className="text-sm space-y-1">
                <p>
                  <span className="text-muted">Name:</span>{" "}
                  <span className="font-semibold">{data.customer.name}</span>
                </p>
                <p>
                  <span className="text-muted">Phone:</span>{" "}
                  <span className="font-semibold">{data.customer.phone}</span>
                </p>
                <p>
                  <span className="text-muted">Address:</span>{" "}
                  <span className="font-semibold">{data.customer.address}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full mb-5 text-xs sm:text-sm text-muted">
              <thead className="bg-secondary text-secondary-foreground font-semibold">
                <tr>
                  <th className="px-3 py-2">S.N</th>
                  <th className="px-3 py-2 text-left">Product</th>
                  <th className="px-3 py-2 text-center">Qty</th>
                  <th className="px-3 py-2 text-right">Rate</th>
                  <th className="px-3 py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-muted/40 px-3 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-muted/40 px-3 py-2">
                      {item.name}
                    </td>
                    <td className="border border-muted/40 px-3 py-2 text-center">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="border border-muted/40 px-3 py-2 text-right">
                      Rs. {item.unitPrice.toFixed(2)}
                    </td>
                    <td className="border border-muted/40 px-3 py-2 text-right font-semibold">
                      Rs. {item.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Section */}
          <div className="flex justify-end mb-6">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Subtotal:</span>
                <span className="font-semibold">
                  Rs. {data.subtotal.toFixed(2)}
                </span>
              </div>
              {data.discountTotal > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Discount:</span>
                  <span className="font-semibold">
                    - Rs. {data.discountTotal.toFixed(2)}
                  </span>
                </div>
              )}
              {data.vatAmount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted">VAT {data.vatPercent}%:</span>
                  <span className="font-semibold">
                    Rs. {data.vatAmount.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-base pt-2 border-t border-muted/40">
                <span className="font-bold">Grand Total:</span>
                <span className="font-bold">
                  Rs. {data.grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Remarks */}
          <div className="border-t border-muted/40 pt-4 text-center text-xs text-muted mb-6">
            <p>{data.remarks}</p>
            <p className="mt-1">
              This is a computer-generated invoice and does not require a
              signature.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button outline onClick={handleDownloadCSV}>
              Download CSV
            </Button>
            <Button onClick={handleDownloadPDF}>Print / Save PDF</Button>
          </div>
        </div>
      </>
    )
  );
};

export default InvoiceViewer;