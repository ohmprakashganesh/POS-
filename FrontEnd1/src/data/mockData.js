// Add CubeIcon import at the top of the file
import { CubeIcon } from '@heroicons/react/24/outline';

export const productsData = [
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    price: 999.99,
    cost: 750.00,
    stock: 15,
    sku: "LP-001",
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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


 export const DUMMY_PRODUCTS = [
  {
    id: 1,
     category: "Accessories",
    name: 'Macbook Pro M1 Pro 14" 512GB',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80', 
    source: 'Ali Express',
    rating: 4.8,
    reviews: 1345,
    priceRange: '$180-$220',
    minOrder: '12',
    tags: ['Apple', 'Electronic'],
  },
  {
    id: 2,
    name: 'Monitor MSI 27" Modern MD271UL 4K',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80', 
    source: 'Amazon',
    rating: 4.9,
     category: "Accessories",
    reviews: 976,
    priceRange: '$175-$200',
    minOrder: '11',
    tags: ['MSI', 'Electronic', 'Display'],
  },
  {
    id: 3,
    name: 'Macbook Pro M1 2020 13" 512GB',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80', 
    source: 'Tokopedia',
     category: "Accessories",
    rating: 4.7,
    reviews: 1654,
    priceRange: '$180-$250',
    minOrder: '10',
    tags: ['Apple', 'Electronic'],
  },
  {
    id: 4,
    name: 'Monitor MSI 27" Modern MD271UL 4K',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80', 
    source: 'Shopify',
    rating: 4.8,
    reviews: 886,
    category: "laptop",
    priceRange: '$197-$224',
    minOrder: '8',
    tags: ['MSI', 'Electronic', 'Display'],
  },
  // Added some products from the second row for completeness
  {
    id: 5,
    name: 'Macbook Pro M1 Pro 14"',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80', 
    source: 'eBay',
    rating: 4.5,
    reviews: 1256,
    priceRange: '$185-$210',
    minOrder: '15',
    tags: ['Apple', 'Electronic'],
  },
  {
    id: 6,
    name: 'Macbook Pro M1 Pro 14"',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80', 
    source: 'Shopee',
    rating: 4.6,
    reviews: 1276,
    priceRange: '$190-$230',
    minOrder: '14',
    tags: ['Apple', 'Electronic'],
  },
  {
    id: 7,
    name: 'Macbook Air M1 2020 13"',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80', 
    source: 'Lazada',
    rating: 4.8,
    reviews: 1334,
    priceRange: '$150-$190',
    minOrder: '18',
    tags: ['Apple', 'Electronic'],
  },
  {
    id: 8,
    name: 'Apple 32 Pro Display XDR',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80', 
    source: 'BigCommerce',
    rating: 4.7,
    reviews: 1967,
    priceRange: '$500-$650',
    minOrder: '5',
    tags: ['Apple', 'Display', 'Electronic'],
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