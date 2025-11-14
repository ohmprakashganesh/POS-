import React, { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  DocumentTextIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { transactionsData } from "../../../../data/mockData";
import InvoiceViewer from "./Invoice";
import Input from "@/features/ui/Input";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });
  const [invoice, setInvoice] = useState(false);

  useEffect(() => {
    // In real app, this would be an API call
    setTransactions(transactionsData);
    setFilteredTransactions(transactionsData);
  }, []);

  useEffect(() => {
    let filtered = transactions;

    if (searchTerm) {
      filtered = filtered.filter(
        (transaction) =>
          transaction.invoiceNumber
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          transaction.customer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (dateRange.start) {
      filtered = filtered.filter(
        (transaction) => transaction.date >= dateRange.start
      );
    }

    if (dateRange.end) {
      filtered = filtered.filter(
        (transaction) => transaction.date <= dateRange.end
      );
    }

    setFilteredTransactions(filtered);
  }, [searchTerm, dateRange, transactions]);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const viewInvoice = (transactionId) => {
    console.log(transactionId);
    setInvoice(true);
  };

  return (
    <div>
      {invoice && <InvoiceViewer setInvoice={setInvoice} invoice={invoice} />}
      <h1 className="text-2xl font-bold">Transaction History</h1>
      <p className="text-muted mb-3">View and manage all sales transactions</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        <div className="bg-gradient-to-r from-white to-secondary/10 rounded-md shadow-sm flex items-center p-5 gap-4">
          <DocumentTextIcon className="h-8 w-8 text-muted" />
          <div className="details">
            <p className="font-medium text-muted">Total Transactions</p>
            <p className="text-2xl font-bold">{transactions.length}</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-white to-secondary/10 rounded-md shadow-sm flex items-center p-5 gap-4">
          <span className="text-secondary flex items-center justify-center rounded-full size-8 bg-secondary/10 font-bold">
            $
          </span>
          <div className="details">
            <p className="font-medium text-muted">Total Revenue</p>
            <p className="text-2xl font-bold">
              {" "}
              ${transactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-white to-secondary/10 rounded-md shadow-sm flex items-center p-5 gap-4">
          <span className="text-secondary flex items-center justify-center rounded-full size-8 bg-secondary/10 font-bold">
            ✓
          </span>
          <div className="details">
            <p className="font-medium text-muted">Completed Transactions</p>
            <p className="text-2xl font-bold">
              {" "}
              {transactions.filter((t) => t.status === "completed").length}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-white to-tertiary/10 rounded-md shadow-sm flex items-center p-5 gap-4">
          <span className="text-tertiary flex items-center justify-center rounded-full size-8 bg-tertiary/10 font-bold">
            ⏱
          </span>
          <div className="details">
            <p className="font-medium text-muted">Pending Transactions</p>
            <p className="text-2xl font-bold">
              {transactions.filter((t) => t.status === "pending").length}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1  items-center mb-2 md:grid-cols-4 gap-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted" />
          <Input
            type="text"
            placeholder="Search by invoice or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-white"
          />
        </div>
        <Input
          type="date"
          placeholder="Start Date"
          value={dateRange.start}
          onChange={(e) =>
            setDateRange((prev) => ({ ...prev, start: e.target.value }))
          }
          className="bg-white"
        />
        <Input
          type="date"
          placeholder="End Date"
          value={dateRange.end}
          onChange={(e) =>
            setDateRange((prev) => ({ ...prev, end: e.target.value }))
          }
          className="bg-white"
        />
        <p className="text-muted">
          Showing {filteredTransactions.length} transactions
        </p>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto bg-white rounded-md shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="uppercase  text-xs text-left font-semibold bg-secondary text-secondary-foreground">
            <tr>
              <th className="p-4 w-6">S.N</th>
              <th className="p-4">Invoice</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Date</th>
              <th className="p-4">Items</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr key={transaction.id} className="hover:bg-background">
                <td className="px-4 py-3 truncate max-w-[180px]">
                  {index + 1}
                </td>
                <td className="p-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <DocumentTextIcon className="h-5 w-5 text-muted" />
                    {transaction.invoiceNumber}
                  </div>
                </td>
                <td className="p-4">{transaction.customer}</td>
                <td className="p-4">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="p-4">{transaction.items.length} items</td>
                <td className="p-4 whitespace-nowrap font-semibold">
                  ${transaction.amount.toFixed(2)}
                </td>
                <td className="p-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      transaction.status
                    )}`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="p-4 whitespace-nowrap font-medium">
                  <button
                    onClick={() => viewInvoice(transaction.id)}
                    className="text-primary hover:text-primary-hover flex items-center gap-2"
                  >
                    <EyeIcon className="h-4 w-4 mr-1" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredTransactions.length === 0 && (
          <div className="flex items-center justify-center flex-col min-h-50">
            <DocumentTextIcon className="h-12 w-12 text-muted" />
            <h3 className="mt-2 font-semibold">No transactions found</h3>
            <p className="mt-1 text-sm text-muted">
              {searchTerm || dateRange.start || dateRange.end
                ? "Try changing your search or filter criteria."
                : "No transactions have been recorded yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
