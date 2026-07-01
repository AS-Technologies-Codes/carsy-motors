"use client";
import React, { useRef, useState } from "react";
// import emailjs from "@emailjs/browser";
import Link from "next/link";
import toast from "react-hot-toast";
import { postFinance } from "@/utils/APIs";
import { useParams } from "next/navigation";
export default function Finance() {
  const { id } = useParams();
  const formRef = useRef();
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [SavingEmail, setSavingEmail] = useState(false);
  const [formData, setFormData] = useState({
    car_id: id,
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    mobile: "",
    dateOfBirth: new Date().toISOString().slice(0, 10),
    driver_license: "",
    address: "",
    consentPrivacy: false,
    consentCreditScore: false,
    consentElectronicComm: false,
  });

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const sendMail = async (e) => {
    e.preventDefault();

    console.log(formData);

    // Validate required fields
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.mobile ||
      !formData.dateOfBirth ||
      !formData.driver_license ||
      !formData.address
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSavingEmail(true);
    try {
      // Send form data as API body
      await postFinance(formData);
      setSuccess(true);
      handleShowMessage();
      // Reset form
      setFormData({
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        mobile: "",
        dateOfBirth: new Date().toISOString().slice(0, 10),
        driver_license: "",
        address: "",
        consentPrivacy: false,
        consentCreditScore: false,
        consentElectronicComm: false,
      });
    } catch (error) {
      console.error(error);
      setSuccess(false);
      handleShowMessage();
    } finally {
      setSavingEmail(false);
    }
  };
  return (
    <>
      <section className="tf-section-contact">
        <div className="container">
          <div className="row">
            <div className="col-md-8 contact-left">
              <div id="comments" className="comments">
                <h2 className="my-5">Contact Details</h2>
                <div className="respond-comment">
                  <form
                    onSubmit={sendMail}
                    ref={formRef}
                    id="loan-calculator"
                    className="comment-form form-submit"
                    acceptCharset="utf-8"
                  >
                    <div className="row col-12">
                      <div className="col-12 col-md-6">
                        <fieldset className="email-wrap style-text">
                          <label className="font-1 fs-14 fw-5">
                            First Name*
                          </label>
                          <input
                            type="text"
                            className="tb-my-input"
                            name="first_name"
                            placeholder="Your First Name"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                          />
                        </fieldset>
                      </div>
                      <div className="col-12 col-md-6">
                        <fieldset className="email-wrap style-text">
                          <label className="font-1 fs-14 fw-5">
                            Middle Name
                          </label>
                          <input
                            type="text"
                            className="tb-my-input"
                            name="middle_name"
                            placeholder="Your Middle Name"
                            value={formData.middle_name}
                            onChange={handleChange}
                          />
                        </fieldset>
                      </div>

                      <div className="col-12 col-md-6">
                        <fieldset className="email-wrap style-text">
                          <label className="font-1 fs-14 fw-5">
                            Last Name*
                          </label>
                          <input
                            type="text"
                            className="tb-my-input"
                            name="last_name"
                            placeholder="Your Last Name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                          />
                        </fieldset>
                      </div>
                      <div className="col-12 col-md-6">
                        <fieldset className="phone-wrap style-text">
                          <label className="font-1 fs-14 fw-5">
                            Email Address*
                          </label>
                          <input
                            type="email"
                            className="tb-my-input"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </fieldset>
                      </div>
                      <div className="col-12">
                        <fieldset className="phone-wrap style-text">
                          <label className="font-1 fs-14 fw-5">
                            Mobile Number*
                          </label>
                          <input
                            type="tel"
                            className="tb-my-input"
                            name="mobile"
                            placeholder="Your Mobile Number"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                          />
                        </fieldset>
                      </div>
                      <h2 className="my-5 col-12">Finance Details</h2>

                      <div className="col-12">
                        <fieldset className="phone-wrap style-text">
                          <label className="font-1 fs-14 fw-5">
                            Date of Birth*
                          </label>
                          <input
                            type="date"
                            className="tb-my-input"
                            name="dateOfBirth"
                            placeholder="Your Date of Birth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            required
                          />
                        </fieldset>
                      </div>
                      <div className="col-12">
                        <fieldset className="phone-wrap style-text">
                          <label className="font-1 fs-14 fw-5">
                            Driver License Number*
                          </label>
                          <input
                            type="number"
                            className="tb-my-input"
                            name="driver_license"
                            placeholder="Enter Driver License Number"
                            value={formData.driver_license}
                            onChange={handleChange}
                            required
                          />
                        </fieldset>
                      </div>
                      <div className="col-12">
                        <fieldset className="phone-wrap style-text">
                          <label className="font-1 fs-14 fw-5">
                            Current Address*
                          </label>
                          <textarea
                            id="comment-message"
                            name="address"
                            rows={4}
                            tabIndex={4}
                            placeholder="Your Current Address"
                            aria-required="true"
                            required
                            value={formData.address}
                            onChange={handleChange}
                          />
                        </fieldset>
                      </div>
                    </div>
                    <div className="form-group">
                      <div>
                        <label className="flex-three align-items-start">
                          <input
                            type="checkbox"
                            name="consentPrivacy"
                            checked={formData.consentPrivacy}
                            onChange={handleChange}
                            required
                          />
                          <span className="btn-checkbox" />
                          <span className="text-color-2 font-2">
                            I have read and agree to the Taurus Motor Finance{" "}
                            <Link
                              href="#"
                              className="text-decoration-underline"
                            >
                              Privacy and Credit Reporting notice and consent
                            </Link>
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="form-group mt-3">
                      <div>
                        <label className="flex-three align-items-start">
                          <input
                            type="checkbox"
                            name="consentCreditScore"
                            checked={formData.consentCreditScore}
                            onChange={handleChange}
                            required
                          />
                          <span
                            className="btn-checkbox"
                            style={{ width: "75px" }}
                          />
                          <span className="text-color-2 font-2">
                            I consent to Taurus Motor Finance accessing
                            ScoreSeeker from Equifax to provide me with a
                            personalised interest rate and/or determine my
                            eligibility to apply for finance.
                            <span className="fst-italic">
                              This access does not impact your credit score or
                              leave any record on your credit report.
                            </span>
                            <div className="mt-3">
                              Taurus Motor Finance collects your personal
                              information (i.e. your Name, Date of Birth, Driver
                              Licence, and address details) to access your
                              credit score for your loan interest rate quote
                              and/or determine your eligibility to apply for
                              finance. This score seeker access does not impact
                              your ongoing credit score or leave any enquiry
                              footprint on your credit report. Further
                              information on credit scores and comprehensive
                              credit reporting can be found at{" "}
                              <Link href={"#"}>
                                https://www.creditsmart.org.au/
                              </Link>
                            </div>
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="form-group mt-3">
                      <div>
                        <label className="flex-three align-items-start">
                          <input
                            type="checkbox"
                            name="consentElectronicComm"
                            checked={formData.consentElectronicComm}
                            onChange={handleChange}
                            required
                          />
                          <span
                            className="btn-checkbox"
                            style={{ width: "33px" }}
                          />
                          <span className="text-color-2 font-2">
                            I consent to electronic communication being the
                            primary medium of communication from Taurus Motor
                            Finance including SMS and email, using the contact
                            details provided by me in this credit application
                            <div className="mt-3">
                              If consent is provided, electronic communications
                              must be checked regularly and I can withdraw
                              consent at any time
                            </div>
                          </span>
                        </label>
                      </div>
                    </div>
                    <div
                      className={`tfSubscribeMsg  footer-sub-element ${
                        showMessage ? "active" : ""
                      }`}
                    >
                      {success ? (
                        <p style={{ color: "rgb(52, 168, 83)" }}>
                          Finance application submitted successfully
                        </p>
                      ) : (
                        <p style={{ color: "red" }}>Something went wrong</p>
                      )}
                    </div>
                    <div className="button-boxs mt-3">
                      <button
                        className="sc-button"
                        name="submit"
                        type="submit"
                        disabled={SavingEmail}
                      >
                        <span>{SavingEmail ? "Submitting..." : "Submit"}</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-4 contact-right">
              <div className="contact-info box-sd">
                <h2 className="mb-30">Apply for Finance</h2>
                <div className="wrap-info">
                  <div className="box-info">
                    <h5 className="text-color-3">
                      Provider of car finance in Salisbury QLD
                    </h5>
                  </div>
                  <div className="box-info">
                    <h5>Personalised Finance Solutions</h5>
                    <p>
                      At Cars Moters, our personalised finance solutions make
                      finding the money to purchase your next used car in
                      Brisbane easier than you thought possible.
                    </p>
                  </div>
                  <div className="box-info">
                    <h5>Accredited Finance Partner</h5>
                    <p>
                      We are accredited with Taurus Finance, one of Australia's
                      most innovative finance solution providers.
                    </p>
                  </div>
                  <div className="box-info">
                    <h5>Fast Digital Pre-Approval</h5>
                    <p>
                      Utilising the latest digital innovations, you can be
                      pre-approved & shopping with your personalised finance
                      rate in minutes.
                    </p>
                  </div>
                  {/* <div className="box-info">
                    <h5>Infomation:</h5>
                    <p>1-333-345-6868</p>
                    <p>themesflat@gmail.com</p>
                  </div>
                  <div className="box-info">
                    <h5>Opentime:</h5>
                    <p>Monay - Friday: 08:00 - 20:00</p>
                    <p>Saturday - Sunday: 10:00 - 18:00</p>
                  </div> */}
                  <div className="box-info">
                    <h5>Follow Us:</h5>
                    <div className="icon-social style2">
                      <a href="javascript:void(0)">
                        <i className="icon-autodeal-facebook" />
                      </a>
                      <a href="javascript:void(0)">
                        <i className="icon-autodeal-linkedin" />
                      </a>
                      <a href="javascript:void(0)">
                        <i className="icon-autodeal-twitter" />
                      </a>
                      <a href="javascript:void(0)">
                        <i className="icon-autodeal-instagram" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
