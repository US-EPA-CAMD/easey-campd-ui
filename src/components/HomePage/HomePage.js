import React, { useEffect, useState } from "react";
import Markdown from "../Markdown/Markdown";

import {
  TitledProgressBar,
  WhatIsNewBox,
} from "@us-epa-camd/easey-design-system";
import moment from "moment-timezone";

import getSubmissionProgress from "../../utils/api/getSubmissionProgress";
import { metaAdder } from "../../utils/document/metaAdder";
import "./HomePage.scss";
import getContent from "../../utils/api/getContent";
import config from '../../config';
import setApiError from "../../store/actions/setApiErrorAction";
import { connect } from "react-redux";

const HomePage = ({setApiErrorDispatcher}) => {
  const [whatIsNewContent, setWhatIsNewContent] = useState();
  const [whatIsNewTitle, setWhatIsNewTitle] = useState();
  const [dataCard, setDataCard] = useState();
  const [visualGalleryCard, setvisualGalleryCard] = useState();

  useEffect(() => {
    getContent("/campd/home/what-is-new-content.md", setApiErrorDispatcher).then((resp) =>
      resp && setWhatIsNewContent(resp.data)
    );
    getContent("/campd/home/what-is-new-title.md", setApiErrorDispatcher).then((resp) =>
      resp && setWhatIsNewTitle(resp.data)
    );
    getContent("/campd/home/data-card.md", setApiErrorDispatcher).then((resp) =>
      resp && setDataCard(resp.data)
    );
    getContent("/campd/home/visualization-gallery-card.md", setApiErrorDispatcher).then((resp) =>
      resp && setvisualGalleryCard(resp.data)
    );//eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [progressTitle, setProgressTitle] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [percent, setPercent] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);

  useEffect(() => {
    document.title = "Clean Air Markets Program Data (CAMPD) | US EPA";
  }, []);

  useEffect(() => {
    let today = new Date();

    if (config.app.emissionsSubmissionTestDate) {
      today = new Date(config.app.emissionsSubmissionTestDate);
    }

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
          <Markdown
            className="data-card"
            role="link"
            rel="Data"
            imgId="data-icon"
          >
            {dataCard}
          </Markdown>
        </div>
        <div className="padding-y-1 padding-x-1 display-flex flex-row flex-align-start text-base-darkest order-3 grid-col-12 desktop:grid-col-4">
          <Markdown
            className="visualization-gallery-card"
            role="link"
            rel="Visualization Gallery"
            imgId="viz-gallery-icon"
          >
            {visualGalleryCard}
          </Markdown>
        </div>
        <div className="what-is-new-wrapper mobile-lg:order-1 desktop:order-3 padding-y-1 padding-x-1 display-flex flex-row flex-align-start text-base-darkest grid-col-12 desktop:grid-col-4">
          <WhatIsNewBox
            title={
              <Markdown className="what-is-new-box-title">
                {whatIsNewTitle}
              </Markdown>
            }
            text={
              <Markdown className="what-is-new-box">
                {whatIsNewContent}
              </Markdown>
            }
          />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({setApiErrorDispatcher: (api, state, errorMessage) => dispatch(setApiError(api, state, errorMessage))});

export default connect(null, mapDispatchToProps)(HomePage);
