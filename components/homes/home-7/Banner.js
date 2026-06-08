"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import banner from "@/public/assets/images/dashboard/banner-exp.jpg";
import { getBannerListingApi } from "@/utils/APIs";

const Banner = () => {
  const [BannerListing, setBannerListing] = useState([]);
  const [BannerLoading, setBannerLoading] = useState(true);

  const fetchBanner = async () => {
    try {
      setBannerLoading(true);
      const getBannerData = await getBannerListingApi();
      setBannerListing(getBannerData);
    } catch (error) {
    } finally {
      setBannerLoading(false);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);
  return (
    <div className="my-5">
      {BannerLoading ? (
        <div className="center my-5">
          <span className="loader"></span>
        </div>
      ) : (
        <Image
          src={BannerListing[0].link}
          width={100}
          height={400}
          alt="image"
          className="img-fluid sm-img-fluid w-100"
        />
      )}
    </div>
  );
};

export default Banner;
