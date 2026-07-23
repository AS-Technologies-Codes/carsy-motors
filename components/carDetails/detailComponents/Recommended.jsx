"use client";
import { getRecommendedListingApi } from "@/utils/APIs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Recommended() {
  const [RecommendedCarsListing, setRecommendedCarsListing] = useState([]);
  const [RecommendedCarsLoading, setRecommendedCarsLoading] = useState(true);
  const pathName = usePathname();
// alert(pathName)
  const fetchRecommendedCars = async () => {
    try {
      setRecommendedCarsLoading(true);
      
      const getRecommendedCarsData = await getRecommendedListingApi(pathName.toString().includes("rentals") ? "rent" : "used");
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
                src={elm?.images?.length ? elm.images[0].src : ""}
                width={450}
                height={338}
              />
            </div>
            <div className="content">
              <h6>
                <Link href={`/listing-detail-v1/${elm.id}`}>{elm.title}</Link>
              </h6>
              {/* <p className="fs-14 fw-7 text-color-2 font-1">
                ${elm.price?.toLocaleString()}
              </p> */}
              <div className="flex align-items-center">
                <p className="fs-14 fw-7 text-color-2 font-1">
                  ${elm.price?.toLocaleString()}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-landmark-icon lucide-landmark ms-1 text-color-3"
                >
                  <path d="M10 18v-7" />
                  <path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z" />
                  <path d="M14 18v-7" />
                  <path d="M18 18v-7" />
                  <path d="M3 22h18" />
                  <path d="M6 18v-7" />
                </svg>
                <div className="money fs-12 fw-5 lh-25 text-color-3">
                  ${(elm.price / 10000 * 39).toFixed(1)}
                </div>
                <span className="fs-12 ms-1">/ week</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
