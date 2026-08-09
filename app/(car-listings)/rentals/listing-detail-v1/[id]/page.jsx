import CarDetailsRent from "@/components/carDetails/CarDetailsRent";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header1";
import Link from "next/link";
import { allCars } from "@/data/cars";
import { CarFilterProvider } from "@/context/providers/CarFilterContext";
import { Metadata } from "@/utils/metadata";

export const metadata = Metadata("Car Rent Details");

export default function page({ params }) {
  const carItem = allCars.filter((elm) => elm.id == params.id)[0] || allCars[0];

  return (
    <>
      <div className="header-fixed">
        <Header2 bg="style-1" />
      </div>
      <CarFilterProvider>
        <CarDetailsRent carItem={params?.id} />
      </CarFilterProvider>
      <Footer1 />
    </>
  );
}
