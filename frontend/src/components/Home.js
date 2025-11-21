import React,{useState,useEffect} from "react";
import banner1 from "../assets/images/banner1.webp"
import banner2 from "../assets/images/banner2.webp"
import banner3 from "../assets/images/banner3.webp"
import banner4 from "../assets/images/banner4.webp"
import "./stylesheet.css"
import "./mobilesheet.css"
const Home = () => (
  <section id="home" data-aos="zoom-in">
         {/* <!-- Swiper --> */}
            <div className="swiper mySwiperHome">
                <div className="swiper-wrapper">

                    <div className="swiper-slide">
                        <img src={banner1} alt="Wedding Image" loading="lazy"  style={{filter:"brightness(1)"}} />
                        <div className="overlay"></div>
                        <div className="caption">

                            <p> Bringing you natural Freshness and excellence with every product. Taste the trust today</p>
                        </div>
                    </div>

                    <div className="swiper-slide">
                        <img src={banner2} alt="Haldi Image" loading="lazy" style={{filter:"brightness(1)"}}/>
                        <div className="overlay"></div>
                        <div className="caption">

                            <p>Trusted for premium-quality dates, nuts, and dry fruits</p>
                        </div>
                    </div>

                    <div className="swiper-slide">
                        <img src={banner3} alt="Dinner Decoration Image"
                            loading="lazy" style={{filter:"brightness(1)"}}/>
                        <div className="overlay"></div>
                        <div className="caption">

                            <p>Taste the Trust, Shop the Best</p>
                        </div>
                    </div>

                    <div className="swiper-slide">
                        <img src={banner4}
                            loading="lazy" style={{filter:"brightness(1)"}}/>
                        <div className="overlay"></div>
                        <div className="caption">

                            <p>Experience the true taste of nature with Thekkady spices where quality and tradition come together.</p>
                        </div>
                    </div>



                </div>
            </div>

  </section>
);

export default Home