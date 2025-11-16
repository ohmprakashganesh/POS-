
import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, DocumentTextIcon, EyeIcon } from '@heroicons/react/24/outline';
import { transactionsData } from '@/data/mockData';
import InvoiceViewer from '../../components/Invoice';
import { useTranslation } from 'react-i18next';

const TransactionHistory = () => {
  const { t } = useTranslation("cashier");
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
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
    setFilteredTransactions(transactionsData);
  }, []);

  useEffect(() => {
    let filtered = transactions;

    if (searchTerm) {
      filtered = filtered.filter(transaction =>
        transaction.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.customer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (dateRange.start) {
      filtered = filtered.filter(transaction => transaction.date >= dateRange.start);
    }

    if (dateRange.end) {
      filtered = filtered.filter(transaction => transaction.date <= dateRange.end);
    }

    setFilteredTransactions(filtered);
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
        <h1 className="text-2xl font-bold text-muted-hover">
          {t("transactions.transactionHistory")}
        </h1>
        <p className="text-muted-hover">
          {t("transactions.description")}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Transactions */}
        <div className="bg-background rounded-lg shadow-sm border border-muted/40 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DocumentTextIcon className="h-8 w-8 text-muted-hover" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-hover">
                {t("transactions.totalTransactions")}
              </p>
              <p className="text-2xl font-bold text-muted">
                {transactions.length}
              </p>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-background rounded-lg shadow-sm border border-muted/40 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-background rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">$</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-hover">
                {t("transactions.totalRevenue")}
              </p>
              <p className="text-2xl font-bold text-muted">
                ${transactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-background rounded-lg shadow-sm border border-muted/40 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-hover">
                {t("transactions.completed")}
              </p>
              <p className="text-2xl font-bold text-muted">
                {transactions.filter(t => t.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-background rounded-lg shadow-sm border border-muted/40 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 text-sm">⏱</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-hover">
                {t("transactions.pending")}
              </p>
              <p className="text-2xl font-bold text-muted">
                {transactions.filter(t => t.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-primary-foreground rounded-lg shadow-sm  p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5  text-muted" />
            <input
              type="text"
              placeholder={t("transactions.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border text-muted border-muted/40 rounded-lg "
            />
          </div>

          {/* Date filters */}
          <div className="flex justify-between md:flex-row lg:flex-row gap-2 w-full">
            <input
              type="date"
              placeholder={t("transactions.startDate")}
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="w-full px-3 py-2 border text-muted-hover border-muted/40 rounded-lg "
            />
            <input
              type="date"
              placeholder={t("transactions.endDate")}
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="w-full px-3 py-2 border text-muted-hover border-muted/40 rounded-lg "
            />
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-primary-foreground rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto bg-white rounded-md shadow-sm">
          <table className="min-w-full uppercase text-xs text-left font-semibold text-secondary-foreground">
            <thead className="uppercase text-xs font-semibold bg-secondary text-secondary-foreground">
              <tr>
                {HeaderFields.map((head, ind) => (
                  <th key={ind} className="p-4">
                    {t(`transactions.tableHeaders.${head}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-primary-foreground divide-y divide-muted/40">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="text-sm font-medium text-gray-900">
                        {transaction.invoiceNumber}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">
                    {transaction.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {transaction.items.length} {t("transactions.tableHeaders.items")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-muted">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {t(`transactions.${transaction.status}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => viewInvoice(transaction.id)}
                      className="text-blue-600 hover:text-blue-900 flex items-center justify-end w-full"
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
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
