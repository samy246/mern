
import React, { useEffect, useState } from 'react';

// Styles Component
const StylesComponent = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Freehand&family=Poppins:wght@400;500;600&family=Ubuntu:wght@400;500;700&display=swap');

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        scroll-behavior: smooth;
      }

      html, body, #root {
        overflow-x: hidden;
        width: 100vw;
      }
.packageservices{
text-align:center;
}
      #navbar {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .right-nav {
        margin-right: 50px;
      }

      .h-list {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .h-list li {
        list-style: none;
        margin: 15px;
        border-radius: 8px;
        padding: 6px 10px;
        transition: all 0.3s linear;
      }

      .h-list li a {
        text-decoration: none;
        font-family: 'Ubuntu', sans-serif;
        color: black;
        cursor: pointer;
        font-size: 1.3rem;
      }

      .h-list li:hover {
        transform: scale(1.1);
        border-bottom: 2px solid rgb(10, 173, 10);
        background-color: #fff;
      }

      .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-left: 120px;
      }

      .logo h3 {
        font-family: 'Freehand', sans-serif;
        color: goldenrod;
        text-align: center;
        font-size: 1.7rem;
      }

      .logo img {
        height: 100px;
      }

      #check {
        display: none;
      }

      .checkBtn {
        display: none;
        cursor: pointer;
        font-size: 30px;
        float: right;
        color: #ffd07e;
        line-height: 80px;
        background: transparent;
        border: transparent;
      }

      #home {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: rgb(235 232 229);
      }

      .left-home .col-red p {
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        background-color: #ffd07e;
        display: inline;
        padding: 5px;
        border-radius: 8px;
        color: rgb(129, 93, 0);
      }

      .left-home h1 {
        font-family: 'Poppins', sans-serif;
        font-size: 40px;
        margin-bottom: 10px;
      }

      .left-home .h-para {
        font-family: 'Ubuntu', sans-serif;
        margin-bottom: 10px;
        font-weight: 500;
        font-size: 17px;
      }

      #Btn {
        padding: 10px 15px;
        border-radius: 15rem;
        outline: none;
        border: none;
        font-size: 15px;
        margin-top: 10px;
        background-color: #ffd07e;
        border: 1px solid #ffd07e;
        text-transform: uppercase;
        font-family: 'Ubuntu', sans-serif;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.4s linear;
      }

      #Btn:hover {
        transform: scale(1.1);
        background: transparent;
        color: black;
        border: 1px solid #ffd07e;
      }

      .right-home img {
        height: 18rem;
        mix-blend-mode: multiply;
        cursor: pointer;
        transition: all 0.4s linear;
      }

      .right-home img:hover {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
        transform: scale(1.1);
      }

      #aboutUs {
        margin-top: 20px;
        padding: 0 80px;
      }

      .about-head p strong {
        color: goldenrod;
        font-size: 17px;
      }

      .about-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 40px;
      }

      .left-about {
        flex-basis: 30%;
      }

      .left-about img {
        width: 23rem;
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }

      .right-about {
        flex-basis: 70%;
        margin-left: 80px;
      }

      .right-about p {
        font-family: 'Poppins', sans-serif;
        font-size: 17px;
        letter-spacing: 1px;
        line-height: 32px;
        font-weight: 400;
      }

      #our-menu {
        margin-top: 20px;
        padding-bottom: 20px;
      }

      .menu-img {
        margin-top: 20px;
      }

      .menu-img img {
        width: 62rem;
        margin: 0 auto;
        display: block;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        cursor: pointer;
      }

      #chef {
        margin-top: 20px;
      }

      .chef-container {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(235 232 229);
      }

      .chef-sub-contain {
        height: 80vh;
        width: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 40px 0;
        padding: 0 20px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      }

      .left-chef {
        flex-basis: 60%;
        padding: 50px;
      }

      .left-chef .col-red p {
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        background-color: #0aad0a;
        display: inline;
        padding: 6px 15px;
        color: white;
        text-transform: uppercase;
      }

      .left-chef h3 {
        font-family: 'Poppins', sans-serif;
        font-size: 40px;
        font-weight: 500;
        text-transform: uppercase;
        margin-top: 10px;
      }

      .left-chef hr {
        border: 2px solid #0aad0a;
        margin: 20px 0;
        width: 50%;
      }

      .left-chef p {
        font-family: 'Poppins', sans-serif;
        font-size: 17px;
        letter-spacing: 1px;
        line-height: 30px;
        font-weight: 400;
      }

      .right-chef {
        flex-basis: 40%;
        background-color: #fff;
      }

      .right-chef .carousel-image {
        width: 30rem;
        aspect-ratio: 2/2;
        object-fit: contain;
      }

      #services {
        margin: 40px 0;
      }

      .partners {
        background-color: whitesmoke;
        margin-top: 20px;
        padding: 10px 0;
      }

      .partner-item {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;
        margin: 30px 0;
      }

      .partner-item img {
        width: 13rem;
        cursor: pointer;
        border-radius: 6px;
        transition: all 0.4s linear;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      }

      .partner-item img:hover {
        transform: scale(1.1);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }

      .partners-abt {
        margin-top: 50px;
      }

      .partners-abt h4 {
        text-align: center;
        font-family: 'Poppins', sans-serif;
        font-size: 22px;
        color: goldenrod;
        font-weight: 500;
      }

      .partner-cont {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
      }

      .left-part {
        padding: 0 20px;
        width: 20%;
      }

      .left-part .carousel-image {
        width: 15rem;
        aspect-ratio: 2/2;
        object-fit: contain;
      }

      .right-part {
        width: 50%;
      }

      .right-part p {
        font-size: 20px;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
      }

      .partBtn {
        margin: 20px 0;
        padding: 8px 12px;
        width: 140px;
        text-transform: uppercase;
        border: none;
        outline: none;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        border-radius: 5px;
        background-color: #0aad0a;
        color:white;
        cursor: pointer;
        transition: all 0.4s ease-in;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      }

      .partBtn:hover {
        transform: scale(1.1);
      }

      .contact-container {
        padding: 10px 0;
        background-color: rgb(235 232 229);
      }

      .contact-box {
        width: 63%;
        margin: 50px auto;
        font-family: 'Poppins', sans-serif;
        padding-left: 40px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        background-color: #fff;
        border-radius: 10px;
      }

      .contact-box h2 {
        font-size: 25px;
        padding-top: 10px;
        font-weight: 600;
        color: goldenrod;
      }

      .contact-box p {
        color: rgb(48, 48, 48);
        margin-bottom: 50px;
      }

      .input-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
      }

      .input-row .input-group {
        flex-basis: 45%;
      }

      input,
      .category {
        width: 90%;
        border: none;
        border-bottom: 1px solid #ccc;
        outline: none;
        padding-bottom: 5px;
        letter-spacing: 1px;
      }

      label {
        margin-bottom: 6px;
        margin-right: 22px;
        color: rgb(255, 183, 2);
        font-size: 18px;
      }

      .input-row .input-group textarea {
        border: none;
        outline: none;
        border-bottom: 1px solid #ccc;
      }

      footer {
        background-color: rgb(32, 30, 30);
      }

      .footer-section {
        width: 100%;
        color: #fff;
        display: flex;
        justify-content: space-around;
        padding: 1rem 0;
        flex-wrap: wrap;
        font-family: 'Ubuntu', sans-serif;
      }

      .footer-item {
        margin: 1rem;
      }

      .footer-item h2 {
        margin-bottom: 1.5rem;
        position: relative;
        font-weight: 400;
      }

      .footer-item h2::after {
        content: '';
        width: 5rem;
        height: 0.2rem;
        background: #0aad0a;
        position: absolute;
        top: 2.5rem;
        left: 0;
      }

      .footer-item p {
        transition: all 0.2s linear;
      }

      .footer-item p:hover {
        transform: translateX(10px);
      }

      .footer-item a {
        color: #fff;
        text-decoration: none;
        cursor: pointer;
      }

      .footer-item a:hover {
        color: #ffd07e;
      }

      .social ul {
        display: flex;
        justify-content: space-between;
        padding-left: 0;
      }

      .social ul li {
        list-style: none;
        font-size: 1.6rem;
        transition: all 0.3s linear;
      }

      .social ul li {
        color: #fff;
        text-decoration: none;
      }

      .social ul li:hover {
        transform: scale(1.2);
      }

      footer .footerPara {
        text-align: center;
        color: #ffd07e;
        margin-bottom: 0;
      }

      #scroll-on-top {
        background-color: #0aad0a;
        color: #ffffff;
        padding: 9px;
        border-radius: 9px;
        width: 35px;
        height: 35px;
        position: fixed;
        bottom: 1rem;
        right: 4%;
        font-size: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 200;
        cursor: pointer;
      }
           #scroll-on-top1 {
        background-color: #0aad0a;
        color: #ffffff;
        padding: 9px;
        border-radius: 25px;
        width: 50px;
        height: 50px;
        position: fixed;
        bottom: 7rem;
        right: 4%;
        font-size: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 200;
        cursor: pointer;
      }

      .heading {
        text-align: center;
        color: goldenrod;
        font-size: 35px;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        text-transform: uppercase;
        margin-bottom: 10px;
      }

      .sub-head {
        text-align: center;
        color: black;
        font-size: 16px;
        font-family: 'Poppins', sans-serif;
        letter-spacing: 0.8px;
      }

      /* Mobile Styles */
      .logo {
        margin-left: 35px;
      }

      .right-nav {
        margin-right: 35px;
      }

      .h-list li {
        padding: 5px;
        margin: 10px;
      }

      .right-about {
        margin-left: 35px;
      }

      .chef-sub-contain {
        height:auto;
      }

      .left-chef {
        padding: 10px;
      }

      .left-chef p {
        line-height: normal;
      }

      .left-part {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30%;
      }

      .right-part p {
        font-size: 18px;
        font-weight: normal;
      }

      .contact-box {
        width: 80%;
      }

      @media screen and (max-width: 769px) {
          .mySwiperHome .caption{
        font-size: 24px;
    }
           .mySwiperServices .swiper-slide {
        width: 185px !important;
        height: 220px;
    }
        .h-list {
          width: 100%;
          height: 70vh;
          background-color: #ffd07e;
          color: black;
          text-align: center;
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 9.5rem;
          left: 100%;
          transition: all 1s ease-in;
        }

        .h-list.active {
          left: 0%;
        }

        #check {
          display: none;
        }

        .checkBtn {
          display: block;
          margin-right: 30px;
        }

        #navbar {
          position: relative;
          z-index: 1;
        }

        .logo {
          margin-left: 50px;
        }

        #home {
          margin-top: 10px;
          flex-direction: column;
          text-align: center;
          padding: 20px 20px 0 20px;
        }

        .left-home h1 {
          font-size: 30px;
          margin: 10px 0px;
        }

        .left-home .h-para {
          font-size: 14px;
        }

        #Btn {
          font-size: 12px;
        }

        .right-home img {
          height: auto;
          max-width: 50%;
          margin-top: 20px;
        }

        .right-home img:hover {
          transform: scale(1);
          box-shadow: none;
        }

        #aboutUs {
          padding: 0 20px;
        }

        .about-container {
          flex-direction: column;
          text-align: center;
        }

        .left-about {
          margin-bottom: 20px;
        }

        .left-about img {
          //  width: 100%;
        }

        .right-about {
          margin-left: 0;
        }

        .right-about p {
          padding: 10px;
        }

        #our-menu {
          padding: 0 20px;
        }

        .menu-img img {
          width: 100%;
        }

        .chef-sub-contain {
          flex-direction: column;
          height: auto;
        }

        .left-chef {
          flex-basis: 100%;
          padding: 20px;
          text-align: center;
        }

        .left-chef hr {
          margin: 0 auto;
          display: block;
          margin-bottom: 20px;
        }

        .right-chef {
          flex-basis: 100%;
        }

        .right-chef .carousel-image {
          width: 100%;
          margin-bottom: 20px;
        }

        .partner-item img {
          width: 100%;
          max-width: 160px;
          margin: 10px;
        }

        .partner-item {
          justify-content: center;
          flex-direction:column;
        }

        .partner-cont {
          flex-direction: column;
          text-align: center;
        }

        .left-part {
          border: none;
          width: 50%;
          padding: 0;
        }

        .left-part .carousel-image {
          margin: 0 auto;
          margin-bottom: 10px;
        }

        .right-part {
          width: 80%;
        }

        .right-part p {
          font-size: 16px;
        }

        .contact-box {
          width: 85%;
          margin: 50px auto;
          padding-left: 40px;
        }

        .input-row {
          flex-direction: row;
          justify-content: space-between;
        }

        .input-row .input-group {
          flex-basis: 45%;
        }

        .heading {
          font-size: 30px;
        }
      }
