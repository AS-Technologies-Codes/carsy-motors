"use client";

import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { saveBooking } from "@/utils/APIs";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getFiltersData } from "@/context/reducer/carFilterReducer";
import { useCarFilter } from "@/context/providers/CarFilterContext";
import { useRouter } from "next/navigation";

export default function RentBooking() {
  const formRef = useRef(null);
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const { state, dispatch } = useCarFilter();
  const { extras, rentalFilters } = state;
  const filtersData = getFiltersData();
  console.log(filtersData);

  const getDifference = () => {
    // 3. Create valid Date objects (Format: YYYY-MM-DDTHH:mm)
    const start = new Date(`${filtersData?.pickUpDate}T${filtersData?.pickUpTime}`);
    const end = new Date(`${filtersData?.ReturnDate}T${filtersData?.ReturnTime}`);

    // 4. Calculate the difference in milliseconds
    const differenceInMs = end - start;

    // 5. Convert milliseconds to days
    return differenceInMs / (1000 * 60 * 60 * 24);
  }

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    customer_email: "",
    customer_phone: "",
    dob: new Date().toISOString().slice(0, 10),
    amount: (getDifference() * filtersData?.per_day_price).toFixed(0),
  });

  console.log({ formData });

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
      !formData.first_name ||
      !formData.last_name ||
      !formData.customer_email ||
      !formData.customer_phone ||
      !formData.dob
    ) {
      toast.error("Please fill in all required booking fields");
      return;
    }


    const body = {
      car_id: filtersData.id,
      customer_name: `${formData.first_name} ${formData.last_name}`,
      customer_email: formData.customer_email,
      customer_phone: formData.customer_phone,
      dob: formData.dob,
      end_date: `${filtersData.ReturnDate}-${filtersData.ReturnTime}`,
      start_date: `${filtersData.pickUpDate}-${filtersData.pickUpTime}`,
      plan: filtersData.plan,
      plan_amount: filtersData.plan_amount,
      pickup_location: filtersData.YardLocation,
      return_location: filtersData.YardLocation,
      extra: extras.filter(extra => extra.value).length ? JSON.stringify(extras.filter(extra => extra.value)?.map(extra => ({ id: extra.id, value: extra.value }))) : "",
      type: filtersData.car_type,
      rental_type: filtersData.rent_type,
      total_amount: formData.amount,
      program: formData?.program,
      payment_type: rentalFilters?.payment_type,
      booking_date: new Date().toISOString(),
    }
    console.log({ body });
    setSaving(true);
    try {
      await saveBooking(body);
      setSuccess(true);
      handleShowMessage();
      // setFormData({
      //   customer_name: "",
      //   customer_email: "",
      //   customer_phone: "",
      //   dob: new Date().toISOString().slice(0, 10),
      //   rental_type: "short",
      //   amount: "",
      // });
      // window.localStorage.removeItem("filters");
      // router.push(`/rentals/${body.rental_type}`)
    } catch (error) {
      console.log({ error });
      setSuccess(false);
      handleShowMessage();
      toast.error(error || "Booking submission failed");
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
                          name="customer_email"
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

                    <div className="listing-line">
                    </div>
                    <div className="col-12">
                      <fieldset className="phone-wrap style-text">
                        <label className="font-1 fs-14 fw-5">Do you have a frequent traveller program?</label>
                        <select
                          className="nice-select p-3"
                          name="program"
                          value={formData.program}
                          onChange={handleChange}
                        >
                          <option>Select Option</option>
                          <option name="yes">Yes</option>
                          <option name="no">Np</option>
                        </select>
                      </fieldset>
                    </div>

                    <h3 className="mb-3 text-decoration-underline">Price details</h3>

                    <p>
                      Refundable deposit: An additional A$ 300 security desposit will be blocked on your card at the pickup counter and released within a few days of the vehicle's return.
                    </p>

                    {/* <div className="form-group mt-3">
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
                            I have read and accept the{" "}
                            <span className="text-decoration-underline">
                              Rental information,
                            </span>
                            {" "}the{" "}
                            <span className="text-decoration-underline">
                              Terms and Conditions,
                            </span>
                            {" "}and the{" "}
                            <span className="text-decoration-underline">
                              Privacy Policy
                            </span>
                          </span>
                        </label>
                      </div>
                    </div> */}

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

                  <div className="button-boxs mt-3 invisible">
                    <button
                      className="sc-button"
                      id="book-now-btn"
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
