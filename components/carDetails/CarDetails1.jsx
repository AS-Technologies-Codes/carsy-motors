"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Slider1 from "./sliders/Slider1";
import Image from "next/image";
import Description from "./detailComponents/Description";
import Overview from "./detailComponents/Overview";
import toast from "react-hot-toast";

import LoanCalculator from "./detailComponents/LoanCalculator";
import CarReview from "./detailComponents/CarReview";
import CarInfo from "./detailComponents/CarInfo";
import ProfileInfo from "./detailComponents/ProfileInfo";
import Recommended from "./detailComponents/Recommended";
import Features from "./detailComponents/Features";
import SidebarToggleButton from "./SidebarToggleButton";
import { getCarDetailsApi } from "@/utils/APIs";
export default function CarDetails1({ carItem }) {
  const [CarDetailsListing, setCarDetailsListing] = useState({});
  const [CarDetailsLoading, setCarDetailsLoading] = useState(true);

  const fetchCarDetails = async () => {
    try {
      setCarDetailsLoading(true);
      const getCarDetailsData = await getCarDetailsApi(carItem);
      setCarDetailsListing(getCarDetailsData);
    } catch (error) {
      toast.error(error);
      return;
    } finally {
      setCarDetailsLoading(false);
    }
  };

  useEffect(() => {
    fetchCarDetails();
  }, []);

  if (CarDetailsLoading) {
    return (
      <div className="center my-5">
        <span className="loader"></span>
      </div>
    );
  }
  return (
    <>
      <section className="tf-section3 listing-detail style-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="listing-detail-wrap">
                <Slider1
                  images={CarDetailsListing?.images?.map((img) => img.src)}
                  viewer={
                    CarDetailsListing?.sepriteiamge.length
                      ? JSON.parse(
                          CarDetailsListing?.sepriteiamge[0].sprite_url,
                        )
                      : []
                  }
                />
                <div className="row">
                  <div className="col-lg-12">
                    <nav
                      id="navbar-example2"
                      className="navbar tab-listing-scroll"
                    >
                      <ul className="nav nav-pills">
                        <li className="nav-item">
                          <a className="nav-link" href="#scrollspyHeading1">
                            Overview
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#scrollspyHeading2">
                            Specs &amp; features
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#scrollspyHeading3">
                            Comfort & Convenience
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#scrollspyHeading4">
                            Car for Cash Calculator
                          </a>
                        </li>
                        {/* <li className="nav-item">
                          <a className="nav-link" href="#scrollspyHeading5">
                            New car reviews
                          </a>
                        </li> */}
                      </ul>
                    </nav>
                    <div
                      data-bs-spy="scroll"
                      data-bs-target="#navbar-example2"
                      data-bs-offset={0}
                      className="scrollspy-example"
                      tabIndex={0}
                    >
                      {CarDetailsListing?.description && (
                        <Description desc={CarDetailsListing.description} />
                      )}
                      <div
                        className="listing-description footer-col-block"
                        id="scrollspyHeading1"
                      >
                        <div className="footer-heading-desktop">
                          <h2>Car overview</h2>
                        </div>
                        <div className="footer-heading-mobie listing-details-mobie">
                          <h2>Car overview</h2>
                        </div>
                        <Overview car={CarDetailsListing} />
                      </div>
                      <div className="listing-line" />
                      <div
                        className="listing-features footer-col-block"
                        id="scrollspyHeading2"
                      >
                        <div className="footer-heading-desktop mb-30">
                          <h2>Features</h2>
                        </div>
                        <Features
                          feat={[
                            ...CarDetailsListing?.features,
                            ...CarDetailsListing?.safety_features,
                          ]}
                        />
                      </div>
                      <div className="listing-line" />
                      <div
                        className="listing-calculator loan-calculator-form"
                        id="scrollspyHeading4"
                      >
                        <div className="box-title">
                          <h2 className="title-ct">Car for Cash</h2>
                          <p>Use our calculator to estimate your car price.</p>
                        </div>
                        <LoanCalculator />
                      </div>
                      {/* <div className="listing-line" />
                      <div className="listing-location" id="scrollspyHeading3">
                        <div className="box-title">
                          <h2 className="title-ct">Location</h2>
                          <div className="list-icon-pf gap-8 flex-three">
                            <i className="far fa-map" />
                            <p className="font-1">
                              2972 Westheimer Rd. Santa Ana, Illinois 85486
                            </p>
                          </div>
                        </div>
                        <iframe
                          className="map-content"
                          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7302.453092836291!2d90.47477022812872!3d23.77494577893369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1627293157601!5m2!1svi!2s"
                          allowFullScreen=""
                          loading="lazy"
                        />
                      </div> */}
                      {/* <div className="listing-line" />
                      <div
                        className="listing-reviews flat-property-detail"
                        id="scrollspyHeading5"
                      >
                        <div className="box-title">
                          <h2 className="title-ct">
                            Car User Reviews &amp; Rating
                          </h2>
                        </div>
                        <CarReview />
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="overlay-siderbar-mobie" />
              <div className="listing-sidebar">
                <div className="widget-listing mb-40">
                  <div className="heading-widget">
                    <h2 className="title">{CarDetailsListing.title}</h2>
                    <CarInfo carItem={CarDetailsListing} />
                  </div>
                </div>
                <div className="widget-listing mb-30">
                  <ProfileInfo car={CarDetailsListing} />
                </div>
                <div className="list-icon-pf gap-8 flex-three mb-40">
                  <i className="far fa-flag" />
                  <p className="font-1">Report this listing</p>
                </div>
                <div className="widget-listing">
                  <Recommended make={CarDetailsListing?.make} />
                  {/* <a
                    href="javascript:void(0)"
                    className="fs-16 fw-5 font text-color-3 lh-22"
                  >
                    View more reviews <i className="icon-autodeal-view-more" />
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SidebarToggleButton />
    </>
  );
}
