import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link as USWDSLink } from "@trussworks/react-uswds";
import icons from "uswds/dist/img/sprite.svg";

import { metaAdder } from "../../utils/document/metaAdder";
import getContent from "../../utils/api/getContent";
import HeroSlideshow from "../HeroSlideshow/HeroSlideshow";

const MapsGraphsPage = () => {
  useEffect(() => {
    document.title = "Maps & Graphs | CAMPD | US EPA";
    metaAdder(
      "description",
      "The maps & graphs gallery allows users to browse and interact with a variety of tools to visualize emissions trading program data."
    );
    metaAdder(
      "keywords",
      "Clean air markets program data, EPA, emissions, allowance, compliance, facility, analysis, data, visualization, CAMPD, AMPD, ECMPS, CAMD, FTP, maps, graphs"
    );
  }, []);

  const [introText, setIntroText] = useState("");
  const [slides, setSlides] = useState([]);
  const [tools, setTools] = useState([]);

  useEffect(() => {
    getContent("/campd/maps-graphs/intro-text.md").then((resp) =>
      setIntroText(resp.data)
    );

    getContent("/campd/maps-graphs/slides.json").then((resp) => {
      Promise.all(
        resp.data.map((slide) => {
          return Promise.all([
            slide.image
              ? getContent(`/campd/maps-graphs/${slide.image}`).then(
                  (imgResp) => imgResp.config.url
                )
              : Promise.resolve(""),
            slide.text
              ? getContent(`/campd/maps-graphs/${slide.text}`).then(
                  (textResp) => textResp.data
                )
              : Promise.resolve(""),
          ]).then(([image, text]) => {
            return { ...slide, image, text };
          });
        })
      ).then((fetchedSlides) => {
        setSlides(fetchedSlides);
      });
    });

    getContent("/campd/maps-graphs/tools.json").then((resp) => {
      Promise.all(
        resp.data.map((tool) => {
          return Promise.all([
            tool.image
              ? getContent(`/campd/maps-graphs/${tool.image}`).then(
                  (imgResp) => imgResp.config.url
                )
              : Promise.resolve(""),
            tool.description
              ? getContent(`/campd/maps-graphs/${tool.description}`).then(
                  (descResp) => descResp.data
                )
              : Promise.resolve(""),
          ]).then(([image, description]) => {
            return { ...tool, image, description };
          });
        })
      ).then((fetchedTools) => {
        setTools(fetchedTools);
      });
    });
  }, []);

  return (
    <>
      {slides.length > 0 && <HeroSlideshow slides={slides} />}

      <section className="position-relative padding-top-2 padding-bottom-4 shadow-1">
        <div className="grid-container-widescreen">
          <div className="font-sans-xs mobile-lg:font-sans-md desktop:font-sans-lg line-height-sans-6">
            <ReactMarkdown
              children={introText}
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
          </div>
        </div>
      </section>

      <section className="padding-y-4 bg-base-lightest">
        <div className="grid-container">
          {tools.map((tool, index) => (
            <Tool key={index} data={tool} />
          ))}
        </div>
      </section>
    </>
  );
};

const Tool = ({ data }) => {
  return (
    <div className="margin-bottom-4">
      <div className="overflow-hidden radius-md shadow-2 bg-white">
        <div className="display-flex flex-align-center flex-justify padding-y-105 padding-x-2 bg-primary-dark">
          <p className="margin-0 text-bold font-sans-lg">
            <a
              className="display-block text-white underline-primary-dark hover:underline-accent-cool"
              href={data.url}
            >
              {data.name}
            </a>
          </p>

          <p className="margin-0 font-sans-3xs">
            <a
              className="display-block text-white underline-primary-dark hover:underline-accent-cool"
              href={`mailto:campd-support@camdsupport.com?subject=CAMPD Maps & Graphs Feedback - ${data.name}`}
            >
              <span className="display-flex flex-align-center">
                <svg
                  className="usa-icon margin-x-05"
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                >
                  <use href={`${icons}#mail`}></use>
                </svg>
                Provide Feedback
              </span>
            </a>
          </p>
        </div>

        <div className="grid-row">
          <div className="grid-col-12 tablet:grid-col-4">
            <div className="padding-2">
              <div className="radius-md shadow-1 add-aspect-4x3">
                <a
                  className="position-absolute"
                  style={{ inset: "0.25rem" }}
                  href={data.url}
                >
                  <img
                    className="width-full height-full"
                    style={{ objectFit: "cover" }}
                    src={data.image}
                    alt={data.name}
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="grid-col-12 tablet:grid-col-8">
            <div className="padding-2 padding-top-0">
              <div className="font-sans-xs line-height-sans-5">
                <ReactMarkdown
                  children={data.description}
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
              </div>

              <div className="font-sans-2xs line-height-sans-4 text-base-darker">
                <p>
                  <strong>Source Data:</strong>&nbsp;&nbsp;
                  <USWDSLink
                    href={data.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {data.source.text}
                  </USWDSLink>
                </p>

                <p>
                  <strong>Keywords:</strong>&nbsp;&nbsp;
                  {data.keywords.join(", ")}
                </p>

                <p>
                  <strong>Date Last Updated:</strong>&nbsp;&nbsp;
                  {data.updated}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapsGraphsPage;
