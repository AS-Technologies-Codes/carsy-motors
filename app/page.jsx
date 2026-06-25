import CarBrands2 from "@/components/common/CarBrands2";
import Cta from "@/components/common/Cta";
import CarReview from "@/components/common/CarReview";
import Trending from "@/components/common/Trending";
import Header1 from "@/components/headers/Header1";

import CarBrands from "@/components/homes/home-7/CarBrands";
import Cars from "@/components/homes/home-7/Cars";
import Cars2 from "@/components/homes/home-7/Cars2";
import Filter from "@/components/homes/home-7/Filter";
import Slider from "@/components/homes/home-3/Hero";
import Hero from "@/components/homes/home-7/Hero";
import LoanCalculator from "@/components/homes/home-1/LoanCalculator";
import React from "react";
import Testimonials from "@/components/homes/home-7/Testimonials";
import Blogs from "@/components/common/Blogs";
import Footer1 from "@/components/footers/Footer1";
import Banner from "@/components/homes/home-7/Banner";
import Achievements from "@/components/homes/home-1/Achievements";
import YardsMap from "@/components/carsListings/YardsMap";
import CarsHero from "@/components/homes/home-7/CarsHero";
import { Metadata } from "@/utils/metadata";

export const metadata = Metadata("Home");

export default function page() {
  return (
    <>
      <div className="header-fixed">
        <Header1 />
      </div>
      <CarsHero />
      {/* 
      <Filter />
      <CarBrands />
      <Cars />
      <Cars2 />
      <Trending /> */}
      {/* <Cta /> */}
      <Banner />
      <Achievements />
      <YardsMap height={"600px"} />
      {/* <Slider /> */}
      <CarReview />
      {/* <Banner2 />
      <CarBrands2 /> */}
      {/* <div className="mt-5 pt-5"></div>
      <DownloadApp />
      <div className="mt-5 pt-5"></div>
      <Brands /> */}
      {/* <LoanCalculator /> */}
      <Testimonials />
      <Blogs />
      <Footer1 />
    </>
  );
}
