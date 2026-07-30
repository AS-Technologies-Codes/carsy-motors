"use client";
import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import Slider1 from "./sliders/Slider1";
// import Image from "next/image";
import Description from "./detailComponents/Description";
import Overview from "./detailComponents/Overview";
import toast from "react-hot-toast";
// import LoanCalculator from "./detailComponents/LoanCalculator";
// import CarReview from "./detailComponents/CarReview";
import CarInfo from "./detailComponents/CarInfo";
import ProfileInfo from "./detailComponents/ProfileInfo";
import Recommended from "./detailComponents/Recommended";
import Features from "./detailComponents/Features";
import SidebarToggleButton from "./SidebarToggleButton";
import { getCarDetailsApi } from "@/utils/APIs";
import Link from "next/link";
export default function CarDetails1({ carItem }) {
  const [CarDetailsListing, setCarDetailsListing] = useState({});
  const [CarDetailsLoading, setCarDetailsLoading] = useState(true);

  const fetchCarDetails = async () => {
    try {
      setCarDetailsLoading(true);
      const getCarDetailsData = await getCarDetailsApi(carItem);
      const filteredData =
        JSON.parse(window.localStorage.getItem("favouriteCar") || "[]").some(
          (car) => car.id == carItem,
        )
          ? { ...getCarDetailsData, favorite: "#fd5a21" }
          : { ...getCarDetailsData, favorite: "none" };
      setCarDetailsListing(filteredData);
    } catch (error) {
      // toast.error(error);
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
      <section className="flat-title mb-40">
        <div className="container2">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-inner style">
                <div className="title-group fs-12">
                  <Link className="home fw-6 text-color-3" href={`/`}>
                    Home
                  </Link>
                  <Link className="home fw-6 text-color-3" href={`/buy`}>
                    Buy Car
                  </Link>
                  <span>{CarDetailsListing?.title} for sale</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="tf-section3 listing-detail style-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="listing-detail-wrap">
                <Slider1
                  images={CarDetailsListing?.images?.map((img) => img.src)}
                  viewer={
                    CarDetailsListing?.sepriteiamge?.length
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
                        <Features feat={CarDetailsListing} />
                      </div>
                      <div className="listing-line" />
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
                {/* <div className="list-icon-pf gap-8 flex-three mb-40">
                  <i className="far fa-flag" />
                  <p className="font-1">Report this listing</p>
                </div> */}
                <div className="widget-listing">
                  <Recommended />
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
