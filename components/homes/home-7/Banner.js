"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getBannerListingApi } from "@/utils/APIs";
import toast from "react-hot-toast";

const Banner = () => {
  const [BannerListing, setBannerListing] = useState([]);
  const [BannerLoading, setBannerLoading] = useState(true);

  const fetchBanner = async () => {
    try {
      setBannerLoading(true);
      const getBannerData = await getBannerListingApi();
      setBannerListing(getBannerData);
    } catch (error) {
      console.log(error);
      // toast.error(error);
    } finally {
      setBannerLoading(false);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);
  return (
    <div className="">
      {BannerLoading ? (
        <div className="center my-5">
          <span className="loader"></span>
        </div>
      ) : BannerListing.length == 0 ? (
        <></>
      ) : (
        <>
          <Image
            src={BannerListing[0]?.sm}
            alt={BannerListing[0]?.title + ", " + BannerListing[0]?.description}
            width={100}
            height={400}
            className="img-fluid sm-img-fluid w-100 d-md-none"
          />
          <Image
            src={BannerListing[0]?.md}
            alt={BannerListing[0]?.title + ", " + BannerListing[0]?.description}
            width={100}
            height={400}
            className="img-fluid sm-img-fluid w-100 d-none d-md-block d-lg-none"
          />
          <Image
            src={BannerListing[0]?.lg}
            alt={BannerListing[0]?.title + ", " + BannerListing[0]?.description}
            width={100}
            height={400}
            className="img-fluid sm-img-fluid w-100 d-none d-lg-block"
          />
        </>
      )}
    </div>
  );
};

export default Banner;
