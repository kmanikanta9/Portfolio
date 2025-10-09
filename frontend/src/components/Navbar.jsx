import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "/#top" },
  { name: "About me", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "My Work", href: "/#work" },
  { name: "Contact me", href: "/#contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.theme = newMode ? "dark" : "light";
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    // Dark mode on load
    const savedTheme = localStorage.theme;
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 px-5 lg:px-10 py-4 flex items-center justify-between transition-all ${
        isScrolled
          ? "bg-white bg-opacity-50 backdrop-blur-lg shadow-sm dark:bg-darkTheme dark:shadow-white/20"
          : ""
      }`}
    >
      {/* Logo */}
      <NavLink to="/">
        <p className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white">
          Manikanta Kondakayala
        </p>
      </NavLink>

      {/* Desktop nav links */}
      <ul className="hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-6 py-2 bg-white bg-opacity-50 shadow-sm font-Ovo dark:border dark:border-white/30 dark:bg-transparent">
        {navLinks.map((link) => (
          <li key={link.name}>
            <NavLink
              to={link.href}
              className={({ isActive }) =>
                `transition hover:text-gray-500 dark:hover:text-gray-300 ${
                  isActive ? "font-semibold" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Right buttons */}
      <div className="flex items-center gap-4">
        {/* Theme toggle */}
        <button onClick={toggleTheme}>
          <img
            src={darkMode ? "./assets/sun_icon.png" : "./assets/moon_icon.png"}
            alt="theme toggle"
            className="w-5"
          />
        </button>

        {/* Contact button */}
        <NavLink
          to="/#contact"
          className="hidden lg:flex items-center gap-3 px-6 py-2 border border-gray-300 hover:bg-slate-100/70 dark:hover:bg-darkHover rounded-full font-Ovo dark:border-white/30"
        >
          Contact
          <img
            src={darkMode ? "./assets/arrow-icon-dark.png" : "./assets/arrow-icon.png"}
            alt="arrow"
            className="w-3"
          />
        </NavLink>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden ml-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <img
            src={darkMode ? "./assets/menu-white.png" : "./assets/menu-black.png"}
            alt="menu"
            className="w-6"
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <ul className="flex md:hidden flex-col gap-4 py-20 px-8 fixed right-0 top-0 bottom-0 w-64 h-screen bg-rose-50 dark:bg-darkHover dark:text-white shadow-lg transition-transform z-50">
          <div
            className="absolute right-6 top-6 cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          >
            <img
              src={darkMode ? "./assets/close-white.png" : "./assets/close-black.png"}
              alt="close"
              className="w-5"
            />
          </div>
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 transition hover:text-gray-600 dark:hover:text-gray-200 ${
                    isActive ? "text-indigo-600 font-semibold" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