@media screen and (max-width: 426px) {

    /* HOME SECTION */
    .mySwiperHome .caption {
        font-size: 16px;
        padding: 10px;
    }
  }
      @media screen and (max-width: 475px) {
          .mySwiperHome .caption {
        width: 100%;
        font-size: 18px;
        padding: 12px;
    }
   .mySwiperServices .swiper-slide {
        width: 192px;
        flex-shrink: 0;
    }
        .logo img {
          height: 75px;
        }

        .logo h3 {
          font-size: 1.5rem;
        }

        #home {
          margin-top: 15px;
        }

        .left-home h1 {
          margin-top: 20px;
          font-size: 25px;
        }

        .heading {
          font-size: 25px;
          margin-bottom: 15px;
        }

        .about-head p strong {
          font-size: 15px;
        }

        .sub-head {
          font-size: 14px;
          padding: 10px;
        }

        .right-about p {
          font-size: 14px;
          line-height: 25px;
        }

        #chef {
          margin-top: 30px;
        }

        .left-chef h3 {
          font-size: 25px;
        }

        .left-chef p {
          font-size: 15px;
        }

        .partner-item img {
          width: 140px;
        }

        .partners-abt h4 {
          font-size: 18px;
          margin: 10px;
        }

        .left-part .carousel-image {
          height: 100px;
        }

        .partBtn {
          width: 110px;
          padding: 8px;
          font-size: 13px;
        }

        .social ul {
          justify-content: space-evenly;
        }

        .footer-item h2 {
          font-size: 22px;
        }

        footer .footerPara {
          font-size: 13px;
        }

        .input-row {
          flex-direction: column;
        }

        .input-group {
          margin: 10px 0px;
        }

        .footer-section {
          flex-wrap: wrap;
        }
      }
