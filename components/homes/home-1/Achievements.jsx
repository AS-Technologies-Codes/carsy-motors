"use client";

import { getAchievementsListingApi } from "@/utils/APIs";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Achievements() {
  const [AchievementsListing, setAchievementsListing] = useState([]);
  const [AchievementsLoading, setAchievementsLoading] = useState(true);

  const fetchAchievements = async () => {
    try {
      setAchievementsLoading(true);
      const getAchievementsData = await getAchievementsListingApi();
      setAchievementsListing(getAchievementsData);
    } catch (error) {
      toast.error(error);
    } finally {
      setAchievementsLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const achievements = [
    {
      heading: "Global reach",
      text: "2,000+ SIXT locations in over 105 countries",
      icon: (
        <svg
          width={50}
          height={50}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
          />
        </svg>
      ),
    },
    {
      heading: "Distinctive fleet",
      text: "Diverse fleet of premium vehicles",
      icon: (
        <svg
          width={50}
          height={50}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
          />
        </svg>
      ),
    },
    {
      heading: "Exceptional service",
      text: "Stress-free, trustworthy, no hidden costs",
      icon: (
        <svg
          width={50}
          height={50}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
          />
        </svg>
      ),
    },
  ];
  return (
    <section className="my-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div
              className="heading-section wow fadeInUpSmall"
              data-wow-delay="0.2s"
              data-wow-duration="1000ms"
            >
              <h2 className="text-center text-md-start">Why Brissie Locals Choose Carsy Motors?</h2>
              <p className="mt-18 text-center text-md-start">
                We're not a big chain. We're your neighbours — and we do things differently.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          {AchievementsLoading ? (
            <div className="center my-5">
              <span className="loader"></span>
            </div>
          ) : (
            <div className="col-lg-12">
              <Swiper
                spaceBetween={30}
                slidesPerView={3}
                breakpoints={{
                  1000: {
                    slidesPerView: 3,
                  },
                  600: {
                    slidesPerView: 2,
                  },
                  0: {
                    slidesPerView: 1,
                  },
                }}
                modules={[Pagination]}
                pagination={{ clickable: true, el: ".spd30" }}
                className="swiper-container overflow-visible tf-sw-mobile4-swiper"
              >
                {AchievementsListing.map((achievement, index) => (
                  <SwiperSlide className="swiper-slide" key={index}>
                    <div className="tf-icon-box style-1 text-center text-md-start">
                      <div className="icon">
                        <Image
                          src={achievement.image}
                          alt="Logo"
                          width={100}
                          height={100}
                        />
                      </div>{" "}
                      <div className="content">
                        <h3>
                          <a href="javascript:void(0)">{achievement.title}</a>
                        </h3>
                        <p>{achievement.description}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}

                <div className="swiper-pagination5 spd30" />
              </Swiper>
              <div
                className="swiper-container overflow-visible tf-sw-mobile4"
                data-preview={3}
                data-space={30}
              >
                <div className="swiper-wrapper grid-sw-3">
                  {AchievementsListing.map((achievement, index) => (
                    <div className="swiper-slide" key={index}>
                      <div className="tf-icon-box h-100 style-1">
                        <div className="icon">
                          <Image
                            src={achievement.image}
                            alt="Logo"
                            width={100}
                            height={100}
                          />
                        </div>
                        <div className="content">
                          <h3>
                            <a href="javascript:void(0)">{achievement.title}</a>
                          </h3>
                          <p>{achievement.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="swiper-pagination5" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
