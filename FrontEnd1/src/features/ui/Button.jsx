import { forwardRef } from "react"
import { cn } from "@/lib/utils"

const Button = forwardRef(({ className = "", onClick, secondary=false,outline=false,destructive=false, ...props }, ref) => {
  return (
    <button
    onClick={onClick}
      ref={ref}
      {...props}
      className={cn(
        "bg-primary cursor-pointer text-primary-foreground flex gap-2 items-center justify-center px-4 py-2 rounded-md font-semibold hover:bg-primary-hover transition-colors",
        secondary && "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
        outline && "bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        destructive && "bg-red-500 text-white hover:bg-red-600",
        className
      )}
    />
  )
})
Button.displayName = "Button"
export default Button;
