import React, { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  DocumentTextIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { transactionsData } from "@/data/mockData";
import InvoiceViewer from "./Invoice";
import Input from "@/features/ui/Input";
import { useTranslation } from "react-i18next";
import {RotateCcwIcon } from "lucide-react";
import { OptionComponent, SelectComponent } from "@/features/ui/Select";

const TransactionHistory = () => {
  
  const {t}=useTranslation()
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const[paymentState,setPaymentState]=useState("completed");
  const[langState,setLangState]=useState(false);
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
    const term = searchTerm.toLowerCase();

    filtered = filtered.filter((transaction) => {
      const dateString = new Date(transaction.date)
        .toISOString()
        .slice(0, 10); // yyyy-mm-dd

      return (
        transaction.invoiceNumber.toLowerCase().includes(term) ||
        transaction.customer.toLowerCase().includes(term) ||
        dateString.includes(term)
      );
    });
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

      if (paymentState !== "all") {
      filtered = filtered.filter(
        (trans) => trans.status === paymentState
      );
    }
   
    setFilteredTransactions(filtered);
  }, [searchTerm, dateRange,paymentState, transactions]);

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
      <h1 className="text-2xl font-bold">{t("transactionHistory.title")}</h1>
      <p className="text-muted mb-3">{t("transactionHistory.description")}</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-5">
        <div className="bg-white dark:bg-dark  rounded-md shadow-sm flex items-center p-5 gap-4">
          <DocumentTextIcon className="h-8 w-8 text-muted" />
          <div className="details">
            <p className="font-medium ">{t("transactionHistory.totalTransactions")}</p>
            <p className="text-2xl font-bold">{transactions.length}</p>
          </div>
        </div>
       <div className="bg-white dark:bg-dark  rounded-md shadow-sm flex items-center p-5 gap-4">
          <span className="text-secondary flex items-center justify-center rounded-full size-8 bg-secondary/10 font-bold">
            $
          </span>
          <div className="details">
            <p className="font-medium ">{t("transactionHistory.totalRevenue")}</p>
            <p className="text-2xl font-bold">
              {" "}
               {t("itemDetail.rs")} {transactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
            </p>
          </div>
        </div>

         <div className="bg-white dark:bg-dark  rounded-md shadow-sm flex items-center p-5 gap-4">
          <span className="text-secondary flex items-center justify-center rounded-full size-8 bg-secondary/10 font-bold">
            ✓
          </span>
          <div className="details">
            <p className="font-medium ">{t("transactionHistory.completedTransactions")}</p>
            <p className="text-2xl font-bold">
              {" "}
              {transactions.filter((t) => t.status === "completed").length}
            </p>
          </div>
        </div>

         <div className="bg-white dark:bg-dark  rounded-md shadow-sm flex items-center p-5 gap-4">
          <span className="text-tertiary flex items-center justify-center rounded-full size-8 bg-tertiary/10 font-bold">
            ⏱
          </span>
          <div className="details">
            <p className="font-medium ">{t("transactionHistory.pendingTransactions")}</p>
            <p className="text-2xl font-bold">
              {transactions.filter((t) => t.status === "pending").length}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1  items-end mb-3 md:grid-cols-4 gap-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted" />
          <Input
            type="text"
            placeholder={t("transactionHistory.search")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-white dark:bg-dark"
          />
        </div>
        <Input
          type="date"
          placeholder="Start Date"
          label={t("transactionHistory.startDate")}
          value={dateRange.start}
          onChange={(e) =>
            setDateRange((prev) => ({ ...prev, start: e.target.value }))
          }
           reset={
                      <RotateCcwIcon
                        size={16} 
                        onClick={(e) => {
                          e.stopPropagation();
                          setDateRange((prev) => ({ ...prev, start: "" }));
                        }}
                      />
                    }
          className="bg-white dark:bg-dark"
        />
        <Input
          type="date"
          placeholder="End Date"
          label={t("transactionHistory.endDate")}
          value={dateRange.end}
          onChange={(e) =>
            setDateRange((prev) => ({ ...prev, end: e.target.value }))
          }
           reset={
                      <RotateCcwIcon
                        size={18}
                        onClick={(e) => {
                          e.stopPropagation();
                          setDateRange((prev) => ({ ...prev, end: "" }));
                        }}
                      />
                    }
          className="bg-white dark:bg-dark"
        />
         <SelectComponent value={paymentState} langState={langState} setLangState={setLangState} onChange={(e) => setPaymentState(e.target.value)} placeholder="Select a status" className="bg-white dark:bg-dark">
            <OptionComponent  value={"all"}>
                    {t("transactionHistory.all")}
                    </OptionComponent>
                    <OptionComponent  value={"completed"}>
                       {t("transactionHistory.completed")}
                    </OptionComponent>
                       <OptionComponent  value={"pending"}>
                       {t("transactionHistory.pending")}
                    </OptionComponent>
                </SelectComponent>
 
    
        <div className="md:pt-5 flex items-center h-full"><p className="text-muted">
         {t("transactionHistory.showing")} {filteredTransactions.length} {t("transactionHistory.transactions")}
        </p></div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto rounded-md  shadow-sm">
        <table className="table">
          <thead >
            <tr className="table-head-row">
             <th className="table-th">{t("transactionHistory.sn")}</th>
              <th className="table-th">{t("transactionHistory.invoice")}</th>
              <th className="table-th">{t("transactionHistory.customer")}</th>
              <th className="table-th">{t("transactionHistory.date")}</th>
              <th className="table-th">{t("transactionHistory.items")}</th>
              <th className="table-th">{t("transactionHistory.amount")}</th>
              <th className="table-th">{t("transactionHistory.status")}</th>
              <th className="table-th">{t("transactionHistory.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr key={transaction.id} className="table-body-row">
                <td className="table-td ">
                  {index + 1}
                </td>
                <td className="table-td">
                  <div className="flex items-center gap-2">
                    <DocumentTextIcon className="size-4 text-muted" />
                    {transaction.invoiceNumber}
                  </div>
                </td>
                <td className="table-td ">{transaction.customer}</td>
                <td className="table-td ">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="table-td  ">{transaction.items.length} items</td>
                <td className="table-td  ">
                  {transaction.amount.toFixed(2)}
                </td>
                <td className="table-td  ">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      transaction.status
                    )}`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="table-td ">
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
