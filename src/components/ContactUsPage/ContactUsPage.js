import React, { useEffect, useState } from 'react';

import { ContactForm } from "@us-epa-camd/easey-design-system";
import { metaAdder } from '../../utils/document/metaAdder';

const ContactUsPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(false);

  useEffect(() => {
    document.title = 'Contact Us | CAMPD | US EPA';
  }, []);

  metaAdder(
    'description',
    'TO BE UPDATED.'
  );
  metaAdder(
    'keywords',
    'CAMPD, emissions, allowance, compliance, apportionment, substitute data, EIA data cross walk, tutorials, guides'
  );

  const commentTypes = [
    {
      id: 1,
      value: `Help using application`,
    },
    {
      id: 2,
      value: `Report a bug`,
    },
    {
      id: 3,
      value: `Data question`,
    },
    {
      id: 4,
      value: `Suggested enhancement`,
    },
    {
      id: 5,
      value: `Other`,
    },
  ];

  const onSubmitHandler = () => {
    setSubmitted(true);

    // TODO: set this based on succesful call to api to send email
    const x = Math.random() * (10 - 1) + 1
    setSubmitStatus(x <= 5 ? false : true);
  }

  return (
    <div className="padding-y-2 mobile-lg:padding-x-2 tablet:padding-x-4 widescreen:padding-x-10 font-sans-sm text-base-darkest text-ls-1 line-height-sans-5">
      <ContactForm
        summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla massa in lectus volutpat scelerisque. Craseu leo vel lacus tincidunt molestie. Vestibulum faucibus enim sit amet pretium laoreet."
        subjects={commentTypes}
        onSubmit={() => onSubmitHandler()}
        submitted={submitted}
        submitStatus={submitStatus}
        submitStatusText={
          submitStatus ?
            "Thank you, your form has been submitted and an email confirmation will be sent to you shortly."
          : "An error occurred while submitting your comment. Please try again later!"
        }
      />
    </div>
  );
};

export default ContactUsPage;
