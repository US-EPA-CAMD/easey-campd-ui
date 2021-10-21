import React, { useEffect, useRef } from 'react';
import {
  Button,
  Modal,
  ModalToggleButton,
  ModalHeading,
  ModalFooter,
} from '@trussworks/react-uswds';

import './BulkDataFiles.scss';

const BulkDataFiles = () => {
  useEffect(() => {
    document.title = 'CAMPD - Bulk Data Files';
  }, []);

  const topics = [
    {
      name: 'Allowances',
      descriptions: (
        <ul>
          <li>Allowance Holdings (updated daily)</li>
          <li>Allowance Transactions (updated annually)</li>
          <li>Initial Allowance Allocations - Acid Rain Program</li>
        </ul>
      ),
      url: 'https://gaftp.epa.gov/DMDnLoad/allowances/',
    },
    {
      name: 'Compliance',
      descriptions: (
        <ul>
          <li>Allowance-based compliance (updated annually)</li>
          <li>
            Emissions-based compliance – ARP NOx Program (updated annually)
          </li>
          <li>Averaging Plan Summary – ARP NOx Program (updated annually)</li>
        </ul>
      ),
      url: 'https://gaftp.epa.gov/DMDnLoad/compliance',
    },
    {
      name: 'Emissions',
      descriptions: (
        <ul>
          <li>Apportioned Unit-Level Daily Emissions (updated quarterly)</li>
          <li>Apportioned Unit-Level Hourly Emissions (updated quarterly)</li>
          <li>Apportioned Unit-Level MATS data (updated quarterly)</li>
          <li>
            Hourly Continuous Emissions Monitoring (CEM) data files formatted
            for use with the Sparse Matrix Operator Kernel Emissions (SMOKE)
            modeling system version 2.3 or later. (updated annually)
          </li>
        </ul>
      ),
      url: 'https://gaftp.epa.gov/DMDnLoad/emissions',
    },
    {
      name: 'Raw Emissions (XML)',
      descriptions: (
        <ul>
          <li>Emissions Submittals (updated quarterly)</li>
          <li>Monitoring Plan Submittals QA data (updated quarterly)</li>
        </ul>
      ),
      url: 'https://gaftp.epa.gov/DMDnLoad/xml',
    },
  ];

  const modalRef = useRef();

  return (
    <div className="wrapper font-sans-sm text-base-darkest text-ls-1 line-height-sans-6">
      <h1 className="text-base-darkest font-sans-2xl text-bold">
        Bulk Data Files
      </h1>
      <p>
        CAMPD provides access to larger bulk downloads of apportioned and raw
        emissions, allowance, and compliance data by maintaining access to
        static datasets available through EPA’s FTP site. The FTP site is
        accessible{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://gaftp.epa.gov/DMDnLoad/"
        >
          here
        </a>{' '}
        and has groupings of data which may be directly accessed using one of
        the links below.
      </p>
      <div className="display-flex">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://gaftp.epa.gov/DMDnLoad/"
        >
          <Button className="tablet:margin-right-2">Access the FTP Site</Button>
        </a>
        <ModalToggleButton
          className="flex-align-self-center"
          style={{ fontSize: '15px' }}
          unstyled
          modalRef={modalRef}
          opener
        >
          Need help accessing the FTP site?
        </ModalToggleButton>{' '}
        <>
          <Modal
            ref={modalRef}
            id="ftp-access-help-modal"
            aria-labelledby="ftp-access-help-modal"
            aria-describedby="ftp-access-help-modal"
          >
            <ModalHeading id="ftp-access-help-modal-heading">
              FTP access help
            </ModalHeading>
            <div className="usa-prose">
              <p id="ftp-access-help-modal-description">
                Modal Content Some browsers have discontinued support of the
                ftp:// protocol and/or changed settings that prevent access to
                FTP sites. The options below provide a workaround.
                <br></br>
                <br></br>
                <b>Option 1:</b> Access the same data by replacing
                “ftp://newftp.epa.gov/” with “https://gaftp.epa.gov/” and keep
                the rest of the URL the same. The filenames you see will be
                shorter, but if you mouse over them you should see the full
                name.
                <br></br>
                <br></br>
                <b>Option 2:</b> Recent changes to Chrome and Edge require a
                settings change in order to download files in these browsers. To
                update this setting, type chrome://flags (for Chrome) or
                edge://flags (for Edge) into the address bar and press Enter.
                Search for the FTP option (Enable support for FTP URLs) and set
                it to 'Enabled.' After relaunching the browser, you should be
                able to download files.
              </p>
            </div>
            <ModalFooter>
              <ModalToggleButton
                className="float-right"
                modalRef={modalRef}
                closer
                aria-labelledby="close-ftp-access-help-modal"
              >
                Done
              </ModalToggleButton>
            </ModalFooter>
          </Modal>
        </>
      </div>
      <div className="grid-row">
        {topics.map((topic) => {
          return (
            <div
              className="padding-top-2 padding-bottom-2 desktop:grid-col-6 mobile-lg:grid-col-12 padding-right-3 text-base-darkest"
              key={`container-${topic.name.replace(/ /g, '-')}`}
            >
              {' '}
              <h2 className="text-bold font-heading-xl">{topic.name} </h2>
              <div className="line-height-sans-6 margin-left-neg-3">
                {topic.descriptions}
              </div>
              <a target="_blank" rel="noopener noreferrer" href={topic.url}>
                <Button
                  className="margin-top-1 margin-left-05"
                  outline="true"
                  type="button"
                  to={topic.url}
                  role="link"
                  rel={topic.name}
                  title={`Go to ${topic.name} page`}
                  key={topic.url}
                  id={`${topic.name.split(' ').join('')}`}
                >
                  Access {`${topic.name} `} Data
                </Button>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BulkDataFiles;
