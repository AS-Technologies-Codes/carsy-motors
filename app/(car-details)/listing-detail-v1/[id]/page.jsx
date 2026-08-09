import CarDetails1 from "@/components/carDetails/CarDetails1";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header1";
import Link from "next/link";
import { allCars } from "@/data/cars";
import { Metadata } from "@/utils/metadata";

export const metadata = Metadata("Car Details");

export default function page({ params }) {
  const carItem = allCars.filter((elm) => elm.id == params.id)[0] || allCars[0];
  
  return (
    <>
      <div className="header-fixed">
        <Header2 bg="style-1"/>
      </div>
      <CarDetails1 carItem={params?.id} />
      <Footer1 />
    </>
  );
}
