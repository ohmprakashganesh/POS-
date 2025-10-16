// Add CubeIcon import at the top of the file
import { CubeIcon } from '@heroicons/react/24/outline';

export const productsData = [
   {
    id: 7,
    name: "Laptop",
    category: "Electronics",
    price: 999.99,
    cost: 750.00,
    stock: 15,
    sku: "LP-001",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    description: "High-performance laptop for business and gaming"
  },
  {
    id: 8,
    name: "Wireless Mouse",
    category: "Accessories",
    price: 25.99,
    cost: 15.00,
    stock: 3,
    sku: "WM-002",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    description: "Ergonomic wireless mouse with long battery life"
  },
  {
    id: 9,
    name: "Mechanical Keyboard",
    category: "Accessories",
    price: 45.99,
    cost: 28.00,
    stock: 0,
    sku: "MK-003",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    description: "Mechanical keyboard with RGB lighting"
  },
  {
    id: 10,
    name: "Monitor 24inch",
    category: "Electronics",
    price: 299.99,
    cost: 220.00,
    stock: 22,
    sku: "MN-004",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    description: "24-inch Full HD monitor with IPS panel"
  },
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    price: 999.99,
    cost: 750.00,
    stock: 15,
    sku: "LP-001",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    description: "High-performance laptop for business and gaming"
  },
  {
    id: 2,
    name: "Wireless Mouse",
    category: "Accessories",
    price: 25.99,
    cost: 15.00,
    stock: 3,
    sku: "WM-002",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    description: "Ergonomic wireless mouse with long battery life"
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    category: "Accessories",
    price: 45.99,
    cost: 28.00,
    stock: 0,
    sku: "MK-003",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    description: "Mechanical keyboard with RGB lighting"
  },
  {
    id: 4,
    name: "Monitor 24inch",
    category: "Electronics",
    price: 299.99,
    cost: 220.00,
    stock: 22,
    sku: "MN-004",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    description: "24-inch Full HD monitor with IPS panel"
  },
  {
    id: 5,
    name: "Headphones",
    category: "Audio",
    price: 79.99,
    cost: 45.00,
    stock: 7,
    sku: "HP-005",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    description: "Noise-cancelling wireless headphones"
  }
];

export const customersData = [
  {
    id: 1,
    name: "John Doe",
    phone: "9841000000",
    email: "john@example.com",
    address: "Kathmandu, Nepal"
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "9801000000",
    email: "jane@example.com",
    address: "Pokhara, Nepal"
  },
  {
    id: 3,
    name: "Raj Kumar",
    phone: "9813000000",
    email: "raj@example.com",
    address: "Biratnagar, Nepal"
  }
];

export const transactionsData = [
  {
    id: 1,
    invoiceNumber: "INV-001",
    customer: "John Doe",
    date: "2024-01-15",
    amount: 2540.00,
    status: "completed",
    items: [
      { product: "Laptop", quantity: 1, price: 999.99 },
      { product: "Mouse", quantity: 2, price: 25.99 }
    ]
  },
  {
    id: 2,
    invoiceNumber: "INV-002",
    customer: "Jane Smith",
    date: "2024-01-14",
    amount: 1870.50,
    status: "completed",
    items: [
      { product: "Monitor", quantity: 1, price: 299.99 },
      { product: "Keyboard", quantity: 1, price: 45.99 }
    ]
  },
  {
    id: 3,
    invoiceNumber: "INV-003",
    customer: "Raj Kumar",
    date: "2024-01-13",
    amount: 3210.75,
    status: "pending",
    items: [
      { product: "Laptop", quantity: 2, price: 999.99 },
      { product: "Headphones", quantity: 1, price: 79.99 }
    ]
  }
  
];
// src/data/pricingData.js or simply define this array inside the component file

