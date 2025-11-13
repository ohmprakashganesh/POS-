
import Button from '@/componenets/ui/Button';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import esewa from '../../../../assets/esewa.png'
import money from '../../../../assets/money.png'
import { CarIcon, MinusIcon, PlusIcon, TrashIcon } from 'lucide-react';
import test from '../../../../assets/test.png'
import { useCart } from "../../../cashier/context/CartContext"; // adjust path as needed
import qrPlaceholder from '../../../../assets/qr.jpg'; // Assume you create or use a placeholder QR image
import BillDetails from './BillDetails';

const EsewaPayment = ({ userId, totalAmount, setQrOpen }) => {
    const [qrCodeData, setQrCodeData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showBill, setShowBill] = useState(false);

    const [error, setError] = useState(null);

    const merchantName = "Your E-Commerce Store";

    // Function to simulate fetching the QR data from a backend API
    const generateDynamicQr = () => {
        setIsLoading(true);
        setError(null);
        setTimeout(() => {
            //implement the real world api

            const simulatedQrData = `eSewa://pay?pid=${userId}&amt=${totalAmount}&mer=${merchantName.replace(/\s/g, "")}`;
            setQrCodeData(simulatedQrData);
            setIsLoading(false);
        }, 1500);
    };

    useEffect(() => {
        // Automatically generate QR when the component mounts
        generateDynamicQr();
    }, [userId, totalAmount]);
    return (
        <div className="fixed inset-0 items-center w-screen h-screen bg-black/80 z-50 p-4">
            <div className='flex justify-end text-gray-600p-4 '>
                <span className=' font-bold cursor-pointer text-muted-foreground  px-5 text-3xl py-2 rounded-full ' onClick={() => setQrOpen(false)}>X</span>
            </div>


            <div className="flex flex-col justify-center  items-center w-full h-full">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center p-8 bg-primary-foreground border border-gray-200 rounded-lg">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                        <p className="mt-4 text-gray-600">Generating Dynamic QR...</p>
                    </div>
                )}

                {error && (
                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        <p>Error generating QR: {error}</p>
                        <button onClick={generateDynamicQr} className="mt-2 text-sm font-semibold underline">Try Again</button>
                    </div>
                )}
                {!error && !isLoading && (
                    <div className="md:w-1/3 md:h-1/3 lg:w-1/3 lg:h-1/3 h-[80%] w-[80%] flex  flex-col justify-center items-center rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-bold text-green-700 text-center mb-4">Scan & Pay with eSewa</h3>

                        {/* Display QR code area */}
                        <div className="flex justify-center items-center w-full aspect-square bg-gray-50 p-2 rounded-md">
                            <img
                                src={qrPlaceholder} // Placeholder image
                                alt="eSewa QR Code"
                                className="w-48 h-48 border border-gray-300 rounded-md"
                            />
                        </div>

                        <p className="text-sm text-center text-gray-500 mt-4">
                            Open your eSewa app and scan the QR code above to complete the payment.
                        </p>
                    </div>
                )}

            </div>
        </div>

    );
};
// --- Main Cart Component ---


// const Cart = () => {
//       const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart();
//     const products = [
//         { id: 1, name: "Milk", quantity: 2, unitPrice: 60 },
//         { id: 2, name: "Bread", quantity: 1, unitPrice: 50 },
//         { id: 3, name: "Eggs", quantity: 12, unitPrice: 10 },
//     ];
//      const [cart, setCart] = useState();

//     useEffect(()=>{
//         if(cartItems){
//          setCart(cartItems);
//         }

//     },[cartItems])
//     // Initialize cart with dummy data
   
//     const [showBill, setShowBill] = useState(false);


//     const [discountRate, setDiscountRate] = useState(0);
//     const [qrOpen, setQrOpen] = useState(false);

//     const [payment, setPayment] = useState({
//         paymentType: "",
//         userId: "123456789", // Placeholder for merchant/user ID
//         totalAmount: 0,
//     });

//     const discountAmount = useMemo(
//         () => (discountRate > 0 ? (subtotal * discountRate) / 100 : 0),
//         [subtotal, discountRate]
//     );

//     const netAmount = useMemo(() => subtotal - discountAmount, [subtotal, discountAmount]);

//     // 🔄 Keep payment.totalAmount updated automatically
//     useEffect(() => {
//         setPayment((prev) => ({
//             ...prev,
//             totalAmount: parseFloat(netAmount.toFixed(2)), // Ensure netAmount is rounded and a number
//         }));
//     }, [netAmount]);

