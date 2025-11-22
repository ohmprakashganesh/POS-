import React, { useState, useCallback, useEffect } from "react";
import { XCircle, Search, PlusIcon, CheckCircle } from "lucide-react";
import Button from "@/features/ui/Button";
import NewCategoryForm from "./NewCategoryForm";
import Input from "@/features/ui/Input";
import CategoryCard from "./CategoryCard";
import { useTranslation } from "react-i18next";
import { initialCategories } from "@/data/mockData";

// --- Initial Data and State Setup ---


const App = () => {

  const {t}=useTranslation()
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term
  const [isCreateCategoryFormOpen, setIsCreateCategoryFormOpen] =
    useState(false);
     const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);

       useEffect(()=>{
      if(initialCategories){
        setCategories(initialCategories)
      }
     },[])

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
    <div className="font-inter ">
      <div className="top-section space-y-2 sm:flex items-center justify-between ">
        <h1 className="text-2xl font-bold">{t("category.title")}</h1>
        <Button
          className="xl:hidden"
          onClick={() => setIsCreateCategoryFormOpen(true)}
        >
          <PlusIcon strokeWidth={2.5}  />{t("category.addCategory")}
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
          placeholder={t("category.search")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 bg-white dark:bg-dark"
        />
      </div>

      <div className="flex  lg:flex-row gap-2">
        {/* LEFT COLUMN: Category List (Cards) */}
        <div className="left-section w-full bg-white dark:bg-dark rounded-md shadow-sm p-3 grow">
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
      <div className="modal w-9/10 aspect-video max-w-120 h-fit bg-white dark:bg-dark rounded-md shadow-sm p-5 z-50 flex gap-5 flex-col items-center relative">
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
        <div className="modal w-[95%] aspect-video max-w-120 h-fit bg-white dark:bg-dark rounded-md shadow-sm p-5 z-50 flex gap-5 flex-col items-center relative">
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