export const pricingPlans = [
  {
    name: "Basic",
    price: "$29",
    duration: "/month",
    isPopular: false,
    features: [
      "5 Users",
      "5 GB Storage",
      "Basic Analytics",
      "Email Support",
      "Community Access"
    ],
    buttonText: "Get Started",
    buttonClass: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
  },
  {
    name: "Pro (Recommended)",
    price: "$59",
    duration: "/month",
    isPopular: true,
    features: [
      "Unlimited Users",
      "50 GB Storage",
      "Advanced Analytics",
      "Priority Support",
      "All Integrations"
    ],
    buttonText: "Start Free Trial",
    buttonClass: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
  },
  {
    name: "Enterprise",
    price: "$199",
    duration: "/month",
    isPopular: false,
    features: [
      "Unlimited Seats",
      "Unlimited Storage",
      "Custom Reporting",
      "Dedicated Account Manager",
      "SLA Guarantee"
    ],
    buttonText: "Contact Sales",
    buttonClass: "bg-gray-500 text-white hover:bg-gray-600"
  }
];

 export const VENDORS=[
  {
    "id": 101,
    "name": "Everest Supplies Pvt. Ltd.",
    "address": "New Baneshwor, Kathmandu, Nepal",
    "phone": "+977-9801234567",
    "PAN": "606789321",
    "total_product": 25,
    "total_cost": 150000,
    "total_paid": 120000,
    "total_due": 30000,
    "payment_slip_url": "https://example.com/uploads/payment_slips/everest_supplies_slip_2025-10-15.pdf"
  },
  {
    "id": 102,
    "name": "Himalayan Traders",
    "address": "Pokhara-5, Kaski, Nepal",
    "phone": "+977-9816543210",
    "PAN": "508745962",
    "total_product": 18,
    "total_cost": 89000,
    "total_paid": 89000,
    "total_due": 0,
    "payment_slip_url": "https://example.com/uploads/payment_slips/himalayan_traders_slip_2025-09-22.pdf"
  },
  {
    "id": 103,
    "name": "Lumbini Hardware & Tools",
    "address": "Butwal-11, Rupandehi, Nepal",
    "phone": "+977-9823014578",
    "PAN": "478520963",
    "total_product": 12,
    "total_cost": 45000,
    "total_paid": 25000,
    "total_due": 20000,
    "payment_slip_url": "https://example.com/uploads/payment_slips/lumbini_hardware_slip_2025-08-10.pdf"
  },
  {
    "id": 104,
    "name": "Kathmandu Electronics Hub",
    "address": "Putalisadak, Kathmandu, Nepal",
    "phone": "+977-9856041122",
    "PAN": "635874120",
    "total_product": 40,
    "total_cost": 320000,
    "total_paid": 300000,
    "total_due": 20000,
    "payment_slip_url": "https://example.com/uploads/payment_slips/kathmandu_electronics_slip_2025-07-18.pdf"
  },
  {
    "id": 105,
    "name": "Nepal Agro Suppliers",
    "address": "Bharatpur-3, Chitwan, Nepal",
    "phone": "+977-9861230987",
    "PAN": "596413287",
    "total_product": 30,
    "total_cost": 210000,
    "total_paid": 150000,
    "total_due": 60000,
    "payment_slip_url": "https://example.com/uploads/payment_slips/nepal_agro_slip_2025-06-09.pdf"
  },
  {
    "id": 106,
    "name": "Janakpur Construction Co.",
    "address": "Janakpur-9, Dhanusha, Nepal",
    "phone": "+977-9841203698",
    "PAN": "487320654",
    "total_product": 10,
    "total_cost": 95000,
    "total_paid": 80000,
    "total_due": 15000,
    "payment_slip_url": "https://example.com/uploads/payment_slips/janakpur_construction_slip_2025-05-12.pdf"
  },
  {
    "id": 107,
    "name": "Biratnagar Auto Parts",
    "address": "Main Road, Biratnagar, Nepal",
    "phone": "+977-9811100099",
    "PAN": "516904872",
    "total_product": 22,
    "total_cost": 130000,
    "total_paid": 100000,
    "total_due": 30000,
    "payment_slip_url": "https://example.com/uploads/payment_slips/biratnagar_auto_slip_2025-04-08.pdf"
  },
  {
    "id": 108,
    "name": "Pokhara Fashion House",
    "address": "Lakeside, Pokhara, Nepal",
    "phone": "+977-9808776655",
    "PAN": "609478531",
    "total_product": 16,
    "total_cost": 78000,
    "total_paid": 78000,
    "total_due": 0,
    "payment_slip_url": "https://example.com/uploads/payment_slips/pokhara_fashion_slip_2025-03-02.pdf"
  }
]


