import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Modal,
  ModalToggleButton,
  ModalHeading,
  ModalFooter,
} from '@trussworks/react-uswds';

import { metaAdder } from '../../utils/document/metaAdder';

const BulkDataFiles = () => {
  const modalRef = useRef();
  const [modalFocus, setModalFocus] = useState(false);
  const [closeFocused, setCloseFocused] = useState(false);

  useEffect(() => {
    document.title = 'Bulk Data Files | CAMPD | US EPA';
  }, []);

  useEffect(()=>{
    if(modalRef.current.modalIsOpen){
      const closeButton = document.getElementsByClassName("usa-button usa-modal__close")[0];
      if(!closeFocused){
        closeButton.focus();
        setCloseFocused(true);
        closeButton.addEventListener("click", ()=>setCloseFocused(false), false);
      }
      closeButton.children[0].removeAttribute("aria-hidden");
      const doneButton = document.getElementsByClassName("usa-modal__footer")[0].children[0];
      doneButton.addEventListener("click", ()=>setCloseFocused(false), false);
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  },[modalFocus]);

  metaAdder(
    'description',
    'The bulk data files page provides access to larger bulk downloads of apportioned and raw emissions, allowance, and compliance data'
  );
  metaAdder(
    'keywords',
    'EPA CAMD, FTP, prepackaged data download, static datasets, AMPD, emissions data, allowance, compliance, Clean air markets program data, emissions, analysis,  facility information, CAMPD, AMPD, CAMD'
  );

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
          <li>Monitoring Plan Submittals</li>
          <li>QA data (updated quarterly)</li>
        </ul>
      ),
      url: 'https://gaftp.epa.gov/DMDnLoad/xml',
    },
  ];

  return (
    <div className="padding-y-2 mobile-lg:padding-x-2 tablet:padding-x-4 widescreen:padding-x-10 font-sans-sm text-base-darkest text-ls-1 line-height-sans-6">
      <h1 className="font-sans-2xl text-bold">
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
        <Button className="tablet:margin-right-2" onClick={()=>window.open("https://gaftp.epa.gov/DMDnLoad/", "_blank")}>Access the FTP Site</Button>
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
            onFocus={()=>setModalFocus(!modalFocus)}
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
                Some browsers have discontinued support of the ftp:// protocol
                and/or changed settings that prevent access to FTP sites. The
                options below provide a workaround.
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
              className="padding-y-2 desktop:grid-col-6 mobile-lg:grid-col-12 padding-right-3 text-base-darkest"
              key={`container-${topic.name.replace(/ /g, '-')}`}
            >
              {' '}
              <h2 className="text-bold font-heading-xl">{topic.name} </h2>
              <div className="line-height-sans-6 margin-left-neg-3">
                {topic.descriptions}
              </div>
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
                  onClick={()=>window.open(topic.url, "_blank")}
                >
                  {
                    (topic.name === 'Allowances'
                      ? 'Access Allowance Data'
                      : `Access ${topic.name} Data`)
                  }
                </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BulkDataFiles;
