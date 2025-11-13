import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  MagnifyingGlassIcon, 
  PlusIcon, 
  MinusIcon, 
  TrashIcon,
  UserIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline';
import { productsData, customersData } from '@/data/mockData';
import { useCart } from '../../context/CartContext';

const POS = () => {
  const [t]= useTranslation("cashier");

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
                    <span className="text-xs text-muted">{t("products.rs")}</span>
                    <span className="text-xl text-muted-hover font-bold">
                      {product.price}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <span className="text-xs text-muted">{t("products.available")}</span>
                    <span
                      className={`text-sm font-semibold ${product.stock <= 10
                          ? "text-red-600"
                          : "text-green-600"
                        }`}
                    >
                      {product.stock} {t("products.units")}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
      </div>


    </div>
  );
};

export default POS;