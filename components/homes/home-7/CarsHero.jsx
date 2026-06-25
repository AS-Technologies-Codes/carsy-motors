"use client";
import Image from "next/image";
import Link from "next/link";
export default function CarsHero() {
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
      nextEl: ".snbn21",
      prevEl: ".snbp21",
    },
  };

  const slides4 = [
    {
      imgSrc: "/assets/images/slider/slide7.jpg",
      title: "Life's Too Short for a Dodgy Deal",
      label: `WELCOME TO CARSY MOTORS`,
      description: `We help everyday Queenslanders buy smarter, sell faster, and hire without blowing the budget — right here in Brissie.`,
      reserveLink: "#",
      specifications: [
        {
          title: "Cash for Car",
          value: "Get an Offer",
          href: "javascipt:void(0)",
          // href: "#loan-calculator",
          description:
            "Instant offers with quick secure payments and free pickup.",
          delay: "0ms",
          image: "url(/assets/images/hero-banner/car1.png)",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-coins-icon lucide-coins"
            >
              <path d="M13.744 17.736a6 6 0 1 1-7.48-7.48" />
              <path d="M15 6h1v4" />
              <path d="m6.134 14.768.866-.5 2 3.464" />
              <circle cx="16" cy="8" r="6" />
            </svg>
          ),
        },
        {
          title: "Buy Pre-owned Cars",
          value: "View Inventory",
          href: "/car-sells",
          description:
            "Quality cars inspected ready ownership transfer and warranty.",
          delay: "100ms",
          color: "bg-blue",
          image: "url(/assets/images/hero-banner/car2.png)",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-car-front-icon lucide-car-front"
            >
              <path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8" />
              <path d="M7 14h.01" />
              <path d="M17 14h.01" />
              <rect width="18" height="8" x="3" y="10" rx="2" />
              <path d="M5 18v2" />
              <path d="M19 18v2" />
            </svg>
          ),
        },
        {
          title: "Car Hire Service",
          value: "View Rental Offers",
          href: "/#",
          description:
            "Flexible rentals for your needs. Book now and hit the road with confidence.",
          delay: "200ms",
          image: "url(/assets/images/hero-banner/car3.png)",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-calendar-clock-icon lucide-calendar-clock"
            >
              <path d="M16 14v2.2l1.6 1" />
              <path d="M16 2v4" />
              <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
              <path d="M3 10h5" />
              <path d="M8 2v4" />
              <circle cx="16" cy="16" r="6" />
            </svg>
          ),
        },
      ],
      controllers: [
        {
          label1: "Discover",
          label2: "More",
          iconClass: "icon-autodeal-plus1",
          delay: "0ms",
        },
        {
          label1: "Explore",
          label2: "Details",
          iconClass: "icon-autodeal-view2",
          delay: "200ms",
        },
        {
          label1: "Red",
          label2: "Multi-coat",
          iconClass: "icon-autodeal-red",
          delay: "400ms",
        },
      ],
    },
  ];

  const featList = [
    {
      head: "Trusted & Reliable",
      des: "Your satisfaction, our priority",
      icon: (
        <svg
          width={45}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="#fd5a21"
          className="size-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
          />
        </svg>
      ),
    },
    {
      head: "Best Prices",
      des: "Competitive and transparent",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          width={45}
          strokeWidth={1}
          stroke="#fd5a21"
          class="size-3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 6h.008v.008H6V6Z"
          />
        </svg>
      ),
    },
    {
      head: "Quick & Easy",
      des: "Save time, drive more",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          width={45}
          strokeWidth={1}
          stroke="#fd5a21"
          className="size-3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
    },
    {
      head: "24/7 Support",
      des: "We're here for you",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          width={45}
          strokeWidth={1}
          stroke="#fd5a21"
          className="size-3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          />
        </svg>
      ),
    },
  ];

  const featList2 = [
    {
      head: "Wide Selection",
      des: "Find the perfect car for your needs",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={45}
          strokeWidth={1}
          fill="#fd5a21"
          stroke="white"
          class="size-3"
        >
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
          <path d="m9 16 2 2 4-4" />
        </svg>
      ),
    },
    {
      head: "Inspected & Verified",
      des: "Every car is quality checked for peace of mind.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={45}
          strokeWidth={1}
          fill="#fd5a21"
          stroke="white"
          class="size-3"
        >
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
  ];

  const featList3 = [
    {
      head: "Short-term rentals",
      des: "Find the perfect car for your needs",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={45}
          strokeWidth={1}
          fill="#fd5a21"
          stroke="white"
          class="size-3"
        >
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
          <path d="M8 14h.01" />
          <path d="M12 14h.01" />
          <path d="M16 14h.01" />
          <path d="M8 18h.01" />
          <path d="M12 18h.01" />
          <path d="M16 18h.01" />
        </svg>
      ),
    },
    {
      head: "Long-term rentals",
      des: "Every car is quality checked for peace of mind.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={45}
          strokeWidth={1}
          fill="#fd5a21"
          stroke="white"
          class="size-3"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M16 2v4" />
          <path d="M3 10h18" />
          <path d="M8 2v4" />
          <path d="M17 14h-6" />
          <path d="M13 18H7" />
          <path d="M7 14h.01" />
          <path d="M17 18h.01" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
      @media (max-width: 768px) {
            .border-sm-0 {
              border-width: 0px !important;
            }
      }
    `}</style>
      {slides4.map((slide, index) => (
        <div className="swiper mainslider slider home7">
          <div className="swiper-slide">
            <div className="slider-item">
              <div className="img-slider">
                <Image
                  className="img-item lazyload"
                  data-src={slide.imgSrc}
                  alt=""
                  src={slide.imgSrc}
                  width={3840}
                  height={1920}
                />
              </div>
              <div className="container2 relative">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="content flex justify-space">
                      <div className="po-content w-100">
                        <div className="heading text-center">
                          <p className="text-color-3 text-capitalize font fs-5 fade-item-2">
                            {slide.label}
                          </p>
                          <h1 className="text-color-1 fade-item-1 fs-1">
                            {slide.title}
                          </h1>
                          <p className="text-color-1 fs-6 font fade-item-2">
                            {slide.description}
                          </p>
                        </div>
                        <div className="specifications-wrap d-flex justify-content-center">
                          {slide.specifications.map((spec, specIndex) => (
                            <div
                              style={{ backgroundImage: spec?.image }}
                              key={specIndex}
                              className="specifications specifications-bg  hover-zoom border border-primary-half wow px-4 fadeInUp d-flex flex-column justify-content-between mx-3"
                              data-wow-delay={spec.delay}
                              data-wow-duration="1000ms"
                            >
                              <div className="specifications-content text-center">
                                <div className="specifications-title controller-button text-center">
                                  <div
                                    className={`icon-controller m0-auto mb-2 ${spec?.color ? spec.color : "bg-primary"}`}
                                  >
                                    {spec?.icon}
                                  </div>
                                  {/* <div className="title fs-20 fw-5 lh-25 text-color-3">
                              {spec.title}
                            </div> */}
                                </div>
                                <p className="text-color-3 font fs-4 fw-medium  mb-2">
                                  {spec.title}
                                </p>
                                <div className="font text-color-1">
                                  {specIndex !== 0 && spec.description}
                                </div>
                              </div>

                              <div className="d-flex justify-content-center w-full">
                                <div className="d-flex  justify-content-between">
                                  {specIndex == 1 &&
                                    featList2.map((item, index) => (
                                      <div
                                        key={index}
                                        className={`d-flex align-items-center mx-1 justify-content-center flex-column border-color-gray text-color-2 border-half rounded-4`}
                                      >
                                        {item.icon}
                                        <h6 className="text-color-3 fw-bold fs-12">
                                          {item.head}
                                        </h6>
                                        <p className="text-color-1 text-center fw-normal  fs-12">
                                          {item.des}
                                        </p>
                                      </div>
                                    ))}
                                </div>
                              </div>
                              {specIndex == 0 && (
                                <h6 className="text-color-1  text-center fs-5 ps-1 lh-sm">
                                  Instant offers with quick <br /> secure
                                  payments and free pickup.
                                </h6>
                              )}

                              {specIndex == 2 && (
                                <h6 className="text-color-1  text-center fs-6 ps-1">
                                  Flexibal rentals with easy <br /> booking
                                  options
                                </h6>
                              )}

                              <div className="d-flex justify-content-center w-full">
                                <div className="d-flex justify-content-between">
                                  {specIndex == 2 &&
                                    featList3.map((item, index) => (
                                      <div
                                        key={index}
                                        className={`d-flex align-items-center p-2 mx-1 justify-content-center border-color-gray text-color-2 border-half rounded-4`}
                                      >
                                        {item.icon}
                                        <h6 className="text-color-1 fw-bold fs-12 ps-1">
                                          {item.head}
                                        </h6>
                                        {/* <p className="text-color-1 text-center fw-normal  fs-12 opacity-75">
                                        {item.des}
                                      </p> */}
                                      </div>
                                    ))}
                                </div>
                              </div>

                              {specIndex != 2 && (
                                <Link
                                  href={spec.href}
                                  className={`sc-button btn-svg btn-55 ${spec?.color ? spec.color : ""}`}
                                >
                                  <span>{spec.value}</span>
                                  <i className="icon-autodeal-next" />
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="d-flex justify-content-center w-full">
                          <div className=" flex flex-column ms-3 ms-md-0 flex-md-row my-3 justify-content-center mt-5 border-half border-sm-0 rounded-4">
                            {featList.map((item, index) => (
                              <div
                                className={`d-flex align-items-center my-3 ${index === featList.length - 1 ? "" : "border-md-end"}  px-md-5 border-color-gray text-color-2`}
                              >
                                {item.icon}
                                <div className="mx-1">
                                  <h5 className="text-color-1">{item.head}</h5>
                                  <p className="text-color-6">{item.des}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
