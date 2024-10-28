import "./style.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import LogoCubos from "../icons/LogoCubos";
import IconSun from "../icons/IconSun";
import IconMoon from "../icons/IconMoon";

export default () => {
    const [darkMode, setDarkMode] = useState(true);

    function handleToggleDarkMode() {
        const root = document.documentElement;
        if (darkMode) root.classList.remove("dark");
        else root.classList.add("dark");
        setDarkMode(value => !value);
    }

    return (
        <header className="w-full flex justify-between items-center gap-4 p-4 bg-[#e0d3ed80] dark:bg-[#12111380] backdrop-blur-sm border-b border-b-[#07070830] dark:border-b-[#F1E6FD30]">
            <Link to="/" className="flex gap-4 items-center font-bold text-xl text-mauve-975 dark:text-mauve-dark-975">
                <LogoCubos className="w-40 h-9 text-mauve-975 dark:text-mauve-dark-975" /> Movies
            </Link>
            <button onClick={handleToggleDarkMode} className="w-16 h-12 bg-[#B744F714] flex justify-center items-center rounded-sm">
                {darkMode ? <IconSun className="text-mauve-975 dark:text-mauve-dark-975" /> : <IconMoon className="text-mauve-975 dark:text-mauve-dark-975" />}
            </button>
        </header>
    );
}