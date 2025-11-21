// import React,{useState,useEffect} from "react";
// // Scroll to Top Component
// const Whatsapp = () => {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const toggleVisible = () => {
//       const scrolled = document.documentElement.scrollTop;
//       if (scrolled > 300) {
//         setVisible(true);
//       } else {
//         setVisible(false);
//       }
//     };

//     window.addEventListener('scroll', toggleVisible);
//     return () => window.removeEventListener('scroll', toggleVisible);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   return (
//     visible && (
//       <div id="scroll-on-top1" onClick={scrollToTop}>
//         <span>
//            <i className="fa-brands fa-whatsapp"></i>
//         </span>
//       </div>
//     )
//   );
// };


// export default Whatsapp
import React, { useState, useEffect, useRef } from "react";

const Whatsapp = () => {
  const [visible, setVisible] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;

        setVisible(true);
      if (scrolled ) {
        setVisible(true);
      } else {
        setVisible(false);
        setPopupOpen(false); // close popup if hidden
      }
    };

    window.addEventListener("scroll", toggleVisible);

    // Close popup if clicked outside
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", toggleVisible);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const numbers = [
    { label: "Number 1", number: "9080535414" },
    { label: "Number 2", number: "7200880021" }

  ];

  const openWhatsApp = (number) => {
    const message = encodeURIComponent("Hello  Thekkady Spices!.I saw Your Website");
    const url = `https://wa.me/${number}?text=${message}`;
    window.open(url, "_blank");
    setPopupOpen(false);
  };

  // if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "40px",
        right: "40px",
        zIndex: 1000,
      }}
      ref={popupRef}
    >
      {/* WhatsApp Icon */}
      <div
        onClick={() => setPopupOpen(!popupOpen)}
        // style={{
        //   backgroundColor: "#25d366",
        //   width: "50px",
        //   height: "50px",
        //   borderRadius: "50%",
        //   display: "flex",
        //   alignItems: "center",
        //   justifyContent: "center",
        //   cursor: "pointer",
        //   boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
        //   color: "white",
        //   fontSize: "24px",
        // }}
        title="Contact us on WhatsApp"
       id="scroll-on-top1"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </div>

      {/* Popup with numbers */}
      {popupOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "8rem",
            right: 0,
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            padding: "10px",
            width: "180px",
            fontSize: "14px",
            minWidth:"21rem"
          }}
        >
          <p style={{ margin: "0 0 8px 0", fontWeight: "bold" }}>
            Contact
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {numbers.map(({ label, number }) => (
              <li
                key={number}
                onClick={() => openWhatsApp(number)}
                style={{
                  padding: "8px",
                  borderBottom: "1px solid #ddd",
                  cursor: "pointer",
                  color: "#25d366",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") openWhatsApp(number);
                }}
                tabIndex={0}
                role="button"
                aria-label={`Open WhatsApp chat with ${label}`}
              >
                {/* {label}: */}
                 {number}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Whatsapp;
