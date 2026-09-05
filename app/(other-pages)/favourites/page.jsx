"use client";
import Slider1 from "@/components/carDetails/sliders/SliderViewer";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Hero from "@/components/homes/home-6/Hero";
import { useResponsive } from "@/utils/useResponsive";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const [Favourites, setFavourites] = useState([]);
  const { isMobile } = useResponsive();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setFavourites(
        JSON.parse(window.localStorage.getItem("favouriteCar") || "[]"),
      );
    }
  }, []);

  const handleFavourite = (car) => {
    const updatedFavourites = Favourites.filter(
      (favouriteCar) => favouriteCar.id !== car.id,
    );
    setFavourites(updatedFavourites);
    window.localStorage.setItem(
      "favouriteCar",
      JSON.stringify(updatedFavourites),
    );
  };

  return (
    <>
      <div className="header-fixed">
        <Header1 />
      </div>
      <Hero />
      <section className="flat-title">
        <div className="container2">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-inner style">
                <div className="title-group fs-12">
                  <Link className="home fw-6 text-color-3" href={`/`}>
                    Home
                  </Link>
                  <span>Favourites</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="listing-grid tf-section3" id="section3">
        <div className="container p-5">
          <div className="row">
            {Favourites.length !== 0 ? (
              <div className="col-lg-12">
                <div className="heading-section">
                  <h2>{Favourites.length}+ All Your Dream Cars here </h2>
                  <p className="mt-20">
                    Your dream car is just a click away. Find your perfect match
                    from our extensive collection of vehicles, tailored to suit
                    every taste and budget.
                  </p>
                </div>
              </div>
            ) : null}
            <div className="col-lg-12 flex gap-30 text-start">
              <div className="sidebar-left-listing">
                <div className="row">
                  {Favourites.length == 0 ? (
                    <div className="center my-5">
                      <p>No favorite cars found.</p>
                    </div>
                  ) : (
                    <>
                      <div
                        className={`list-car-list-1 ${!isMobile ? "list-car-grid-1" : ""}`}
                      >
                        {" "}
                        {Favourites.map((car, i) => (
                          <div key={i} className="box-car-list style-2 hv-one">
                            <Slider1
                              car={car}
                              images={car?.images.map((img) => img.src)}
                            />
                            <div className="content">
                              <div className="inner1">
                                <div className="text-address">
                                  <p className="text-color-3 font">
                                    {car.type}
                                  </p>
                                </div>
                                <h5 className="link-style-1">
                                  <div
                                    style={{
                                      height: isMobile ? "auto" : "50px",
                                    }}
                                  >
                                    {car.title}
                                  </div>
                                </h5>
                                <div className="icon-box flex flex-wrap">
                                  <div className="icons flex-three">
                                    <i className="icon-autodeal-km1" />
                                    <span>{car.km?.toLocaleString()} kms</span>
                                  </div>
                                  <div className="icons flex-three">
                                    <i className="icon-autodeal-diesel" />
                                    <span>{car.fuelType}</span>
                                  </div>
                                  <div className="icons flex-three">
                                    <i className="icon-autodeal-automatic" />
                                    <span>{car.transmission}</span>
                                  </div>
                                </div>
                                <div className="money fs-20 fw-5 lh-25 text-color-3">
                                  ${car?.rent_type ? car?.rent_type === "short" ? `${car?.per_day_price || 0} / day` : `${(car?.per_day_price * 7) || 0} / week`
                                    : car.price?.toLocaleString()}

                                </div>
                              </div>
                              <div className="w-100 d-flex d-md-none justify-content-between align-items-center">
                                <Link
                                  href={car?.rent_type ? `/rentals/${car?.rent_type}${car.id}` : `/listing-detail-v1/${car.id}`}
                                  className="view-car"
                                >
                                  View details
                                  <i className="icon-autodeal-btn-right" />
                                </Link>
                                <Link
                                  href={`javascript:void(0)`}
                                  onClick={() => handleFavourite(car)}
                                  className="text-color-3"
                                >
                                  <svg
                                    width={18}
                                    height={16}
                                    viewBox="0 0 18 16"
                                    fill={"#fd5a21"}
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M16.5 4.875C16.5 2.80417 14.7508 1.125 12.5933 1.125C10.9808 1.125 9.59583 2.06333 9 3.4025C8.40417 2.06333 7.01917 1.125 5.40583 1.125C3.25 1.125 1.5 2.80417 1.5 4.875C1.5 10.8917 9 14.875 9 14.875C9 14.875 16.5 10.8917 16.5 4.875Z"
                                      stroke="CurrentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </Link>
                              </div>
                              <div className="inner2 w-100">
                                <div
                                  className={`days-box d-flex flex-row mb-2 justify-content-between h-100 w-100`}
                                >
                                  <Link
                                    href={car?.rent_type ? `/rentals/${car?.rent_type}${car.id}` : `/listing-detail-v1/${car.id}`}
                                    className="view-car"
                                  >
                                    View car
                                  </Link>

                                  <div className="d-flex justify-content-end">
                                    <Link
                                      href={`javascript:void(0)`}
                                      onClick={() => handleFavourite(car)}
                                      className="text-color-3 d-none d-md-block"
                                    >
                                      <svg
                                        width={18}
                                        height={16}
                                        viewBox="0 0 18 16"
                                        fill={"#fd5a21"}
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M16.5 4.875C16.5 2.80417 14.7508 1.125 12.5933 1.125C10.9808 1.125 9.59583 2.06333 9 3.4025C8.40417 2.06333 7.01917 1.125 5.40583 1.125C3.25 1.125 1.5 2.80417 1.5 4.875C1.5 10.8917 9 14.875 9 14.875C9 14.875 16.5 10.8917 16.5 4.875Z"
                                          stroke="CurrentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </Link>
                                  </div>
                                  <Link
                                    href="javascript:void(0)"
                                    onClick={() => handleWhatsApp(car)}
                                    className="chat m-0"
                                  >
                                    <div className="icon">
                                      <svg
                                        width={18}
                                        height={18}
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M8.99982 0.875C7.59706 0.874694 6.21811 1.23757 4.9972 1.9283C3.77629 2.61904 2.75501 3.6141 2.03277 4.81664C1.31052 6.01918 0.911915 7.38822 0.875748 8.79052C0.839581 10.1928 1.16709 11.5806 1.82638 12.8188L0.939664 15.4789C0.866215 15.6992 0.855555 15.9355 0.908881 16.1615C0.962207 16.3874 1.07741 16.5941 1.24158 16.7582C1.40575 16.9224 1.61239 17.0376 1.83836 17.0909C2.06432 17.1443 2.30067 17.1336 2.52091 17.0602L5.18107 16.1734C6.27073 16.753 7.47811 17.0767 8.71156 17.12C9.94501 17.1633 11.1721 16.925 12.2997 16.4232C13.4273 15.9215 14.4258 15.1694 15.2194 14.2241C16.0129 13.2789 16.5807 12.1652 16.8796 10.9678C17.1785 9.77029 17.2007 8.52047 16.9445 7.31315C16.6882 6.10584 16.1603 4.97276 15.4008 3.99993C14.6413 3.02711 13.6701 2.24009 12.561 1.69864C11.4519 1.15718 10.234 0.875506 8.99982 0.875ZM8.99982 15.875C7.79121 15.8758 6.6038 15.5575 5.55763 14.9523C5.48104 14.9079 5.39587 14.8803 5.30779 14.8713C5.2197 14.8622 5.13071 14.872 5.0467 14.9L2.12482 15.875L3.09904 12.9531C3.12712 12.8692 3.13705 12.7802 3.12816 12.6921C3.11927 12.604 3.09177 12.5188 3.04748 12.4422C2.28964 11.132 1.98537 9.60827 2.18187 8.10747C2.37837 6.60667 3.06466 5.21267 4.13426 4.14171C5.20387 3.07076 6.597 2.38271 8.09755 2.18431C9.5981 1.98592 11.1222 2.28826 12.4334 3.04444C13.7445 3.80062 14.7695 4.96837 15.3493 6.36652C15.9291 7.76468 16.0313 9.3151 15.64 10.7773C15.2487 12.2394 14.3858 13.5316 13.1852 14.4533C11.9846 15.375 10.5134 15.8748 8.99982 15.875Z"
                                          fill="CurrentColor"
                                        />
                                      </svg>
                                    </div>
                                    <span>Chat</span>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer1 />
    </>
  );
};

export default page;
