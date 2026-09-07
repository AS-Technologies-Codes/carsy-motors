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
                  <span>About Carsy Motors</span>
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
                  <h1 className="heading-listing">About Carsy Motors</h1>
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
              <h2 className="mb-2 text-center text-md-start">Brisbane Cars, Brisbane People</h2>
              <p className="text-center text-md-start">
                At Carsy Motors, we believe buying a car should be simple, straightforward and enjoyable.</p>
            </div>
            <div className="box-info">
              <p className="text-center text-md-start">Based right here in <span className="fw-bold text-black">Rocklea, Brisbane</span>, we’re a local automotive business helping Queenslanders find quality vehicles that suit their lifestyle, their needs and their budget.</p>
            </div>

            <div className="box-info">
              <p className="text-center text-md-start">Whether you’re looking for a reliable first car, upgrading the family SUV, chasing a work ute, moving into a hybrid or EV, or treating yourself to something a little more special, our team is here to help you find the right vehicle without the unnecessary pressure.</p>
            </div>

            <div className="box-info">
              <p className="text-center text-md-start">We’re not a huge national chain where you’re just another number. <span className="fw-bold text-black">We’re a Brisbane business serving Brisbane people</span>, and we want every customer who visits Carsy Motors to feel comfortable coming back to us again.
              </p>
            </div>


            <div className="box-info">
              <h2 className="mb-2 text-center text-md-start">More Than Just a Used Car Dealership</h2>

              <div className="box-info">
                <p className="text-center text-md-start">Carsy Motors was built around a simple idea: make motoring easier.
                </p>
              </div>
              <div className="box-info">
                <p className="text-center text-md-start">From our Rocklea location, we offer a wide selection of quality pre-owned vehicles, ranging from affordable everyday cars through to SUVs, utes, 4WDs, hybrids, European vehicles and prestige cars.
                </p>
              </div>
              <div className="box-info">
                <p className="text-center text-md-start">We also provide short-term and long-term vehicle hire, giving Brisbane customers flexible options when buying a vehicle isn’t what they need right now.
                </p>
              </div>
              <div className="box-info">
                <p className="text-center text-md-start">Our aim is to provide choice, convenience and genuine value all in one place.
                </p>
              </div>
              <div className="box-info">
                <p className="text-center text-md-start">Whether you need a hatchback for getting around Brisbane, a ute for the job site, an SUV for the family, or something comfortable for the run down to the Gold Coast or up to the Sunshine Coast, we’ll help you find something that works for you.
                </p>
              </div>
              <div className="box-info">
                <p className="text-center text-md-start">Quality Cars. Straightforward Service.
                </p>
              </div>
              <div className="box-info">
                <p className="text-center text-md-start">That’s why our approach is centred around making the process as clear and straightforward as possible. Our vehicles are selected and checked before being offered for sale, and our team is here to answer questions, explain your options and help you make an informed decision.
                </p>
              </div>
              <div className="box-info">
                <p className="text-center text-md-start">We can also assist with finance options for approved customers, vehicle trade-ins and warranty options on eligible vehicles, helping make the move into your next car easier.
                </p>
              </div>
              <div className="box-info">
                <p className="text-center text-md-start">No complicated sales talk. No unnecessary pressure.
                </p>
              </div>
              <div className="box-info">
                <p className="text-center text-md-start">Just good cars, helpful people and a team that wants to earn your business.
                </p>
              </div>
              <div className="box-info">
                <p className="text-center text-md-start"></p>
              </div>
            </div>

            <div className="box-info">
              <h3 className="mb-2">Visit Carsy Motor</h3>
              <h4>Carsy Motor</h4>
              <p>1394 Ipswich Road</p>
              <p>Rocklea QLD 4106</p>
            </div>
            <div className="box-info pt-1 d-flex d-md-block flex-column align-items-center">
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
              <h5 className="text-center mt-5">Your local Brisbane destination for quality pre-owned cars and flexible vehicle hire.</h5>
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
