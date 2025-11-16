import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const openCustomerForm = (id=null) => {
    setEditId(id);
    setOpenForm(true);
  };

  const closeCustomerForm = () => {
    setOpenForm(false);
    setEditId(null);
  };

  return (
    <FormContext.Provider value={{ openForm, editId, openCustomerForm, closeCustomerForm }}>
      {children}
    </FormContext.Provider>
  );
};
export const useForm = () => useContext(FormContext);
