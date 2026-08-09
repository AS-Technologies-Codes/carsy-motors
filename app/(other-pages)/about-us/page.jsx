import Agents from "@/components/common/Agents";
import Brands from "@/components/common/Brands";
import Footer1 from "@/components/footers/Footer1";
import RecomandedCars from "@/components/common/RecomandedCars";
import Header2 from "@/components/headers/Header1";
import Testimonials from "@/components/homes/home-7/Testimonials";
import Features from "@/components/homes/home-3/Features";
import Banner from "@/components/otherPages/about/Banner";

import React from "react";
import Link from "next/link";
import { Metadata } from "@/utils/metadata";

export const metadata = Metadata("About us");

export default function page() {
  return (
    <>
      <div className="header-fixed">
        <Header2 bg="style1" />
      </div>
      <Banner />
      <section className="flat-title">
        <div className="container2">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-inner style">
                <div className="title-group fs-12">
                  <Link className="home fw-6 text-color-3" href={`/`}>
                    Home
                  </Link>
                  <span>About us</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flat-property">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-heading justify-content-center justify-content-md-between gap-3 mb-0 flex-two flex-wrap">
                <div>
                  <h1 className="heading-listing">About Us</h1>
                  {/* <p className="mt-12">
                    Feel free to connect with us through our online channels for
                    updates, news, and more.
                  </p> */}
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
      <div className="mt-5"></div>
      <div className="container mb-5 pb-3">
        <div className="contact-info box-sd w w-100">
          <div className="wrap-info">
            <div className="box-info">
              <h2 className="mb-2 text-center text-md-start">Heading 1</h2>
              <p className="text-center text-md-start">
                paragraph paragraph paragraph paragraph paragraph paragraph paragraph
                paragraph paragraph paragraph paragraph paragraph paragraph paragraph
                paragraph paragraph paragraph paragraph paragraph paragraph paragraph
                paragraph paragraph paragraph paragraph paragraph paragraph paragraph
                paragraph paragraph paragraph paragraph paragraph paragraph paragraph
                paragraph paragraph paragraph paragraph paragraph paragraph paragraph
                paragraph paragraph paragraph paragraph paragraph paragraph paragraph
                paragraph paragraph paragraph paragraph paragraph paragraph paragraph
              </p>
            </div>
            <div className="box-info">
              <h2 className="mb-2 text-center text-md-start">Heading 1</h2>
              <p className="text-center text-md-start">
                paragraph paragraph paragraph paragraph paragraph paragraph paragraph
                paragraph paragraph paragraph paragraph paragraph paragraph paragraph
                paragraph paragraph paragraph paragraph paragraph paragraph paragraph
                paragraph paragraph paragraph paragraph paragraph paragraph paragraph
                paragraph paragraph paragraph paragraph paragraph paragraph paragraph
                paragraph paragraph paragraph paragraph paragraph paragraph paragraph
                paragraph paragraph paragraph paragraph paragraph paragraph paragraph
                paragraph paragraph paragraph paragraph paragraph paragraph paragraph
              </p>
            </div>
            <div className="box-info">
              <h2 className="mb-2 text-center text-md-start">Heading 1</h2>
              <p className="text-center text-md-start">
                paragraph paragraph paragraph paragraph paragraph paragraph paragraph
                paragraph paragraph paragraph paragraph paragraph paragraph paragraph
                paragraph paragraph paragraph paragraph paragraph paragraph paragraph
                paragraph paragraph paragraph paragraph paragraph paragraph paragraph
                paragraph paragraph paragraph paragraph paragraph paragraph paragraph
                paragraph paragraph paragraph paragraph paragraph paragraph paragraph
                paragraph paragraph paragraph paragraph paragraph paragraph paragraph
                paragraph paragraph paragraph paragraph paragraph paragraph paragraph
              </p>
            </div>
            {/* <div className="box-info">
                    <h2>Opentime:</h2>
                    <p>Monay - Friday: 08:00 - 20:00</p>
                    <p>Saturday - Sunday: 10:00 - 18:00</p>
                  </div> */}
            <div className="box-info mt-5 pt-3 d-flex d-md-block flex-column align-items-center">
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
      {/* <Features /> */}
      {/* <Agents parentClass="tf-section3" /> */}
      <Brands />
      <div className="mb-5">
        <Testimonials />
      </div>
      <RecomandedCars />
      <Footer1 />
    </>
  );
}
