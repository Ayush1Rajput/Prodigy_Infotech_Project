import React from "react";
import "./Hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png";
import Slideshow from "../Slideshow/Slideshow";

const Hero = () => {
  return (
    <div className="hero">
      {/* <div className="slideshow-container">
        <Slideshow />
      </div> */}
      <div className="hero-content">
        <div className="hero-left">
          <h2>NEW ARRIVALS ONLY</h2>
          <div className="hand-hand-icon">
            <p>new</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>Collections</p>
          <p>for everyone </p>
          <div className="hero-latest-btn">
            <div>Latest Collection</div>
            <img src={arrow_icon} alt="arrow" />
          </div>
        </div>
        <div className="hero_right">
          <img src={hero_image} alt="hero_image" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
