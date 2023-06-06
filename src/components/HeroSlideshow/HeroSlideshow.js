import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link as USWDSLink } from "@trussworks/react-uswds";
import { Carousel } from "react-responsive-carousel";

import "./HeroSlideshow.scss";
import { Button } from "@trussworks/react-uswds/lib";

/**
 * @typedef {Object} Slide
 * @property {string} image
 * @property {string} title
 * @property {?string} callout
 * @property {?string} text
 * @property {?{url: string, text: string}} link
 */

const components = {
  a: ({ node, ...props }) => (
    <USWDSLink {...props} target="_blank" rel="noopener noreferrer" />
  ),
};

/**
 * @param {Object} props
 * @param {Slide[]} props.slides
 */
const HeroSlideshow = ({ slides }) => {
  if (!slides || slides.length === 0) return null;

  return (
    <div className="hero-slideshow">
      <div>
        <Carousel
          autoPlay={true}
          swipeable={false}
          showArrows={false}
          showThumbs={false}
          infiniteLoop={false}
          renderIndicator={(handler, isSelected, idx) => (
            <Button
              style={{ backgroundColor: isSelected ? "#1a4480" : "#71767a" }}
              onClick={handler}
            >
              {idx + 1}
            </Button>
          )}
        >
          {slides.map(({ image, title, callout, text, link }, index) => (
            <div className="carousel_item" key={title}>
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
                        <span className="usa-hero__heading--alt">
                          {callout}
                        </span>
                      )}

                      {title}
                    </h2>

                    {text && (
                      <ReactMarkdown
                        children={text}
                        remarkPlugins={[remarkGfm]}
                        components={components}
                      />
                    )}

                    {link && (
                      <a
                        className="usa-button"
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.text}
                      </a>
                    )}
                  </div>
                </div>
              </section>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default HeroSlideshow;
