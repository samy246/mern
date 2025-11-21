import React,{useState,useEffect} from "react";
// Footer Component
import './Footer.css';
const Footer = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const openParcelModal = () => {
    setIsModalOpen(true);

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Re-enable body scroll
    document.body.style.overflow = 'unset';
  };


  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer>
      <div className="footer-section"  data-aos="zoom-in">
        <div className="footer-item">
          <h2>Thekkady Spices</h2>
          <p>
            <a onClick={() => scrollToSection('home')}>Home</a>
          </p>
          <p>
            <a onClick={() => scrollToSection('aboutUs')}>About Us</a>
          </p>
          <p>
            <a onClick={() => scrollToSection('our-menu')}>Our Products</a>
          </p>
          <p>
            <a onClick={() => scrollToSection('chef')}>Products</a>
          </p>
          <p>
            <a onClick={() => scrollToSection('services')}>Services</a>
          </p>
        </div>
        {/* <div className="footer-item">
          <h2>Our Franchise</h2>
          <p>
            <a href="#">Delhi</a>
          </p>
          <p>
            <a href="#">Mumbai</a>
          </p>
          <p>
            <a href="#">Pune</a>
          </p>
          <p>
            <a href="#">Ahmedabad</a>
          </p>
          <p>
            <a href="#">Rajkot</a>
          </p>
        </div> */}
        <div className="footer-item">
          <h2 onClick={() => scrollToSection('services')}>Parcel Services</h2>
          <p>
            <a onClick={openParcelModal} style={{cursor: 'pointer'}}>
              Rathimeena Parcel Service
            </a>
          </p>
          <p>
            <a onClick={openParcelModal} style={{cursor: 'pointer'}}>
              MSS Parcel Service
            </a>
          </p>
          <p>
            <a onClick={openParcelModal} style={{cursor: 'pointer'}}>
              A1 Parcel Service
            </a>
          </p>
          {/* <p>
            <a onClick={() => scrollToSection('services')}>Rathimeena Parcel Service</a>
          </p>
          <p>
            <a onClick={() => scrollToSection('services')}>MSS Parcel Service</a>
          </p>
          <p>
            <a onClick={() => scrollToSection('services')}>A1 Parcel Service</a>
          </p> */}

        </div>
        <div className="footer-item social">
          <h2>Connect With Us</h2>
          <ul>
            {/* <li>
              <a href="#" target="_blank"
  rel="noopener noreferrer"  className="social-icon whatsapp">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </li> */}
            <li>
              <a href="https://www.instagram.com/thekkady__spices?igsh=MWl0bGU4OGprNWUwZA" target="_blank"
  rel="noopener noreferrer"   className="social-icon instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            {/* <li>
              <a href="#">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li> */}
            <li>
              <a href="https://www.facebook.com/profile.php?id=100008621850081&mibextid=ZbWKwL" target="_blank"
  rel="noopener noreferrer"  className="social-icon facebook">
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>
            {/* <li>
              <a href="#">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </li> */}
          </ul>
        </div>
      </div>
      <p className="footerPara">Copyright © Thekkady Spices 2025.All Right Reserved</p>
        <p className="footerPara">@Developed by <strong style={{color:"white"}}><a href="https://letsgametech.com/" target="_blank"
  rel="noopener noreferrer" style={{textDecoration:"none",color:"white"}}>LetsGameTech</a></strong></p>
        {/* Parcel Services Modal */}
      {isModalOpen && (
        <div className="parcel-modal-overlay" onClick={closeModal}>
          <div className="parcel-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="parcel-modal-close" onClick={closeModal}>
              ✕
            </button>

            <h1 className="parcel-modal-title">Parcel Services</h1>

            <div className="parcel-service-list">
              <div className="parcel-service-item">
                <i className="fa-solid fa-truck"></i>
                <span>Rathimeena Parcel Service</span>
              </div>

              <div className="parcel-service-item">
                <i className="fa-solid fa-truck"></i>
                <span>MSS Parcel Service</span>
              </div>

              <div className="parcel-service-item">
                <i className="fa-solid fa-truck"></i>
                <span>A1 Parcel Service</span>
              </div>
            </div>

            <div className="parcel-important-notice">
              Important: Loading & Packing Charges Mandatory – Rs.70.00
            </div>

            <div className="parcel-courier-section">
              <h2 className="parcel-courier-title">
                Professional Courier Door Delivery
              </h2>

              <div className="parcel-price-row">
                <span>0-1 kg per</span>
                <span className="parcel-price-green">Rs.30.00</span>
              </div>

              <div className="parcel-price-row">
                <span>More than 1 kg per</span>
                <span className="parcel-price-green">Rs.25.00</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer
