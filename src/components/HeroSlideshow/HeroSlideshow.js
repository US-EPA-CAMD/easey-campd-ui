import React, { useEffect } from "react";
import { tns } from "tiny-slider/src/tiny-slider";
import "./HeroSlideshow.scss";

/**
 * @typedef {Object} Slide
 * @property {string} image
 * @property {string} title
 * @property {?string} callout
 * @property {?React.ReactNode} text
 * @property {?{url: string, text: string}} link
 */

/**
 * @param {Object} props
 * @param {Slide[]} props.slides
 */
const HeroSlideshow = ({ slides }) => {
  useEffect(() => {
    const sliders = document.querySelectorAll(".js-hero-slideshow");
    sliders.forEach((slider) => {
      const sliderObject = tns({
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayHoverPause: true,
        autoplayTimeout: 6000,
        container: slider.querySelector(".js-hero-slideshow__container"),
        controls: false,
        mode: "gallery",
        navContainer: slider.querySelector(".js-hero-slideshow__nav"),
        preventScrollOnTouch: "auto",
        speed: 500,
      });

      // Stop autoplay after it has looped once through all slides.
      sliderObject.events.on("transitionEnd", function () {
        const sliderInfo = sliderObject.getInfo();
        if (sliderInfo.displayIndex === 1) {
          sliderObject.pause();
        }
      });
    });
  }, [slides]);

  if (!slides || slides.length === 0) return null;

  return (
    <div className="hero-slideshow js-hero-slideshow">
      <ul className="hero-slideshow__list js-hero-slideshow__container">
        {slides.map(({ image, title, callout, text, link }, index) => (
          <li key={index} className="hero-slideshow__item">
            <section
              className="usa-hero usa-hero--slideshow bg-base-lightest"
              style={{
                paddingBottom: slides.length > 1 ? "3.5rem" : "2rem",
                backgroundImage: `url(${image})`,
              }}
            >
              <div className="grid-container-widescreen">
                <div className="usa-hero__callout usa-dark-background">
                  <h2 className="usa-hero__heading">
                    {callout && (
                      <span className="usa-hero__heading--alt">{callout}</span>
                    )}
                    {title}
                  </h2>
                  {text}
                  {link && (
                    <a className="usa-button" href={link.url}>
                      {link.text}
                    </a>
                  )}
                </div>
              </div>
            </section>
          </li>
        ))}
      </ul>

      <div className="hero-slideshow__nav">
        <div className="grid-container-widescreen js-hero-slideshow__nav">
          {slides.map((_slide, index) => (
            <button
              key={index}
              className="hero-slideshow__nav-button usa-button"
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlideshow;
