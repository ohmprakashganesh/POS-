import React, { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon, 
  PlusIcon, 
  MinusIcon, 
  TrashIcon,
  UserIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline';
import { productsData, customersData } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const POS = () => {

  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('walk-in');
  const [searchTerm, setSearchTerm] = useState('');
  const [discount, setDiscount] = useState(0);
    const [cart, setCart] = useState([]);
   const {addToCart}=useCart();
   


  useEffect(() => {
    setProducts(productsData);
    setCustomers(customersData);
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productId));
  };

  const calculateTotals = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = (subtotal * discount) / 100;
    const taxAmount = ((subtotal - discountAmount) ) / 100;
    const total = subtotal - discountAmount + taxAmount;

    return {
      subtotal: subtotal.toFixed(2),
      discountAmount: discountAmount.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      total: total.toFixed(2)
    };
  };

  const { subtotal, discountAmount, taxAmount, total } = calculateTotals();

  const processPayment = async () => {
    if (cart.length === 0) {
      alert('Please add items to cart');
      return;
    }

    // Simulate payment processing
    const paymentData = {
      customer: selectedCustomer,
      items: cart,
      totals: calculateTotals(),
      timestamp: new Date().toISOString()
    };

    // In real app, this would be an API call
    console.log('Processing payment:', paymentData);
    // Clear cart after successful payment

    setCart([]);
    setDiscount(0);
    alert('Payment processed successfully!');
  };

  return (
    <div className="h-full w-full flex flex-col lg:flex-row gap-6">
      {/* Left Panel - Product Selection */}
      <div className="flex-1   border-gray-200 p-4">
        <div className="mb-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-white bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-5">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => addToCart(product)}
            className="group relative cursor-pointer flex flex-col bg-white shadow-sm rounded-md"
          >
            {/* Product image */}
            <div  className="p-2 grow flex flex-col ">
              <img
                src={
                  product.image ||
                  "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80"
                }
                alt={product.name}
                className="inline-block w-full aspect-[16/9]  rounded-md"
              />
              {/* Product Details */}
              <div className="mt-1.5 grow  flex flex-col justify-between">
                <h3 className="text-lg font-semibold line-clamp-2 leading-tight">
                  {product.name}
                </h3>
                <div className="details">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-muted">Rs.</span>
                    <span className="text-xl text-muted-hover font-bold">
                      {product.price}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <span className="text-xs text-muted">Available</span>
                    <span
                      className={`text-sm font-semibold ${product.stock <= 10
                          ? "text-red-600"
                          : "text-green-600"
                        }`}
                    >
                      {product.stock} units
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
      </div>

      {/* Right Panel - Cart & Checkout */}
      <div className="  bg-white rounded-lg shadow-sm border hidden border-gray-200 p-2">
        <div className="space-y-2">
          {/* Customer Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
               Cart Items
            </label>
            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="walk-in">Walk-in Customer</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          {/* Cart Items */}
          <div className="border-t  border-gray-500 pt-1">
            <h3 className="text-lg  font-semibold text-gray-900 mb-0">Order Items</h3>
            <div className=" max-h-52 overflow-y-scroll">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between mb-1 shadow-md  bg-gray-300   rounded-sm">
                  <div className="flex-1">
                    <h4 className="font-medium text-black text-sm">{item.name}</h4>
                    <p className="text-blue-600 font-semibold">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <MinusIcon className="h-4 text-black hover:cursor-pointer  w-6" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                      <PlusIcon className="h-6 text-2xl  text-black hover:cursor-pointer w-4" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-red-400 hover:text-red-600 ml-2"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              {cart.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingCartIcon className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="mt-2">No items in cart</p>
                </div>
              )}
            </div>
          </div>

          {/* Totals */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 pt-1 ">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">${subtotal}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Discount ({discount}%):</span>
                <span className="font-medium text-red-600">-${discountAmount}</span>
              </div>
             
              <div className="flex h-4 justify-between text-md font-bold border-t border-gray-200 ">
                <span>Total:</span>
                <span>${total}</span>
              </div>
            </div>
          )}

          {/* Discount Input */}
          {cart.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 ">
                Discount (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          {/* Checkout Button */}
          <button
            onClick={processPayment}
            disabled={cart.length === 0}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Process Payment - ${total}
          </button>
        </div>
      </div>
    </div>
  );
};

export default POS;