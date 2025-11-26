
import React, { useState, useEffect, useMemo } from 'react';
import { MagnifyingGlassIcon, DocumentTextIcon, EyeIcon } from '@heroicons/react/24/outline';
import { transactionsData } from '@/data/mockData';
import InvoiceViewer from '../../components/Invoice';
import { useTranslation } from 'react-i18next';
import Input from '@/features/ui/Input';
import { RotateCcw  } from 'lucide-react';
const TransactionHistory = () => {
  const { t } = useTranslation("cashier");
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [invoice, setInvoice] = useState(false);

  const HeaderFields = [
    "invoiceNo",
    "customer",
    "date",
    "items",
    "total",
    "status",
    "actions"
  ];



  useEffect(() => {
    setTransactions(transactionsData);
  }, []);

  const filteredTransactions = useMemo(() => {
  const term = searchTerm.toLowerCase();

  return transactions.filter(transaction => {
    const matchesSearch =
      transaction.invoiceNumber.toLowerCase().includes(term) ||
      transaction.customer.toLowerCase().includes(term);

    const matchesStartDate = dateRange.start
      ? transaction.date >= dateRange.start
      : true;

    const matchesEndDate = dateRange.end
      ? transaction.date <= dateRange.end
      : true;

    return matchesSearch && matchesStartDate && matchesEndDate;
  });
}, [searchTerm, dateRange, transactions]);


  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const viewInvoice = (transactionId) => {
    setInvoice(true);
  };
  
  return (
    <div className="space-y-6">
      {invoice && <InvoiceViewer setInvoice={setInvoice} invoice={invoice} />}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-dark dark:text-white">
          {t("transactions.transactionHistory")}
        </h1>
        <p className="text-muted-hover">
          {t("transactions.description")}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  
        
        {/* Total Transactions */}
        <div className="bg-white dark:bg-dark rounded-lg shadow-sm border border-muted/40 p-6">
          <div className="flex items-center">
            <div className="shrink-0 bg-green-100  rounded-full">
              <DocumentTextIcon className="h-8 w-8 text-muted-hover  " />
            </div>
            <div className="ml-4">
              <p className="text-xl font-medium r">
                {t("transactions.totalTransactions")}
              </p>
              <p className="text-2xl font-bold ">
                {transactions.length}
              </p>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white dark:bg-dark
         rounded-lg shadow-sm border border-muted/40 p-6">
          <div className="flex items-center w-fit">
            <div className="shrink-0">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">Rs</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-xl font-medium ">
                {t("transactions.totalRevenue")}
              </p>
              <p className="text-2xl font-bold ">
                ${transactions.reduce((sum, t) => sum + t.amount, 0).toFixed(1)}
              </p>
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white dark:bg-dark rounded-lg shadow-sm border border-muted/40 p-6">
          <div className="flex items-center">
            <div className="shrink-0">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-xl font-medium ">
                {t("transactions.completed")}
              </p>
              <p className="text-2xl font-bold ">
                {transactions.filter(t => t.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white dark:bg-dark rounded-lg shadow-sm border border-muted/40 p-6">
          <div className="flex items-center">
            <div className="shrink-0">
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 text-sm">⏱</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-xl font-medium">
                {t("transactions.pending")}
              </p>
              <p className="text-2xl font-bold ">
                {transactions.filter(t => t.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className=" rounded-lg  text-muted ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Input
              type="text"
              placeholder={t("transactions.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-sm bg-white dark:bg-dark  rounded-lg "
            />
          </div>

          {/* Date filters */}
          <div className="flex md:justify-between items-center md:flex-row lg:flex-row gap-2 w-full">
            <Input
              type="date"
              placeholder={t("transactions.startDate")}
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="w-full max-w-sm bg-white dark:bg-dark  "
            /> 
             {dateRange.start && (
             <span
                onClick={() =>
                 setDateRange(prev => ({ ...prev, start: "" }))
                  }
                  >
               <RotateCcw  size={18} className=' rounded-md scale-110 transition-transform duration-1000' />
            </span>
  )}
            <Input
              type="date"
              placeholder={t("transactions.endDate")}
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="w-full bg-white dark:bg-dark  max-w-sm rounded-lg"
            />
             {dateRange.end && (
             <span className='cursor-pointer '
                onClick={() =>
                 setDateRange(prev => ({ ...prev, end: "" }))
                  }
                  >
               <RotateCcw  size={18} className=' rounded-md scale-110 transition-transform duration-1000' />
            </span>
  )}
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className=" rounded-lg shadow-sm border border-muted/40 overflow-hidden">
        <div className="overflow-x-auto bg-white rounded-md shadow-sm">
          <table className="table">
            <thead >
              <tr className='table-head-row'>
                {HeaderFields.map((head, ind) => (
                  <th key={ind} className="table-th">
                    {t(`transactions.tableHeaders.${head}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="table-body ">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className=' table-body-row'>
                  <td className="table-td">
                        {transaction.invoiceNumber}
                  </td>
                  <td className="table-td">
                    {transaction.customer}
                  </td>
                  <td className="table-td">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="table-td">
                    {transaction.items.length} {t("transactions.tableHeaders.items")}
                  </td>
                  <td className="table-td">
                    {transaction.amount.toFixed(2)}
                  </td>
                  <td className="table-td">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {t(`transactions.${transaction.status}`)}
                    </span>
                  </td>
                  <td className="table-td">
                    <button
                      onClick={() => viewInvoice(transaction.id)}
                      className="text-blue-600  text-center hover:text-blue-900 flex items-center  w-full"
                    >
                      {/* // this will be the image  url */}
                      <EyeIcon className="action-icon" />
                      {t("transactions.view")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No transactions */}
        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {t("transactions.noTransactionsFound")}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || dateRange.start || dateRange.end
                ? t("transactions.tryChangingFilters")
                : t("transactions.noTransactionsMessage")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
