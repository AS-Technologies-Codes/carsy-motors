"use client";
import React, { useEffect, useState } from 'react'
import CarReview from './RentReview';
import CarProtection from './CarProtection';
import SidebarToggleButton from './SidebarToggleButton';
import Recommended from './detailComponents/Recommended';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CarInfo from './detailComponents/CarInfoRent';
import RentBooking from './RentBooking';
import { useCarFilter } from '@/context/providers/CarFilterContext';
import toast from 'react-hot-toast';

const CarDetailsRent = ({ carItem }) => {
  const [currentStep, setCurrentStep] = useState(2);
  const [CarDetailsListing, setCarDetailsListing] = useState({});
  // const { state, dispatch } = useCarFilter();
  // const {
  // } = state;
  const router = useRouter();


  // const defaultValues = {
  //   "customer_phone": "03001234567",
  //   "booking_date": "2026-07-27 14:30:00",
  //   "rental_type": "short_term",
  //   "type": "rent",
  //   "dob": "1998-06-15",
  //   "protection": "Premium Protection Cover",
  //   "extra": {
  //     "1": "GPS Navigation",
  //     "2": "Baby Seat",
  //     "3": "Additional Driver"
  //   },
  //   "plan":
  //     "Weekly Rental Plan",
  //   "plan_amount":
  //     "750",
  //   "start_date": "2027-01-10",
  //   "end_date": "2027-01-15",
  //   "pickup_location": "Carsy Yard Sydney",
  //   "return_location": "Carsy Yard Sydney",
  //   "total_amount": 1000,
  //   "payment_type": CarDetailsListing?.payment_type
  // }


  const changesRemoved = (t) => {
    window.localStorage.removeItem("filters");
    router.push(`/rentals/${CarDetailsListing.rent_type}`);
    toast.dismiss(t.id);
  }
  const STEPS = [
    {
      key: 0,
      icon: "",
      label: "Car Selected"
    },
    {
      key: 1,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="inherit" height="inherit" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-car-front-icon lucide-car-front"><path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8" /><path d="M7 14h.01" /><path d="M17 14h.01" /><rect width="18" height="8" x="3" y="10" rx="2" /><path d="M5 18v2" /><path d="M19 18v2" /></svg>,
      label: "Car Review"
    },
    {
      key: 2,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="inherit" height="inherit" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="second lucide lucide-shield-cog-corner-icon lucide-shield-cog-corner"><path d="M11 22c-3.806-1.45-7-3.966-7-9V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v4" /><path d="M14.923 16.547 14 16.164" /><path d="m14.923 18.843-.923.383" /><path d="M16.547 14.923 16.164 14" /><path d="m16.547 20.467-.383.924" /><path d="m18.843 14.923.383-.923" /><path d="m19.225 21.391-.382-.924" /><path d="m20.467 16.547.923-.383" /><path d="m20.467 １８.843.923.383" /><circle cx="１７．６９５" cy="１７．６９５" r="３" /></svg>,
      label: "Protection & Extras"
    },
    {
      key: 3,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="inherit" height="inherit" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="second lucide lucide-user-round-key-icon lucide-user-round-key"><path d="M19 11v6" /><path d="M19 13h2" /><path d="M2 21a8 8 0 0 1 12.868-6.349" /><circle cx="10" cy="8" r="5" /><circle cx="19" cy="19" r="2" /></svg>,
      label: "Booking"
    },
  ];

  const showActionToast = () => {
    toast((t) => (
      <div className="gap-3 flex justify-content-center flex-column align-items-center">
        {/* <h1 className="fs-4">Please select an age</h1> */}
        <div className="fw-bold mt-3">Alert!</div>
        <div className="center">Are you sure you want to de-select all changes?</div>

        <button
          onClick={() => changesRemoved(t)}
          className="sc-button border-0"
        >
          <span>Yes</span>
        </button>
      </div>
    ), {
      // Optional: Stop the toast from automatically hiding 
      // so the user is forced to click "OK"
      duration: Infinity,
    });
  };

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
            onClick={() => index == 0 ? showActionToast() : setCurrentStep(index + 1)}
            className={`msf-progress-item ${index === currentStep - 1 ? "is-active" : ""
              } ${index < (currentStep - 1) ? "is-complete" : ""}`}
          >
            {step.icon ?
              step.icon :
              <span className="msf-progress-dot">
                {index < (currentStep - 1) ? "✓" : index + 1}
              </span>
            }
            <h2 className="msf-progress-label">{step.label}</h2>
          </div>
        ))}
      </div>
      <section className="tf-section3 listing-detail style-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">

              {currentStep === 2 ?
                <CarReview
                  carItem={carItem}
                  setCurrentStep={setCurrentStep}
                  CarDetailsListing={CarDetailsListing}
                  setCarDetailsListing={setCarDetailsListing}
                />
                :
                currentStep === 3 ?
                  <CarProtection />
                  :
                  currentStep === 4 ?
                    <RentBooking />
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
                    <CarInfo carItem={CarDetailsListing} step={currentStep} setCurrentStep={setCurrentStep} />
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