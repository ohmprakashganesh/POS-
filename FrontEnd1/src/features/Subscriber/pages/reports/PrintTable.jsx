import React from "react";

const PrintTable = React.forwardRef(({ salesData, reportType, t }, ref) => {
  return (
    <div ref={ref} style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Company Details - Centered */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: "20px" }}>
          BHATBHATENI SUPERMARKET - MAHARAJGANJ
        </h2>
        <h3 style={{ margin: "5px 0", fontSize: "16px" }}>
          MAHARAJGANJ, Kathmandu, Nepal
        </h3>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>+977-1-4721234</p>
      </div>

      {/* Table - Indented 20px */}
      <div style={{ marginLeft: "20px" }}>
        <table
          className="table border border-gray-300 w-full text-left"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                {reportType === "daily"
                  ? t("report.date")
                  : reportType === "weekly"
                  ? t("report.week")
                  : t("report.month")}
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                {t("report.salesAmount")}
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                {t("report.numberOfOrders")}
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                {t("report.averageOrderValue")}
              </th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((item, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {item.date || item.week || item.month}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {item.sales.toLocaleString()}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {item.orders}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {item.orders > 0
                    ? (item.sales / item.orders).toFixed(2)
                    : "0.00"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default PrintTable;
