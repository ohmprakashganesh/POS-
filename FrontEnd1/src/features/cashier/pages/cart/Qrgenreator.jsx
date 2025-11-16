import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FileX } from "lucide-react";

export const QRGenerator = ({ type, payment, bill }) => {
  const [qrValue, setQrValue] = useState("");

  useEffect(() => {
    // ---------------- PAYMENT QR ----------------
    if (type === "payment" && payment) {
      const paymentData = `Merchant Acc: ${payment.merchantAccount}
Order ID: ${payment.orderId}
Total Amount: Rs.${payment.totalAmount}`;
      setQrValue(paymentData);
    }

    // ---------------- BILL QR ----------------
    else if (type === "bill" && bill) {
      const { items, customer, subtotal, discountRate, discountAmount, netAmount, date } = bill;

      const billData = {
        customer: {
          name: customer?.name || "N/A",
          phone: customer?.phone || "N/A",
        },
        items: items?.map((i) => ({
          name: i.name,
          qty: i.quantity,
          price: i.price,
          total: (i.quantity * i.price).toFixed(2),
        })),
        subtotal: subtotal.toFixed(2),
        discount: `${discountRate}% (Rs. ${discountAmount.toFixed(2)})`,
        netTotal: netAmount.toFixed(2),
        date,
      };

      setQrValue(JSON.stringify(billData));
    }

  }, [type, payment, bill]);

  return (
    <div style={{ padding: "5px",display:"flex",direction:"column", justifyContent:"center", maxWidth: "100%" }}>
      <div className="mt-4 text-center">
{qrValue && (
  <QRCodeCanvas
    value={qrValue}
    className={type === "bill" ? "w-12 h-12" : "w-44 h-44"}
  />
)}
      </div>
    </div>
  );
};
