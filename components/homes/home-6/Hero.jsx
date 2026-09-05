"use client";

import { slider3 } from "@/data/heroSlides";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { accessToken, URL } from "@/utils/URL";
import Link from "next/link";
import toast from "react-hot-toast";
import { getRecommendedListingApi } from "@/utils/APIs";
import { usePathname } from "next/navigation";
export default function Hero() {
  const swiperOptions = {
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
    speed: 500,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      nextEl: ".snbn19",
      prevEl: ".snbp19",
    },
  };

  const [RecommendedCarsListing, setRecommendedCarsListing] = useState([]);
  const [RecommendedCarsLoading, setRecommendedCarsLoading] = useState(true);
  const pathName = usePathname();
  const isRental = pathName.toString().includes("rentals");

  const fetchRecommendedCars = async () => {
    try {
      setRecommendedCarsLoading(true);
      const getRecommendedCarsData = await getRecommendedListingApi(isRental ? "rent" : "used");
      setRecommendedCarsListing(getRecommendedCarsData);
    } catch (error) {
      console.log(error);
      // toast.error(error);
    } finally {
      setRecommendedCarsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendedCars();
  }, []);

  return (
    <Swiper
      {...swiperOptions}
      modules={[Navigation, Pagination, EffectFade, Autoplay]}
      className="swiper mainslider slider home6"
    >
      {RecommendedCarsLoading && (
        <div
          className="center my-5 opacity-50 bg-black w-100 h-100 position-absolute"
          style={{ zIndex: 999, top: "-50px" }}
        >
          <span className="loader position-absolute top-50 right-50"></span>
        </div>
      )}
      {(RecommendedCarsLoading ? [slider3[0]] : RecommendedCarsListing).map((elm, i) => (
        <SwiperSlide key={i} className="swiper-slide">
          <div className="slider-item">
            <div className="img-slider">
              <Image
                className="img-item lazyload"
                alt=""
                src={elm?.images?.length ? elm.images[0].src : ""}
                width={3840}
                height={1920}
              />
            </div>
            <div className="container relative">
              <div className="row">
                <div className="col-lg-12">
                  <div className="content po-content-two">
                    <div className="heading shadow-box">
                      <Link
                        href={isRental ? `/rentals/${elm?.rent_type}${elm.id}` : `/listing-detail-v1/${elm.id}`}
                      >
                        <h1 className="text-color-1 fade-item fade-item-1 pt-5">
                          {elm?.title}
                        </h1>
                      </Link>

                      {isRental ? <ul className="ul flex category-list-car flex-wrap fade-item fade-item-2">

                        {elm?.km ?
                          <li className="flex-three">
                            <div className="icon">
                              <i className="icon-autodeal-km1" />
                            </div>
                            <div className="font text-color-1">{elm.km?.toLocaleString()} kms</div>
                          </li>
                          :
                          null
                        }
                        {elm?.fuelType ?
                          <li className="flex-three">
                            <div className="icon">
                              <i className="icon-autodeal-diesel me-1" />
                            </div>
                            <div className="font text-color-1">{elm.fuelType}</div>
                          </li>
                          :
                          null
                        }
                        {elm?.transmission ?
                          <li className="flex-three">
                            <div className="icon">
                              <i className="icon-autodeal-automatic" />
                            </div>
                            <div className="font text-color-1">{elm.transmission}</div>
                          </li>
                          :
                          null
                        }
                        {elm?.seats ? (
                          <li className="flex-three">
                            <div className="icon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={17}
                                height={17}
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <path
                                  d="M17.5 18.1252C17.5 18.2909 17.4341 18.4499 17.3169 18.5671C17.1997 18.6843 17.0407 18.7502 16.875 18.7502H8.74998C8.58422 18.7502 8.42525 18.6843 8.30804 18.5671C8.19083 18.4499 8.12498 18.2909 8.12498 18.1252C8.12498 17.9594 8.19083 17.8004 8.30804 17.6832C8.42525 17.566 8.58422 17.5002 8.74998 17.5002H16.875C17.0407 17.5002 17.1997 17.566 17.3169 17.6832C17.4341 17.8004 17.5 17.9594 17.5 18.1252ZM17.5 12.5002V15.0002C17.5 15.3317 17.3683 15.6496 17.1339 15.884C16.8994 16.1185 16.5815 16.2502 16.25 16.2502H8.91482C8.68238 16.2509 8.45439 16.1865 8.25666 16.0643C8.05893 15.9421 7.89938 15.767 7.79607 15.5588L3.25623 6.49626C3.16991 6.32242 3.125 6.13097 3.125 5.93688C3.125 5.7428 3.16991 5.55134 3.25623 5.37751L4.98435 1.94001C5.13103 1.64729 5.38671 1.4238 5.69642 1.31759C6.00613 1.21139 6.34515 1.23093 6.6406 1.37204L9.27263 2.48298L9.30935 2.50016C9.60567 2.6485 9.83097 2.90843 9.93571 3.22281C10.0405 3.5372 10.0161 3.88031 9.86795 4.17673C9.86555 4.18268 9.86268 4.18843 9.85935 4.19391L8.74998 6.25016L11.2328 11.2502H16.25C16.5815 11.2502 16.8994 11.3819 17.1339 11.6163C17.3683 11.8507 17.5 12.1686 17.5 12.5002ZM16.25 12.5002H11.232C10.9997 12.5009 10.7718 12.4365 10.5741 12.3143C10.3765 12.1921 10.2171 12.017 10.114 11.8088L7.63045 6.80876C7.54434 6.63528 7.49953 6.44423 7.49953 6.25055C7.49953 6.05688 7.54434 5.86583 7.63045 5.69235L7.63982 5.67516L8.74998 3.61891L6.13826 2.51657C6.12574 2.51176 6.11348 2.50628 6.10154 2.50016L4.37498 5.93766L8.91404 15.0002H16.25V12.5002Z"
                                  fill="#fff"
                                />
                              </svg>
                            </div>
                            <div className="font text-color-1">{elm.seats} Seats</div>
                          </li>)
                          :
                          null
                        }
                        {elm?.door ? (
                          <li className="flex-three">
                            <div className="icon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={14}
                                height={14}
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <path
                                  d="M18.125 16.875H16.25V3.125C16.25 2.79348 16.1183 2.47554 15.8839 2.24112C15.6495 2.0067 15.3315 1.875 15 1.875H5C4.66848 1.875 4.35054 2.0067 4.11612 2.24112C3.8817 2.47554 3.75 2.79348 3.75 3.125V16.875H1.875C1.70924 16.875 1.55027 16.9408 1.43306 17.0581C1.31585 17.1753 1.25 17.3342 1.25 17.5C1.25 17.6658 1.31585 17.8247 1.43306 17.9419C1.55027 18.0592 1.70924 18.125 1.875 18.125H18.125C18.2908 18.125 18.4497 18.0592 18.5669 17.9419C18.6842 17.8247 18.75 17.6658 18.75 17.5C18.75 17.3342 18.6842 17.1753 18.5669 17.0581C18.4497 16.9408 18.2908 16.875 18.125 16.875ZM5 3.125H15V16.875H5V3.125ZM13.125 10.3125C13.125 10.4979 13.07 10.6792 12.967 10.8333C12.864 10.9875 12.7176 11.1077 12.5463 11.1786C12.375 11.2496 12.1865 11.2682 12.0046 11.232C11.8227 11.1958 11.6557 11.1065 11.5246 10.9754C11.3935 10.8443 11.3042 10.6773 11.268 10.4954C11.2318 10.3135 11.2504 10.125 11.3214 9.95373C11.3923 9.78243 11.5125 9.63601 11.6667 9.533C11.8208 9.42998 12.0021 9.375 12.1875 9.375C12.4361 9.375 12.6746 9.47377 12.8504 9.64959C13.0262 9.8254 13.125 10.0639 13.125 10.3125Z"
                                  fill="#696665"
                                />
                              </svg>
                            </div>
                            <div className="font text-color-1">{elm.door} Doors</div>
                          </li>)
                          :
                          null
                        }
                        {elm?.aircondition ? (
                          <li className="flex-three">
                            <div className="icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#696665" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wind-icon lucide-wind"><path d="M12.8 19.6A2 2 0 1 0 14 16H2" /><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" /><path d="M9.8 4.4A2 2 0 1 1 11 8H2" /></svg>
                            </div>
                            <div className="font text-color-1">A/C</div>
                          </li>)
                          :
                          null
                        }
                        {elm?.age ? (
                          <li className="flex-three">
                            <div className="icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#696665" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-plus-icon lucide-calendar-plus"><path d="M16 19h6" /><path d="M16 2v4" /><path d="M19 16v6" /><path d="M21 12.598V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5" /><path d="M3 10h18" /><path d="M8 2v4" /></svg>
                            </div>
                            <div className="font text-color-1">{elm?.age}+ Years</div>
                          </li>)
                          :
                          null
                        }
                        {elm?.rent_type && elm?.per_day_price ? (
                          <li className="flex-three">
                            <div className="icon">
                              <svg
                                width={26}
                                height={26}
                                viewBox="0 0 26 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M13.0001 0.222775C5.95485 0.222775 0.222852 5.95478 0.222852 13C0.222852 20.0452 5.95485 25.7772 13.0001 25.7772C20.0453 25.7772 25.7773 20.0452 25.7773 13C25.7773 5.95478 20.0453 0.222775 13.0001 0.222775ZM13.0001 23.8051C7.04202 23.8051 2.195 18.9581 2.195 13C2.195 7.04195 7.04202 2.19493 13.0001 2.19493C18.9581 2.19493 23.8051 7.04195 23.8051 13C23.8051 18.9581 18.9581 23.8051 13.0001 23.8051Z"
                                  fill="Currentcolor"
                                  stroke="Currentcolor"
                                  strokeWidth="0.4"
                                />
                                <path
                                  d="M13 12.1875C11.6789 12.1875 10.5625 11.4433 10.5625 10.5625C10.5625 9.68175 11.6789 8.9375 13 8.9375C13.7475 8.9375 14.4398 9.1715 14.898 9.57775C14.9777 9.64877 15.0707 9.70335 15.1716 9.73837C15.2724 9.77338 15.3792 9.78814 15.4858 9.7818C15.5924 9.77546 15.6967 9.74814 15.7927 9.70142C15.8887 9.65469 15.9745 9.58947 16.0452 9.5095C16.3442 9.17475 16.3134 8.66125 15.977 8.36225C15.4082 7.85687 14.6445 7.51562 13.8125 7.38075V6.5C13.8125 6.0515 13.4485 5.6875 13 5.6875C12.5515 5.6875 12.1875 6.0515 12.1875 6.5V7.3775C10.335 7.67975 8.9375 8.99275 8.9375 10.5625C8.9375 12.3549 10.7607 13.8125 13 13.8125C14.3211 13.8125 15.4375 14.5568 15.4375 15.4375C15.4375 16.3182 14.3211 17.0625 13 17.0625C12.2525 17.0625 11.5602 16.8285 11.102 16.4222C10.7672 16.1233 10.2537 16.1525 9.95475 16.4905C9.65575 16.8252 9.68663 17.3387 10.023 17.6378C10.5918 18.1448 11.3555 18.4844 12.1875 18.6209V19.5C12.1875 19.9485 12.5515 20.3125 13 20.3125C13.4485 20.3125 13.8125 19.9485 13.8125 19.5V18.6225C15.665 18.3203 17.0625 17.0072 17.0625 15.4375C17.0625 13.6451 15.2393 12.1875 13 12.1875Z"
                                  fill="Currentcolor"
                                />
                              </svg>
                            </div>
                            <div className="font text-color-1">
                              ${elm?.rent_type ? elm?.rent_type === "short" ? `${elm?.per_day_price || 0} / day` : `${(elm?.per_day_price * 7) || 0} / week`
                                : elm.price?.toLocaleString()}
                            </div>
                          </li>)
                          :
                          null
                        }

                      </ul>
                        :
                        <ul className="ul flex category-list-car flex-wrap fade-item fade-item-2">
                          <li className="flex-three">
                            <div className="icon">
                              <svg
                                width={26}
                                height={26}
                                viewBox="0 0 26 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M25.406 12.1967C25.051 11.5568 24.5392 11.0175 23.9187 10.6294L22.5255 9.75818H24.7453C25.229 9.75818 25.6226 9.36467 25.6226 8.88091V8.06775C25.6226 7.80817 25.4111 7.59675 25.1512 7.59675H24.2332C23.2864 7.59675 22.4907 8.25748 22.2838 9.14208L20.9763 6.54314C20.5914 5.77812 20.0028 5.1362 19.2738 4.68689C18.5448 4.23757 17.7071 4 16.8506 4H9.15131C8.29478 4 7.45674 4.23757 6.72776 4.68689C5.99878 5.1362 5.41011 5.77812 5.02521 6.54314L3.70883 9.16026C3.48816 8.29448 2.7021 7.65255 1.76872 7.65255H0.850634C0.59074 7.65255 0.379316 7.86398 0.379316 8.12387V8.93672C0.379316 9.42047 0.772825 9.81398 1.25658 9.81398H3.38676L2.08282 10.6291C1.46354 11.0162 0.94949 11.5583 0.595523 12.1967C0.241269 12.8372 0.0551925 13.557 0.0546875 14.2889V17.5952C0.0546875 17.9944 0.1258 18.3864 0.265792 18.7607L0.35253 18.9929C0.457444 19.2719 0.638254 19.5076 0.878696 19.6788V21.0395C0.878696 21.5692 1.30983 22 1.83951 22H4.69229C5.22228 22 5.6531 21.5692 5.6531 21.0395V18.9221L6.16205 18.5538L19.8389 18.6144L20.3488 18.9833V21.0395C20.3488 21.5692 20.7796 22 21.3096 22H24.1624C24.692 22 25.1232 21.5692 25.1232 21.0395V19.6785C25.3614 19.5079 25.5463 19.2671 25.649 18.9929L25.7358 18.7607C25.8761 18.3867 25.9472 17.9948 25.9472 17.5952V14.2889C25.9472 13.5587 25.76 12.8355 25.406 12.1967ZM5.74877 16.4517H2.86984C2.32486 16.4517 1.8816 16.0084 1.8816 15.4634V14.5243C1.8816 14.2379 2.11471 14.0048 2.40107 14.0048H3.46138C4.72258 14.0048 5.74877 15.031 5.74877 16.2922V16.4517ZM18.3685 16.0993H7.6334V15.1426H18.3685V16.0993ZM18.3481 12.6626C18.1086 12.8801 17.8608 13.1049 17.6242 13.3291L16.9663 12.6342C17.2106 12.4034 17.4619 12.175 17.7049 11.9544C18.4437 11.2841 19.1513 10.6412 19.7056 9.8937C19.7448 9.84109 19.7831 9.78815 19.8201 9.73426C19.857 9.68164 19.8928 9.62871 19.9278 9.57481H6.07403C6.10911 9.62871 6.14483 9.68164 6.18182 9.73426C6.21881 9.78815 6.25708 9.84109 6.2963 9.8937C6.85021 10.6412 7.55782 11.2837 8.29669 11.9544C8.53968 12.175 8.79129 12.4034 9.03524 12.6342L8.37769 13.3291C8.14075 13.1049 7.89329 12.8801 7.65381 12.6626C6.7437 11.8367 5.80553 10.9849 5.14447 9.8937C5.11258 9.84109 5.08133 9.78783 5.05104 9.73426C5.02074 9.68164 4.99172 9.62871 4.96334 9.57481H4.92795L6.1646 7.1165C6.73573 5.98094 7.88022 5.27555 9.15131 5.27555H16.8506C18.1217 5.27555 19.2658 5.98094 19.837 7.1165L21.0736 9.57481H21.0382C21.0098 9.62871 20.9808 9.68164 20.9505 9.73426C20.9202 9.78783 20.8893 9.84109 20.8574 9.8937C20.196 10.9849 19.2582 11.8367 18.3481 12.6626ZM24.1203 15.4634C24.1203 16.0084 23.6767 16.4517 23.1317 16.4517H20.2531V16.2922C20.2531 15.031 21.279 14.0048 22.5405 14.0048H23.6005C23.8872 14.0048 24.1203 14.2379 24.1203 14.5243V15.4634Z"
                                  fill="Currentcolor"
                                />
                              </svg>
                            </div>
                            <div className="font text-color-1">{elm?.type}</div>
                          </li>
                          <li className="flex-three">
                            <div className="icon">
                              <svg
                                width={26}
                                height={26}
                                viewBox="0 0 26 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M13.0201 1.36567C6.01644 1.36567 0.338867 7.04319 0.338867 14.0469C0.338867 17.5621 1.76949 20.7429 4.0797 23.0397L5.9713 21.1482C4.21609 19.4062 3.10579 17.0174 3.0217 14.3695H4.4646C4.53121 14.3695 4.59717 14.3564 4.65872 14.3309C4.72026 14.3055 4.77618 14.2681 4.82328 14.221C4.87038 14.1739 4.90774 14.118 4.93323 14.0564C4.95871 13.9949 4.97182 13.9289 4.97181 13.8623C4.97181 13.5823 4.74478 13.3552 4.4646 13.3552H3.04011C3.19341 11.1113 4.08583 9.0715 5.47678 7.47599L6.51366 8.51297C6.71168 8.71114 7.03293 8.71114 7.23095 8.51297C7.42912 8.31485 7.42912 7.99375 7.23095 7.79568L6.18096 6.74554C7.85526 5.17655 10.0676 4.17518 12.5129 4.05314V5.37779C12.5129 5.65781 12.74 5.88484 13.0201 5.88484C13.3002 5.88484 13.5273 5.65781 13.5273 5.37779V4.05304C16.0066 4.17674 18.2463 5.20489 19.9286 6.81153L18.9446 7.79558C18.7465 7.99365 18.7465 8.31475 18.9446 8.51287C19.1427 8.71104 19.4638 8.71104 19.6619 8.51287L20.6263 7.54842C21.9813 9.13307 22.8492 11.1451 23.0001 13.3551H21.4342C21.1542 13.3551 20.927 13.5822 20.927 13.8622C20.927 14.1424 21.1542 14.3694 21.4342 14.3694H23.0184C22.9344 17.0174 21.8239 19.4061 20.0688 21.1481L21.9603 23.0396C24.2707 20.7427 25.7012 17.562 25.7012 14.0468C25.7012 7.04314 20.0237 1.36567 13.0201 1.36567Z"
                                  fill="Currentcolor"
                                />
                                <path
                                  d="M18.3226 9.01872C17.9481 8.69788 17.4941 9.2079 17.0806 9.57169L11.9705 14.3412C11.6574 14.6758 11.7415 15.2637 12.1586 15.6542L12.2426 15.7325C12.6596 16.1229 13.2518 16.1681 13.5651 15.8336L17.8246 10.3619C18.2099 9.85707 18.6592 9.35106 18.3769 9.07041L18.3226 9.01872Z"
                                  fill="Currentcolor"
                                />
                              </svg>
                            </div>
                            <div className="font text-color-1">{elm?.km?.toLocaleString()}</div>
                          </li>
                          <li className="flex-three">
                            <div className="icon">
                              <svg
                                width={26}
                                height={26}
                                viewBox="0 0 26 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M13.0001 0.222775C5.95485 0.222775 0.222852 5.95478 0.222852 13C0.222852 20.0452 5.95485 25.7772 13.0001 25.7772C20.0453 25.7772 25.7773 20.0452 25.7773 13C25.7773 5.95478 20.0453 0.222775 13.0001 0.222775ZM13.0001 23.8051C7.04202 23.8051 2.195 18.9581 2.195 13C2.195 7.04195 7.04202 2.19493 13.0001 2.19493C18.9581 2.19493 23.8051 7.04195 23.8051 13C23.8051 18.9581 18.9581 23.8051 13.0001 23.8051Z"
                                  fill="Currentcolor"
                                  stroke="Currentcolor"
                                  strokeWidth="0.4"
                                />
                                <path
                                  d="M13 12.1875C11.6789 12.1875 10.5625 11.4433 10.5625 10.5625C10.5625 9.68175 11.6789 8.9375 13 8.9375C13.7475 8.9375 14.4398 9.1715 14.898 9.57775C14.9777 9.64877 15.0707 9.70335 15.1716 9.73837C15.2724 9.77338 15.3792 9.78814 15.4858 9.7818C15.5924 9.77546 15.6967 9.74814 15.7927 9.70142C15.8887 9.65469 15.9745 9.58947 16.0452 9.5095C16.3442 9.17475 16.3134 8.66125 15.977 8.36225C15.4082 7.85687 14.6445 7.51562 13.8125 7.38075V6.5C13.8125 6.0515 13.4485 5.6875 13 5.6875C12.5515 5.6875 12.1875 6.0515 12.1875 6.5V7.3775C10.335 7.67975 8.9375 8.99275 8.9375 10.5625C8.9375 12.3549 10.7607 13.8125 13 13.8125C14.3211 13.8125 15.4375 14.5568 15.4375 15.4375C15.4375 16.3182 14.3211 17.0625 13 17.0625C12.2525 17.0625 11.5602 16.8285 11.102 16.4222C10.7672 16.1233 10.2537 16.1525 9.95475 16.4905C9.65575 16.8252 9.68663 17.3387 10.023 17.6378C10.5918 18.1448 11.3555 18.4844 12.1875 18.6209V19.5C12.1875 19.9485 12.5515 20.3125 13 20.3125C13.4485 20.3125 13.8125 19.9485 13.8125 19.5V18.6225C15.665 18.3203 17.0625 17.0072 17.0625 15.4375C17.0625 13.6451 15.2393 12.1875 13 12.1875Z"
                                  fill="Currentcolor"
                                />
                              </svg>
                            </div>
                            <div className="font text-color-1">${elm?.price?.toLocaleString()}</div>
                          </li>
                          <li className="flex-three mb-1">
                            <div className="icon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={26}
                                height={26}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="lucide lucide-landmark-icon lucide-landmark me-1 text-color-3"
                              >
                                <path d="M10 18v-7" />
                                <path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z" />
                                <path d="M14 18v-7" />
                                <path d="M18 18v-7" />
                                <path d="M3 22h18" />
                                <path d="M6 18v-7" />
                              </svg>
                            </div>
                            <div className="font text-color-1">${(elm?.price / 10000 * 39).toFixed(1)} / week</div>
                          </li>
                        </ul>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))
      }

      <div className="swiper-button-next snbn19" />
      <div className="swiper-button-prev snbp19" />
    </Swiper>
  );
}
