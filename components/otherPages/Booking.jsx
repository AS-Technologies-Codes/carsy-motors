"use client";

import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { saveBooking } from "@/utils/APIs";
import { useParams } from "next/navigation";

export default function Booking() {
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
          <div className="col-md-8 contact-left">
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
                    <div className="col-12 col-md-6">
                      <fieldset className="email-wrap style-text">
                        <label className="font-1 fs-14 fw-5">
                          Customer Name*
                        </label>
                        <input
                          type="text"
                          className="tb-my-input"
                          name="customer_name"
                          placeholder="Your Name"
                          value={formData.customer_name}
                          onChange={handleChange}
                          required
                        />
                      </fieldset>
                    </div>

                    <div className="col-12 col-md-6">
                      <fieldset className="phone-wrap style-text">
                        <label className="font-1 fs-14 fw-5">
                          Customer Email*
                        </label>
                        <input
                          type="email"
                          className="tb-my-input"
                          name="customer_email"
                          placeholder="Your Email"
                          value={formData.customer_email}
                          onChange={handleChange}
                          required
                        />
                      </fieldset>
                    </div>

                    <div className="col-12 col-md-6">
                      <fieldset className="phone-wrap style-text">
                        <label className="font-1 fs-14 fw-5">
                          Customer Phone*
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

                    <div className="col-12 col-md-6">
                      <fieldset className="phone-wrap style-text">
                        <label className="font-1 fs-14 fw-5">
                          Booking Date*
                        </label>
                        <input
                          type="date"
                          className="tb-my-input"
                          name="booking_date"
                          value={formData.booking_date}
                          onChange={handleChange}
                          required
                        />
                      </fieldset>
                    </div>

                    <div className="col-12 col-md-6">
                      <fieldset className="phone-wrap style-text">
                        <label className="font-1 fs-14 fw-5">Start Date*</label>
                        <input
                          type="date"
                          className="tb-my-input"
                          name="start_date"
                          value={formData.start_date}
                          onChange={handleChange}
                          required
                        />
                      </fieldset>
                    </div>

                    <div className="col-12 col-md-6">
                      <fieldset className="phone-wrap style-text">
                        <label className="font-1 fs-14 fw-5">End Date*</label>
                        <input
                          type="date"
                          className="tb-my-input"
                          name="end_date"
                          min={formData.start_date}
                          value={formData.end_date}
                          onChange={handleChange}
                          required
                        />
                      </fieldset>
                    </div>

                    {/* <div className="col-12 rental-type-booking">
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
                            className={`booking-option d-flex align-items-center p-3 py-2 mx-1 justify-content-center border-color-gray text-color-3 border-half rounded-4 ${
                              formData.rental_type === "short_term" ? "active" : ""
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
                            className={`booking-option d-flex align-items-center p-3 py-2 mx-1 justify-content-center border-color-gray text-color-3 border-half rounded-4 ${
                              formData.rental_type === "long_term" ? "active" : ""
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
                    </div> */}

                    <div className="col-12">
                      <fieldset className="phone-wrap style-text">
                        <label className="font-1 fs-14 fw-5">Amount*</label>
                        <input
                          type="number"
                          className="tb-my-input"
                          name="amount"
                          placeholder="Enter Amount"
                          value={formData.amount}
                          onChange={handleChange}
                          required
                        />
                      </fieldset>
                    </div>

                    <div className="col-12">
                      <fieldset className="phone-wrap style-text">
                        <label className="font-1 fs-14 fw-5">Notes</label>
                        <textarea
                          id="comment-message"
                          name="notes"
                          rows={4}
                          tabIndex={4}
                          placeholder="Additional notes"
                          aria-required="true"
                          value={formData.notes}
                          onChange={handleChange}
                        />
                      </fieldset>
                    </div>
                  </div>

                  <div
                    className={`tfSubscribeMsg footer-sub-element ${
                      showMessage ? "active" : ""
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
                      <span>{saving ? "Submitting..." : "Submit"}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-4 contact-right">
            <div className="contact-info box-sd">
              <h2 className="mb-30">Book This Car</h2>
              <div className="wrap-info">
                <div className="box-info">
                  <h5>Quick booking request</h5>
                  <p>
                    Submit your preferred dates and contact details to request a
                    booking for this vehicle.
                  </p>
                </div>
                <div className="box-info">
                  <h5>What happens next?</h5>
                  <p>
                    We will review your request and contact you with the next
                    steps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
