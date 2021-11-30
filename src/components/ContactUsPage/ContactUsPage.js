import React, { useEffect, useState } from 'react';
import { ContactForm } from '@us-epa-camd/easey-design-system';

import { metaAdder } from '../../utils/document/metaAdder';
import { sendNotificationEmail } from '../../utils/api/quartzApi';
import { Link } from '@trussworks/react-uswds';

import './ContactUsPage.scss';

const ContactUsPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState('');

  useEffect(() => {
    document.title = 'Contact Us | CAMPD | US EPA';
  }, []);

  metaAdder(
    'description',
    'Utilize the Contact us page to submit a help ticket to the Clean Air Markets Division'
  );
  metaAdder('keywords', 'CAMPD, CAMD, help, contact, support, ticket');

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
      value: `Suggested enhancements`,
    },
    {
      id: 5,
      value: `Other`,
    },
  ];

  const onSubmitHandler = () => {
    // form data selectors
    let subject = '';
    const message = document.querySelector('#txtComment').value;
    const fromEmail = document.querySelector('#txtEmail').value;
    const checkedSubjectId = document.querySelector(
      "fieldset div input[name='radioSubject']:checked"
    );

    // Get label of selected radio button (comment types / subject)
    if (checkedSubjectId) {
      subject = commentTypes.find(
        (type) => type.id === parseInt(checkedSubjectId.value)
      ).value;
    }

    // Handle blank fields
    if (fromEmail === '' || subject === '' || message === '') {
      setSubmitStatus(false);
      setSubmitted(true);
      setEmailErrorMsg(
        'All fields are required. Please fill in the form completely and try again.'
      );
    }

    // Attempt API call (send email notification)
    else {
      const payload = {
        fromEmail: fromEmail,
        subject: subject,
        message: message,
      };

      sendNotificationEmail(payload)
        // Successful submission
        .then((res) => {
          console.log(res);
          setSubmitStatus(true);
          setSubmitted(true);
        })

        // Error returned
        .catch((error) => {
          console.log(error);
          setSubmitStatus(false);
          setSubmitted(true);
          setEmailErrorMsg(
            'An error occurred while submitting your comment. Please try again later!'
          );
        });
    }
  };

  const summaryText = (
    <p>
      Please visit our helpful{' '}
      <Link href={'/help-support/tutorials'}>Tutorials</Link> and{' '}
      <Link href={'/help-support/faqs'}>FAQs</Link> pages to answer questions,
      resolve issues, and/or find additional support. If further assistance is
      needed, submit a help ticket using the form below.
    </p>
  );

  return (
    <div className="contact-us-header margin-top-neg-3 desktop:margin-top-neg-4 widescreen:margin-top-neg-8 margin-bottom-9 mobile-lg:padding-x-2 tablet:padding-x-4 widescreen:padding-x-10 font-sans-sm text-base-darkest text-ls-1 line-height-sans-5">
      <ContactForm
        summary={summaryText}
        subjects={commentTypes}
        onSubmit={(e) => onSubmitHandler()}
        submitted={submitted}
        submitStatus={submitStatus}
        submitStatusText={
          submitStatus
            ? 'Thank you, your form has been submitted and an email confirmation will be sent to you shortly.'
            : emailErrorMsg
        }
      />
    </div>
  );
};

export default ContactUsPage;
