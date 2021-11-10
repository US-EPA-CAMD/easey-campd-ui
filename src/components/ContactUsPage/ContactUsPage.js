import React, { useEffect } from 'react';

import { ContactForm } from "@us-epa-camd/easey-design-system";
import { metaAdder } from '../../utils/document/metaAdder';

const ContactUsPage = () => {
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
      comment: "One",      
    },
    {
      id: 2,
      comment: "Two",
    },
    {
      id: 3,
      comment: "Three",      
    },
    {
      id: 4,
      comment: "Four",      
    },
  ];

  return (
    <ContactForm
      summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla massa in lectus volutpat scelerisque. Craseu leo vel lacus tincidunt molestie. Vestibulum faucibus enim sit amet pretium laoreet."
      subjects={commentTypes}
    />
  );
};

export default ContactUsPage;
