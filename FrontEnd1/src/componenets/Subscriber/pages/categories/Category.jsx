import React, { useState, useCallback } from "react";
import { XCircle, Search, PlusIcon, CheckCircle } from "lucide-react";
import Button from "@/componenets/ui/Button";
import NewCategoryForm from "./NewCategoryForm";
import Input from "@/componenets/ui/Input";
import CategoryCard from "./CategoryCard";

// --- Initial Data and State Setup ---
const initialCategories = [
  {
    id: 1,
    name: "Electronics",
    items: 154,
    imageUrl:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80",
    color: "#4F46E5",
    active: true,
  },
  {
    id: 2,
    name: "Apparel",
    items: 345,
    imageUrl:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80",
    color: "#10B981",
    active: true,
  },
  {
    id: 3,
    name: "Home ",
    items: 98,
    imageUrl:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    color: "#F59E0B",
    active: false,
  },
  {
    id: 4,
    name: "Books",
    items: 501,
    imageUrl:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    color: "#EF4444",
    active: true,
  },
  {
    id: 5,
    name: "Sports Gear",
    items: 78,
    imageUrl:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    color: "#16A34A",
    active: true,
  },
  {
    id: 6,
    name: "Pet Supplies",
    items: 112,
    imageUrl: "https://placehold.co/64x64/854D0E/white?text=P",
    color: "#854D0E",
    active: true,
  },
  {
    id: 7,
    name: "Jewelry",
    items: 45,
    imageUrl: "https://placehold.co/64x64/9333EA/white?text=J",
    color: "#9333EA",
    active: false,
  },
  {
    id: 8,
    name: "Groceries",
    items: 890,
    imageUrl: "https://placehold.co/64x64/65A30D/white?text=G",
    color: "#65A30D",
    active: true,
  },
  {
    id: 9,
    name: "Beauty & Health",
    items: 210,
    imageUrl: "https://placehold.co/64x64/EC4899/white?text=BH",
    color: "#EC4899",
    active: true,
  },
  {
    id: 10,
    name: "Automotive",
    items: 32,
    imageUrl: "https://placehold.co/64x64/4B5563/white?text=AU",
    color: "#4B5563",
    active: false,
  },
  {
    id: 11,
    name: "Toys & Games",
    items: 640,
    imageUrl: "https://placehold.co/64x64/0D9488/white?text=TG",
    color: "#0D9488",
    active: true,
  },
  {
    id: 12,
    name: "Garden & Patio",
    items: 188,
    imageUrl: "https://placehold.co/64x64/4D7C0F/white?text=GP",
    color: "#4D7C0F",
    active: true,
  },
  {
    id: 13,
    name: "Instruments",
    items: 70,
    imageUrl: "https://placehold.co/64x64/F97316/white?text=MI",
    color: "#F97316",
    active: true,
  },
  {
    id: 14,
    name: "Software",
    items: 15,
    imageUrl: "https://placehold.co/64x64/06B6D4/white?text=SW",
    color: "#06B6D4",
    active: true,
  },
  {
    id: 15,
    name: "Office Supplies",
    items: 305,
    imageUrl: "https://placehold.co/64x64/FCD34D/black?text=OS",
    color: "#FCD34D",
    active: false,
  },
  {
    id: 16,
    name: "Services",
    items: 12,
    imageUrl: "https://placehold.co/64x64/60A5FA/white?text=SE",
    color: "#60A5FA",
    active: true,
  },
  {
    id: 17,
    name: "Travel & Luggage",
    items: 55,
    imageUrl: "https://placehold.co/64x64/4338CA/white?text=TL",
    color: "#4338CA",
    active: true,
  },
  {
    id: 18,
    name: "Art Supplies",
    items: 140,
    imageUrl: "https://placehold.co/64x64/DB2777/white?text=AS",
    color: "#DB2777",
    active: false,
  },
  {
    id: 19,
    name: "Collectibles",
    items: 25,
    imageUrl: "https://placehold.co/64x64/FBBF24/black?text=C",
    color: "#FBBF24",
    active: true,
  },
  {
    id: 20,
    name: "Kitchenware",
    items: 220,
    imageUrl: "https://placehold.co/64x64/9CA3AF/white?text=KW",
    color: "#9CA3AF",
    active: true,
  },
];

