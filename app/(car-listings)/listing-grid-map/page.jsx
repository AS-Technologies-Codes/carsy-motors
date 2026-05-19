import Cars4 from "@/components/carsListings/Cars4";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import React from "react";

export const metadata = {
  title:
    "Car Listing Grid Map || AutoDeal - Car Dealer, Rental & Listing React Nextjs Template",
  description: "AutoDeal - Car Dealer, Rental & Listing React Nextjs Template",
};
export default function page() {
  return (
    <>
      <div className="header-fixed">
        <Header2 />
      </div>
      <Cars4 />
      <Footer1 />
    </>
  );
}
