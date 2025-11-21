import React,{useState,useEffect} from "react";
import logo from "../assets/images/logo.webp"
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <header>
      <nav id="navbar">
        <div className="logo">
          <img src={logo} alt="Chef Logo" loading="lazy" />

        </div>
        <div className="right-nav">
             <button
            className="checkBtn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <i className="fa-solid fa-bars-staggered"></i>
          </button>
          {/* <input
            type="checkbox"
            id="check"
            checked={menuOpen}
            onChange={() => setMenuOpen(!menuOpen)}
          />
          <label htmlFor="check" className="checkBtn" onClick={() => setMenuOpen(!menuOpen)}>
            <i className="fa-solid fa-bars-staggered"></i>
          </label> */}
          <ul className={`h-list ${menuOpen ? 'active' : ''}`}>
            <li><a onClick={() => scrollToSection('home')}>Home</a></li>
            <li><a onClick={() => scrollToSection('aboutUs')}>About Us</a></li>
            <li><a onClick={() => scrollToSection('our-menu')}>Our Products</a></li>
            <li><a onClick={() => scrollToSection('chef')}>Products</a></li>
            <li><a onClick={() => scrollToSection('services')}>Services</a></li>
            <li><a onClick={() => scrollToSection('contactUs')}>Contact Us</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header