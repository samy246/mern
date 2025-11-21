import { useEffect } from "react";

const ScriptsLoader = () => {
  useEffect(() => {
    // AOS initialization
    if (window.AOS) {
      window.AOS.init({
        duration: 1000,
        once: false,
      });
    }
    // ✅ Initialize Swiper HOME
    if (window.Swiper) {
      // HOME Section Swiper
      new window.Swiper(".mySwiperHome", {
        loop: true,
        effect: "fade",
        fadeEffect: { crossFade: true },
        speed: 1500,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
      });




    }
    // Optional: Refresh AOS when DOM updates
    const refreshAOS = () => {
      if (window.AOS) window.AOS.refresh();
    };
    const interval = setInterval(refreshAOS, 1000);

    // Scroll on top function
    window.scrolltop = function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Contact form alert
    const contact = document.getElementById("contact-form");
    if (contact) {
      contact.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Sorry..! Request cannot be accepted due to some Technical Error");
      });
    }

    return () => clearInterval(interval); // cleanup
  }, []);

  return null; // nothing to render
};

export default ScriptsLoader;
