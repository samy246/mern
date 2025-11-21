import React,{useState,useEffect} from "react";
import Carousel from "./Carousel";
import homerightside from "../assets/images/homerightside.webp"
// Chef Component
const Chef = () => {
  const chefImages = [
    homerightside,
    homerightside,
    homerightside,
    homerightside,
  ];

  return (
    <section id="chef">
      <h2 className="heading">Products</h2>
      <div className="chef-container">
        <div className="chef-sub-contain" data-aos="fade-up">
          <div className="left-chef">
            <div className="col-red">
              <p>Preserve</p>
            </div>
            <h3>
            Our Premium Collection of Dry Fruits, Nuts & Seeds
            </h3>
            <hr />
            <p>

            <strong> Discover nature’s finest in every bite.</strong>
              <br />
            Indulge in our handpicked selection of premium-quality <strong> dry fruits, wholesome nuts,</strong> and <strong>nutrient-rich seeds</strong> — each chosen for exceptional <strong>freshness, flavor,</strong> and <strong>nutrition</strong>.
              <br />
            Whether you’re seeking a <strong>healthy everyday snack,</strong> a <strong>thoughtful gift,</strong> or a <strong>versatile ingredient </strong> to elevate your favorite recipes, our collection brings you <strong>pure, natural goodness</strong> — the way nature intended.
            </p>
          </div>

          <div className="right-chef">
            <Carousel images={chefImages} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chef