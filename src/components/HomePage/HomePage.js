import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link as USWDSLink } from "@trussworks/react-uswds";
import { Button, Tag } from "@trussworks/react-uswds";
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

  useEffect(() => {
    getContent("/campd/home/what-is-new-content.md").then((resp) =>
      setWhatIsNewContent(resp.data)
    );
    getContent("/campd/home/what-is-new-title.md").then((resp) =>
      setWhatIsNewTitle(resp.data)
    );
  }, []);

  useEffect(() => {
    if (whatIsNewTitle) {
      const titleText = document.querySelector(".what-is-new-box-title")
        .firstChild.innerText;
      const paragraphTitleText = document.querySelector(
        ".what-is-new-box-title"
      ).firstChild;
      const divTitleText = document.createElement("div");
      divTitleText.innerText = titleText;
      document
        .querySelector(".what-is-new-box-title")
        .replaceChild(divTitleText, paragraphTitleText);
    }
  }, [whatIsNewTitle]);

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

          let quarter = data.quarter;
          let year = data.calendarYear;
          let quarterSpelledOut;

          if (data.quarter === null) {
            const date = new Date();

            year = date.getFullYear();
            const month = date.getMonth();

            if (month === 0) {
              year--;
            }

            if (month >= 1 && month <= 3) {
              quarter = "1";
            } else if (month >= 4 && month <= 6) {
              quarter = "2";
            } else if (month >= 7 && month <= 9) {
              quarter = "3";
            } else {
              quarter = "4";
            }
          }

          switch (quarter) {
            case "1":
              quarterSpelledOut = "First";
              break;
            case "2":
              quarterSpelledOut = "Second";
              break;
            case "3":
              quarterSpelledOut = "Third";
              break;
            default:
              quarterSpelledOut = "Fourth";
          }

          setProgressTitle(
            `${year} ${quarterSpelledOut} Quarter Emission Files Received`
          );

          setLastUpdated(
            `Last Updated ${monthName} ${dd}, ${yyyy} at ${timeWithZone}`
          );
          setPercent(parseInt(data.submittedPercentage));
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

  const topics = [
    {
      name: "Data",
      description: `Create custom queries, download bulk datasets and use the CAM API to retrieve emissions, allowance and compliance data.`,
      img: (
        <img
          src={`${process.env.PUBLIC_URL}/images/icons/icon-data.svg`}
          alt=""
        />
      ),
      url: () => history.push("/data/custom-data-download"),
      link: "/data",
      button: "Start your data query",
    },
    {
      name: "Maps & Graphs",
      description: `Explore interactive tools to learn about programs that regulate the power sector and find information on power plants near you.`,
      img: (
        <img
          src={`${process.env.PUBLIC_URL}/images/icons/icon-analysis.svg`}
          alt=""
        />
      ),
      url: null,
      link: "#0",
      button: null,
    },
  ];

  const history = useHistory();
  return (
    <div>
      <div className="grid-row padding-y-4 mobile-lg:padding-x-2 desktop:padding-x-4 widescreen:padding-x-10">
        {showProgressBar ? (
          <div className="grid-col-12">
            <div className="order-3 desktop:grid-col-6 mobile-lg:grid-col-12 margin-x-auto padding-x-2 padding-y-3">
              <TitledProgressBar
                title={progressTitle}
                percentage={percent}
                lastUpdated={lastUpdated}
              />
            </div>
          </div>
        ) : null}

        {topics.map((topic) => {
          const hasButton = topic.button !== null;
          return (
            <div
              className="padding-y-1 padding-x-1 display-flex flex-row flex-align-start text-base-darkest order-3 grid-col-12 desktop:grid-col-4"
              key={`container-${topic.name.replace(/ /g, "-")}`}
            >
              {topic.img}
              <div className="margin-left-2 desktop:margin-left-1">
                <Button
                  className="font-heading-xl text-bold margin-y-2"
                  unstyled="true"
                  onClick={() => history.push(topic.link)}
                  style={{ textDecoration: "none" }}
                  key={topic.name}
                >
                  {topic.name}
                </Button>
                {hasButton ? null : (
                  <div className="margin-top-3">
                    <Tag className="radius-md padding-y-05 font-sans-3xs text-semibold text-ls-2">
                      Coming Soon
                    </Tag>
                  </div>
                )}
                <p className="font-sans-sm text-ls-1 line-height-sans-6">
                  {topic.description}
                </p>
                {hasButton ? (
                  <Button
                    className="margin-top-1"
                    type="button"
                    onClick={topic.url}
                    role="link"
                    rel={topic.name}
                    title={`Go to ${topic.name} page`}
                    key={topic.url}
                    id={`${topic.name.split(" ").join("")}`}
                  >
                    {topic.button}
                  </Button>
                ) : null}
              </div>
            </div>
          );
        })}
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
