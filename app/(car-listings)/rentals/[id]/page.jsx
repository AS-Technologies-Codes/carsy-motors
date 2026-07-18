import Cars1 from "@/components/carsListings/Cars1";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Filter from "@/components/homes/home-1/Filter";
import Hero from "@/components/homes/home-6/Hero";
import React from "react";
import Link from "next/link";
import CarSells from "@/components/carsListings/CarSells";
import { CarFilterProvider } from "@/context/providers/CarFilterContext";
import CarRent from "@/components/carsListings/CarRent";
import FlatFilterRentals from "@/components/common/FlatFilterRentals";
export const metadata = {
  title:
    "Car Listing List || AutoDeal - Car Dealer, Rental & Listing React Nextjs Template",
  description: "AutoDeal - Car Dealer, Rental & Listing React Nextjs Template",
};
export default function page() {
  return (
    <CarFilterProvider>
      <div className="header-fixed">
        <Header1 />
      </div>
      <Hero />
      <div className="flat-filter-search home3">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="flat-tabs">
                <FlatFilterRentals />
              </div>
            </div>
          </div>
        </div>
      </div>      <section className="flat-title">
        <div className="container2">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-inner style">
                <div className="title-group fs-12">
                  <Link className="home fw-6 text-color-3" href={`/`}>
                    Home
                  </Link>
                  <span>Rentals Car</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CarRent />
      <Footer1 />
    </CarFilterProvider>
  );
}
