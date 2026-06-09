import CarDetails1 from "@/components/carDetails/CarDetails1";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Link from "next/link";
import { allCars } from "@/data/cars";

export const metadata = {
  title:
    "Car Details 01 || AutoDeal - Car Dealer, Rental & Listing React Nextjs Template",
  description: "AutoDeal - Car Dealer, Rental & Listing React Nextjs Template",
};
export default function page({ params }) {
  const carItem = allCars.filter((elm) => elm.id == params.id)[0] || allCars[0];
  
  return (
    <>
      <div className="header-fixed">
        <Header2 />
      </div>
      <section className="flat-title mb-40">
        <div className="container2">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-inner style">
                <div className="title-group fs-12">
                  <Link className="home fw-6 text-color-3" href={`/`}>
                    Home
                  </Link>
                  <span>Used cars for sale</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CarDetails1 carItem={params?.id} />
      <Footer1 />
    </>
  );
}
