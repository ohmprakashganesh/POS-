import React, { useState, useRef, useEffect } from "react";

const SearchSelect = ({
  value,
  onChange,
  customers,
  placeholder = "Select Customer",
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={containerRef} className="relative w-full max-w-sm">
      {/* Selected Box */}
      <div
        onClick={() => setOpen(!open)}
        className={`
          bg-white dark:bg-dark h-10 rounded-lg flex items-center px-3 cursor-pointer
          border
          ${value ? "border-primary ring-1 ring-primary" : "border-muted/40"}
          hover:border-primary
        `}
      >
        {value ? customers.find((c) => c.id === value)?.name : placeholder}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute w-full bg-white dark:bg-dark shadow-lg rounded-lg mt-1 z-50 max-h-60 overflow-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer…"
            className="w-full px-3 py-2 border-b outline-none bg-white dark:bg-dark"
          />

          {filtered.length === 0 && (
            <p className="p-3 text-sm text-muted">No Matched found</p>
          )}

          {filtered.map((cust) => (
            <div
              key={cust.id}
              onClick={() => {
                onChange(cust.id);
                setOpen(false);
                setSearch("");
              }}
              className="px-3 py-2 hover:bg-primary/10 cursor-pointer"
            >
              {cust.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchSelect;
