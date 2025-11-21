// Menu.jsx
import React, { useState, useEffect } from "react";
import "./stylesheet.css";
// import { cardomon,cin } from "../assets";
import newdpr1 from "../assets/images/newdpr1.webp"
import newdpr2 from "../assets/images/newdpr2.webp"
import newdpr3 from "../assets/images/newdpr3.webp"
import newdpr4 from "../assets/images/newdpr4.webp"
import newdpr5 from "../assets/images/newdpr5.webp"
import newdpr6 from "../assets/images/newdpr6.webp"
import newdpr7 from "../assets/images/newdpr7.webp"
import newdpr8 from "../assets/images/newdpr8.webp"
import newdpr9 from "../assets/images/newdpr9.webp"
const Menu = () => {
    const [showPopup, setShowPopup] = useState(false);
  const cards = [
    {
      id: 1,
      image: newdpr1,
      title: "Spices Varieties ",
      subtitle: "Green cardamom pods"
    },
    {
      id: 2,
      image:newdpr2,
      title: "Masala Varieties ",
      subtitle: "Premium Ceylon cinnamon sticks"
    },
    {
      id: 3,
      image: newdpr3,
      title: "Nuts Varieties ",
      subtitle: "Aromatic whole cloves"
    },
    {
      id: 4,
      image: newdpr4,
      title: "Dry Fruits Varieties",
      subtitle: "Organic turmeric powder"
    },
    {
      id: 5,
      image: newdpr5,
      title: "Seeds Varieties",
      subtitle: "Premium quality saffron"
    },
    {
      id: 6,
      image: newdpr6,
      title: "Kerala Tea Varieties ",
      subtitle: "Premium quality Coffee Powder"
    },
      {
      id: 7,
      image: newdpr7,
      title: "Kerala Coffee Varieties",
      subtitle: "Premium quality Almond"
    },
      {
      id: 8,
      image: newdpr8,
      title: "Kerala Natural Honey ",
      subtitle: "Premium quality Olive"
    },
      {
      id: 9,
      image: newdpr9,
      title: "Kerala  Wine Non – Alcohol (Red and Black  ) ",
      subtitle: "Premium quality Aloe vera gel"
    },
  ];
  const handleCardClick = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500); // Hide after 2.5s
  };
  return (
    <section id="our-menu">
      <h2 className="heading">Our Products</h2>
      <div className="cards-grid" data-aos="zoom-in">
        {cards.map((card) => (
          <div key={card.id} className="card"   onClick={handleCardClick}>
            <div className="card-image-wrapper">
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
                className="card-image"
              />
              <div className="card-overlay"></div>
            </div>

            <div className="card-content">
              <h1 className="card-title">{card.title}</h1>
              {/* <span className="card-subtitle">{card.subtitle}</span> */}
            </div>
          </div>
        ))}
      </div>
            {showPopup && (
        <div className="popup-message">
          <p>Please click WhatsApp icon or use Contact-Us for Further Enquires  <i className="fa-brands fa-whatsapp"></i></p>
        </div>
      )}
    </section>
  );
};

export default Menu;