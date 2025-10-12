import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { productsData } from '../../data/mockData';

const AddEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    cost: '',
    stock: '',
    sku: '',
    description: '',
    image: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      // Find the product to edit
      const product = productsData.find(p => p.id === parseInt(id));
      if (product) {
        setFormData({
          name: product.name,
          category: product.category,
          price: product.price.toString(),
          cost: product.cost.toString(),
          stock: product.stock.toString(),
          sku: product.sku,
          description: product.description || '',
          image: product.image || ''
        });
      }
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateSKU = () => {
    const prefix = formData.category ? formData.category.substring(0, 3).toUpperCase() : 'PRO';
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    setFormData(prev => ({
      ...prev,
      sku: `${prefix}-${random}`
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (parseFloat(formData.stock) < 0) {
      setError('Stock cannot be negative');
      return;
    }

    if (parseFloat(formData.price) < 0 || parseFloat(formData.cost) < 0) {
      setError('Price and cost cannot be negative');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Product saved:', formData);
      setIsLoading(false);
      navigate('/products');
    }, 1000);
  };

  const categories = ['Electronics', 'Accessories', 'Audio', 'Computers', 'Mobile', 'Home'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/products"
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEdit ? 'Edit Product' : 'Add New Product'}
            </h1>
            <p className="text-gray-600">
              {isEdit ? 'Update product information' : 'Add a new product to your inventory'}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Sale Price ($) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    step="0.01"
                    min="0"
                    required
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-1">
                    Cost Price ($) *
                  </label>
                  <input
                    type="number"
                    id="cost"
                    name="cost"
                    step="0.01"
                    min="0"
                    required
                    value={formData.cost}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  min="0"
                  required
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">
                  SKU Code *
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    id="sku"
                    name="sku"
                    required
                    value={formData.sku}
                    onChange={handleChange}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., ELEC-12345"
                  />
                  <button
                    type="button"
                    onClick={generateSKU}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 border border-gray-300"
                  >
                    Generate
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image URL
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {formData.image && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Preview
                  </label>
                  <div className="w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product description..."
                />
              </div>
            </div>
          </div>

          {/* Profit Calculation */}
          {formData.price && formData.cost && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Profit Calculation</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Profit per unit:</span>
                  <div className="font-semibold text-green-600">
                    ${(parseFloat(formData.price) - parseFloat(formData.cost)).toFixed(2)}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Profit margin:</span>
                  <div className="font-semibold text-green-600">
                    {((parseFloat(formData.price) - parseFloat(formData.cost)) / parseFloat(formData.price) * 100).toFixed(1)}%
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Total stock value:</span>
                  <div className="font-semibold">
                    ${(parseFloat(formData.cost) * parseFloat(formData.stock || 0)).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Link
              to="/products"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : isEdit ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditProduct;