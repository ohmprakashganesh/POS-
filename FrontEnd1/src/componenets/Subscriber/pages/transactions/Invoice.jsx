import Button from "@/componenets/ui/Button";
import { X } from "lucide-react";

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
    invoice && (
      <>
        <div
          className="overlay fixed inset-0 bg-black/30 z-50"
          onClick={() => setInvoice(false)}
        >
          <X strokeWidth={2.5} className="size-12 p-2 rounded-full text-primary-foreground hover:bg-black/40 absolute top-2 right-2"/>
        </div>
        <div className="bill w-[95dvw] overflow-auto  max-w-7xl max-h-4/5 bg-white shadow-sm p-3 z-100 rounded-md mx-auto fixed top-1/2 left-1/2 -translate-1/2">
          {/* Header Section */}
          <div className="text-center border-b border-gray-200 pb-4 mb-6">
            <h1 className="text-xl md:text-2xl font-bold mb-1">{data.branch.name}</h1>
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
          <table className="w-full mb-5 text-xs sm:text-sm">
            <thead className="bg-secondary text-secondary-foreground font-semibold">
              <tr>
                <th className="px-3 py-2">S.N</th>
                <th className="px-3 py-2">Product</th>
                <th className="px-3 py-2">Qty</th>
                <th className="px-3 py-2 text-right">Rate</th>
                <th className="px-3 py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-200 px-3 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    {item.name}
                  </td>
                  <td className="border border-gray-200 px-3 py-2  text-center">
                    {item.quantity} {item.unit}
                  </td>
                  <td className="border border-gray-200 px-3 py-2 text-right">
                    Rs. {item.unitPrice.toFixed(2)}
                  </td>
                  <td className="border border-gray-200 px-3 py-2 text-right font-semibold">
                    Rs. {item.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Totals Section */}
          <div className="flex justify-end mb-6">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Subtotal:</span>
                <span className="font-semibold">Rs. {data.subtotal}</span>
              </div>
              {data.vatAmount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted">VAT {data.vatPercent}%:</span>
                  <span className="font-semibold">Rs. {data.vatAmount}</span>
                </div>
              )}
              {data.discountTotal > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Discount:</span>
                  <span className="font-semibold">
                    - Rs. {data.discountTotal}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-base pt-2 border-t border-gray-200">
                <span className="font-bold">Grand Total:</span>
                <span className="font-bold">Rs. {data.grandTotal}</span>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4 text-center text-xs text-muted mb-6">
            <p>Thank you for your business!</p>
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
            <Button onClick={handleDownloadPDF}>Download PDF</Button>
          </div>
        </div>
      </>
    )
  );
};

export default InvoiceViewer;
