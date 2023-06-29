import React, { useEffect, useRef, useState } from "react";
import { SiteAlert } from "@trussworks/react-uswds";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import setApiError from "../../store/actions/setApiErrorAction";
import getContent from "../../utils/api/getContent";
import "./ApiErrorAlert.scss";

const ApiErrorAlert = ({
  apiErrors,
  parentComponentPath,
  setApiErrorDispatcher,
}) => {
  const [errors, setErrors] = useState([]);
  const [errorMessages, setErrorMessages] = useState(null);
  const apiErrorsRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (apiErrors.errorMessages) {
      setErrorMessages(apiErrors.errorMessages);
    } else {
      getContent("/campd/api-error-messages.json", setApiErrorDispatcher).then(
        (response) => {
          if (response?.data) {
            setErrorMessages(response.data);
            setApiErrorDispatcher("errorMessages", response.data);
          }
        }
      );
    } //eslint-disable-next-line
  }, []);
  useEffect(() => {
    const errorItems = [];
    Object.keys(apiErrors).forEach((error) =>
      apiErrors[error] === true ? errorItems.push(error) : null
    );
    errorItems.length && setErrors(errorItems);
  }, [apiErrors]);

  //resets errors when user navigates to a different page
  useEffect(() => {
    errors.forEach((error) => apiErrors[error] && setApiError(error, false));
    setErrors([]); //eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    if (errors.length && apiErrorsRef.current) {
      apiErrorsRef.current.scrollIntoView();
    }
  }, [errors]);

  const cddPath = "/data/custom-data-download",
    currentPath = location?.pathname,
    isCdd = currentPath === cddPath,
    showAlert = isCdd
      ? parentComponentPath === cddPath && errors.length
      : errors.length;

  return showAlert ? (
    <div id="api-error-banner" ref={apiErrorsRef}>
      {errors.map((api) => (
        <SiteAlert variant="info" key={api} aria-live="assertive">
          {!errorMessages
            ? "All of the content on this page may not be available. If you continue to encounter this issue, contact CAMPD support: campd-support@camdsupport.com"
            : errorMessages[api]}
        </SiteAlert>
      ))}
    </div>
  ) : null;
};

const mapStateToProps = (state) => ({ apiErrors: state.apiErrors });
const mapDispatchToProps = (dispatch) => ({
  setApiErrorDispatcher: (api, state) => dispatch(setApiError(api, state)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ApiErrorAlert);