@media screen and (max-width: 321px) {

    /* HOME SECTION */
    .mySwiperHome .caption {
        font-size: 14px;
        padding: 8px;
    }
  }
      @media screen and (max-width: 376px) {

        .h-list li a {
          font-size: 1.2rem;
        }

        .logo img {
          height: 60px;
        }

        .logo h3 {
          font-size: 1.2rem;
        }

        .checkBtn {
          font-size: 25px;
        }

        .left-home .col-red p {
          font-size: 14px;
        }

        .left-home h1 {
          font-size: 18px;
        }

        .left-home .h-para {
          font-size: 12px;
        }

        .heading {
          font-size: 22px;
          margin-bottom: 10px;
        }

        .chef-sub-contain {
          padding: 0px;
        }

        .left-chef {
          padding: 10px;
        }

        .left-chef h3 {
          font-size: 18px;
        }

        .left-chef p {
          font-size: 12px;
        }

        .partner-item img {
          width: 110px;
        }

        .right-part p {
          font-size: 14px;
          margin: 1rem 0;
        }

        .footer-item h2 {
          font-size: 18px;
        }

        .footer-item h2::after {
          top: 2rem;
        }

        .footer-item a {
          font-size: 14px;
        }

        #scroll-on-top {
          bottom: 4rem;
          right: 5%;
          height: 32px;
          width: 32px;
        }
            #scroll-on-top1 {

          right: 5%;

        }

        .contact-box h2 {
          font-size: 20px;
        }

        .contact-box p {
          font-size: 14px;
          padding-right: 15px;
        }

        label {
          font-size: 16px;
        }
      }
        @media screen and (max-width: 1024px) {



    /* HOME SECTION */
    .mySwiperHome .caption {
        width: 80%;
        font-size: 26px;
    }
}