const App = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term
  const [isCreateCategoryFormOpen, setIsCreateCategoryFormOpen] =
    useState(false);
     const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. Delete Category
  const handleDeleteCategory = useCallback((id) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
    setIsConfirmDeleteModalOpen(false);
  }, []);

  // 3. Toggle Category Active Status
  const handleToggleActive = useCallback((id) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, active: !cat.active } : cat))
    );
  }, []);

  function closeNewCategoryForm(event) {
    event.stopPropagation();
    setIsCreateCategoryFormOpen(false);
  }

  const openModal = useCallback((id) => {
    setDeleteCategoryId(id);
    setIsConfirmDeleteModalOpen(true);
  }, []);
  // console.log(deleteCategoryId)
  return (
    <div className="font-inter">
      <div className="top-section space-y-2 sm:flex items-center justify-between ">
        <h1 className="text-2xl font-bold">Category Management</h1>
        <Button
          className="xl:hidden"
          onClick={() => setIsCreateCategoryFormOpen(true)}
        >
          <PlusIcon strokeWidth={2.5}  /> Add a Category
        </Button>
        {/* createNewcategory form  */}
        {isCreateCategoryFormOpen && (
          <div className="new-category-form fixed inset-0 flex items-center justify-center z-50">
            <div
              onClick={closeNewCategoryForm}
              className="overlay fixed inset-0 bg-black/30 flex items-center justify-center z-50"
            />
            <NewCategoryForm className="z-100" setIsCreateCategoryFormOpen={setIsCreateCategoryFormOpen} setIsSuccessModalOpen={setIsSuccessModalOpen} />
          </div>
        )}
      </div>
      <div className="searchbar relative w-full max-w-130 my-3">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-muted" />
        <Input
          type="text"
          placeholder="Search categories by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 bg-white"
        />
      </div>

      <div className="flex  lg:flex-row gap-2">
        {/* LEFT COLUMN: Category List (Cards) */}
        <div className="left-section w-full bg-white rounded-md shadow-sm p-3 grow">
          <div className="cards grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                openModal={openModal}
                onToggleActive={handleToggleActive}
              />
            ))}
          </div>

          {/* Empty Search Result State */}
          {filteredCategories.length === 0 && searchTerm && (
            <div className="w-full min-h-100 h-full flex items-center justify-center  font-bold text-balance">
              No categories found matching **"{searchTerm}"**.
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Create New Category Form - STICKY */}
        <NewCategoryForm className="hidden xl:inline-block w-2/5" setIsCreateCategoryFormOpen={setIsCreateCategoryFormOpen} setIsSuccessModalOpen={setIsSuccessModalOpen} />
      </div>

      {/* confirm delete overlay   */}
      {isConfirmDeleteModalOpen && (
        <ConfirmDeleteModal
          closeModal={()=>setIsConfirmDeleteModalOpen(false)}
          handleDeleteCategory={() => handleDeleteCategory(deleteCategoryId)}
        />
      )}

      {/* success model overlay  */}
      {isSuccessModalOpen && <SuccessModal closeModal={()=>setIsSuccessModalOpen(false)}/>}
    </div>
  );
};

export default App;

function ConfirmDeleteModal({ closeModal, handleDeleteCategory }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={closeModal}
        className="overlay fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      />
      <div className="modal w-9/10 aspect-video max-w-120 h-fit bg-white rounded-md shadow-sm p-5 z-50 flex gap-5 flex-col items-center relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <XCircle className="w-6 h-6" />
        </button>
        <h4 className="text-3xl font-bold">Confirm Action</h4>
        <div className="text-muted text-center">
          <p>Are you sure you want to proceed with this action?</p>
          <p>This cannot be undone.</p>
        </div>
        <div className="w-full space-y-2">
          <Button onClick={handleDeleteCategory} destructive className="w-full">
            Confirm
          </Button>
          <Button
            onClick={closeModal}
            className="w-full bg-gray-400 hover:bg-gray-500 text-white"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

function SuccessModal({ closeModal }) {
  return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          onClick={closeModal}
          className="overlay fixed inset-0 bg-black/30 flex items-center justify-center z-50"
        />
        <div className="modal w-[95%] aspect-video max-w-120 h-fit bg-white rounded-md shadow-sm p-5 z-50 flex gap-5 flex-col items-center relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <XCircle className="w-6 h-6" />
          </button>
          <CheckCircle className="size-18 p-4 rounded-full bg-secondary/10 text-green-600" />
          <h4 className="text-3xl font-bold">Success</h4>
          <p className="text-muted -mt-2">New Category created Successfully</p>
          <Button onClick={closeModal} className="w-full">
            Close
          </Button>
        </div>
      </div>
    )
}
