import Image from "next/image";
import React from "react";

export default function ProfileInfo({ car }) {
  return (
    <>
      {/* <div className="prolile-info flex-three mb-30">
        <div className="image">
          <Image
            className="lazyload"
            data-src="/assets/images/author/avt1.jpg"
            alt="image"
            src="/assets/images/author/avt1.jpg"
            width={450}
            height={450}
          />
        </div>
        <div className="content">
          <h4>Cary Dealers</h4>
          <div className="verified flex-three">
            <div className="icon">
              <svg
                width={14}
                height={15}
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 8.00024L6.5 9.50024L9 6.00024M7 1.30957C5.49049 2.74306 3.48018 3.52929 1.39867 3.50024C1.13389 4.30689 0.999317 5.15057 1 5.99957C1 9.72757 3.54934 12.8596 7 13.7482C10.4507 12.8602 13 9.72824 13 6.00024C13 5.1269 12.86 4.28624 12.6013 3.49957H12.5C10.3693 3.49957 8.43334 2.66757 7 1.30957Z"
                  stroke="CurrentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="fs-12 fw-6 lh-16">Verified authurity</span>
          </div>
        </div>
      </div> */}
       
      {/* <div className="">
        <div className="inner listing-infor-box">
          <div className="icon">
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
              class="lucide lucide-banknote-arrow-down-icon lucide-banknote-arrow-down"
            >
              <path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5" />
              <path d="m16 19 3 3 3-3" />
              <path d="M18 12h.01" />
              <path d="M19 16v6" />
              <path d="M6 12h.01" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </div>
          <div className="content-listing-info">
            <span className="listing-info-title">Interest</span>
            <p className="listing-info-value">{car?.interest_rate || "Not found"}</p>
          </div>
        </div>
      </div> */}
    
      <div className="profile-map mb-30">
        <h6>Location</h6>

        <div className="list-icon-pf gap-8 mt-3 flex-three">
          <i className="far fa-map" />
          <p className="font-1">{car?.location || "Not found"}</p>
        </div>
        {/* <div className="map">
          <iframe
            className="map-content"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7302.453092836291!2d90.47477022812872!3d23.77494577893369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1627293157601!5m2!1svi!2s"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div> */}
      </div>
      <div className="listing-line" />
      <div className="profile-contact">
        {/* <h6>Contact dealer</h6> */}
        <div className="btn-contact">
          <a href="javascript:void(0)" className="btn-pf bg-orange mt-3">
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
              class="lucide lucide-mail-icon lucide-mail"
            >
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
              <rect x="2" y="4" width="20" height="16" rx="2" />
            </svg>{" "}
            <span className="fs-16 fw-5 lh-20 font text-color-1">
              Enquire Now
            </span>
          </a>
          <a href="javascript:void(0)" className="btn-pf bg-orange mt-3">
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
              class="lucide lucide-navigation-icon lucide-navigation"
            >
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>{" "}
            <span className="fs-16 fw-5 lh-20 font text-color-1">
              Get Finance
            </span>
          </a>
          <a href="javascript:void(0)" className="btn-pf bg-orange mt-3">
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
              class="lucide lucide-tag-icon lucide-tag"
            >
              <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
              <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
            </svg>{" "}
            <span className="fs-16 fw-5 lh-20 font text-color-1">
              Trade_In Valuation
            </span>
          </a>
          <a href="javascript:void(0)" className="btn-pf bg-green mt-3">
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
              class="lucide lucide-shopping-cart-icon lucide-shopping-cart"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>{" "}
            <span className="fs-16 fw-5 lh-20 font text-color-1">
              Online Purchase
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