@media screen and (max-width: 575px) {

    /* HOME SECTION */
    .mySwiperHome .caption {
        width: 90%;
        font-size: 22px;
    }





    .mySwiperServices .card-icon a {
        width: 32px;
        height: 32px;
        font-size: 16px;
    }

    /* TESTIMONIAL SECTION */
    .mySwiperTestinomal .testimonial-card {
        text-align: center;
    }

    .mySwiperTestinomal .testimonial-content {
        padding: 0 15px;
    }



}
     /*need to remov others swiper*/
/* ----- GOOGLE FONTS LINK ----- */
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Playfair+Display+SC:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Quicksand:wght@300..700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
    max-width: 100%;
}

html,
body {
    width: 100%;
    overflow-x: hidden !important;
}

/* ---------- HEADER SECTION ----------- */
#navbar {
    display: flex;
    justify-content: space-around;
    align-content: center;
    line-height: 3em;
    padding-top: 10px;
    background-color: white;
}

.nav-left img {
    width: 170px;
    cursor: pointer;
}

.nav-right {
    display: flex;
    justify-content: center;
    align-items: center;
}

.list {
    display: flex;
    margin-top: 10px;
    padding-left: 0;
}

.list li {
    list-style: none;
    transition: ease-in-out 0.3s;
}

