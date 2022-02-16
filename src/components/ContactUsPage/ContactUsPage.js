import React, { useEffect, useState } from "react";
import { ContactForm } from "@us-epa-camd/easey-design-system";

import { metaAdder } from "../../utils/document/metaAdder";
import { sendNotificationEmail } from "../../utils/api/notificationsApi";
import { Link } from "@trussworks/react-uswds";

import "./ContactUsPage.scss";

const ContactUsPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");

  useEffect(() => {
    document.title = "Contact Us | CAMPD | US EPA";

    // This is done to have the page structure 508 compliant
    const h3Tag = document.querySelector("h3");
    h3Tag.outerHTML = `<h1> ${h3Tag.innerHTML} </h1>`;
  }, []);

  useEffect(() => {
    const usaAlert = document.querySelector(".usa-alert");
    if (usaAlert) {
      window.scrollTo(0, document.body.scrollHeight);
      usaAlert.setAttribute("tabIndex", 0);
      usaAlert.focus();

      const h4Tag = document.querySelector("h4");
      if (h4Tag) {
        h4Tag.outerHTML = `<h2> ${h4Tag.innerHTML} </h2>`;
      } else {
        const h2Tag = document.querySelector("h2");
        h2Tag.outerHTML = `<h2> ${submitStatus ? "Success" : "Error"} </h2>`;
      }
    }
  }, [submitted, submitStatus]);

  metaAdder(
    "description",
    "Utilize the Contact us page to submit a help ticket to the Clean Air Markets Division"
  );
  metaAdder("keywords", "CAMPD, CAMD, help, contact, support, ticket");

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
    let subject = "";
    const message = document.querySelector("#txtComment").value;
    const fromEmail = document.querySelector("#txtEmail").value;
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
    if (fromEmail === "" || subject === "" || message === "") {
      setSubmitStatus(false);
      setSubmitted(true);
      setEmailErrorMsg(
        "All fields are required. Please fill in the form completely and try again."
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
            <span>
              An error occurred while submitting your comment. Please resubmit
              your information; or call the Clean Air Markets Division hotline
              202-343-9620; or email{' '}
              <Link
                to="#"
                onClick={(e) => {
                  window.location = 'mailto:campd-support@camdsupport.com';
                  e.preventDefault();
                }}
              >
                campd-support@camdsupport.com
              </Link>
              .
            </span>
          );
        });
    }
  };

  const summaryText = (
    <span>
      Please visit our helpful{" "}
      <Link href={"/help-support/tutorials"}>Tutorials</Link> and{" "}
      <Link href={"/help-support/faqs"}>FAQs</Link> pages to answer questions,
      resolve issues, and/or find additional support. If further assistance is
      needed, submit a help ticket using the form below.
    </span>
  );

  return (
    <div className="contact-us-header padding-y-2 margin-top-neg-4 mobile-lg:padding-x-2 tablet:padding-x-4 widescreen:padding-x-10 font-sans-sm text-base-darkest text-ls-1 line-height-sans-5">
      <ContactForm
        summary={summaryText}
        subjects={commentTypes}
        onSubmit={(e) => onSubmitHandler()}
        submitted={submitted}
        submitStatus={submitStatus}
        submitStatusText={
          submitStatus ? (
            <span>
              Success! You will be sent a confirmation email within the next 24
              hours. If you do not receive a notification, please resubmit your
              issue, reach out to the Clean Air Markets Division hotline at
              202-343-9620, or email{" "}
              <Link
                to="#"
                onClick={(e) => {
                  window.location = "mailto:campd-support@camdsupport.com";
                  e.preventDefault();
                }}
              >
                campd-support@camdsupport.com
              </Link>{" "}
              directly.
            </span>
          ) : (
            emailErrorMsg
          )
        }
      />
    </div>
  );
};

export default ContactUsPage;