//     // 💳 Payment type update
//     const updatePayment = (key, value) => {
//         setPayment((prev) => ({
//             ...prev,
//             [key]: value,
//         }));
//     };

//     // Fix: Renaming setDisRate to setDiscountRate for the input handler
//     const handleDiscountChange = (e) => {
//         const value = parseFloat(e.target.value) || 0;
//         setDiscountRate(value);
//     }

//     // Helper component for individual items (unchanged)
//     const OrderItem = ({ item }) => (
//         <div className="flex flex-row md:flex-row md:items-center md:justify-between w-full border-b border-gray-200 bg-primary-foreground gap-2 py-2 px-2">
//             {/* Image Container */}
//             <div className="flex-shrink-0 my-auto md:w-12 md:h-12 lg:w-14 lg:h-12 10 w-10 h-10 bg-primary-foreground flex items-center justify-center rounded-md overflow-hidden">
//                 {/* Replace with actual image */}
//                 <img src={test} alt="image not found" className="object-cover w-full h-full" />
//             </div>

//             {/* Item Details */}
//             <div className="flex flex-col flex-grow justify-start md:text-left">
//                 <p className="font-semibold text-sm text-gray-800m ">{item.name}</p>
//                 <p className="text-xs   text-muted">Price: ${item.price.toFixed(2)}</p>
//             </div>

//             {/* Price */}
//             <div className="text-center md:text-right md:mx-6">
//                 <span className="font-bold text-muted-hover ">${(item.price * item.quantity).toFixed(2)}</span>
//             </div>

//             {/* Quantity Controls */}
//             <div className="flex justify-center md:justify-end items-center bg-primary-foreground rounded-lg px-3 lg:py-2 md:py-2 gap-3">
//                 <button
//                     onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                     className="p-1 hover:text-gray-700 text-gray-500"
//                 >
//                     <MinusIcon className="h-4 w-4" />
//                 </button>
//                 <span className="w-6 items-center my-auto text-center font-medium">{item.quantity}</span>
//                 <button
//                     onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                     disabled={item.quantity >= item.stock}
//                     className="p-1 hover:text-muted-hover text-muted disabled:opacity-50"
//                 >
//                     <PlusIcon className="h-4 w-4" />
//                 </button>
//             </div>

//             {/* Delete Button */}
//             <button
//                 onClick={() => removeFromCart(item.id)}
//                 className="flex justify-center md:justify-end mt-2 md:mt-0 p-2 text-red-500 hover:text-red-700"
//             >
//                 <TrashIcon className="h-5 w-5" />
//             </button>
//         </div>


//     );


//     // Main Component Return
//     return (
//         <div >
//             {/* 1. Order Details Column */}
//             <h2 className="text-2xl font-bold border-b border-gray-200">Order</h2>
//             <div className='flex md:flex-row lg:flex-row flex-col gap-5 mt-4'>
//                 <div className="flex flex-col md:w-[70%] lg:w-[70%] w-full gap-0.5">
//                     {cart.length === 0 ? (
//                         <p className="text-muted p-4">Your cart is empty.</p>
//                     ) : (
//                         cart.map((item) => (
//                             <OrderItem key={item.id} item={item} />
//                         ))
//                     )}
//                 </div>

//                 {/* 2. Payment Summary Column */}
//                 <div className="lg:w-[30%] md:w-[30%] w-full p-2 bg-primary-foreground rounded-lg shadow">
//                     <h2 className="text-2xl text-muted-hover font-bold pb-4">Payment Summary</h2>
//                     <hr className=" border-gray-200" />

//                     {/* Summary Items */}
//                     <div className="space-y-1 ">
//                         <div className="flex justify-between text-muted">
//                             <span>Subtotal</span>
//                             <span className="font-semibold">${subtotal.toFixed(2)}</span>
//                         </div>
//                         <div className="flex justify-between text-muted">
//                             <span>Discount ({discountRate}%)</span>
//                             <span className="font-semibold text-red-500">-${discountAmount.toFixed(2)}</span>
//                         </div>
//                         <div className="flex justify-between text-muted items-center">
//                             <span>Discount Rate (%)</span>
//                             <input
//                                 onChange={handleDiscountChange} // Changed from setDisRate
//                                 value={discountRate}
//                                 className='w-20 bg-primary-foreground p-1 text-right border rounded'
//                                 type='number'
//                                 name='discount'
//                                 min="0"
//                                 max="100"
//                                 placeholder='0.0'
//                             />
//                         </div>
//                     </div>

//                     <hr className=" border-gray-200" />

