import React, { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link as USWDSLink } from "@trussworks/react-uswds";
import { tns } from "tiny-slider/src/tiny-slider";
import "./HeroSlideshow.scss";

/**
 * @typedef {Object} Slide
 * @property {string} image
 * @property {string} title
 * @property {?string} callout
 * @property {?string} text
 * @property {?{url: string, text: string}} link
 */

/**
 * @param {Object} props
 * @param {Slide[]} props.slides
 */
const HeroSlideshow = ({ slides }) => {
  const containerRef = useRef(null);
  const navContainerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !navContainerRef.current) return;

    const slider = tns({
      autoplay: true,
      autoplayButtonOutput: false,
      autoplayHoverPause: true,
      autoplayTimeout: 6000,
      container: containerRef.current,
      controls: false,
      mode: "gallery",
      navContainer: navContainerRef.current,
      preventScrollOnTouch: "auto",
      speed: 500,
    });

    // stop autoplay after it has looped once through all slides
    slider.events.on("transitionEnd", function (eventInfo, eventName) {
      const info = slider.getInfo();
      if (info.displayIndex === 1) slider.pause();
    });

    return function cleanup() {
      if (slider) slider.destroy();
    };
  }, []);

  if (!slides || slides.length === 0) return null;

  // NOTE: setting fontSize on list item via inline style below to support Jest
  // tests, as the 'tiny-slider' library uses it explicitly in it's initSheet()
  // method (see addCSSRule), and 'jsdom' doesn't implement the CSS cascade

  return (
    <div className="hero-slideshow">
      <ul ref={containerRef} className="hero-slideshow__list">
        {slides.map(({ image, title, callout, text, link }, index) => (
          <li
            key={index}
            className="hero-slideshow__item"
            style={{ fontSize: "inherit" }}
          >
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

                  {text && (
                    <ReactMarkdown
                      children={text}
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ node, ...props }) => (
                          <USWDSLink
                            {...props}
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        ),
                      }}
                    />
                  )}

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
        <div ref={navContainerRef} className="grid-container-widescreen">
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
