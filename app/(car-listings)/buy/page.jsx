import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Filter from "@/components/homes/home-1/Filter";
import Hero from "@/components/homes/home-6/Hero";
import React, { Suspense } from "react";
import Link from "next/link";
import CarSells from "@/components/carsListings/CarSells";
import { CarFilterProvider } from "@/context/providers/CarFilterContext";
import { Metadata } from "@/utils/metadata";

export const metadata = Metadata("Buy Cars");

export default function page() {
  return (
    <CarFilterProvider>
      <div className="header-fixed">
        <Header1 />
      </div>
      <Hero />
      <Filter />
      <section className="flat-title">
        <div className="container2">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-inner style">
                <div className="title-group fs-12">
                  <Link className="home fw-6 text-color-3" href={`/`}>
                    Home
                  </Link>
                  <span>Buy Car</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Suspense fallback={<div>Loading...</div>}>
        <CarSells />
      </Suspense>
      <Footer1 />
    </CarFilterProvider>
  );
}
