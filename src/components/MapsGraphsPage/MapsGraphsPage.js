import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import icons from "uswds/dist/img/sprite.svg";

import { metaAdder } from "../../utils/document/metaAdder";
import getContent from "./temp"; // TODO: replace with "utils/api" function once content has been added to easey-content repo
import HeroSlideshow from "../HeroSlideshow/HeroSlideshow";

const ToolCard = ({ data }) => {
  return (
    <div className="margin-bottom-4">
      <div className="overflow-hidden radius-md shadow-2 bg-white">
        <div className="display-flex flex-align-center flex-justify padding-y-105 padding-x-2 bg-primary-dark">
          <p className="margin-0 text-bold font-sans-sm">
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
                <img src={data.image} alt={data.name} />
              </div>
            </div>
          </div>

          <div className="grid-col-12 tablet:grid-col-8">
            <div className="padding-2 padding-top-0">
              <div className="font-sans-xs line-height-sans-5">
                <ReactMarkdown
                  children={data.description}
                  remarkPlugins={[remarkGfm]}
                />
              </div>

              <div className="font-sans-2xs line-height-sans-4 text-base-darker">
                <p>
                  <strong>Source Data:</strong>&nbsp;&nbsp;
                  {data.sources.map((source, index) => {
                    // TODO: find out if there will be multiple sources, or just one
                    return (
                      <span key={index}>
                        <a href={source.url}>{source.text}</a>&nbsp;&nbsp;
                      </span>
                    );
                  })}
                </p>

                <p>
                  <strong>Keywords:</strong>
                  <br />
                  {data.keywords.join(", ")}
                </p>

                <p>
                  <strong>Date Last Updated:</strong>
                  <br />
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

  const [introPrimaryText, setIntroPrimaryText] = useState("");
  const [introSecondaryText, setIntroSecondaryText] = useState("");
  const [tools, setTools] = useState([]);

  useEffect(() => {
    getContent("/campd/maps-graphs/intro-primary-text.md").then((resp) =>
      setIntroPrimaryText(resp.data)
    );

    getContent("/campd/maps-graphs/intro-secondary-text.md").then((resp) =>
      setIntroSecondaryText(resp.data)
    );

    getContent("/campd/maps-graphs/tools.json").then((resp) => {
      Promise.all(
        resp.data.map((tool) => {
          return Promise.all([
            getContent(`/campd/maps-graphs/tools/${tool.image}`).then(
              (imgResp) => imgResp.config.url
            ),
            getContent(`/campd/maps-graphs/tools/${tool.description}`).then(
              (descResp) => descResp.data
            ),
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
      <HeroSlideshow
        slides={[
          {
            image: "https://fpoimg.com/2048x820?text=Hero%20A%205:2",
            title: "Explore Facility Emissions & Compliance Near You",
            callout: "Tools Gallery:",
            text: null,
            link: {
              url: "/",
              text: "Facility Map Explorer",
            },
          },
        ]}
      />

      <section className="position-relative padding-top-2 padding-bottom-4 shadow-1">
        <div className="grid-container-widescreen">
          <div className="font-sans-lg line-height-sans-6">
            <ReactMarkdown
              children={introPrimaryText}
              remarkPlugins={[remarkGfm]}
            />
          </div>

          <div className="font-sans-md line-height-sans-5">
            <ReactMarkdown
              children={introSecondaryText}
              remarkPlugins={[remarkGfm]}
            />
          </div>
        </div>
      </section>

      <section className="padding-y-4 bg-base-lightest">
        <div className="grid-container">
          {tools.map((tool, index) => (
            <ToolCard key={index} data={tool} />
          ))}
        </div>
      </section>
    </>
  );
};

export default MapsGraphsPage;