export const DUMMY_PRODUCTS = [
  {
    id: 1,
    category: "Accessories",
    name: 'Macbook Pro M1 Pro 14" 512GB',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80', 
    source: 'Ali Express',
    rating: 4.8,
      sku: "WM-002",
    purchase_price:5000,
    selling_price:5600,
    reviews: 1345,
    price: 200,
    stock:50,
    purchase_date:"2025-10-23",
    expiry_date:"2030-10-23",
        tags: ['Apple', 'Electronic'],
  },
  {
    id: 2,
    category: "Accessories",
    name: 'Monitor MSI 27" Modern MD271UL 4K',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80', 
    source: 'Amazon',
    rating: 4.9,
      sku: "WM-002",
     purchase_price:5000,
    selling_price:5600,
    reviews: 1345,
    price: 200,
    stock:50,
    purchase_date:"2025-10-23",
    expiry_date:"2030-10-23",
        tags: ['Apple', 'Electronic'],
  },
  {
    id: 3,
    category: "Accessories",
    name: 'Macbook Pro M1 2020 13" 512GB',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80', 
    source: 'Tokopedia',
      sku: "WM-002",
    purchase_price:5000,
    selling_price:5600,
    reviews: 1345,
    price: 200,
    stock:50,
    purchase_date:"2025-10-23",
    expiry_date:"2030-10-23",
        tags: ['Apple', 'Electronic'],
  },
  {
    id: 4,
    category: "laptop",
    name: 'Monitor MSI 27" Modern MD271UL 4K',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80', 
    source: 'Shopify',
      sku: "WM-002",
    purchase_price:5000,
    selling_price:5600,
    reviews: 1345,
    price: 200,
    stock:50,
    purchase_date:"2025-10-23",
    expiry_date:"2030-10-23",
        tags: ['Apple', 'Electronic'],
  },
  {
    id: 5,
    name: 'Macbook Pro M1 Pro 14"',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80', 
   purchase_price:5000,
     sku: "WM-002",
    selling_price:5600,
    reviews: 1345,
    price: 200,
    stock:50,
    purchase_date:"2025-10-23",
    expiry_date:"2030-10-23",
        tags: ['Apple', 'Electronic'],
  },
  {
    id: 6,
    name: 'Macbook Pro M1 Pro 14"',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80', 
      sku: "WM-002",
    purchase_price:5000,
    selling_price:5600,
    reviews: 1345,
    price: 200,
    stock:50,
    purchase_date:"2025-10-23",
    expiry_date:"2030-10-23",
        tags: ['Apple', 'Electronic'],
  },
  {
    id: 7,
    name: 'Macbook Air M1 2020 13"',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80', 
      sku: "WM-002",
   purchase_price:5000,
    selling_price:5600,
    reviews: 1345,
    price: 200,
    stock:50,
    purchase_date:"2025-10-23",
    expiry_date:"2030-10-23",
        tags: ['Apple', 'Electronic'],
  },
  
];


