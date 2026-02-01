import { useState, useEffect } from 'react';
import reneson from '/reneson.png'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const links = [
  { name: "Home", href: "/" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "About", href: "/about" },
  { name: 'Contact', href: "#contact"}
];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 glass-nav transition-all duration-300 ${isScrolled ? 'py-0 shadow-sm' : 'py-1'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center">
            <img src={reneson} alt="" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#426369]">Reneson</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-10 text-sm font-medium text-gray-600">
          {links.map((item) => (
            <a key={item.name} href={item.href} className="hover:text-[#426369] transition-colors">{item.name}</a>
          ))}
        </div>

        <a href="#contact" className="bg-[#426369] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#354f54] transition-all shadow-lg shadow-teal-900/10">
          Schedule Call
        </a>
      </div>
    </nav>
  );
};

export default Navbar;