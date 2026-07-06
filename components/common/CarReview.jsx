"use client";
import { slides } from "@/data/carReviews";
import { EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getFleetListingApi } from "@/utils/APIs";
import { toCamelCase } from "@/utils/Utils";
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

  const [FleetListing, setFleetListing] = useState([]);
  const [FleetLoading, setFleetLoading] = useState(true);

  const fetchFleet = async () => {
    try {
      setFleetLoading(true);
      const getFleetData = await getFleetListingApi();
      setFleetListing(getFleetData);
    } catch (error) {
      toast.error(error);
    } finally {
      setFleetLoading(false);
    }
  };

  useEffect(() => {
    fetchFleet();
  }, []);

  if (!FleetLoading && !FleetListing.length) {
    return <></>;
  }

  return (
    <section className="tf-section-banner2">
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
                Our experienced team excels in car sales with many years of
                successfully navigating the market, delivering informed
                decisions and optimal results.
              </p>{" "}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 relative">
            {FleetLoading ? (
              <div className="center my-5">
                <span className="loader"></span>
              </div>
            ) : (
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
                        alt={slide.imgAlt}
                        src={slide.imgSrc}
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="container content text-color-3 w-md-50 d-flex flex-column justify-content-center align-items-center p-5 gap-3">
                      <h1 className="text-center">
                        {toCamelCase(slide.title)}
                      </h1>
                      <p className="font fw-4 text-center">
                        {slide.description}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            <div className="swiper-button-next style-1 snbn3" />
            <div className="swiper-button-prev style-1 snbp3" />
          </div>
        </div>
      </div>
    </section>
  );
}
