import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header1";
import Contact from "@/components/otherPages/Contact";
import React from "react";
import Link from "next/link";
import { Metadata } from "@/utils/metadata";
export const metadata = Metadata("Contact us");

export default function page() {
  return (
    <>
      <div className="header-fixed">
        <Header2 bg="style1" />
      </div>
      <section className="flat-title m-40">
        <div className="container2">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-inner style">
                <div className="title-group fs-12">
                  <Link className="home fw-6 text-color-3" href={`/`}>
                    Home
                  </Link>
                  <span>Contact us</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Contact />
      <Footer1 />
    </>
  );
}
