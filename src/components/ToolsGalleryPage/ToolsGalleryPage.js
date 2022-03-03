import React, { useEffect, useState } from "react";
import { Preloader } from "@us-epa-camd/easey-design-system";

import { placeholderTools } from "./mockData"; // TEMPORARY
import "./ToolsGalleryPage.scss";
import { metaAdder } from "../../utils/document/metaAdder";

const ToolCard = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="grid-col-12 tablet:grid-col-6 desktop:grid-col-4">
      <div className="margin-1">
        <div
          className="campd-tool padding-2 radius-md shadow-1 hover:shadow-3"
          data-expanded={expanded}
        >
          <p className="campd-tool-name margin-0 font-sans-sm line-height-sans-2 text-bold">
            <a
              className="usa-link underline-base-lightest hover:underline-accent-cool"
              href={data.url}
            >
              {data.name}
            </a>
          </p>

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
    <div className="grid-container-widescreen">
      <h1 className="font-sans-2xl text-bold">Tools Gallery</h1>

      <p className="font-sans-lg line-height-sans-6">
        CAMPD’s Tools Gallery showcases compliance-related dashboards and maps
        created by users across EPA, making datasets easier to explore and
        encouraging collaboration <mark>(placeholder text)</mark>.
      </p>

      <p className="font-sans-sm line-height-sans-5">
        <mark>(tools intro text?)</mark>
      </p>

      <div className="grid-row">
        {loading ? (
          <Preloader />
        ) : (
          tools.map((tool) => <ToolCard key={tool.id} data={tool} />)
        )}
      </div>
    </div>
  );
};

export default ToolsGalleryPage;