//                     {/* Total Amount */}
//                     <div className="flex justify-between text-xl font-bold text-shadow-muted mt-2 mb-2">
//                         <span className='text-muted-hover'>Net Amount</span>
//                         <span>${payment.totalAmount.toFixed(2)}</span>
//                     </div>

//                     {/* Payment Type Selection */}
//                     <h3 className="text-lg font-semibold mb-3">Select Payment Method</h3>
//                     <div className="flex lg:gap-10 md:gap-5 gap-5 items-center h-[50px] justify-around text-lg font-bold text-gray-900 mb-4">
//                         <div
//                             onClick={() => { updatePayment("paymentType", "esewa"), setQrOpen(true) }}
//                             className={`cursor-pointer border-2 p-1 rounded-lg transition-all ${payment.paymentType === "esewa" ? 'border-green-500 shadow-md' : 'border-gray-200 hover:border-gray-400'}`}
//                         >
//                             <img src={esewa} alt="eSewa Logo" className='h-full object-contain max-h-[40px]' />
//                         </div>
//                         <div
//                             onClick={() => updatePayment("paymentType", "Cash")}
//                             className={`cursor-pointer border-2 p-1 rounded-lg transition-all ${payment.paymentType === "Cash" ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-gray-400'}`}
//                         >
//                             <img src={money} alt="Cash Logo" className='h-full object-cover max-h-[40px]' />
//                         </div>
//                     </div>

//                     {/* render the esewa component her */}
//                     {payment.paymentType === "esewa" && qrOpen && (
//                         <div className="mt-6">
//                             <EsewaPayment
//                                 userId={payment.userId}
//                                 totalAmount={payment.totalAmount}
//                                 setQrOpen={setQrOpen}
//                             />
//                         </div>
//                     )}

//                     {payment.paymentType === "Cash" && (
//                         <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
//                             <p className="font-semibold text-blue-800">Please prepare ${payment.totalAmount.toFixed(2)} for Cash on Delivery.</p>
//                         </div>
//                     )}
//                     <Button
//                         disabled={!payment.paymentType}  // disables click + styling
//                         onClick={() => {
//                             if (payment.paymentType) {
//                                 // only run this if payment type is selected
//                                 setShowBill(true);
//                             }
//                         }}
//                         className={`w-full mt-6 cursor-pointer 
//                             ${payment.paymentType
//                                 ? "bg-secondary hover:bg-secondary-hover"
//                                 : "bg-muted cursor-not-allowed"}`}
//                     >
//                         {!payment.paymentType ? "Select Payment Type" : "Generate Bill"}
//                     </Button>
//                 </div>
//             </div>
//             <div className=' flex '>
//             {showBill && (
//            <BillDetails
//           products={products}
//           subtotal={payment.totalAmount}
//           discount={discountAmount}
//           netAmount={netAmount}
//           qrPlaceholder={qrPlaceholder}
//           onClose={() => setShowBill(false)}
//         />
//            )}
//             </div>
         
//         </div>
//     );
// };

