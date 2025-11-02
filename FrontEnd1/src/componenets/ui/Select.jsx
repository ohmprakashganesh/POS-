import React, { createContext, useContext, useState, useRef, useEffect } from "react";

const SelectContext = createContext();

export const SelectComponent = ({
  children,
  placeholder = "Select",
  value,
  selectedLabel,
  onChange,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);

  // click outside to close
  useEffect(() => {
    const handleClick = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <SelectContext.Provider value={{ open, setOpen, value, selectedLabel, onChange }}>
      <div ref={selectRef} className="relative inline-block w-full">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`w-full border rounded-md px-3 py-2 bg-white hover:bg-gray-50 flex items-center justify-start gap-2 min-h-[40px] ${className}`}
        >
          {selectedLabel || <span className="text-gray-400">{placeholder}</span>}
        </button>

        {open && (
          <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-20 py-1">
            {children}
          </div>
        )}
      </div>
    </SelectContext.Provider>
  );
};

export const OptionComponent = ({ children, value }) => {
  const ctx = useContext(SelectContext);

  const handleSelect = () => {
    ctx?.onChange(value, children);
    ctx?.setOpen(false);
  };

  return (
    <button
      type="button"
      onClick={handleSelect}
      className="w-full px-3 py-2 hover:bg-gray-100 flex items-center justify-start gap-2 min-h-[40px]"
    >
      {children}
    </button>
  );
};
