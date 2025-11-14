import React from 'react'
import { useCart } from "../../context/CartContext" // adjust path as needed
import test from '../../../../assets/test.png'
import { MinusIcon, PlusIcon, TrashIcon } from 'lucide-react';

  const OrderItem = ({ item, t }) => {
  // MUST be inside the component
  const { updateQuantity, removeFromCart } = useCart();
  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQty);
    }
  };
  return(
  
     // 🧠 Remove item automatically if quantity <= 0
    <div className="flex flex-row md:flex-row md:items-center md:justify-between w-full border-b border-gray-200 bg-primary-foreground gap-2 py-2 px-2">
      <div className="flex-shrink-0 my-auto md:w-12 md:h-12 lg:w-14 lg:h-12 w-10 h-10 bg-primary-foreground flex items-center justify-center rounded-md overflow-hidden">
        <img src={test} alt="product" className="object-cover w-full h-full" />
      </div>

      <div className="flex flex-col flex-grow justify-start md:text-left">
        <p className="font-semibold text-sm text-gray-800">{item.name}</p>
        <p className="text-sm text-muted">{t("cart.price")}  {item.price.toFixed(2)}</p>
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
   )
};
export default OrderItem;


