'use client';

import { postFinance } from '@/utils/APIs';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';

/**
 * Multi-step form with a horizontal slide ("SlideHorz") transition.
 *
 * How the slide works:
 * - All steps are rendered side by side inside a flex "track".
 * - The track is shifted with translateX(-currentStep * 100%).
 * - A CSS transition on `transform` animates the shift, so moving
 *   forward slides left and moving back slides right automatically —
 *   no separate enter/exit animation logic needed.
 *
 * No external UI/animation libraries required — just React + styled-jsx
 * (which ships built into Next.js).
 */

const STEPS = [
  { key: 'account', title: 'Account' },
  { key: 'profile', title: 'Profile' },
  { key: 'address', title: 'Address' },
  { key: 'review', title: 'Review' },
];

const INITIAL_DATA = {
  email: '',
  password: '',
  fullName: '',
  role: '',
  street: '',
  city: '',
  zip: '',
};

function validateStep(stepKey, data) {
  const errors = {};

  if (stepKey === 'account') {
    if (!data.email.trim()) errors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) errors.email = 'Enter a valid email';
    if (!data.password) errors.password = 'Password is required';
    else if (data.password.length < 6) errors.password = 'At least 6 characters';
  }

  if (stepKey === 'profile') {
    if (!data.fullName.trim()) errors.fullName = 'Full name is required';
    if (!data.role.trim()) errors.role = 'Role is required';
  }

  if (stepKey === 'address') {
    if (!data.street.trim()) errors.street = 'Street is required';
    if (!data.city.trim()) errors.city = 'City is required';
    if (!data.zip.trim()) errors.zip = 'ZIP code is required';
  }

  return errors;
}

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState(INITIAL_DATA);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const isLastStep = currentStep === STEPS.length - 1;

  function updateField(field, value) {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function goNext() {
    const stepKey = STEPS[currentStep].key;
    const stepErrors = validateStep(stepKey, data);

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setErrors({});
    if (isLastStep) {
      setSubmitted(true);
    } else {
      setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
    }
  }

  function goBack() {
    setErrors({});
    setCurrentStep((s) => Math.max(s - 1, 0));
  }

  function goToStep(index) {
    // Only allow jumping to a step you've already reached
    if (index <= currentStep) {
      setErrors({});
      setCurrentStep(index);
    }
  }

  function reset() {
    setData(INITIAL_DATA);
    setErrors({});
    setCurrentStep(0);
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div className="wrapper">
        <div className="success">
          <div className="success-badge">✓</div>
          <h2>You&apos;re all set</h2>
          <p>Thanks {data.fullName || 'there'}, your account has been created.</p>
          <button className="btn btn-primary" onClick={reset}>
            Start over
          </button>
        </div>
        <style jsx>{`
          .wrapper {
            max-width: 480px;
            margin: 0 auto;
          }
          .success {
            text-align: center;
            padding: 48px 24px;
            border: 1px solid #e5e7eb;
            border-radius: 16px;
            background: #fff;
          }
          .success-badge {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: #16a34a;
            color: #fff;
            font-size: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 16px;
          }
          h2 {
            margin: 0 0 8px;
            font-size: 22px;
          }
          p {
            color: #6b7280;
            margin: 0 0 24px;
          }
        `}</style>
      </div>
    );
  }


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
    <div className="wrapper">
      {/* Step indicator */}
      <div className="steps-header">
        {STEPS.map((step, index) => (
          <button
            key={step.key}
            type="button"
            className={
              'step-dot' +
              (index === currentStep ? ' active' : '') +
              (index < currentStep ? ' completed' : '')
            }
            onClick={() => goToStep(index)}
            disabled={index > currentStep}
          >
            <span className="dot-circle">
              {index < currentStep ? '✓' : index + 1}
            </span>
            <span className="dot-label">{step.title}</span>
          </button>
        ))}
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${(currentStep / (STEPS.length - 1)) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Sliding viewport */}
      <div className="viewport">
        <div
          className="track"
          style={{ transform: `translateX(-${currentStep * 100}%)` }}
        >
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
                      <div className='slide'>

                      <div className="col-12">
                      <h2 className="my-5 col-12">Finance Details</h2>
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
                    </div>
                  </form>
                </div>
              </div>
            </div>

          {/* Step 1: Account */}
          <div className="slide">
            <h3>Create your account</h3>
            <p className="subtitle">Let&apos;s start with the basics.</p>

            <label className="field">
              <span>Email</span>
              <input
                type="email"
                value={data.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="you@example.com"
              />
              {errors.email && <em className="error">{errors.email}</em>}
            </label>

            <label className="field">
              <span>Password</span>
              <input
                type="password"
                value={data.password}
                onChange={(e) => updateField('password', e.target.value)}
                placeholder="At least 6 characters"
              />
              {errors.password && <em className="error">{errors.password}</em>}
            </label>
          </div>

         
        </div>
      </div>

      {/* Navigation */}
      <div className="nav-row">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={goBack}
          disabled={currentStep === 0}
        >
          Back
        </button>
        <button type="button" className="btn btn-primary" onClick={goNext}>
          {isLastStep ? 'Submit' : 'Continue'}
        </button>
      </div>

      <style jsx>{`
        .wrapper {
          max-width: 480px;
          margin: 0 auto;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Step header */
        .steps-header {
          position: relative;
          display: flex;
          justify-content: space-between;
          margin-bottom: 32px;
          padding-top: 6px;
        }
        .progress-track {
          position: absolute;
          top: 17px;
          left: 24px;
          right: 24px;
          height: 2px;
          background: #e5e7eb;
          z-index: 0;
        }
        .progress-fill {
          height: 100%;
          background: #4f46e5;
          transition: width 0.4s cubic-bezier(0.65, 0, 0.35, 1);
        }
        .step-dot {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .step-dot:disabled {
          cursor: default;
        }
        .dot-circle {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #e5e7eb;
          color: #9ca3af;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 600;
          transition: all 0.25s ease;
        }
        .step-dot.active .dot-circle {
          border-color: #4f46e5;
          color: #4f46e5;
        }
        .step-dot.completed .dot-circle {
          background: #4f46e5;
          border-color: #4f46e5;
          color: #fff;
        }
        .dot-label {
          font-size: 11px;
          color: #9ca3af;
          white-space: nowrap;
        }
        .step-dot.active .dot-label {
          color: #111827;
          font-weight: 600;
        }

        /* Sliding viewport */
        .viewport {
          overflow: hidden;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          background: #fff;
        }
        .track {
          display: flex;
          transition: transform 0.45s cubic-bezier(0.65, 0, 0.35, 1);
        }
        .slide {
          flex: 0 0 100%;
          box-sizing: border-box;
          padding: 32px 28px;
          min-height: 300px;
        }

        h3 {
          margin: 0 0 4px;
          font-size: 20px;
          color: #111827;
        }
        .subtitle {
          margin: 0 0 24px;
          color: #6b7280;
          font-size: 14px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 18px;
          font-size: 13px;
          font-weight: 600;
          color: #374151;
        }
        .field-row {
          display: flex;
          gap: 16px;
        }
        .field-row .field {
          flex: 1;
        }
        input {
          font: inherit;
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          font-weight: 400;
          font-size: 14px;
          outline: none;
          transition: border-color 0.15s ease;
        }
        input:focus {
          border-color: #4f46e5;
        }
        .error {
          color: #dc2626;
          font-style: normal;
          font-size: 12px;
          font-weight: 500;
        }

        .summary {
          margin: 0;
          display: grid;
          grid-template-columns: auto 1fr;
          row-gap: 14px;
          column-gap: 16px;
        }
        .summary dt {
          font-size: 12px;
          font-weight: 600;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }
        .summary dd {
          margin: 0;
          font-size: 14px;
          color: #111827;
        }

        .nav-row {
          display: flex;
          justify-content: space-between;
          margin-top: 24px;
        }
        .btn {
          font: inherit;
          font-weight: 600;
          font-size: 14px;
          padding: 11px 22px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: opacity 0.15s ease, transform 0.1s ease;
        }
        .btn:active {
          transform: scale(0.97);
        }
        .btn-primary {
          background: #4f46e5;
          color: #fff;
        }
        .btn-primary:hover {
          opacity: 0.9;
        }
        .btn-secondary {
          background: #f3f4f6;
          color: #374151;
        }
        .btn-secondary:hover {
          opacity: 0.85;
        }
        .btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        @media (prefers-reduced-motion: reduce) {
          .track,
          .progress-fill {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}