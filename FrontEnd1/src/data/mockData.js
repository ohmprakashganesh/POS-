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
    image: "",
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