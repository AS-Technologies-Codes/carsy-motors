import CarBrands2 from "@/components/common/CarBrands2";
import Cta from "@/components/common/Cta";
import Trending from "@/components/common/Trending";
import Header1 from "@/components/headers/Header1";
import CarReview from "@/components/common/CarReview";

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
import DownloadApp from "@/components/common/DownloadApp";
import Brands from "@/components/common/Brands";
import Footer1 from "@/components/footers/Footer1";
import Banner2 from "@/components/homes/home-6/Banner2";
import Image from "next/image";
import Banner from "@/public/assets/images/dashboard/banner-exp.jpg";
import Achievements from "@/components/homes/home-1/Achievements";
import YardsMap from "@/components/carsListings/YardsMap";

export const metadata = {
  title:
    "Home 07 || AutoDeal - Car Dealer, Rental & Listing React Nextjs Template",
  description: "AutoDeal - Car Dealer, Rental & Listing React Nextjs Template",
};
export default function page() {
  return (
    <>
      <div className="header-fixed">
        <Header1 />
      </div>
      <Hero />
      {/* 
      <Filter />
      <CarBrands />
      <Cars />
      <Cars2 />
      <Trending /> */}
      <Cta />
      <div className="my-5">
        <Image src={Banner} alt="image" className="img-fluid sm-img-fluid" />
      </div>
      <Achievements />
      <YardsMap height={"600px"} />
      <Slider />
      {/* <Banner2 />
      <CarBrands2 />
      <CarReview />
      <div className="mt-5 pt-5"></div>
      <DownloadApp />
      <div className="mt-5 pt-5"></div>
      <Brands /> */}
      <LoanCalculator />
      <Testimonials />
      <Blogs />
      <Footer1 />
    </>
  );
}
