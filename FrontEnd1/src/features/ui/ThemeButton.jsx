import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function ThemeButton(){
    const { theme, setTheme } = useTheme();
     return <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            // alternatively: onClick={toggleTheme}
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20"
          >
            <Sun className="h-5 w-5 dark:hidden" />
            <Moon className="h-5 w-5 hidden dark:block" />
          </button>
}