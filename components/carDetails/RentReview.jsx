"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Slider1 from "./sliders/Slider1";
// import Image from "next/image";
import Description from "./detailComponents/Description";
import Overview from "./detailComponents/Overview";
import toast from "react-hot-toast";
// import LoanCalculator from "./detailComponents/LoanCalculator";
// import CarReview from "./detailComponents/CarReview";
import CarInfo from "./detailComponents/CarInfo";
import Recommended from "./detailComponents/Recommended";
import Features from "./detailComponents/Features";
import SidebarToggleButton from "./SidebarToggleButton";
import { getCarDetailsApi } from "@/utils/APIs";
import Link from "next/link";
import { useCarFilter } from "@/context/providers/CarFilterContext";
import { getFiltersData } from "@/context/reducer/carFilterReducer";
// import { setFiltersData } from "@/context/reducer/carFilterReducer";

export default function CarReview({ carItem, setCurrentStep, CarDetailsListing, setCarDetailsListing }) {
    const [CarDetailsLoading, setCarDetailsLoading] = useState(true);

    const fetchCarDetails = async () => {
        try {
            setCarDetailsLoading(true);
            const getCarDetailsData = await getCarDetailsApi(carItem);
            const filteredData = JSON.parse(
                window.localStorage.getItem("favouriteCar") || "[]",
            ).some((car) => car.id == carItem)
                ? { ...getCarDetailsData, favorite: "#fd5a21" }
                : { ...getCarDetailsData, favorite: "none" };
            setCarDetailsListing(filteredData);
        } catch (error) {
            // toast.error(error);
            return;
        } finally {
            setCarDetailsLoading(false);
        }
    };

    useEffect(() => {
        fetchCarDetails();
    }, []);

    if (CarDetailsLoading) {
        return (
            <div className="center my-5">
                <span className="loader"></span>
            </div>
        );
    }
    return (
        <div className="listing-detail-wrap">
            <Slider1
                images={CarDetailsListing?.images?.map((img) => img.src)}
                viewer={
                    CarDetailsListing?.sepriteiamge?.length
                        ? JSON.parse(
                            CarDetailsListing?.sepriteiamge[0].sprite_url,
                        )
                        : []
                }
            />

            <ProfileInfo
                setCurrentStep={setCurrentStep}
            />

            <div className="row">
                <div className="col-lg-12">
                    <nav
                        id="navbar-example2"
                        className="navbar tab-listing-scroll"
                    >
                        <ul className="nav nav-pills">
                            <li className="nav-item">
                                <a className="nav-link" href="#scrollspyHeading1">
                                    Overview
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#scrollspyHeading2">
                                    Specs &amp; features
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#scrollspyHeading3">
                                    Comfort & Convenience
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#scrollspyHeading4">
                                    Car for Cash Calculator
                                </a>
                            </li>
                            {/* <li className="nav-item">
                          <a className="nav-link" href="#scrollspyHeading5">
                            New car reviews
                          </a>
                        </li> */}
                        </ul>
                    </nav>
                    <div
                        data-bs-spy="scroll"
                        data-bs-target="#navbar-example2"
                        data-bs-offset={0}
                        className="scrollspy-example"
                        tabIndex={0}
                    >
                        {CarDetailsListing?.description && (
                            <Description desc={CarDetailsListing.description} />
                        )}
                        <div
                            className="listing-description footer-col-block"
                            id="scrollspyHeading1"
                        >
                            <div className="footer-heading-desktop">
                                <h2>Car overview</h2>
                            </div>
                            <div className="footer-heading-mobie listing-details-mobie">
                                <h2>Car overview</h2>
                            </div>
                            <Overview car={CarDetailsListing} />
                        </div>
                        <div className="listing-line" />
                        <div
                            className="listing-features footer-col-block"
                            id="scrollspyHeading2"
                        >
                            <div className="footer-heading-desktop mb-30">
                                <h2>Features</h2>
                            </div>
                            <Features feat={CarDetailsListing} />
                        </div>
                        <div className="listing-line" />
                    </div>
                </div>
            </div>
        </div>
    );
}

const ProfileInfo = ({ setCurrentStep }) => {

    const { state, dispatch } = useCarFilter();


    const setFilters = (values) => {
        const oldValues =
            JSON.parse(window.localStorage.getItem("filters")) || {};
        const payload = { ...oldValues || {}, ...values }
        // console.log(payload);
        dispatch({
            type: "SET_RENT_FILTER_VALUES",
            payload,
        });
    };

    return (
        <div className="row col-md-12">
            <div className="col-md-6 p-2">
                <div className="widget-listing border-5 bg-de h-100">
                    <div className="profile-contact d-flex flex-column gap-2">
                        <div>
                            <label className="border px-2 border-2 border-primary text-primary rounded-4 fw-bold">
                                NO DISCOUNT
                            </label>
                        </div>
                        <h3>Pay at Desk</h3>
                        <p>
                            You'll pay at the counter the day of the pick up. Additional card
                            fees apply.
                        </p>

                        <div className="fs-26 fw-5 text-color-3 font mt-3">
                            {/* ${car.price?.toLocaleString()} */}
                            $60
                            <span className="fw-3">{" / "}day</span>
                        </div>
                        <div className="fs-13 fw-5 mb-2 lh-25 text-color-2 me-2">
                            Total: $120,000
                        </div>

                        <div className="btn-contact">
                            <Link
                                href={"javascript:void(0)"}
                                onClick={() => { setFilters({ payment_type: "pay_at_desk" }); setCurrentStep(3); }}
                                className="btn-pf bg-green mt-3"
                            >
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
                                <span className="fs-16 fw-5 lh-20 font text-color-1  mt-1">
                                    Select Counter Payment
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6 p-2">
                <div className="widget-listing border-5 bg-de h-100">
                    <div className="profile-contact d-flex flex-column gap-2">
                        <div>
                            <label className="border px-2 border-2 border-primary text-primary rounded-4 fw-bold">
                                SAVE 5%
                            </label>
                        </div>
                        <h3>Pay Online</h3>
                        <p>
                            Your credit card will be charged once you have made the booking.
                        </p>

                        <div className="fs-26 fw-5 text-color-3 font mt-3">
                            {/* ${car.price?.toLocaleString()} */}
                            $50
                            <span className="fw-3">{" / "}day</span>
                        </div>
                        <div className="fs-13 fw-5 mb-2 lh-25 text-color-2 me-2">
                            Total: $100,000
                        </div>

                        <div className="btn-contact">
                            <Link
                                href={"javascript:void(0)"}
                                onClick={() => { setFilters({ payment_type: "pay_online" }); setCurrentStep(3); }}
                                className="btn-pf bg-green mt-3"
                            >
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
                                <span className="fs-16 fw-5 lh-20 font text-color-1  mt-1">
                                    Select Online Payment
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
