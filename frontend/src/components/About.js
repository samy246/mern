import React from "react";
import own1 from "../assets/images/own1.webp"
import own2 from "../assets/images/own2.webp"
const About = () => (
  <section id="aboutUs" data-aos="fade-up">
    <div className="about-head">
      <h2 className="heading">About Us</h2>
      <p className="sub-head">
      At <strong>Thekkady Spices</strong>, we bring you the pure essence of nature — offering premium-quality dates, dry fruits, spices, and oils that are 100% natural, fresh, and hygienically processed.
Sourced from trusted farms and authentic origins, every product is carefully selected, cleaned, and packed to retain its original aroma, flavor, and nutritional value.

Our mission is to deliver the true taste of purity straight from nature to your home. Whether it’s the richness of handpicked spices, the sweetness of exotic dates, or the wholesome goodness of nuts and oils, we ensure quality and freshness in every pack.
<br/>
At <strong>Thekkady Spices</strong>, purity isn’t just a promise — it’s our tradition.
      </p>
    </div>

    <div className="about-container">
      <div className="left-about">
        <img
          src={own1}
          alt="About Chef"
          loading="lazy"
          style={{objectFit:"cover",height:"207px"}}
        />
      </div>
      <div className="right-about">
        <p>
          At<strong>'Thekkady spices'</strong>, we are dedicated to bringing you
          the finest spices, dry fruits, nuts, seeds, and masalas, all grown and
          sourced directly from our own estate. With a commitment to quality and
          authenticity, we carefully cultivate, clean, and package our products
          to preserve their natural flavor, aroma, and freshness.
        </p>
      </div>
    </div>

    {/* total right */}
    <div className="about-container">
      <div className="right-about">
        <p>
        From the fields to your kitchen, we personally oversee every stage of the process, ensuring the highest standards of purity, hygiene, and excellence. Whether it’s the rich aroma of our spices, the wholesome goodness of our dry fruits and nuts, or the perfect blend of our masalas, we guarantee premium quality in every pack.
        </p>
      </div>
      <div className="left-about">
        <img
          src={own2}
          alt="About Chef"
          loading="lazy"
        />
      </div>
    </div>
  </section>
);

export default About;
