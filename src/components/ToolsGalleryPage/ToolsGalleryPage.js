import React, { useEffect, useState } from "react";
import { Preloader } from "@us-epa-camd/easey-design-system";

import { placeholderTools } from "./mockData"; // TEMPORARY
import "./ToolsGalleryPage.scss";
import { metaAdder } from "../../utils/document/metaAdder";

const ToolCard = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="grid-col-12 tablet:grid-col-6 desktop-lg:grid-col-4">
      <div className="margin-1">
        <div
          className="campd-tool position-relative padding-2 radius-md shadow-2 hover:shadow-5 bg-white"
          data-expanded={expanded}
        >
          <div className="campd-tool-header">
            <p className="margin-0 font-sans-sm line-height-sans-2 text-bold">
              <a
                className="usa-link hover:underline-accent-cool"
                href={data.url}
              >
                {data.name}
              </a>
            </p>
          </div>

          <p className="campd-tool-summary font-sans-2xs line-height-sans-4">
            {data.summary}
          </p>

          <div className="campd-tool-meta font-sans-3xs line-height-sans-3 text-base">
            {data.meta}
          </div>

          <div className="campd-tool-footer">
            <button
              className="usa-button"
              onClick={(ev) => setExpanded(!expanded)}
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ToolsGalleryPage = () => {
  useEffect(() => {
    document.title = "Tools Gallery | CAMPD | US EPA";
    metaAdder("description", "(TODO)");
    metaAdder("keywords", "(TODO)");
  }, []);

  const [loading, setLoading] = useState(false);
  const [tools, setTools] = useState([]);

  useEffect(() => {
    setLoading(true);

    // NOTE: web service fetch simulated...
    // these placeholder tools would be likely fetched from a web service
    setTimeout(() => {
      setLoading(false);
      setTools(placeholderTools);
    }, 1000);
  }, []);

  return (
    <div className="campd-tools">
      <section className="usa-hero" aria-label="Tools Gallery">
        <div className="grid-container-widescreen">
          <div className="usa-hero__callout">
            <h1 className="usa-hero__heading">
              <span className="usa-hero__heading--alt">Tools Gallery:</span>
              Some tagline about the tools
            </h1>
            <p>Possibly some more explanatory text here as well.</p>
          </div>
        </div>
      </section>

      <section className="position-relative padding-y-4 shadow-1">
        <div className="grid-container-widescreen">
          <p className="margin-top-0 font-sans-lg line-height-sans-6">
            CAMPD’s Tools Gallery showcases compliance-related dashboards and
            maps created by users across EPA, making datasets easier to explore
            and encouraging collaboration <mark>(placeholder text)</mark>.
          </p>

          <p className="margin-bottom-0 font-sans-sm line-height-sans-5">
            <mark>(More tools intro text?)</mark>
          </p>
        </div>
      </section>

      <section className="padding-y-4 bg-base-lightest">
        <div className="grid-container-widescreen">
          <div className="grid-row">
            {loading ? (
              <div className="campd-tools-loading">
                <Preloader />
              </div>
            ) : (
              tools.map((tool) => <ToolCard key={tool.id} data={tool} />)
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ToolsGalleryPage;
