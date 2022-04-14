import React, { useEffect, useState } from "react";
import icons from "uswds/dist/img/sprite.svg";

import "./MapsGraphsPage.scss";
import { metaAdder } from "../../utils/document/metaAdder";
import getContent from "./temp"; // TODO: replace with "utils/api" function once content has been added to easey-content repo

const ToolCard = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="margin-bottom-4">
      <div
        className="campd-tool radius-md shadow-2 bg-white"
        data-expanded={expanded}
      >
        <div className="campd-tool-header padding-y-105 padding-x-2 bg-primary-dark">
          <p className="font-sans-sm line-height-sans-2">
            <a className="hover:underline-accent-cool" href={data.url}>
              {data.name}
            </a>
          </p>
        </div>

        <div className="grid-row">
          <div className="grid-col-12 tablet:grid-col-9">
            <div className="padding-2">
              <div className="campd-tool-image radius-md shadow-1 add-aspect-2x1">
                <img src={data.image} alt={data.name} />
              </div>

              <div className="campd-tool-summary font-sans-2xs line-height-sans-4">
                {data.description}
              </div>

              <div className="campd-tool-other font-sans-3xs line-height-sans-3">
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
              </div>
            </div>
          </div>

          <div className="grid-col-12 tablet:grid-col-3 bg-gray-5">
            <div className="campd-tool-meta padding-2">
              <div className="campd-tool-contact">
                <p className="font-sans-3xs">
                  <a
                    className="usa-link"
                    href={`mailto:campd-support@camdsupport.com?subject=CAMPD Maps & Graphs Feedback - ${data.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="usa-icon"
                      aria-hidden="true"
                      focusable="false"
                      role="img"
                    >
                      <use href={`${icons}#mail`}></use>
                    </svg>
                    Provide Feedback
                  </a>
                </p>
              </div>

              <div className="font-sans-3xs line-height-sans-3 text-base">
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

        <div className="campd-tool-footer padding-2">
          <button
            className="usa-button"
            onClick={(ev) => setExpanded(!expanded)}
          >
            {expanded ? "Show less" : "Show more"}
          </button>
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

  const [tools, setTools] = useState([]);

  useEffect(() => {
    getContent("/campd/maps-graphs/tools.json").then((toolsRes) => {
      Promise.all(
        toolsRes.data.map((tool) => {
          return Promise.all([
            getContent(`/campd/maps-graphs/tools/${tool.image}`).then(
              (imgRes) => imgRes.config.url
            ),
            getContent(`/campd/maps-graphs/tools/${tool.description}`).then(
              (descRes) => descRes.data
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
    <div className="campd-tools">
      <section className="usa-hero" aria-label="Tools Gallery">
        <div className="grid-container-widescreen">
          <div className="usa-hero__callout">
            <h1 className="usa-hero__heading">
              <span className="usa-hero__heading--alt">Tools Gallery:</span>
              Explore Facility Emissions & Compliance Near You
            </h1>
            <a className="usa-button" href="/">
              Facility Map Explorer
            </a>
          </div>
        </div>
      </section>

      <section className="position-relative padding-y-4 shadow-1">
        <div className="grid-container-widescreen">
          <p className="margin-top-0 font-sans-lg line-height-sans-6">
            Maps &amp; Graphs is a collection of tools that allow analysis and
            visualization of allowance, compliance, emissions, and facility data
            for various use cases: compare facility or state level emissions,
            map and explore nearby facilities with emissions and compliance
            data, analyze trends in program allowance banks, and more. Explore
            the tools below and use the “Provide Feedback” link to share
            suggested enhancements or other visualizations you would like to
            see.
          </p>

          <p className="margin-bottom-0 font-sans-sm line-height-sans-5">
            Interested in building your own visualization? All APIs that support
            Maps &amp; Graphs tools are publicly available and source code is
            available in the{" "}
            <a href="https://github.com/USEPA/campd-maps-graphs">
              Maps &amp; Graphs repository
            </a>
            . For more information on the APIs visit the{" "}
            <a href="https://www.epa.gov/airmarkets/cam-api-portal">
              CAM API portal
            </a>{" "}
            and let us know what you are building!
          </p>
        </div>
      </section>

      <section className="padding-y-4 bg-base-lightest">
        <div className="grid-container">
          {tools.map((tool, index) => (
            <ToolCard key={index} data={tool} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MapsGraphsPage;
