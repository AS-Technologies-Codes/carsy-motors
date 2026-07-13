"use client";
import { getRecommendedListingApi } from "@/utils/APIs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Recommended() {
  const [RecommendedCarsListing, setRecommendedCarsListing] = useState([]);
  const [RecommendedCarsLoading, setRecommendedCarsLoading] = useState(true);

  const fetchRecommendedCars = async () => {
    try {
      setRecommendedCarsLoading(true);
      const getRecommendedCarsData = await getRecommendedListingApi();
      setRecommendedCarsListing(getRecommendedCarsData);
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setRecommendedCarsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendedCars();
  }, []);
  return (
    <>
      <div className="listing-header mb-30">
        <h3>Recommended Cars</h3>
        <p>Showing {RecommendedCarsLoading.length} more cars you might like</p>
      </div>
      <div className="listing-recommended mb-30">
        {RecommendedCarsListing.map((elm, i) => (
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
