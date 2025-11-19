
import Button from '@/features/ui/Button';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import esewa from '../../../../assets/esewa.png'
import money from '../../../../assets/money.png'
import { useCart } from "../../context/CartContext"; // adjust path as needed
import BillDetails from './BillDetails';
import { useTranslation } from 'react-i18next';
import OrderItem from './OrderedItem';
import { customersData } from '@/data/mockData';
import { useForm } from '../../context/FormContext';
import AddEditCustomer from '../customer/AddEditCustomer';
import { QRGenerator } from './Qrgenreator';
import EmptyCart from './EmptyCart';



const EsewaPayment = ({ payment, setQrOpen }) => {
  const { t } = useTranslation("cashier");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const merchantName = t("cart.storeTitle");
  // Function to simulate fetching the QR data from a backend API
  return (
    <div className="fixed inset-0 items-center w-screen h-screen bg-black/80 z-50 p-4">
      <div className='flex justify-end text-gray-600p-4 '>
        <span className=' font-bold cursor-pointer text-muted-foreground  px-5 text-3xl py-2 rounded-full ' onClick={() => setQrOpen(false)}>X</span>
      </div>
      <div className="flex flex-col justify-center  items-center w-full h-full">
        {isLoading && (
          <div className="flex flex-col items-center justify-center p-8 bg-primary-foreground border border-gray-200 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            <p className="mt-4 text-gray-600">{t("cart.generatingQR")}</p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p>{t("cart.errorGeneratingQR")} {error}</p>
            <button onClick={()=>generateDynamicQr()} className="mt-2 text-sm font-semibold underline">{t("cart.tryAgain")}</button>
          </div>
        )}
        {!error && !isLoading && (
          <div className="md:w-1/3 md:h-1/3 lg:w-1/3 lg:h-1/3 h-[80%] w-[80%] flex  flex-col justify-center items-center rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-green-700 text-center mb-4">{t("cart.scanPay")}</h3>

            {/* Display QR code area */}
            <div className="flex justify-center items-center w-full aspect-square bg-gray-50 p-2 rounded-md">
              <QRGenerator payment={payment} type={"payment"}/>
            </div>

            <p className="text-sm text-center text-gray-500 mt-4">
              {t("cart.esewaInstruction")}
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

const Cart = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation("cashier")
  const { cartItems, subtotal } = useCart();
  const [cart, setCart] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomer] = useState([]);
  const [showBill, setShowBill] = useState(false);
  const [billDetail, setBillDetail] = useState([]);
  const [discountRate, setDiscountRate] = useState(0);
  const [qrOpen, setQrOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
 const { openForm, openCustomerForm } = useForm();
 

  useEffect(() => {
    setCustomers(customersData);
    setFilteredCustomer(customersData);
  }, [])

  useEffect(() => {
    const filtered = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
    );
    setFilteredCustomer(filtered)
  }, [searchTerm, customers])


  useEffect(() => {
    if (cartItems) {
      setCart(cartItems);
    }
  }, [cartItems]);

 

  const discountAmount = useMemo(
    () => (discountRate > 0 ? (subtotal * discountRate) / 100 : 0),
    [subtotal, discountRate]
  );

  const netAmount = useMemo(() => subtotal - discountAmount, [subtotal, discountAmount]);

 const [payment, setPayment] = useState({
    merchantAccount:"9803748378483",
    orderId:"5",
    paymentType:"",
    totalAmount: netAmount?netAmount:0,
  });

  useEffect(() => {
    setPayment((prev) => ({
      ...prev,
      totalAmount: parseFloat(netAmount.toFixed(2)),
    }));
  }, [netAmount]);

  const updatePayment = (key, value) => {
    setPayment((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDiscountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setDiscountRate(value);
  };

  // 🧮 Total Items Count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div>
    <div>
      {/* Order Header with Count */}
      <h2 className="text-2xl font-bold border-b text-muted border-muted/40">
        {t("cart.cartOverview")}
        {totalItems > 0 && (
          <span className="text-sm font-medium text-muted ml-2">
            ({totalItems} {totalItems === 1 ? t("cart.item") : t("cart.items")})
          </span>
        )}
      </h2>
      {cart.length === 0 ? (
        <div className=' w-full   flex flex-col justify-center items-center  '>
          <EmptyCart />
          {/* <p className="text-muted-hover text-4xl p-4">{t("cart.emptyCart")}</p>
          <p className='text-muted'>{t("cart.addItems")}</p> */}

        </div>
      ) : (

        <>
          {/* search section */}
       <div className="flex justify-between  gap-3 p-3 rounded-sm ">
  {/* Dropdown */}
  <select
    value={selectedId|| ""}
    onChange={(e) => setSelectedId( e.target.value)}
    className="w-[48%] md:w-[30%] lg:w-[30%]  h-[45px] border border-muted/40 rounded-md bg-white dark:bg-dark"
  >
    <option value="" className='text-muted'>Select Customer</option>
    {filteredCustomers.slice(0, 3).map((user) => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ))}
  </select>

  {/* Button */}
   <Button onClick={()=>openCustomerForm()} className=" px-5 h-[45px] w-[48%] md:w-[30%] ">
     {t("customers.addCustomer")}
  </Button>
  </div>
          <div className="flex md:flex-row lg:flex-row flex-col gap-5 mt-4">
            <div className="flex flex-col md:w-[70%] lg:w-[70%] w-full gap-0.5">

              {/* rendering the cart items */}
              {cart.map((item, ind) => <OrderItem key={ind} item={item} t={t} />)}
            </div>
            {/* Payment Summary */}
            <div className="lg:w-[30%] md:w-[30%] w-full p-2 bg-white dark:bg-dark rounded-lg shadow">
              <h2 className="text-2xl text-muted-hover font-bold pb-4">
                {t("cart.paymentSummary")}
              </h2>
              <hr className="border-gray-200" />

              <div className="space-y-1">
                <div className="flex justify-between text-muted">
                  <span>{t("cart.subtotal")}</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>{t("cart.discount")} ({discountRate}%)</span>
                  <span className="font-semibold text-red-500">
                    {t("cart.rs")}{discountAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-muted items-center">
                  <span>{t("cart.discountRate")} (%)</span>
                  <input
                    onChange={handleDiscountChange}
                    value={discountRate}
                    className="w-20 p-1 text-right border rounded"
                    type="number"
                    name="discount"
                    min="0"
                    max="100"
                    placeholder="0.0"
                  />
                </div>
              </div>

              <hr className="border-muted/40" />

              <div className="flex justify-between text-xl font-bold mt-2 mb-2">
                <span className="text-muted-hover">{t("cart.netAmount")}</span>
                <span className='text-muted-hover'>${payment.totalAmount.toFixed(2)}</span>
              </div>

              <h3 className="text-lg text-muted-hover font-semibold mb-3">{t("cart.selectPaymentMethod")}</h3>

              <div className="flex lg:gap-10 md:gap-5 gap-5 items-center h-[50px] justify-around text-lg font-bold text-muted-hover mb-4">
                <div
                  onClick={() => {
                    updatePayment("paymentType", "esewa");
                    setQrOpen(true);
                  }}
                  className={`cursor-pointer border-2 p-1 rounded-lg transition-all ${payment.paymentType === "esewa"
                    ? "border-green-500 shadow-md"
                    : "border-muted hover:border-muted-hover"
                    }`}
                >
                  <img
                    src={esewa}
                    alt="eSewa Logo"
                    className="h-full object-contain max-h-[40px]"
                  />
                </div>
                <div
                  onClick={() => updatePayment("paymentType", "Cash")}
                  className={`cursor-pointer border-2 p-1 rounded-lg transition-all ${payment.paymentType === "Cash"
                    ? "border-blue-500 shadow-md"
                    : "border-muted/40 hover:border-muted/20"
                    }`}
                >
                  <img
                    src={money}
                    alt="Cash Logo"
                    className="h-full object-cover max-h-[40px]"
                  />
                </div>
              </div>
              {payment.paymentType === "esewa" && qrOpen && (
                <div className="mt-6">
                  <EsewaPayment
                    payment={payment}
                    setQrOpen={setQrOpen}
                  />
                </div>
              )}
              {payment.paymentType === "Cash" && (
                <div className="mt-6 p-4 bg-background border border-blue-200 rounded-lg text-center">
                  <p className="font-semibold text-muted">
                    {t("cart.prepareMessage", "cart.rs")}{payment.totalAmount.toFixed(2)} {t("cart.cashOnDelivery")}
                  </p>
                </div>
              )}

              <Button
  disabled={!payment.paymentType || !selectedId}
  onClick={() => {
    if (payment.paymentType && selectedId) {
      setBillDetail({
        items: cart,
        customerId: selectedId,
        subtotal: subtotal,
        discountRate: discountRate,
        discountAmount: discountAmount,
        netAmount: netAmount,
        payment: payment,
        date: new Date().toLocaleString(),
      });

      setShowBill(true);
    }
  }}
  className={`w-full mt-6 cursor-pointer 
  ${payment.paymentType ? "bg-secondary hover:bg-secondary-hover" : "bg-primary/30 cursor-not-allowed"
  }`}
>
  {!payment.paymentType ? t("cart.selectType") : t("cart.generateBill")}
</Button>

            </div>
          </div>
        </>
      )}
      <div className="flex">
        {showBill && (
         <BillDetails
          bill={billDetail}
          onClose={() => setShowBill(false)}
              />

        )}
      </div>
    </div>
     {openForm && (
  <div
    className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"  // close on background click
  >
      <AddEditCustomer/>
  </div>
   )}
    </div>
  );
};
export default Cart;

