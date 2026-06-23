import Brands from "@/components/common/Brands";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Finance from "@/components/otherPages/Finance";
import React from "react";
import Link from "next/link";
export const metadata = {
  title:
    "Finance || AutoDeal - Car Dealer, Rental & Listing React Nextjs Template",
  description: "AutoDeal - Car Dealer, Rental & Listing React Nextjs Template",
};
export default function page() {
  return (
    <>
      <div className="header-fixed">
        <Header2 />
      </div>
      <section className="flat-title mb-0">
        <div className="container2">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-inner style">
                <div className="title-group fs-12">
                  <Link className="home fw-6 text-color-3" href={`/`}>
                    Finance
                  </Link>
                  <span>Finance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Finance />
      <Brands />
      <Footer1 />
    </>
  );
}
