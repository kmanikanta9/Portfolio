import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
  const navRef = useRef();
  const navLinkRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  };

  // Smooth scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80; // navbar height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Update URL hash without jump
      if (history.pushState) {
        history.pushState(null, null, `#${id}`);
      } else {
        window.location.hash = `#${id}`;
      }
    }
    closeMenu();
  };

  // Add navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navRef.current.classList.add(
          'bg-white', 'bg-opacity-50', 'backdrop-blur-lg', 'shadow-sm',
          'dark:bg-darkTheme', 'dark:shadow-white/20'
        );
        navLinkRef.current.classList.remove(
          'bg-white', 'shadow-sm', 'bg-opacity-50', 'dark:border', 'dark:border-white/30', 'dark:bg-transparent'
        );
      } else {
        navRef.current.classList.remove(
          'bg-white', 'bg-opacity-50', 'backdrop-blur-lg', 'shadow-sm',
          'dark:bg-darkTheme', 'dark:shadow-white/20'
        );
        navLinkRef.current.classList.add(
          'bg-white', 'shadow-sm', 'bg-opacity-50', 'dark:border', 'dark:border-white/30', 'dark:bg-transparent'
        );
      }
    };

    window.addEventListener('scroll', handleScroll);

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav ref={navRef} className="w-full fixed px-5 md:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 transition-all duration-300">
        <p
          className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white cursor-pointer"
          onClick={() => scrollToSection('home')}
        >
          Manikanta Kondakayala
        </p>

        {/* Desktop Navbar */}
        <ul ref={navLinkRef} className="hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 bg-white shadow-sm bg-opacity-50 font-Ovo dark:border dark:border-white/30 dark:bg-transparent">
          <li><button onClick={() => scrollToSection('home')} className="hover:text-gray-500 dark:hover:text-gray-300 transition">Home</button></li>
          <li><button onClick={() => scrollToSection('about')} className="hover:text-gray-500 dark:hover:text-gray-300 transition">About me</button></li>
          <li><button onClick={() => scrollToSection('skills')} className="hover:text-gray-500 dark:hover:text-gray-300 transition">Skills</button></li>
          <li><button onClick={() => scrollToSection('projects')} className="hover:text-gray-500 dark:hover:text-gray-300 transition">Projects</button></li>
          <li><button onClick={() => scrollToSection('contact')} className="hover:text-gray-500 dark:hover:text-gray-300 transition">Contact me</button></li>
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <button onClick={toggleTheme}>
            <img src="./assets/moon_icon.png" alt="" className="w-5 dark:hidden" />
            <img src="./assets/sun_icon.png" alt="" className="w-5 hidden dark:block" />
          </button>

          {/* Contact button */}
          <button onClick={() => scrollToSection('contact')} className="hidden lg:flex items-center gap-3 px-8 py-1.5 border border-gray-300 hover:bg-slate-100/70 dark:hover:bg-darkHover rounded-full ml-4 font-Ovo dark:border-white/30">
            Contact
            <img src="./assets/arrow-icon.png" alt="" className="w-3 dark:hidden" />
            <img src="./assets/arrow-icon-dark.png" alt="" className="w-3 hidden dark:block" />
          </button>

          {/* Mobile menu button */}
          <button className="block md:hidden ml-3" onClick={() => setMenuOpen(!menuOpen)}>
            <img src="./assets/menu-black.png" alt="" className="w-6 dark:hidden" />
            <img src="./assets/menu-white.png" alt="" className="w-6 hidden dark:block" />
          </button>
        </div>

        {/* Mobile menu */}
        <ul
          className={`flex md:hidden flex-col gap-4 py-20 px-10 fixed top-0 right-0 w-64 h-screen z-50 bg-rose-50 dark:bg-darkHover dark:text-white transform transition-transform duration-500 ${menuOpen ? 'translate-x-0' : 'translate-x-full'} rounded-l-xl`}
        >
          <div className="absolute right-6 top-6 cursor-pointer" onClick={closeMenu}>
            <img src="./assets/close-black.png" alt="" className="w-5 dark:hidden" />
            <img src="./assets/close-white.png" alt="" className="w-5 hidden dark:block" />
          </div>

          <li><button onClick={() => scrollToSection('home')}>Home</button></li>
          <li><button onClick={() => scrollToSection('about')}>About me</button></li>
          <li><button onClick={() => scrollToSection('skills')}>Skills</button></li>
          <li><button onClick={() => scrollToSection('projects')}>Projects</button></li>
          <li><button onClick={() => scrollToSection('contact')}>Contact me</button></li>
        </ul>
      </nav>
    </>
  );
}
