import React  from "react";
import  { ShieldOff, CheckCircle, Trash2 } from "lucide-react"

const CategoryCard = React.memo(({ category, openModal, onToggleActive }) => {
  const { id, name, items, imageUrl, active, color } = category;
  return <>
    <div
      className={`rounded-md bg-background  ${
        active ? "opacity-20" : "opacity-100"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="grid grid-cols-[80px_2fr_1fr] gap-2 items-center">
          {/* Image/Color Circle */}
          <div
            className="w-20 h-20 rounded-sm shrink-0 flex items-center justify-center text-xl font-bold text-white shadow-lg"
            style={{ backgroundColor: color }}
          >
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
              <h3
                className="text-lg font-semibold"
              >
                {name}
              </h3>
            </div>
            <p className="text-sm text-muted">{items} items</p>
          </div>
        </div>

        {/* Controls */}
        <div className=" space-x-2">
          {/* Toggle Active Button */}
          <button
            onClick={() => onToggleActive(id)}
            className={`p-2 rounded-full transition duration-150 ${
              active
                ? "text-red-600 hover:bg-red-500/30"
                : "text-green-600 hover:bg-green-500/30"
            }`}
            title={active ? "Deactivate Category" : "Activate Category"}
          >
            {active ? (
              <ShieldOff className="w-5 h-5" />
            ) : (
              <CheckCircle className="w-5 h-5" />
            )}
          </button>

          {/* Delete Button */}
          <button
            onClick={()=>openModal(id)}
            className="p-2 rounded-full hover:bg-red-500/30 text-red-600 transition duration-150"
            title="Delete Category"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>


 
  </>
});

export default CategoryCard;