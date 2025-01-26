import React, { useState, useEffect } from "react";
import "./Slideshow.css";

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [menu, setMenu] = useState("shop");

  const slides = [
    {
      content: (
        <div className="cont-box">
          <div className="txt txt1">
            <h1 style={{ color: "blue" }}>MEN'S</h1>
            <h1>FASHION</h1>
            <p>New & Fresh Collection</p>
            <button style={{ backgroundColor: "blue" }}>
              <a href="/mens">SHOP NOW</a>
            </button>
          </div>
          <div className="txt txt2">
            <h1 style={{ color: "palevioletred" }}>WOMEN'S</h1>
            <h1>FASHION</h1>
            <p>New & Fresh Collection</p>
            <button style={{ backgroundColor: "palevioletred" }}>
              <a href="/womens">SHOP NOW</a>
            </button>
          </div>
        </div>
      ),
    },
    {
      content: (
        <div className="txt3">
          <h1 style={{ color: "rgb(11, 150, 243)" }}>50% PRICE CUT</h1>
          <h1>FOR ONLINE ORDER</h1>
          <p>New & Fresh Collection</p>
          <button style={{ backgroundColor: "rgba(11, 150, 243)" }}>
            <a href="/">SHOP NOW</a>
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000); // Change interval time as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`mySlides slide${index + 1} fade ${
            index === currentSlide ? "active" : ""
          }`}
        >
          {slide.content}
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
