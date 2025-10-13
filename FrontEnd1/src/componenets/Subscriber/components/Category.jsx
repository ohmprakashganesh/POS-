import React, { useState, useReducer, useCallback, useEffect } from 'react';
import { Trash2, ShieldOff, CheckCircle, Plus, Edit2, XCircle, Search } from 'lucide-react';

// --- Reducer for New Category Form State ---
const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET_FORM':
      return { name: '', imageUrl: 'https://placehold.co/64x64/E5E7EB/4B5563?text=IMG', color: '#3B82F6' };
    default:
      return state;
  }
};

// --- Initial Data and State Setup ---
const initialCategories = [
  { id: 1, name: 'Electronics', items: 154, imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80', color: '#4F46E5', active: true },
  { id: 2, name: 'Apparel', items: 345, imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80', color: '#10B981', active: true },
  { id: 3, name: 'Home ', items: 98, imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80', color: '#F59E0B', active: false },
  { id: 4, name: 'Books', items: 501, imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80', color: '#EF4444', active: true },
  { id: 5, name: 'Sports Gear', items: 78, imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80', color: '#16A34A', active: true },
  { id: 6, name: 'Pet Supplies', items: 112, imageUrl: 'https://placehold.co/64x64/854D0E/white?text=P', color: '#854D0E', active: true },
  { id: 7, name: 'Jewelry', items: 45, imageUrl: 'https://placehold.co/64x64/9333EA/white?text=J', color: '#9333EA', active: false },
  { id: 8, name: 'Groceries', items: 890, imageUrl: 'https://placehold.co/64x64/65A30D/white?text=G', color: '#65A30D', active: true },
  { id: 9, name: 'Beauty & Health', items: 210, imageUrl: 'https://placehold.co/64x64/EC4899/white?text=BH', color: '#EC4899', active: true },
  { id: 10, name: 'Automotive', items: 32, imageUrl: 'https://placehold.co/64x64/4B5563/white?text=AU', color: '#4B5563', active: false },
  { id: 11, name: 'Toys & Games', items: 640, imageUrl: 'https://placehold.co/64x64/0D9488/white?text=TG', color: '#0D9488', active: true },
  { id: 12, name: 'Garden & Patio', items: 188, imageUrl: 'https://placehold.co/64x64/4D7C0F/white?text=GP', color: '#4D7C0F', active: true },
  { id: 13, name: 'Instruments', items: 70, imageUrl: 'https://placehold.co/64x64/F97316/white?text=MI', color: '#F97316', active: true },
  { id: 14, name: 'Software', items: 15, imageUrl: 'https://placehold.co/64x64/06B6D4/white?text=SW', color: '#06B6D4', active: true },
  { id: 15, name: 'Office Supplies', items: 305, imageUrl: 'https://placehold.co/64x64/FCD34D/black?text=OS', color: '#FCD34D', active: false },
  { id: 16, name: 'Services', items: 12, imageUrl: 'https://placehold.co/64x64/60A5FA/white?text=SE', color: '#60A5FA', active: true },
  { id: 17, name: 'Travel & Luggage', items: 55, imageUrl: 'https://placehold.co/64x64/4338CA/white?text=TL', color: '#4338CA', active: true },
  { id: 18, name: 'Art Supplies', items: 140, imageUrl: 'https://placehold.co/64x64/DB2777/white?text=AS', color: '#DB2777', active: false },
  { id: 19, name: 'Collectibles', items: 25, imageUrl: 'https://placehold.co/64x64/FBBF24/black?text=C', color: '#FBBF24', active: true },
  { id: 20, name: 'Kitchenware', items: 220, imageUrl: 'https://placehold.co/64x64/9CA3AF/white?text=KW', color: '#9CA3AF', active: true },
];

const initialFormState = {
  name: '',
  imageUrl: 'https://placehold.co/64x64/E5E7EB/4B5563?text=IMG',
  color: '#3B82F6', // Default blue color
};


/**
 * Renders a single category card with details and control buttons.
 */
const CategoryCard = React.memo(({ category, onDelete, onToggleActive }) => {
  const { id, name, items, imageUrl, active, color } = category;

  return (
    <div className={`p-4 border border-gray-200 rounded-xl shadow-md transition duration-300 hover:shadow-lg ${active ? 'bg-gray-100 opacity-50' : 'bg-gray-50 opacity-100'}`}>
      <div className="flex items-center justify-between">
        <div className="grid grid-cols-[80px_2fr_1fr] gap-1 items-center space-x-4">
          {/* Image/Color Circle */}
          <div className="w-20 h-20 rounded-sm flex-shrink-0 flex items-center justify-center text-xl font-bold text-white shadow-lg" style={{ backgroundColor: color }}>
            {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={name}
                  className="w-full h-full object-cover rounded-full"
                 
                />
            ) : (
                name.charAt(0).toUpperCase()
            )}
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center space-x-2">
              <h3 className={`text-lg font-semibold ${active ? 'text-black' : 'text-gray-900'}`}>{name}</h3>
             
            </div>
            <p className="text-sm text-gray-800">{items} items</p>
          </div>
        </div>

        {/* Controls */}
        <div className=" space-x-2">
          {/* Toggle Active Button */}
          <button
            onClick={() => onToggleActive(id)}
            className={`p-2 rounded-full transition duration-150 ${active ? 'text-red-600 hover:bg-red-100' : 'text-green-600 hover:bg-green-100'}`}
            title={active ? 'Deactivate Category' : 'Activate Category'}
          >
            {active ? <ShieldOff className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(id, name)}
            className="p-2 rounded-full text-gray-400 hover:bg-red-100 hover:text-red-600 transition duration-150"
            title="Delete Category"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
});

/**
 * Main application component for category management.
 */
const App = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ id: null, title: '', message: '' });
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle input changes for the new category form
 const handleInputChange = (e) => {
  const { name, type, files, value } = e.target;

  if (type === "file" && files && files[0]) {
    const file = files[0];
    const previewUrl = URL.createObjectURL(file); // create a local preview URL

    // update state using dispatch
    dispatch({
      type: "UPDATE_FIELD",
      field: name,
      value: previewUrl,
    });
  } else {
    dispatch({
      type: "UPDATE_FIELD",
      field: name,
      value: value,
    });
  }
};




    const newCategory = {
      id: Date.now(),
      name: formState.name,
      items: 0,
      imageUrl: formState.imageUrl,
      color: formState.color,
      active: true,
    };
  // 1. Add New Category
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!formState.name.trim()) {
      setModalContent({ title: 'Error', message: 'Category name cannot be empty.' });
      setShowModal(true);
      return;
    }
    setCategories(prev => [...prev, newCategory]);
    dispatch({ type: 'RESET_FORM' });
    setModalContent({ title: 'Success', message: `Category "${newCategory.name}" created successfully!` });
    setShowModal(true);
  };

  // 2. Delete Category
  const handleDeleteCategory = (id, name) => {
    setModalContent({
      id: id,
      title: 'Confirm Deletion',
      message: `Are you sure you want to permanently delete the category "${name}"? This action cannot be undone.`,
      confirmAction: () => {
        setCategories(prev => prev.filter(cat => cat.id !== id));
        setShowModal(false);
      }
    });
    setShowModal(true);
  };

  // 3. Toggle Category Active Status
  const handleToggleActive = (id) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === id ? { ...cat, active: !cat.active } : cat
      )
    );
  };

  // Modal Component for Confirmation/Alerts (Replaces alert())
  const Modal = ({ show, onClose, title, message, confirmAction }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 transform transition-all duration-300 scale-100">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-xl font-bold text-gray-900">{title}</h4>
            <button onClick={() => onClose()} className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100">
              <XCircle className="w-6 h-6" />
            </button>
          </div>
          <p className="text-gray-600 mb-6">{message}</p>

          <div className={`flex ${confirmAction ? 'justify-between' : 'justify-end'} space-x-3`}>
            {confirmAction && (
              <button
                onClick={() => onClose()}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition duration-150"
              >
                Cancel
              </button>
            )}
            <button
              onClick={confirmAction || onClose}
              className={`flex-1 px-4 py-2 text-white font-medium rounded-lg transition duration-150 ${confirmAction ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-inter">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6"> Category Management</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT COLUMN: Category List (Cards) - SCROLLABLE */}
        <div className="w-full lg:w-2/3">
          {/* NEW: Search Field */}
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm"
            />
          </div>

          {/* Category Grid - Scrollable Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[70vh] lg:max-h-[80vh] overflow-y-auto pr-2">
            {filteredCategories.map(category => (
              <CategoryCard
                key={category.id}
                category={category}
                onDelete={handleDeleteCategory}
                onToggleActive={handleToggleActive}
              />
            ))}

            {/* Empty Search Result State */}
            {filteredCategories.length === 0 && searchTerm && (
              <div className="col-span-1 sm:col-span-2 text-center py-10 text-gray-500 bg-white rounded-xl shadow-md">
                No categories found matching **"{searchTerm}"**.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Create New Category Form - STICKY */}
        <div className="w-full lg:w-1/3">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center space-x-2">
            <Plus className="w-6 h-6 text-green-500" />
            <span>Create New Category</span>
          </h2>
          {/* Sticky container for the form */}
          <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 sticky top-4">
            <form onSubmit={handleAddCategory} className="space-y-5">

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Seasonal Sales"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  required
                />
              </div>

              {/* Image URL Field */}
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="file"
                  name="imageUrl"
                  id="imageUrl"
                  onChange={handleInputChange}
                  placeholder="https://image-link.com/category.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                />
                <p className="text-xs text-gray-400 mt-1">Use a placeholder or link to an image.</p>
              </div>

              {/* Color Picker Field */}
              <div>
                <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">Category Color (Hex)</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    name="color"
                    id="color"
                    value={formState.color}
                    onChange={handleInputChange}
                    className="w-10 h-10 p-1 border-gray-300 rounded-lg cursor-pointer"
                    title="Choose Color"
                  />
                  <input
                    type="text"
                    name="colorText"
                    id="colorText"
                    value={formState.color}
                    readOnly
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 transition duration-150"
                  />
                </div>
              </div>

              {/* Preview */}
              <div className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">Preview:</p>
                  <div className="w-14 h-14 rounded-sm flex items-center justify-center text-xs font-bold text-white shadow-md flex-shrink-0" style={{ backgroundColor: formState.color }}>
                       <img className='w-fit h-fit object-fill' src={formState.imageUrl} />
                  </div>
                  <p className="text-gray-600 truncate">{formState.name || 'Category Preview'}</p>
              </div>


              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 transform hover:scale-[1.01]"
              >
                <Plus className="w-5 h-5" />
                <span>Create Category</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Confirmation/Alert Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={modalContent.title}
        message={modalContent.message}
        confirmAction={modalContent.confirmAction}
      />
    </div>
  );
};

export default App;
