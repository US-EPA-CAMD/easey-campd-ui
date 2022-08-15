import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@trussworks/react-uswds";
import { useHistory } from "react-router-dom";
import { metaAdder } from "../../utils/document/metaAdder";
import getContent from "../../utils/api/getContent";
import "./DataLandingPage.scss";

const DataLandingPage = () => {
  const [header, setHeader] = useState(null);
  const [content, setContent] = useState(null);

  useEffect(() => {
    document.title = "Data | CAMPD | US EPA";
    getContent("/campd/data/home/header.md").then((resp) =>
      setHeader(resp.data)
    );
    getContent("/campd/data/home/index.json").then((resp) =>
      setContent(resp.data)
    );
  }, []);

  metaAdder(
    "description",
    "Custom data download, bulk data files, and CAMPD APIs provide apportioned emissions, monitoring plan, QA, allowance, compliance and facility/unit data."
  );
  metaAdder(
    "keywords",
    "Clean air markets program data, EPA, emissions, allowance, compliance, custom data download, CAMPD APIs, APIs, bulk data files, CAMPD, CAMD, FTP, AMPD"
  );

  const history = useHistory();

  return (
    <div
      id="data-page"
      className="padding-y-2 mobile-lg:padding-x-2 tablet:padding-x-4 widescreen:padding-x-10 font-sans-sm text-base-darkest text-ls-1 line-height-sans-5"
    >
      <ReactMarkdown
        children={header}
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="font-sans-xl text-bold">{props.children}</h1>
          ),
        }}
      />
      <>
        {content &&
          content.map((topic) => {
            return (
              <div
                className="padding-205 text-base-darkest shadow-3 margin-y-4"
                key={`container-${topic.name.replace(/ /g, "-")}`}
              >
                <div className="display-flex flex-row flex-justify-start margin-bottom-105">
                  <img
                    src={`${process.env.PUBLIC_URL}${topic.imgPath}`}
                    alt={topic.imgAlt}
                  />
                  <h2 className="text-bold font-sans-xl line-height-sans-3 margin-y-0 padding-left-105">
                    {topic.name}
                  </h2>
                </div>
                <div className="display-flex grid-row margin-top-05">
                  <p className="margin-y-0 grid-col-12 desktop:grid-col-fill">
                    {topic.description}
                  </p>
                  <Button
                    className="link-button flex-align-self-center grid-col-12 desktop:grid-col-2 desktop:margin-left-105 margin-top-105 desktop:margin-top-0"
                    type="button"
                    onClick={
                      topic.hasOwnProperty("externalLink")
                        ? () => window.open(topic.url, "_blank")
                        : () => history.push(topic.url)
                    }
                    role="link"
                    rel={topic.name}
                    title={`Go to ${topic.name} page`}
                    key={topic.url}
                    id={`${topic.name.split(" ").join("")}`}
                  >
                    {topic.button}
                  </Button>
                </div>
              </div>
            );
          })}
      </>
    </div>
  );
};

export default DataLandingPage;
