"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import Nav from "./Nav";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import ComingSoon1 from "../../public/assets/images/car-list/buy-coming-soon.png"
import ComingSoon2 from "../../public/assets/images/car-list/coming-soon-mobile.png"

export default function Header1({ bg = "style2" }) {
  const router = useRouter();
  const ref = useRef();
  const pathname = usePathname();
  // const searchParams = useSearchParams() || '';
  const [ComingSoon, setComingSoon] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // useEffect(() => {
  //   if (pathname.includes("/buy") && searchParams?.get("search")) {
  //     scrollToSection("section3");
  //   }
  // }, [])


  useEffect(() => {
    if (window.location.origin.includes("carsymotors") && !window.localStorage.getItem("comingSoon")) {
      setTimeout(() => {
        setComingSoon(true);
      }, 2000);
    }
  }, [])

  const onSearch = (e) => {
    e.preventDefault();
    router.push("/buy?search=" + ref.current.value);
    setTimeout(() => {
      scrollToSection("section3");
    }, 1000);
  }

  const handleSearchClear = (e) => {
    // If the value is empty, the user clicked the native clear (cross) button
    if (e.target.value === "" && pathname.includes("/buy")) {
      router.push("/buy");
      // Put your custom logic here (e.g., resetting a list, clearing state, etc.)
    }
  };

  return (
    <>
      {
        ComingSoon && <div className="blur position-fixed w-100 top-0 left-0 d-flex justify-content-center align-items-center" style={{ zIndex: 999, height: '100vh' }}>
          <Image src={ComingSoon1} className="w-75 d-none d-md-block border border-5 border-primary" objectFit="cover" />
          <Image src={ComingSoon2} className="w-75 d-md-none border border-5 border-primary" objectFit="cover" />
        </div>
      }
      <header className={"main-header " + bg}>
        {/* Header Lower */}
        <div className="header-lower">
          <div className="container2">
            <div className="row">
              <div className="col-lg-12">
                <div className="inner-container flex justify-space align-center">
                  {/* Logo Box */}
                  <div className="logo-box flex">
                    <div className="logo">
                      <Link href={`/`}>
                        <Image
                          className="lazyload d-md-none"
                          data-src="/assets/images/logo/logo-mobile.PNG"
                          alt=""
                          width={100}
                          height={40}
                          src="/assets/images/logo/logo-mobile.PNG"
                        />
                        <Image
                          className="lazyload d-none d-md-flex"
                          data-src="/assets/images/logo/logo.png"
                          alt=""
                          width={100}
                          height={40}
                          src="/assets/images/logo/logo.png"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="nav-outer flex align-center">
                    {/* Main Menu */}
                    <nav className="main-menu show navbar-expand-md">
                      <div
                        className="navbar-collapse collapse clearfix"
                        id="navbarSupportedContent"
                      >
                        <ul className="navigation clearfix">
                          <Nav />
                        </ul>
                      </div>
                    </nav>
                    {/* Main Menu End*/}
                  </div>
                  <Suspense fallback={<div>Loading search...</div>}>
                    <div className="header-account flex align-center ms-5">
                      <div className="search-mobie ms-5">
                        <a
                          onClick={() => {
                            document
                              .querySelector(".header-search-icon")
                              .classList.toggle("opened");
                            document
                              .querySelector(".wd-find-select")
                              .classList.toggle("opened");
                          }}
                          className="header-search-icon flex items-center justify-center"
                        >
                          <i className="icon-autodeal-search search-icon fs-20" />
                          <i className="icon-autodeal-plus search-icon fs-20" />
                        </a>
                        <div className="wd-find-select">
                          <form onSubmit={onSearch}>
                            <div className="form-group-1 search-form form-style2 relative d-flex align-items-center">
                              <button type="submit" className="bg-black border">
                                <i className="icon-autodeal-search cursor-pointer" />
                              </button>
                              <input
                                type="search"
                                ref={ref}
                                className="search-field"
                                id="search-terms"
                                placeholder="Search..."
                                // defaultValue={searchParams.get("search")}
                                name="search"
                                title="Search for"
                                onChange={handleSearchClear} // <-- Add this handler
                                required
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                      <Link
                        href="/favourites"
                        className="header-favorite flex items-center justify-center"
                      >
                        <i className="icon-autodeal-favorite fs-18" />
                      </Link>
                    </div>
                  </Suspense>
                  <div
                    className="mobile-nav-toggler mobile-button"
                    onClick={() =>
                      document.body.classList.add("mobile-menu-visible")
                    }
                  >
                    <span />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Header Lower */}
        {/* Mobile Menu  */}
        <div
          className="close-btn"
          onClick={() => document.body.classList.remove("mobile-menu-visible")}
        >
          <span className="icon flaticon-cancel-1" />
        </div>
        <div className="mobile-menu">
          <div
            className="menu-backdrop"
            onClick={() => document.body.classList.remove("mobile-menu-visible")}
          />
          <nav className="menu-box">
            <div className="nav-logo">
              <Link href={`/`}>
                <Image
                  className="lazyload"
                  data-src="/assets/images/logo/logo.png"
                  alt=""
                  width={197}
                  height={48}
                  src="/assets/images/logo/logo.png"
                />
              </Link>
            </div>
            <div className="bottom-canvas">
              <MobileNav />
              <div className="tf-top-bar-left">
                <ul>
                  <li className="flex-three gap-8">
                    <div className="icon">
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.5 5.62525V12.5003M12.5 7.50025V14.3753M12.9192 17.2903L16.9817 15.2594C17.2992 15.1011 17.5 14.7761 17.5 14.4211V4.01692C17.5 3.32025 16.7667 2.86692 16.1433 3.17859L12.9192 4.79025C12.655 4.92275 12.3442 4.92275 12.0808 4.79025L7.91917 2.71025C7.78901 2.6452 7.64551 2.61133 7.5 2.61133C7.35449 2.61133 7.21098 2.6452 7.08083 2.71025L3.01833 4.74109C2.7 4.90025 2.5 5.22525 2.5 5.57942V15.9836C2.5 16.6803 3.23333 17.1336 3.85667 16.8219L7.08083 15.2103C7.345 15.0778 7.65583 15.0778 7.91917 15.2103L12.0808 17.2911C12.345 17.4228 12.6558 17.4228 12.9192 17.2911V17.2903Z"
                          stroke="CurrentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p>
                      <a href="https://maps.app.goo.gl/wurV65WKKcWqtX3W8" className="text-color-2">
                        1394 Ipswich Rd, Rocklea QLD 4106, Australia
                      </a>
                    </p>
                  </li>
                  <li className="flex-three gap-8">
                    <div className="icon">
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 5V10H13.75M17.5 10C17.5 10.9849 17.306 11.9602 16.9291 12.8701C16.5522 13.7801 15.9997 14.6069 15.3033 15.3033C14.6069 15.9997 13.7801 16.5522 12.8701 16.9291C11.9602 17.306 10.9849 17.5 10 17.5C9.01509 17.5 8.03982 17.306 7.12987 16.9291C6.21993 16.5522 5.39314 15.9997 4.6967 15.3033C4.00026 14.6069 3.44781 13.7801 3.0709 12.8701C2.69399 11.9602 2.5 10.9849 2.5 10C2.5 8.01088 3.29018 6.10322 4.6967 4.6967C6.10322 3.29018 8.01088 2.5 10 2.5C11.9891 2.5 13.8968 3.29018 15.3033 4.6967C16.7098 6.10322 17.5 8.01088 17.5 10Z"
                          stroke="CurrentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-color-2">Mon - Sat 8.00 - 18.00</p>
                  </li>
                  <li className="flex-three gap-8">
                    <div className="icon">
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.875 5.625C1.875 12.5283 7.47167 18.125 14.375 18.125H16.25C16.7473 18.125 17.2242 17.9275 17.5758 17.5758C17.9275 17.2242 18.125 16.7473 18.125 16.25V15.1067C18.125 14.6767 17.8325 14.3017 17.415 14.1975L13.7292 13.2758C13.3625 13.1842 12.9775 13.3217 12.7517 13.6233L11.9433 14.7008C11.7083 15.0142 11.3025 15.1525 10.935 15.0175C9.57073 14.5159 8.33179 13.7238 7.30398 12.696C6.27618 11.6682 5.48406 10.4293 4.9825 9.065C4.8475 8.6975 4.98583 8.29167 5.29917 8.05667L6.37667 7.24833C6.67917 7.0225 6.81583 6.63667 6.72417 6.27083L5.8025 2.585C5.75178 2.38225 5.63477 2.20225 5.47004 2.07361C5.30532 1.94498 5.10234 1.87507 4.89333 1.875H3.75C3.25272 1.875 2.77581 2.07254 2.42417 2.42417C2.07254 2.77581 1.875 3.25272 1.875 3.75V5.625Z"
                          stroke="CurrentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-color-2">
                      <a href="tel:8085550111">(808) 555-0111</a>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        {/* End Mobile Menu */}
      </header>
    </>

  );
}
