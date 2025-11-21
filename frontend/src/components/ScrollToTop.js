import React,{useState,useEffect} from "react";
// Scroll to Top Component
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    visible && (
      <div id="scroll-on-top" onClick={scrollToTop}>
        <span>
          <i className="fa-solid fa-arrow-up"></i>
        </span>
      </div>
    )
  );
};


export default ScrollToTop