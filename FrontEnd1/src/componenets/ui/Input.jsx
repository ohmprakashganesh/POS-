import { cn } from "@/lib/utils";
import { forwardRef, useId } from "react";

const Input = forwardRef(({className="",id,label="",error="", ...props }, ref) => {
  const tempId=useId();
  const inputId=id || props.name || tempId;
  return (
    <div >
 {label && <label htmlFor={inputId} className="block mb-1  capitalize">{label}</label>}

    <input
     id={inputId}
      ref={ref}
      {...props}
      className={cn(
        "w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed",
        error && "border-destructive focus:ring-destructive",
        props?.disabled && "bg-muted/70 text-white border-none focus:ring-0",
        className
      )}
      />
       {error && <p className="text-destructive text-sm mt-1">*{error}</p>}
      </div>
  );
});

export default Input;
