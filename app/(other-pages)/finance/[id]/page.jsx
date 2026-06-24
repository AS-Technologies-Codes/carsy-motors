import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header1";
import Finance from "@/components/otherPages/Finance";
import React from "react";
import Link from "next/link";
import { Metadata } from "@/utils/metadata";

export const metadata = Metadata("Finance");


export default function page() {
  return (
    <>
      <div className="header-fixed">
        <Header2 />
      </div>
        <div className="slider home2 position-relative">
        <video autoPlay muted loop style={{height: "100vh"}}>
          <source src="/assets/images/section/video.mp4" type="video/mp4" />
        </video>
        <div className="content po-content-two position-absolute top-50 w-100" style={{zIndex: 999}}>
          <div className="heading">
            <h1 className="text-color-1 text-center">
              Car Finance
            </h1>
          </div>
        </div>
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
      <Footer1 />
    </>
  );
}
