import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Alert, Link as USWDSLink } from "@trussworks/react-uswds";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import getContent from "../../utils/api/getContent";
import setApiError from "../../store/actions/setApiErrorAction";
import './AlertBanner.scss';

const AlertBanner = ({ setApiErrorDispatcher }) => {
  const [alertBanner, setAlertBanner] = useState(null);

  useEffect(() => {
    getContent('/campd/alert-banner.json', setApiErrorDispatcher).then(
      (resp) => resp && setAlertBanner(resp.data)
    );//eslint-disable-next-line
  }, []);

  return (alertBanner && alertBanner.enable ? (
    <div id="alert-banner">
      <Alert
        type={alertBanner.type}
        role="alert"
        heading={alertBanner.heading}
        headingLevel={alertBanner.headingLevel}
        slim={alertBanner.slim}
        noIcon={!alertBanner.icon}
      >
        <ReactMarkdown
          children={alertBanner.content}
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ node, ...props }) => (
              <USWDSLink
                {...props}
                target="_blank"
                rel="noopener noreferrer"
              />
            ),
            p: "span",
          }}
        />
      </Alert>
    </div>

  ) : null
  )
}

const mapDispatchToProps = (dispatch) => ({ setApiErrorDispatcher: (api, state, errorMessage) => dispatch(setApiError(api, state, errorMessage)) });

export default connect(null, mapDispatchToProps)(AlertBanner);