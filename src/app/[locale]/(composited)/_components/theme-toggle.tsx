"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "solar-icon-set";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center"
            aria-label="Toggle dark mode"
        >
            {theme === "dark" ? (
                <Sun size={24} iconStyle="Bold" />
            ) : (
                <Moon size={24} iconStyle="Bold" />
            )}
        </button>
    );
}