// --- Main Cart Component ---
const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (cartItems) {
      setCart(cartItems);
    }
  }, [cartItems]);

  const [showBill, setShowBill] = useState(false);
  const [discountRate, setDiscountRate] = useState(0);
  const [qrOpen, setQrOpen] = useState(false);

  const [payment, setPayment] = useState({
    paymentType: "",
    userId: "123456789",
    totalAmount: 0,
  });

  const discountAmount = useMemo(
    () => (discountRate > 0 ? (subtotal * discountRate) / 100 : 0),
    [subtotal, discountRate]
  );

  const netAmount = useMemo(() => subtotal - discountAmount, [subtotal, discountAmount]);

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

  // 🧠 Remove item automatically if quantity <= 0
  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQty);
    }
  };

  // ✅ OrderItem Component
  const OrderItem = ({ item }) => (
    <div className="flex flex-row md:flex-row md:items-center md:justify-between w-full border-b border-gray-200 bg-primary-foreground gap-2 py-2 px-2">
      <div className="flex-shrink-0 my-auto md:w-12 md:h-12 lg:w-14 lg:h-12 w-10 h-10 bg-primary-foreground flex items-center justify-center rounded-md overflow-hidden">
        <img src={test} alt="product" className="object-cover w-full h-full" />
      </div>

      <div className="flex flex-col flex-grow justify-start md:text-left">
        <p className="font-semibold text-sm text-gray-800">{item.name}</p>
        <p className="text-xs text-muted">Price: ${item.price.toFixed(2)}</p>
      </div>

      <div className="text-center md:text-right md:mx-6">
        <span className="font-bold text-muted-hover ">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>

      {/* Quantity Controls */}
      <div className="flex justify-center md:justify-end items-center bg-primary-foreground rounded-lg px-3 lg:py-2 md:py-2 gap-3">
        <button
          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
          className="p-1 hover:text-gray-700 text-gray-500"
        >
          <MinusIcon className="h-4 w-4" />
        </button>
        <span className="w-6 items-center my-auto text-center font-medium">
          {item.quantity}
        </span>
        <button
          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
          disabled={item.quantity >= item.stock}
          className="p-1 hover:text-muted-hover text-muted disabled:opacity-50"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>

      <button
        onClick={() => removeFromCart(item.id)}
        className="flex justify-center md:justify-end mt-2 md:mt-0 p-2 text-red-500 hover:text-red-700"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </div>
  );

  // 🧮 Total Items Count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      {/* Order Header with Count */}
      <h2 className="text-2xl font-bold border-b text-muted-hover border-gray-200">
        Cart Items
        {totalItems > 0 && (
          <span className="text-sm font-medium text-muted ml-2">
            ({totalItems} {totalItems === 1 ? "item" : "items"})
          </span>
        )}
      </h2>
 {cart.length === 0 ? (
    <div className=' w-full flex flex-col justify-center items-center h-56 bg-secondary-foreground'>
     <p className="text-muted text-4xl p-4">Your cart is empty.</p>
     <p>Please Add some Items</p>

        </div>
          ) : (
         
      <div className="flex md:flex-row lg:flex-row flex-col gap-5 mt-4">
        <div className="flex flex-col md:w-[70%] lg:w-[70%] w-full gap-0.5">
         
          {cart.map((item) => <OrderItem key={item.id} item={item} />)}
        
        </div>

        {/* Payment Summary */}
        <div className="lg:w-[30%] md:w-[30%] w-full p-2 bg-primary-foreground rounded-lg shadow">
          <h2 className="text-2xl text-muted-hover font-bold pb-4">
            Payment Summary
          </h2>
          <hr className="border-gray-200" />

          <div className="space-y-1">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Discount ({discountRate}%)</span>
              <span className="font-semibold text-red-500">
                -${discountAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-muted items-center">
              <span>Discount Rate (%)</span>
              <input
                onChange={handleDiscountChange}
                value={discountRate}
                className="w-20 bg-primary-foreground p-1 text-right border rounded"
                type="number"
                name="discount"
                min="0"
                max="100"
                placeholder="0.0"
              />
            </div>
          </div>

          <hr className="border-gray-200" />

          <div className="flex justify-between text-xl font-bold mt-2 mb-2">
            <span className="text-muted-hover">Net Amount</span>
            <span>${payment.totalAmount.toFixed(2)}</span>
          </div>

          <h3 className="text-lg font-semibold mb-3">Select Payment Method</h3>

          <div className="flex lg:gap-10 md:gap-5 gap-5 items-center h-[50px] justify-around text-lg font-bold text-gray-900 mb-4">
            <div
              onClick={() => {
                updatePayment("paymentType", "esewa");
                setQrOpen(true);
              }}
              className={`cursor-pointer border-2 p-1 rounded-lg transition-all ${
                payment.paymentType === "esewa"
                  ? "border-green-500 shadow-md"
                  : "border-gray-200 hover:border-gray-400"
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
              className={`cursor-pointer border-2 p-1 rounded-lg transition-all ${
                payment.paymentType === "Cash"
                  ? "border-blue-500 shadow-md"
                  : "border-gray-200 hover:border-gray-400"
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
                userId={payment.userId}
                totalAmount={payment.totalAmount}
                setQrOpen={setQrOpen}
              />
            </div>
          )}

          {payment.paymentType === "Cash" && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
              <p className="font-semibold text-blue-800">
                Please prepare ${payment.totalAmount.toFixed(2)} for Cash on
                Delivery.
              </p>
            </div>
          )}

          <Button
            disabled={!payment.paymentType}
            onClick={() => {
              if (payment.paymentType) {
                setShowBill(true);
              }
            }}
            className={`w-full mt-6 cursor-pointer 
              ${
                payment.paymentType
                  ? "bg-secondary hover:bg-secondary-hover"
                  : "bg-muted cursor-not-allowed"
              }`}
          >
            {!payment.paymentType ? "Select Payment Type" : "Generate Bill"}
          </Button>
        </div>
      </div>
       )}

      <div className="flex">
        {showBill && (
          <BillDetails
            products={cart}
            subtotal={subtotal}
            discount={discountAmount}
            netAmount={netAmount}
            qrPlaceholder={qrPlaceholder}
            onClose={() => setShowBill(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Cart;

