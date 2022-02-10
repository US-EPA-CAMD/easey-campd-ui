import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link as USWDSLink, Button } from "@trussworks/react-uswds";
import { useHistory } from "react-router-dom";
import {
  TitledProgressBar,
  WhatIsNewBox,
} from "@us-epa-camd/easey-design-system";
import moment from "moment-timezone";

import getSubmissionProgress from "../../utils/api/getSubmissionProgress";
import { metaAdder } from "../../utils/document/metaAdder";
import "./HomePage.scss";
import getContent from "../../utils/api/getContent";

const HomePage = () => {
  const [whatIsNewContent, setWhatIsNewContent] = useState();
  const [whatIsNewTitle, setWhatIsNewTitle] = useState();
  const [dataCard, setDataCard] = useState();
  const [mapsGraphsCard, setMapsGraphsCard] = useState();

  useEffect(() => {
    getContent("/campd/home/what-is-new-content.md").then((resp) =>
      setWhatIsNewContent(resp.data)
    );
    getContent("/campd/home/what-is-new-title.md").then((resp) =>
      setWhatIsNewTitle(resp.data)
    );
    getContent("/campd/home/data-card.md").then((resp) =>
      setDataCard(resp.data)
    );
    getContent("/campd/home/maps-and-graphs-card.md").then((resp) =>
      setMapsGraphsCard(resp.data)
    );
  }, []);

  const [progressTitle, setProgressTitle] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [percent, setPercent] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);

  useEffect(() => {
    document.title = "Clean Air Markets Program Data (CAMPD) | US EPA";
  }, []);

  useEffect(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();

    const monthName = today.toLocaleString("default", { month: "long" });
    const timeWithZone = moment(today)
      .tz("America/New_York")
      .format("hh:mm a z");

    const formattedDate = `${yyyy}-${mm}-${dd}`;

    getSubmissionProgress(formattedDate)
      .then((res) => {
        if (res.data) {
          const data = res.data;
          setProgressTitle(
            `${data.year} ${data.quarterName} Quarter Emission Files Received`
          );
          setLastUpdated(
            `Last Updated ${monthName} ${dd}, ${yyyy} at ${timeWithZone}`
          );
          setPercent(parseInt(data.percentage));
          setShowProgressBar(true);
        } else {
          setShowProgressBar(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setShowProgressBar(false);
      });
  }, []);

  metaAdder(
    "description",
    "CAMPD is your one-stop shop for the emissions, compliance, allowance, and facility attributes data that is gathered under these programs."
  );
  metaAdder(
    "keywords",
    "Clean air markets program data, EPA, emissions, data, allowance, compliance, custom data download, CAMPD APIs, APIs, bulk data files, CAMPD, AMPD, ECMPS, CAMD, FTP, maps, graphs"
  );

  const history = useHistory();
  return (
    <div>
      <div className="grid-row padding-y-4 mobile-lg:padding-x-2 desktop:padding-x-4 widescreen:padding-x-10">
        {showProgressBar ? (
          <div className="grid-col-12">
            <div className="order-3 desktop:grid-col-6 mobile-lg:grid-col-12 margin-x-auto padding-x-2 padding-bottom-3">
              <TitledProgressBar
                title={progressTitle}
                percentage={percent}
                lastUpdated={lastUpdated}
              />
            </div>
          </div>
        ) : null}
        <div className="padding-y-1 padding-x-1 display-flex flex-row flex-align-start text-base-darkest order-3 grid-col-12 desktop:grid-col-4">
          <ReactMarkdown
            className="data-card"
            children={dataCard}
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ node, ...props }) => {
              return node.properties.title === "Header Link" ? (
                  <h2>
                    <Button
                      className="font-heading-xl text-bold"
                      unstyled="true"
                      onClick={() => history.push(props.href)}
                      style={{ textDecoration: "none" }}
                    >
                      {props.children[0]}
                    </Button>
                  </h2>
                ) : (
                  <Button
                    className="margin-top-2"
                    type="button"
                    onClick={() => history.push(props.href)}
                    role="link"
                    rel={"Data"}
                    title={props.children[0]}
                  >
                    {props.children[0]}
                  </Button>
                )
              }
            }}
          />
        </div>
        <div className="padding-y-1 padding-x-1 display-flex flex-row flex-align-start text-base-darkest order-3 grid-col-12 desktop:grid-col-4">
          <ReactMarkdown
            className="maps-and-graphs-card"
            children={mapsGraphsCard}
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ node, ...props }) => {
              return node.properties.title === "Header Link" ? (
                  <h2>
                    <Button
                      className="font-heading-xl text-bold"
                      unstyled="true"
                      onClick={() => history.push(props.href)}
                      style={{ textDecoration: "none" }}
                    >
                      {props.children[0]}
                    </Button>
                  </h2>
                ) : (
                  <Button
                    className="margin-top-2"
                    type="button"
                    onClick={() => history.push(props.href)}
                    role="link"
                    rel={"Maps and Graphs"}
                    title={props.children[0]}
                  >
                    {props.children[0]}
                  </Button>
                )
              }
            }}
          />
        </div>
        <div className="what-is-new-wrapper mobile-lg:order-1 desktop:order-3 padding-y-1 padding-x-1 display-flex flex-row flex-align-start text-base-darkest grid-col-12 desktop:grid-col-4">
          <WhatIsNewBox
            text={
              <ReactMarkdown
                className="what-is-new-box "
                children={whatIsNewContent}
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
            }
            title={
              <ReactMarkdown
                className="what-is-new-box-title"
                children={whatIsNewTitle}
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
            }
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
