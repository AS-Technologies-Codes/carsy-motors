"use client";
import { carListings2 } from "@/data/cars";
import { accessToken, URL } from "@/utils/URL";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Recommended({ make }) {
  const [CarsLoading, setCarsLoading] = useState(true);
  const [CarsData, setCarsData] = useState([]);

  const fecthGetCars = async () => {
    setCarsLoading(true);

    const getGetCarsRequest = await fetch(
      `${URL.getCars}&limit=6&make=${make}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      },
    );
    const getGetCarsResponse = await getGetCarsRequest.json();
    const { data } = getGetCarsResponse;
    setCarsData(data);
    setCarsLoading(false);
  };
  useEffect(() => {
    fecthGetCars();
  }, []);

  return (
    <>
      <div className="listing-header mb-30">
        <h3>Recommended Cars</h3>
        <p>Showing {CarsData.length} more cars you might like</p>
      </div>
      <div className="listing-recommended mb-30">
        {CarsData.map((elm, i) => (
          <div key={i} className="item flex">
            <div className="image">
              <Image
                className="lazyload"
                alt="image"
                src={elm.imgSrc}
                width={450}
                height={338}
              />
            </div>
            <div className="content">
              <h6>
                <Link href={`/listing-detail-v1/${elm.id}`}>{elm.title}</Link>
              </h6>
              <p className="fs-14 fw-7 text-color-2 font-1">
                ${elm.price?.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
