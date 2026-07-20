"use client";
import React, { useRef, useState } from "react";
import YardsMap from "@/components/carsListings/YardsMap";
import { postContactUs } from "@/utils/APIs";
import toast from "react-hot-toast";
export default function Contact() {
  const formRef = useRef();
  const [success, setSuccess] = useState(true);
  const [ContactSending, setContactSending] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showError, setShowError] = useState("");
  const [formData, setFormData] = useState({
    "name": "",
    "email": "",
    "tel": "",
    "subject": "",
    "message": "",
    user_id: 1,
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

  const sendContactUs = async (e) => {
    e.preventDefault();
    setContactSending(true);
    setShowError("");
    try {
      await postContactUs(formData);
      setSuccess(true);
      handleShowMessage();
      setFormData({
        "name": "",
        "email": "",
        "tel": "",
        "subject": "",
        "message": "",
        user_id: 1,

      });
    } catch (error) {
      setSuccess(false);
      setShowError(error);
      handleShowMessage();
      toast.error(error);
    } finally {
      setContactSending(false);
    }
  };

  // const sendContactUs = (e) => {
  //   e.preventDefault();
  //   emailjs
  //     .sendForm("service_noj8796", "template_fs3xchn", formRef.current, {
  //       publicKey: "iG4SCmR-YtJagQ4gV",
  //     })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         setSuccess(true);
  //         handleShowMessage();

  //         formRef.current.reset();
  //       } else {
  //         setSuccess(false);
  //         handleShowMessage();
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  return (
    <>
      <section className="flat-property">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-heading justify-content-center justify-content-md-between gap-3 mb-0 flex-two flex-wrap">
                <div>
                  <h1 className="heading-listing text-center text-md-start">Contact us</h1>
                  <p className="mt-12 text-center  text-md-start">
                    Feel free to connect with us through our online channels for
                    updates, news, and more.
                  </p>
                </div>
                <div className="social-listing flex-six flex-wrap">
                  <p>Share this page:</p>
                  <div className="icon-social style1">
                    <a href="javascript:void(0)">
                      <i className="icon-autodeal-facebook" />
                    </a>
                    {/* <a href="javascript:void(0)">
                      <i className="icon-autodeal-linkedin" />
                    </a> */}
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
      </section>
      <section className="tf-section-contact">
        <div className="container">
          <div className="row">
            <div className="col-md-8 contact-left">
              <div className="heading-section mb-30">
                {/* <h2>Drop Us a Line</h2> */}
                {/* <p className="mt-12">
                  Feel free to connect with us through our online channels for
                  updates, news, and more.
                </p> */}
              </div>
              <div id="comments" className="comments">
                <div className="respond-comment">
                  <form
                    onSubmit={sendContactUs}
                    ref={formRef}
                    id="loan-calculator"
                    className="comment-form form-submit"
                    acceptCharset="utf-8"
                  >
                    <div className="grid-sw-2">
                      <fieldset className="email-wrap style-text">
                        <label className="font-1 fs-14 fw-5">Name</label>
                        <input
                          type="text"
                          className="tb-my-input"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                        />
                      </fieldset>
                      <fieldset className="phone-wrap style-text">
                        <label className="font-1 fs-14 fw-5">
                          Email address
                        </label>
                        <input
                          type="email"
                          className="tb-my-input"
                          name="email"
                          placeholder="Your email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="grid-sw-2">
                      <fieldset className="email-wrap style-text">
                        <label className="font-1 fs-14 fw-5">
                          Phone Numbers
                        </label>
                        <input
                          type="tel"
                          className="tb-my-input"
                          name="tel"
                          value={formData.tel}
                          onChange={handleChange}
                          placeholder="Phone Numbers"
                          required
                        />
                      </fieldset>
                      <fieldset className="phone-wrap style-text">
                        <label className="font-1 fs-14 fw-5">Subject</label>
                        <input
                          type="text"
                          className="tb-my-input"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Enter Keyword"
                          required
                        />
                      </fieldset>
                    </div>
                    <fieldset className="phone-wrap style-text">
                      <label className="font-1 fs-14 fw-5">Your Message</label>
                      <textarea
                        id="comment-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        tabIndex={4}
                        placeholder="Your message"
                        aria-required="true"
                        required
                      />
                    </fieldset>
                    <div
                      className={`tfSubscribeMsg  footer-sub-element ${showMessage ? "active" : ""
                        }`}
                    >
                      {success ? (
                        <p style={{ color: "rgb(52, 168, 83)" }}>
                          Message has been sent successfully
                        </p>
                      ) : (
                        <p style={{ color: "red" }}>Message Failed: ({showError})</p>
                      )}
                    </div>
                    <div className="button-boxs">
                      <button className="sc-button d-none d-md-block" name="submit" type="submit">
                        <span>Send Message</span>
                      </button>
                      <button disabled={ContactSending} className="sc-button w-100 d-block d-md-none" name="submit" type="submit">
                        <span>{ContactSending ? "Sending Message..." : "Send Message"}</span>
                      </button>

                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-4 contact-right">
              <div className="contact-info box-sd">
                <h2 className="mb-30">Contact Us</h2>
                <div className="wrap-info">
                  <div className="box-info">
                    <h5>Address</h5>
                    <p>
                      101 E 129th St, East Chicago, IN 46312 <br />
                      United States
                    </p>
                  </div>
                  <div className="box-info">
                    <h5>Infomation:</h5>
                    <p>1-333-345-6868</p>
                    <p>themesflat@gmail.com</p>
                  </div>
                  {/* <div className="box-info">
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
                      {/* <a href="javascript:void(0)">
                        <i className="icon-autodeal-linkedin" />
                      </a> */}
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
      <div className="mb-5">
        <YardsMap height={"600px"} />

      </div>
    </>
  );
}
