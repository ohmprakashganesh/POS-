import React, { createContext, useContext, useState, useRef, useEffect } from "react";

const SelectContext = createContext();



export const SelectComponent = ({
  children,
  placeholder = "Select",
  value,
  onChange,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);

  // click outside to close
  useEffect(() => {
    const handleClick = (e) =>{
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Find the selected option's label
  const selectedLabel = React.Children.toArray(children).find(
    (child) => child.props?.value === value
  )?.props?.children;

  return (
    <SelectContext.Provider value={{ open, setOpen, value, onChange }}>
      <div ref={selectRef} className="relative inline-block w-full">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`w-full focus:ring-primary focus:ring-2 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed  border-gray-300  border rounded-md  px-3 py-2 flex items-center justify-start gap-2 min-h-[40px] ${className}`}
        >
          {selectedLabel || <span className="text-gray-400">{placeholder}</span>}
        </button>

        {open && (
          <div className="absolute mt-1.5 w-fit bg-white overflow-hidden rounded-md shadow-sm z-50 ">
            {children}
          </div>
        )}
      </div>
    </SelectContext.Provider>
  );
};

export const OptionComponent = ({ children, value }) => {
  const ctx = useContext(SelectContext);
  const isActive = ctx?.value === value;

  const handleSelect = () => {
    // Create a synthetic event object like native select
    const syntheticEvent = {
      target: { value }
    };
    ctx?.onChange(syntheticEvent);
    ctx?.setOpen(false);
  };

  return (
    <button
      type="button"
      onClick={handleSelect}
      className={`w-full px-3 py-2  flex items-center justify-start gap-2 min-h-[40px] ${
        isActive 
          ? 'bg-primary/40 text-primary hover:bg-primary-hover/40' 
          : 'hover:bg-neutral-200'
      }`}
    >
      {children}
    </button>
  );
};