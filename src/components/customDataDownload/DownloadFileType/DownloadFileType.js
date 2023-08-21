import React, { useState, useEffect } from "react";
import { Button, Radio, Fieldset } from "@trussworks/react-uswds";
import axios from "axios";
import { connect } from "react-redux";
import config from "../../../config";

import { constructRequestUrl } from "../../../utils/selectors/general";
import RenderSpinner from "../../RenderSpinner/RenderSpinner";
import "./DownloadFileType.scss";
import setApiErrorAction from "../../../store/actions/setApiErrorAction";
import {
  isUnitIdExcludeDataType,
  unitIdExcludeParam,
} from "../../../utils/constants/customDataDownload";
import { updateFilterCriteria } from "../../../store/actions/customDataDownload/filterCriteria";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

const DownloadFileType = ({
  aggregation,
  dataType,
  dataSubType,
  filterCriteria,
  totalCount,
  setApiError,
  setApiErrorDispatcher,
  updateFilterCriteriaDispatcher,
}) => {
  const [fileType, setFileType] = useState("text/csv");
  const [loading, setLoading] = useState(false);

  useEffect(
    () => {
      if (
        !isUnitIdExcludeDataType(dataType, dataSubType) &&
        filterCriteria.excludeParams?.includes(unitIdExcludeParam)
      ) {
        console.log('failed to remove unit id exclude params in data preview');
        const excludeParams = filterCriteria.excludeParams.filter(el => el.value !== unitIdExcludeParam);
        updateFilterCriteriaDispatcher({excludeParams})
      }
      return () => setApiError(false);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const onRadioChangeHandler = (event) => {
    if (event.target.id === "json") {
      setFileType("application/json");
    } else {
      setFileType("text/csv");
    }
  };
  console.log(
    "download component exclude params ",
    filterCriteria.excludeParams
  );
  const onDownloadHandler = () => {
    setLoading(true);
    axios
      .get(
        constructRequestUrl(
          dataType,
          dataSubType,
          filterCriteria,
          aggregation,
          true
        ),
        {
          headers: {
            Accept: fileType,
          },
          responseType: "blob",
          timeout: Number(config.app.apiTimeout),
        }
      )
      .then((response) => {
        const disposition = response.headers["content-disposition"];
        const parts =
          disposition !== undefined ? disposition.split("; ") : undefined;

        if (parts !== undefined && parts[0] === "attachment") {
          //const url = window.webkitURL.createObjectURL([response.data], { type: fileType });

          const url = window.URL.createObjectURL(
            new Blob([response.data], { type: fileType })
          );

          const link = document.createElement("a");
          let fileName = parts[1].replace("filename=", "");
          fileName = fileName.replace(/"/g, "");
          link.href = url;
          link.setAttribute("download", fileName);
          link.setAttribute("target", "_blank");
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setApiError(true);
        setApiErrorDispatcher("download", true);
      });
  };

  return (
    <div className="download-wrapper height-10 border-2px radius-lg bg-primary-lighter border-primary display-flex flex-row flex-align-center font-sans-sm maxw-mobile">
      <Fieldset
        legend="Download File"
        legendStyle="srOnly"
        className="display-flex flex-row flex-align-self-center"
      >
        <Radio
          id="csv"
          name="input-radio"
          color="bg-primary"
          className="margin-x-1 margin-bottom-1"
          defaultChecked
          onClick={onRadioChangeHandler}
          label="CSV"
        />
        <Radio
          id="json"
          name="input-radio"
          color="bg-primary"
          className="margin-x-1 margin-bottom-1"
          onClick={onRadioChangeHandler}
          label="JSON"
        />
      </Fieldset>
      <Button
        type="button"
        className="margin-x-1"
        onClick={() => onDownloadHandler()}
        disabled={
          totalCount !== null &&
          Number(totalCount) > Number(config.app.streamingLimit)
        }
        label="JSON"
      >
        Download
      </Button>
      {loading ? <RenderSpinner showSpinner={loading} /> : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dataType: state.customDataDownload.dataType,
    dataSubType: state.customDataDownload.dataSubType,
    aggregation: state.customDataDownload.aggregation,
    filterCriteria: state.filterCriteria,
    totalCount: state.customDataDownload.totalCount,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setApiErrorDispatcher: (api, state, errorMessage) =>
    dispatch(setApiErrorAction(api, state, errorMessage)),
    updateFilterCriteriaDispatcher: (filterCriteria) =>
    dispatch(updateFilterCriteria(filterCriteria)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DownloadFileType);
