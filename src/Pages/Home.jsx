import React, { useState, useRef, useEffect } from "react";
import "./Home.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import { HashLink } from "react-router-hash-link";
import vid1 from "../assets/vid1.mp4";
import vid2 from "../assets/vid2.mp4";
import vid3 from "../assets/vid3.mp4";

const heroSlides = [
  {
    video: vid1,
    title: "We Care For Your Smile",
    text: "We Believe Everyone should have easy access to great dental clinic",
  },
  {
    video: vid2,
    title: "A Confident Smile Starts Here",
    text: "Cosmetic & Restorative Dentistry tailored to your perfect smile",
  },
  {
    video: vid3,
    title: "We Care For Your Smile",
    text: "Emergency and Same-Day Appointments available for your convenience",
  },
];

const Home = () => {
  const [index, setIndex] = useState(0);
  const videoRefs = useRef([]);

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === index) {
        v.currentTime = 0;
        const p = v.play();
        if (p && p.catch) p.catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [index]);

  return (
    <>
      <section id="home">
        <div className="hero_slider">
          <Carousel
            active={index}
            onSelect={(sel) => setIndex(sel)}
            fade
            interval={6000}
            indicators
            controls={false}
          >
            {heroSlides.map((slide, i) => (
              <Carousel.Item key={i}>
                <div className="hero_slide">
                  <video
                    ref={(el) => (videoRefs.current[i] = el)}
                    className="hero_slide__video"
                    src={slide.video}
                    loop
                    muted
                    playsInline
                    preload="auto"
                  />
                  <div className="hero_slide__overlay">
                    <div className="hero_slide__content">
                      <h1 className="hero_slide__title">{slide.title}</h1>
                      <p className="hero_slide__text">{slide.text}</p>
                      <HashLink
                        to="/dental-clinic/appointment"
                        className="hero_slide__btn"
                      >
                        Make An Appointment
                      </HashLink>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        <div className="clinic_container">
          <div className="clinic_info">
            <div className="basic_info" id="info_01">
              <h2>Flexible Schedule</h2>
              <p>
                We work on holidays, besides working late on regular days. In
                case of emergencies we accept bookings.
              </p>

              <HashLink
                to={"/register"}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <div className="transperent_btn"> Chat with Doctor</div>
              </HashLink>
            </div>
            <div className="basic_info" id="info_02">
              <h2>Best Price Guarantee</h2>
              <p>
                Our reasonable prices made thousands of people smile with a new,
                beautiful, irresistible smile, as never before!!
              </p>
              <HashLink
                to={"/#contact-us"}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <div className="transperent_btn">Read More</div>
              </HashLink>
            </div>
            <div className="basic_info" id="info_03">
              <h2>Opening Hours</h2>
              <p>
                Monday – Saturday : 10.00 am – 10.00 pm Sunday : 5.00 pm – 10.00
                pm
              </p>

              <HashLink
                to={"/dental-clinic/slot"}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <div className="transperent_btn" id="tr_btn_01">
                  Book An Appointment
                </div>
              </HashLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