// Helper function to get the appropriate source text color (simplified)
 export const getSourceColor = (source) => {
  switch (source) {
    case 'Ali Express': return 'text-red-600 bg-red-100';
    case 'Amazon': return 'text-orange-600 bg-orange-100';
    case 'Tokopedia': return 'text-green-600 bg-green-100';
    case 'Shopify': return 'text-green-800 bg-green-200';
    case 'eBay': return 'text-blue-600 bg-blue-100';
    case 'Shopee': return 'text-orange-500 bg-orange-100';
    case 'Lazada': return 'text-blue-800 bg-blue-200';
    case 'BigCommerce': return 'text-pink-600 bg-pink-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

const tenant = [
  { id: 1, name: 'The Corner Cafe', status: 'Active', plan: 'Pro', users: 12, lastActivity: '2025-10-12', revenue: 1200 },
  { id: 2, name: 'Quick Mart Retail', status: 'Active', plan: 'Enterprise', users: 50, lastActivity: '2025-10-14', revenue: 4500 },
  { id: 3, name: 'Vintage Threads Co.', status: 'Pending Churn', plan: 'Basic', users: 3, lastActivity: '2025-09-28', revenue: 50 },
  { id: 4, name: 'Green Garden Supplies', status: 'Suspended', plan: 'Basic', users: 1, lastActivity: '2025-08-01', revenue: 0 },
  { id: 5, name: 'Tech Repair Hub', status: 'Active', plan: 'Pro', users: 7, lastActivity: '2025-10-14', revenue: 890 },
  { id: 6, name: 'Local Artisan Bakery', status: 'Active', plan: 'Basic', users: 5, lastActivity: '2025-10-13', revenue: 320 },
  { id: 7, name: 'Elite Fitness Center', status: 'Trial', plan: 'Enterprise', users: 20, lastActivity: '2025-10-14', revenue: 0 },
              ];

            export  const STATIC_SUBSCRIPTION_DATA = [
                { id: 1, month: 'Jan 2024', totalSubscribers: 1500, activeSubscribers: 1400, revenue: 15000, status: 'Active', plan: 'Pro', churned: 100 },
                { id: 2, month: 'Feb 2024', totalSubscribers: 1600, activeSubscribers: 1450, revenue: 16500, status: 'Active', plan: 'Pro', churned: 150 },
                { id: 3, month: 'Mar 2024', totalSubscribers: 1750, activeSubscribers: 1600, revenue: 18000, status: 'Active', plan: 'Basic', churned: 150 },
                { id: 4, month: 'Apr 2024', totalSubscribers: 1800, activeSubscribers: 1650, revenue: 18500, status: 'Active', plan: 'Basic', churned: 150 },
                { id: 5, month: 'May 2024', totalSubscribers: 1950, activeSubscribers: 1700, revenue: 20000, status: 'Active', plan: 'Pro', churned: 250 },
                { id: 6, month: 'Jun 2024', totalSubscribers: 2000, activeSubscribers: 1800, revenue: 21000, status: 'Active', plan: 'Basic', churned: 200 },
                { id: 7, month: 'Jul 2024', totalSubscribers: 2200, activeSubscribers: 2000, revenue: 23000, status: 'Pending', plan: 'Pro', churned: 200 },
                { id: 8, month: 'Aug 2024', totalSubscribers: 2400, activeSubscribers: 2200, revenue: 25000, status: 'Active', plan: 'Basic', churned: 200 },
                { id: 9, month: 'Sep 2024', totalSubscribers: 2500, activeSubscribers: 2300, revenue: 26000, status: 'Cancelled', plan: 'Pro', churned: 200 },
                { id: 10, month: 'Oct 2024', totalSubscribers: 2650, activeSubscribers: 2400, revenue: 27500, status: 'Active', plan: 'Basic', churned: 250 },
                { id: 11, month: 'Nov 2025', totalSubscribers: 2800, activeSubscribers: 2550, revenue: 29000, status: 'Active', plan: 'Pro', churned: 250 },
                { id: 12, month: 'Dec 2025', totalSubscribers: 3000, activeSubscribers: 2800, revenue: 32000, status: 'Active', plan: 'Basic', churned: 200 },
                { id: 17, month: 'Jul 2025', totalSubscribers: 2200, activeSubscribers: 2000, revenue: 23000, status: 'Pending', plan: 'Pro', churned: 200 },
                { id: 81, month: 'Aug 2023', totalSubscribers: 2400, activeSubscribers: 2200, revenue: 25000, status: 'Active', plan: 'Basic', churned: 200 },
                { id: 91, month: 'Sep 2026', totalSubscribers: 2500, activeSubscribers: 2300, revenue: 26000, status: 'Cancelled', plan: 'Pro', churned: 200 },
                { id: 110, month: 'Oct 2024', totalSubscribers: 2650, activeSubscribers: 2400, revenue: 27500, status: 'Active', plan: 'Basic', churned: 250 },
                { id: 111, month: 'Nov 2029', totalSubscribers: 2800, activeSubscribers: 2550, revenue: 29000, status: 'Active', plan: 'Pro', churned: 250 },
                { id: 112, month: 'Dec 2000', totalSubscribers: 3000, activeSubscribers: 2800, revenue: 32000, status: 'Active', plan: 'Basic', churned: 200 },
              ];