.list li a {
    padding: 0px 15px;
    font-size: 1.2rem;
    color: goldenrod;
    cursor: pointer;
    text-decoration: none;
    font-family: "Cinzel", sans-serif;
    font-weight: 600;
}

.list li:hover {
    transform: translateY(-5px);
}

.list li a:hover {
    color: black;
}

#check {
    display: none;
}

.CheckBtn {
    display: none;
    cursor: pointer;
    font-size: 30px;
    float: right;
    color: gold;
    line-height: 80px;
}

/* ---------- HOME SECTION ----------- */
#home {
    height: 82vh;
    width: 100%;
    padding: 10px 20px 20px;
    background-color: white;
    position: relative;
    z-index: 0;
    overflow: hidden;
}

.mySwiperHome {
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
}

.mySwiperHome .swiper-slide {
    position: relative;
    overflow: hidden;
}

.mySwiperHome .swiper-slide img {
    width: 110%;
    height: 110%;
    object-fit: cover;
    animation: kenburns 12s ease-in-out infinite;
}

/* Ken Burns Effect Animation */
@keyframes kenburns {
    0% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}

.mySwiperHome .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background: rgba(0, 0, 0, 0.5);
    z-index: 1;
}

.mySwiperHome .caption {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    padding: 12px 24px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    opacity: 0;
    z-index: 2;
    transition: opacity 1s ease, transform 1s ease;
    font-family: "Cinzel", sans-serif;
}

.mySwiperHome .swiper-slide-active .caption {
    opacity: 1;
    transform: translate(-50%, -60%);
}


/* ---------- ABOUTUS SECTION ----------- */
#wedding-section {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 60px 10%;
    gap: 40px;

    font-family: "Nunito", sans-serif;
    /* color: #fff; */
    color: #000;

    /* background-image: url("../IMG/Abt-Bg.jpg"); */
    /* background-image: url("../IMG/Light-yellow-BG.jpg"); */
    background-position: center;
    background-size: cover;
    z-index: -1;
}

.text-content {
    flex: 1 1 450px;
    z-index: 2;
}

.text-content h3 {
    font-style: italic;
    font-size: 1.1rem;
    font-family: "Cinzel", sans-serif;
}

.text-content h1 {
    font-size: 3rem;
    font-weight: 700;
    letter-spacing: 2px;
    margin: 10px 0;
    font-family: "Nunito", sans-serif;
    color: goldenrod;
}

.text-content h2 {
    color: goldenrod;
    font-size: 2rem;
    margin-bottom: 15px;
    font-family: "Cinzel", sans-serif;
}

