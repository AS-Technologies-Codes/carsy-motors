"use client";

import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { saveBooking } from "@/utils/APIs";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function RentBooking() {
  const { id } = useParams();
  const formRef = useRef(null);
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    car_id: id ? Number(id) : "",
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    booking_date: new Date().toISOString().slice(0, 10),
    start_date: new Date().toISOString().slice(0, 10),
    end_date: new Date().toISOString().slice(0, 10),
    rental_type: "short_term",
    amount: "",
    notes: "",
  });

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.car_id ||
      !formData.customer_name ||
      !formData.customer_email ||
      !formData.customer_phone ||
      !formData.booking_date ||
      !formData.start_date ||
      !formData.end_date ||
      !formData.rental_type ||
      !formData.amount
    ) {
      toast.error("Please fill in all required booking fields");
      return;
    }

    if (new Date(formData.end_date) <= new Date(formData.start_date)) {
      toast.error("End date must be after start date");
      return;
    }

    setSaving(true);
    try {
      await saveBooking(formData);
      setSuccess(true);
      handleShowMessage();
      setFormData({
        car_id: id ? Number(id) : "",
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        booking_date: new Date().toISOString().slice(0, 10),
        start_date: new Date().toISOString().slice(0, 10),
        end_date: new Date().toISOString().slice(0, 10),
        rental_type: "short_term",
        amount: "",
        notes: "",
      });
    } catch (error) {
      console.error(error);
      setSuccess(false);
      handleShowMessage();
      toast.error(error?.message || "Booking submission failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="tf-section-contact">
      <div className="container">
        <div className="row">
          <div className="col-md-12 contact-left">
            <div id="comments" className="comments">
              <h2 className="my-5">Booking Details</h2>
              <div className="respond-comment">
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  id="booking-form"
                  className="comment-form form-submit"
                  acceptCharset="utf-8"
                >
                  <div className="row col-12">
                    <div className="col-12">
                      <fieldset className="email-wrap style-text">
                        <label className="font-1 fs-14 fw-5">
                          First Name*
                        </label>
                        <input
                          type="text"
                          className="tb-my-input"
                          name="first_name"
                          placeholder="Your Name"
                          value={formData.first_name}
                          onChange={handleChange}
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-12">
                      <fieldset className="email-wrap style-text">
                        <label className="font-1 fs-14 fw-5">
                          Last Name*
                        </label>
                        <input
                          type="text"
                          className="tb-my-input"
                          name="last_name"
                          placeholder="Your Name"
                          value={formData.last_name}
                          onChange={handleChange}
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-12">
                      <fieldset className="phone-wrap style-text">
                        <label className="font-1 fs-14 fw-5">
                          Date of Birth*
                        </label>
                        <input
                          type="date"
                          className="tb-my-input"
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-12">
                      <fieldset className="phone-wrap style-text">
                        <label className="font-1 fs-14 fw-5">
                          Email*
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
                          Phone*
                        </label>
                        <input
                          type="tel"
                          className="tb-my-input"
                          name="customer_phone"
                          placeholder="Your Phone Number"
                          value={formData.customer_phone}
                          onChange={handleChange}
                          required
                        />
                      </fieldset>
                    </div>



                    <div className="col-12 rental-type-booking">
                      <fieldset className="phone-wrap style-text">
                        <label className="font-1 fs-14 fw-5">
                          Rental Type*
                        </label>
                        <div className="d-flex gap-2">
                          <div
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                rental_type: "short_term",
                              }))
                            }
                            className={`booking-option d-flex align-items-center p-3 py-2 mx-1 justify-content-center border-color-gray text-color-3 border-half rounded-4 ${formData.rental_type === "short_term" ? "active" : ""
                              }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width={45}
                              strokeWidth={1}
                              fill="white"
                              stroke="#fd5a21"
                              className="size-3"
                            >
                              <path d="M8 2v4" />
                              <path d="M16 2v4" />
                              <rect width="18" height="18" x="3" y="4" rx="2" />
                              <path d="M3 10h18" />
                              <path d="M8 14h.01" />
                              <path d="M12 14h.01" />
                              <path d="M16 14h.01" />
                              <path d="M8 18h.01" />
                              <path d="M12 18h.01" />
                              <path d="M16 18h.01" />
                            </svg>{" "}
                            <h6 className="text-color-2 fw-bold fs-14 ps-1">
                              Short-term <br /> rentals{" "}
                            </h6>
                          </div>
                          <div
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                rental_type: "long_term",
                              }))
                            }
                            className={`booking-option d-flex align-items-center p-3 py-2 mx-1 justify-content-center border-color-gray text-color-3 border-half rounded-4 ${formData.rental_type === "long_term" ? "active" : ""
                              }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width={45}
                              strokeWidth={1}
                              fill="white"
                              stroke="#fd5a21"
                              className="size-3"
                            >
                              <rect width="18" height="18" x="3" y="4" rx="2" />
                              <path d="M16 2v4" />
                              <path d="M3 10h18" />
                              <path d="M8 2v4" />
                              <path d="M17 14h-6" />
                              <path d="M13 18H7" />
                              <path d="M7 14h.01" />
                              <path d="M17 18h.01" />
                            </svg>
                            <h6 className="text-color-2 fw-bold fs-14 ps-1">
                              Long-term <br /> rentals
                            </h6>
                          </div>
                        </div>
                      </fieldset>
                    </div>

                    <div className="col-12">
                      <fieldset className="phone-wrap style-text">
                        <label className="font-1 fs-14 fw-5">Amount</label>
                        <input
                          type="number"
                          disabled
                          className="tb-my-input"
                          name="amount"
                          placeholder="Enter Amount"
                          value={formData.amount}
                          onChange={handleChange}
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="listing-line">
                    </div>
                    <div className="col-12">
                      <fieldset className="phone-wrap style-text">
                        <label className="font-1 fs-14 fw-5">Do you have a frequent traveller program?</label>
                        <select
                          className="nice-select p-3"
                          name="amount"
                          value={formData.amount}
                          onChange={handleChange}
                        >
                          <option>Select Option</option>
                        </select>
                      </fieldset>
                    </div>

                    <h3 className="mb-3 text-decoration-underline">Price details</h3>

                    <p>
                      Refundable deposit: An additional A$ 300 security desposit will be blocked on your card
                    </p>

                    <div className="form-group mt-3">
                          <div>
                            <label className="flex-three align-items-start">
                              <input
                                type="checkbox"
                                name="consentCreditScore"
                                checked={formData?.consentCreditScore}
                                onChange={handleChange}
                                required
                              />
                              <span
                                className="btn-checkbox"
                                // style={{ width: "75px" }}
                              />
                              <span className="text-color-2 font-2">
                              I have read and accept the 
                                <span className="text-decoration-underline">
                                 Rental information,
                                </span>
                                {" "}the{" "} 
                                 <span className="text-decoration-underline">
                                 Terms and Conditions,
                                </span>
                                and the{" "}
                                 <span className="text-decoration-underline">
                                 Privacy Policy
                                </span>
                              </span>
                            </label>
                          </div>
                        </div>

                  </div>

                  <div
                    className={`tfSubscribeMsg footer-sub-element ${showMessage ? "active" : ""
                      }`}
                  >
                    {success ? (
                      <p style={{ color: "rgb(52, 168, 83)" }}>
                        Booking submitted successfully
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
                      disabled={saving}
                    >
                      <span>{saving ? "Booking..." : "Book"}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
