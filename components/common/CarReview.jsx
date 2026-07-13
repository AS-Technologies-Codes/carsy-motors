"use client";
import { slides } from "@/data/carReviews";
import { EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getFleetListingApi } from "@/utils/APIs";
import { toCamelCase } from "@/utils/Utils";
import car1 from "../../public/assets/images/car-list/tesla_v1.jpg";
import car2 from "../../public/assets/images/car-list/corolla.png";
import car3 from "../../public/assets/images/car-list/car31.png";
import car4 from "../../public/assets/images/car-list/car41.png";
import car5 from "../../public/assets/images/car-list/car51.png";
import car6 from "../../public/assets/images/car-list/car61.png";

export default function CarReview() {
  const swiperOptions = {
    slidesPerView: 1,
    speed: 500,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      nextEl: ".snbn3",
      prevEl: ".snbp3",
    },
  };

  const FleetListing = [
    {
      imgSrc: car1,
      title: "Electric Vehicles",
      description: "Going green without giving up comfort. Our EV range is perfect for zipping around Brissie or heading up to the Sunshine Coast without a fuel stop in sight."
    },
    {
      imgSrc: car2,
      title: "Cars & Hatchbacks",
      description: "From compact city runabouts to spacious sedans — ideal for the daily commute, weekend errands, or that next business trip. Reliable brands, honest prices."
    },
    {
      imgSrc: car3,
      title: "SUVs ",
      description: "Heading to Noosa? Hitting the Gold Coast? Or just need something the whole family fits in comfortably? Our SUV range has you sorted — practical, capable, and ready for Queensland roads."
    },
    {
      imgSrc: car4,
      title: "People Movers",
      description: "Got a big crew? No dramas. Our people movers take the stress out of group travel — whether it's a footy trip, a family getaway, or picking up the whole extended family from the airport."
    },
    {
      imgSrc: car5,
      title: "Luxury Cars",
      description: "Treat yourself. Our premium vehicles are perfect for when you want to arrive in style — a special occasion, a corporate trip, or just because you deserve it."
    },
    {
      imgSrc: car6,
      title: "Utes, Vans & 4WDs",
      description: "Built for the tradies, the adventurers, and the movers. Whether you're hauling gear to a job site or heading bush for the long weekend, we've got the muscle to handle it."
    },

  ]

  return (
    <section className="tf-section-banner2 mt-3">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="container mt-md-5 mb-4 center text-md-start">
              <h2
                className="wow fadeInUpSmall"
                data-wow-delay="0.2s"
                data-wow-duration="1000ms"
              >
                View Our Fleet
              </h2>
              <p>
                Whether you're buying or hiring, we've got something for every Brisbanite, every budget, and every occasion.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 relative">

            <Swiper
              {...swiperOptions}
              modules={[EffectFade, Navigation]}
              className="swiper review-car carousel-3 overflow-hidden"
            >
              {FleetListing.map((slide, index) => (
                <SwiperSlide
                  className="swiper-slide d-md-flex d-block"
                  key={index}
                >
                  <div className="slider-item d-flex w-100 w-md-50">
                    <Image
                      className="lazyload w-100"
                      data-src={slide.imgSrc}
                      // alt={slide.imgAlt}
                      src={slide.imgSrc}
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="container content text-color-3 w-md-50 d-flex flex-column justify-content-center align-items-center p-5 gap-3">
                    <h1 className="text-center">
                      {slide.title}
                      {/* {toCamelCase(slide.title)} */}
                    </h1>
                    <p className="font fw-4 text-center">
                      {slide.description}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-button-next style-1 snbn3" />
            <div className="swiper-button-prev style-1 snbp3" />
          </div>
        </div>
      </div>
    </section>
  );
}