.text-content p {
    font-size: 1rem;
    line-height: 1.6;
    max-width: 600px;
}

.button-group {
    margin-top: 30px;
    display: flex;
    gap: 20px;
    z-index: 5;
}

.button-group button {
    padding: 12px 25px;
    font-size: 0.95rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.btn-details {
    background-color: #fdf1e8;
    border: 1px solid #f4d7c5;
    transition: 0.3s ease-in;
}

.btn-details:hover {
    transform: scale(1.1);
}

.btn-details a {
    text-decoration: none;
    color: black;
}

.image-container {
    flex: 1 1 350px;
    position: relative;
    max-width: 450px;
    z-index: 2;
}

.main-img {
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
    mix-blend-mode: multiply;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    cursor: pointer;
}

/* ---------- OUR-SERVICE SECTION ----------- */
#services {
    // height: 90vh;
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 50px;
    margin: 15px auto;
    flex-wrap: wrap;
    color: #000;
    background-image: url("../IMG/62624.jpg");
    background-position: center;
    background-size: cover;
    z-index: -1;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.s-container {
    /* max-width: 1000px; */
    padding: 48px 24px;
}

.top-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    gap: 40px;
    padding: 5px;
}

.left-text {
    max-width: 400px;
    flex: 1 1 300px;
}

.left-text p {
    font-size: 18px;
    margin: 0 0 8px 0;
    color: goldenrod;
    font-weight: 700;
    font-family: "Nunito", sans-serif;
}

.left-text p span {
    color: #a52a2a;
    margin-right: 4px;
}

.left-text h1 {
    font-size: 56px;
    line-height: 1.1;
    margin: 0;
    font-family: "Cinzel", sans-serif;
}

.right-text {
    max-width: 400px;
    flex: 1 1 250px;
    line-height: 1.4;
    color: #4a3a36;
    text-align: right;
}

.right-text p {
    margin: 0 0 16px 0;
    font-family: "Nunito", sans-serif;
    font-weight: 500;
}

.right-text .links {
    display: flex;
    justify-content: flex-end;
    gap: 32px;
    font-weight: 600;
}

.right-text .links a {
    color: #b8860b;
    text-decoration: none;
    font-size: 15px;
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    transition: text-decoration 0.3s ease;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
}

.right-text .links a:hover {
    text-decoration: underline;
    color: gold;
}

.right-text .links a i {
    font-size: 10px;
}

.mySwiperServices {
    margin-top: 48px;
    padding-bottom: 24px;
}

.mySwiperServices .swiper-wrapper {
    display: flex;
    align-items: stretch;
    padding: 10px;
}

.mySwiperServices .swiper-slide {
    background: transparent;
    overflow: hidden;
    height: 250px;
    width: auto;
    max-width: 250px !important;
    flex-shrink: 0;
    cursor: pointer;
    user-select: none;
    margin-bottom: 10px;
    transition: transform 0.3s ease;
    border-radius: 16px;
}

.mySwiperServices .swiper-slide:hover {
    transform: scale(1.05);
}

.mySwiperServices .swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* border-radius: 16px; */
    border-radius: 15% 85% 11% 89% / 100% 0% 100% 0%;
    display: block;
    filter: brightness(0.7);
    transition: filter 0.3s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.mySwiperServices .swiper-slide img:hover {
    filter: brightness(0.5);
}

.mySwiperServices .card-label {
    position: absolute;
    bottom: 16px;
    left: 16px;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    width: 100%;
    line-height: 1.2;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.6);
    font-family: "Nunito", sans-serif;
}

.mySwiperServices .card-icon a {
    position: absolute;
    bottom: 16px;
    right: 16px;
    text-decoration: none;
    background-color: #2a0000;
    color: white;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    transition: background-color 0.3s ease;
}

.mySwiperServices .card-icon a:hover {
    background-color: #b8860b;
}

