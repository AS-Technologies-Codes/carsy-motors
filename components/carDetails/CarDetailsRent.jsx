"use client";
import React, { useState } from 'react'
import CarReview from './RentReview';
import CarProtection from './CarProtection';
import SidebarToggleButton from './SidebarToggleButton';
import Recommended from './detailComponents/Recommended';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CarInfo from './detailComponents/CarInfo';

const CarDetailsRent = ({ carItem }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [CarDetailsListing, setCarDetailsListing] = useState({});
  const router = useRouter();

  const STEPS = [
    { key: 0, label: "Car Selected" },
    { key: 1, label: "Car Review" },
    { key: 2, label: "Protection & Extras" },
    { key: 3, label: "Booking" },
  ];


  if (!CarDetailsListing?.title) {
    return <CarReview
      carItem={carItem}
      setCurrentStep={setCurrentStep}
      CarDetailsListing={CarDetailsListing}
      setCarDetailsListing={setCarDetailsListing}
    />
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
                  <Link
                    className="home fw-6 text-color-3"
                    onClick={() => router.back()}
                    href={"javascript:void(0)"}
                  >
                    Rent a Car
                  </Link>
                  <span>{CarDetailsListing?.title} for sale</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="msf-progress flex justify-content-center py-5">
        {STEPS.map((step, index) => (
          <div
            key={step.key}
            className={`msf-progress-item ${index === currentStep - 1 ? "is-active" : ""
              } ${index < (currentStep - 1) ? "is-complete" : ""}`}
          >
            <span className="msf-progress-dot">
              {index < (currentStep - 1) ? "✓" : index + 1}
            </span>
            <span className="msf-progress-label">{step.label}</span>
          </div>
        ))}
      </div>
      <section className="tf-section3 listing-detail style-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">

              {currentStep === 1 ?
                <CarReview
                  carItem={carItem}
                  setCurrentStep={setCurrentStep}
                  CarDetailsListing={CarDetailsListing}
                  setCarDetailsListing={setCarDetailsListing}
                />
                :
                currentStep === 2 ?
                  <CarProtection />
                  :
                  null
              }
            </div>
            <div className="col-lg-4">
              <div className="overlay-siderbar-mobie" />
              <div className="listing-sidebar">
                <div className="widget-listing mb-40">
                  <div className="heading-widget">
                    <h2 className="title">{CarDetailsListing?.title}</h2>
                    <CarInfo carItem={CarDetailsListing} />
                  </div>
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
  )
}

export default CarDetailsRent