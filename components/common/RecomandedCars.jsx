"use client";

import { carData } from "@/data/cars";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getRecommendedListingApi } from "@/utils/APIs";
import toast from "react-hot-toast";
import Slider1 from "../carDetails/sliders/Slider1";
export default function RecomandedCars() {

  const [RecommendedCarsListing, setRecommendedCarsListing] = useState([]);
  const [RecommendedCarsLoading, setRecommendedCarsLoading] = useState(true);

  const fetchRecommendedCars = async () => {
    try {
      setRecommendedCarsLoading(true);
      const getRecommendedCarsData = await getRecommendedListingApi();
      setRecommendedCarsListing(getRecommendedCarsData);
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setRecommendedCarsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendedCars();
  }, []);

  const swiperOptions = {
    speed: 1000,
    spaceBetween: 30,
    pagination: {
      el: ".spd9",
      clickable: true,
    },
    navigation: {
      nextEl: ".snbn6",
      prevEl: ".snbp6",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      991: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  };
  return (
    <section className="tf-section3">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="heading-section flex align-center justify-center justify-content-md-between flex-wrap gap-20">
              <h2
                className="wow fadeInUpSmall center"
                data-wow-delay="0.2s"
                data-wow-duration="1000ms"
              >
                Recommended Cars For You
              </h2>
              <Link
                href={`/buy`}
                className="tf-btn-arrow wow fadeInUpSmall"
                data-wow-delay="0.2s"
                data-wow-duration="1000ms"
              >
                View all
                <i className="icon-autodeal-btn-right" />
              </Link>
            </div>
          </div>
          <div className="col-lg-12 relative">
            {RecommendedCarsLoading ?
              <div className="center my-5">
                <span className="loader"></span>
              </div>
              :
              <>
                <Swiper
                  {...swiperOptions}
                  modules={[Pagination, Navigation, Pagination]}
                  className="swiper-container tf-sw-mobile3"
                >
                  {RecommendedCarsListing.map((car, i) => (
                    <SwiperSlide key={i} className="swiper-slide mb-1">
                      <div className="box-car-list hv-one">
                        <div className="image-group relative">
                          <div className="top flex-two">
                            <ul className="d-flex gap-8">
                              <li className="flag-tag success">Featured</li>
                              <li className="flag-tag style-1">
                                <div className="icon">
                                  <svg
                                    width={16}
                                    height={13}
                                    viewBox="0 0 16 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M1.5 9L4.93933 5.56067C5.07862 5.42138 5.24398 5.31089 5.42597 5.2355C5.60796 5.16012 5.80302 5.12132 6 5.12132C6.19698 5.12132 6.39204 5.16012 6.57403 5.2355C6.75602 5.31089 6.92138 5.42138 7.06067 5.56067L10.5 9M9.5 8L10.4393 7.06067C10.5786 6.92138 10.744 6.81089 10.926 6.7355C11.108 6.66012 11.303 6.62132 11.5 6.62132C11.697 6.62132 11.892 6.66012 12.074 6.7355C12.256 6.81089 12.4214 6.92138 12.5607 7.06067L14.5 9M2.5 11.5H13.5C13.7652 11.5 14.0196 11.3946 14.2071 11.2071C14.3946 11.0196 14.5 10.7652 14.5 10.5V2.5C14.5 2.23478 14.3946 1.98043 14.2071 1.79289C14.0196 1.60536 13.7652 1.5 13.5 1.5H2.5C2.23478 1.5 1.98043 1.60536 1.79289 1.79289C1.60536 1.98043 1.5 2.23478 1.5 2.5V10.5C1.5 10.7652 1.60536 11.0196 1.79289 11.2071C1.98043 11.3946 2.23478 11.5 2.5 11.5ZM9.5 4H9.50533V4.00533H9.5V4ZM9.75 4C9.75 4.0663 9.72366 4.12989 9.67678 4.17678C9.62989 4.22366 9.5663 4.25 9.5 4.25C9.4337 4.25 9.37011 4.22366 9.32322 4.17678C9.27634 4.12989 9.25 4.0663 9.25 4C9.25 3.9337 9.27634 3.87011 9.32322 3.82322C9.37011 3.77634 9.4337 3.75 9.5 3.75C9.5663 3.75 9.62989 3.77634 9.67678 3.82322C9.72366 3.87011 9.75 3.9337 9.75 4Z"
                                      stroke="white"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                                6
                              </li>
                            </ul>
                            <div className="year flag-tag">2024</div>
                          </div>
                          <div className="img-style buy-car-slider">
                            <Image
                              className="lazyload"
                              alt="image"
                              src={car.images[0].src}
                              width={450}
                              height={338}
                            />
                            {/* <Slider1
                              images={car?.images.map((img) => img.src)}
                            /> */}
                          </div>
                        </div>
                        <div className="content">
                          <div className="text-address">
                            <p className="text-color-3 font">{car.type}</p>
                          </div>
                          <h5 className="link-style-1" style={{height: "50px"}}>
                            <Link
                              href={`/listing-detail-v1/${car.id}`}
                            >
                              {car.title}
                            </Link>
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
                            ${car.price?.toLocaleString()}
                          </div>
                          <div className="days-box flex justify-space align-center">
                            <Link
                              href={`/listing-detail-v1/${car.id}`}
                              className="view-car"
                            >
                              View car
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                  <div className="swiper-pagination5 spd9 pb-1"></div>
                </Swiper>
                <div className="swiper-button-next style-1 snbn6" />
                <div className="swiper-button-prev style-1 snbp6" />
              </>
            }
          </div>
        </div>
      </div>
    </section>
  );
}