/* ------ TESTINOMAL SECTION IS HERE----- --> */
#testimonial-section {
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    background-color: #f3f3f3;

    padding: 60px 20px;
    background: linear-gradient(rgba(255, 126, 43, 0.8), rgba(255, 126, 43, 0.8)), url('./IMG/') center/cover;
    display: flex;
    justify-content: center;
    border: 2px solid red;
}

.testimonial-container {
    background: white;
    padding: 30px;
    border-radius: 10px;
    max-width: 90%;
    width: 100%;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border: 2px solid blue;
}

.testimonial-container h2 {
    font-size: 28px;
    margin-bottom: 5px;
}

.sub-title {
    font-size: 14px;
    color: #666;
    margin-bottom: 30px;
}

.mySwiperTestinomal {
    padding-bottom: 50px;
    border: 2px solid purple;
}

.mySwiperTestinomal .testimonial-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid yellow;
}

.mySwiperTestinomal .image-container {
    position: relative;
    width: 140px;
    height: 140px;
    margin-bottom: 20px;
    border: 2px solid greenyellow;
}

.mySwiperTestinomal .image-container img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    position: relative;
    z-index: 2;
}

.mySwiperTestinomal .circle-bg {
    background-color: #ff7e2b;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    position: absolute;
    top: -15px;
    left: -15px;
    z-index: 1;
}

.mySwiperTestinomal .testimonial-content {
    max-width: 500px;
    border: 2px solid cornflowerblue;
}

.mySwiperTestinomal .quote {
    font-style: italic;
    color: #555;
    margin-bottom: 15px;
    font-size: 15px;
}

.mySwiperTestinomal .name {
    font-weight: bold;
    color: #ff7e2b;
    margin-bottom: 3px;
}

.mySwiperTestinomal .role {
    font-size: 13px;
    color: #999;
}

/* Swiper Buttons */
.mySwiperTestinomal .swiper-button-next,
.mySwiperTestinomal .swiper-button-prev {
    background-color: #ff7e2b;
    padding: 20px;
    border-radius: 50%;
    color: #fff;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}

.mySwiperTestinomal.swiper-button-next::after,
.mySwiperTestinomal.swiper-button-prev::after {
    font-size: 16px;
}

/* Pagination */
.mySwiperTestinomal .swiper-pagination-bullet {
    background: #ccc;
    opacity: 1;
}

.mySwiperTestinomal .swiper-pagination-bullet-active {
    background: #ff7e2b;
}


/* ---------- FOOTER SECTION ----------- */
#footer {
    width: 100%;
    margin-top: 20px;
    padding-top: 10px;
    position: relative;
    bottom: 0;
}

.footer-section {
    width: 100%;
    background-color: rgb(32, 30, 30);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #fff;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 1rem 0;
}

.footer-item {
    margin: 1rem;
}

.footer-item h2 {
    margin-bottom: 2rem;
    position: relative;
}

.footer-item h2::after {
    content: '';
    width: 4rem;
    height: 0.2rem;
    background: #0aad0a;
    position: absolute;
    top: 2.5rem;
    left: 0;
}

.footer-item p {
    transition: all 0.2s linear;
    margin-bottom: 0.6rem;
}

.footer-item p:hover {
    transform: translateX(10px);
}

.footer-item a {
    cursor: pointer;
    color: #fff;
    text-decoration: none;
}

.footer-item a:hover {
    color: gold;
}

.footer-item ul {
    display: flex;
    justify-content: space-around;
}

.footer-item ul li {
    list-style: none;
}

.Social ul li {
    font-size: 1.5rem;
    transition: all .2s linear;
}

.Social ul li:hover {
    transform: scale(1.3);
    transition: all .2s linear;
}

.Social img {
    height: 100px;
    margin-top: 20px;
}

.footer-bottom {
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 0.875rem;
    background: #000;
    color: whitesmoke;
    padding: 10px;
}

.footer-bottom p span {
    color: gold;
    font-weight: 500;
}
    `;
    document.head.appendChild(style);

    // Add Font Awesome
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css';
    document.head.appendChild(fontAwesome);

    return () => {
      document.head.removeChild(style);
      document.head.removeChild(fontAwesome);
    };
  }, []);

  return null;
};
export default StylesComponent
