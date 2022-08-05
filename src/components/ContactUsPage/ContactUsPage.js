import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link as USWDSLink } from '@trussworks/react-uswds';
import { ContactForm } from '@us-epa-camd/easey-design-system';

import { metaAdder } from '../../utils/document/metaAdder';
import getContent from '../../utils/api/getContent';
import { sendNotificationEmail } from '../../utils/api/notificationsApi';
import { isEmailValid } from '../../utils/selectors/general';

import './ContactUsPage.scss';

const ContactUsPage = () => {
  const [mainContent, setMainContent] = useState();
  const [commentTypes, setCommentTypes] = useState([]);
  const [submitStatusText, setSubmitStatusText] = useState([]);

  const [submitted, setSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState('');

  useEffect(() => {
    document.title = 'Contact Us | CAMPD | US EPA';

    // This is done to have the page structure 508 compliant
    const h3Tag = document.querySelector('h3');
    h3Tag.outerHTML = '';
  }, []);

  useEffect(() => {
    const usaAlert = document.querySelector('.usa-alert');
    if (usaAlert) {
      window.scrollTo(0, document.body.scrollHeight);
      usaAlert.setAttribute('tabIndex', 0);
      usaAlert.focus();

      const h4Tag = document.querySelector('h4');
      if (h4Tag) {
        h4Tag.outerHTML = `<h2> ${h4Tag.innerHTML} </h2>`;
      } else {
        const h2Tag = document.querySelector('h2');
        h2Tag.outerHTML = `<h2> ${submitStatus ? 'Success' : 'Error'} </h2>`;
      }
    }
  }, [submitted, submitStatus]);

  metaAdder(
    'description',
    'Utilize the Contact us page to submit a help ticket to the Clean Air Markets Division'
  );
  metaAdder('keywords', 'CAMPD, CAMD, help, contact, support, ticket');

  useEffect(() => {
    getContent('/campd/help-support/contact-us/index.md').then((resp) =>
      setMainContent(resp.data)
    );

    getContent('/campd/help-support/contact-us/comment-types.json').then(
      (resp) => setCommentTypes(resp.data)
    );

    getContent('/campd/help-support/contact-us/submit-status-text.json').then(
      (resp) => {
        const modifiedStatusObject = resp.data.map((status) => {
          if (status.hasOwnProperty('email')) {
            const splitMessage = status.message.split('[email]');
            return {
              status: status.status,
              message: (
                <span>
                  {splitMessage[0]}
                  <USWDSLink
                    to="#"
                    onClick={(e) => {
                      window.location = `mailto:${status.email}`;
                      e.preventDefault();
                    }}
                  >
                    {status.email}
                  </USWDSLink>
                  {splitMessage[1]}
                </span>
              ),
            };
          } else {
            return status;
          }
        });
        setSubmitStatusText(modifiedStatusObject);
      }
    );
  }, []);

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
        submitStatusText.find(
          (statusText) => statusText.status === 'error-incomplete-fields'
        ).message
      );//validates email address
    } else if (!isEmailValid(fromEmail)){
      setSubmitStatus(false);
      setSubmitted(true);
      setEmailErrorMsg(
        submitStatusText.find(
          (statusText) => statusText.status === 'error-invalid-email'
        ).message
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
          setSubmitStatus(true);
          setSubmitted(true);
        })

        // Error returned
        .catch((error) => {
          setSubmitStatus(false);
          setSubmitted(true);
          setEmailErrorMsg(
            submitStatusText.find(
              (statusText) =>
                statusText.status === 'error-unsuccessful-submition'
            ).message
          );
        });
    }
  };

  return (
    <div className="contact-us-wrapper padding-y-2 mobile-lg:padding-x-2 tablet:padding-x-4 widescreen:padding-x-10 font-sans-sm text-base-darkest text-ls-1 line-height-sans-5">
      <ReactMarkdown
        children={mainContent}
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, ...props }) => (
            <USWDSLink {...props} target="_blank" rel="noopener noreferrer" />
          ),
        }}
      />
      <div className="margin-top-neg-3">
        <ContactForm
          title=""
          summary=""
          subjects={commentTypes}
          onSubmit={(e) => onSubmitHandler()}
          submitted={submitted}
          submitStatus={submitStatus}
          submitStatusText={
            submitStatus
              ? submitStatusText.find(
                  (statusText) => statusText.status === 'success'
                ).message
              : emailErrorMsg
          }
        />
      </div>
    </div>
  );
};

export default ContactUsPage;
