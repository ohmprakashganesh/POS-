import { cn } from "@/lib/utils";
import { forwardRef, useId } from "react";

const Input = forwardRef(({className="",id,label="",reset, value,error="", ...props }, ref) => {
  const tempId=useId();
  const inputId=id || props.name || tempId;
  return (
    <div >
 {label && (
   <div className="flex justify-between">
    <label htmlFor={inputId} className="block mb-1  capitalize">{label}</label>
     {reset && value && (
      <span>{reset}</span>
     )}
      </div>
 )
}
    <input
     id={inputId}
      ref={ref}
      {...props}
      value={value}
      className={cn(
        "w-full border border-muted/40 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary focus:border-transparent  disabled:cursor-not-allowed  disabled:bg-background disabled:border-none disabled:focus:ring-0",
        error && "border-destructive focus:ring-destructive",
        className
      )}
      />
       {error && <p className="text-destructive text-sm mt-1">*{error}</p>}
      </div>
  );
});

export default Input;
