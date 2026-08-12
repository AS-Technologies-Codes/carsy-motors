import { accessToken, URL } from "./URL";

export const getReviewsApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const getReviewsRequest = await fetch(URL.getReviews, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });
      const getReviewsResponse = await getReviewsRequest.json();
      if (
        !getReviewsResponse?.status ||
        getReviewsResponse?.status === "error"
      ) {
        return reject(
          new Error(
            getReviewsResponse?.message || "Failed to fetch reviews listing",
          ),
        );
      }
      return resolve(getReviewsResponse?.data);
    } catch (error) {
      return reject(error);
    }
  });
};

export const getBlogsListingApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const getBlogsRequest = await fetch(URL.getWhatsNew, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });
      const getBlogsResponse = await getBlogsRequest.json();
      if (!getBlogsResponse?.status || getBlogsResponse?.status === "error") {
        return reject(
          new Error(
            getBlogsResponse?.message || "Failed to fetch blogs listing",
          ),
        );
      }
      return resolve(getBlogsResponse?.data);
    } catch (error) {
      return reject(error);
    }
  });
};

export const getBannerListingApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const getBannerRequest = await fetch(URL.getBanner, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });
      const getBannerResponse = await getBannerRequest.json();
      if (!getBannerResponse?.status || getBannerResponse?.status === "error") {
        return reject(
          new Error(
            getBannerResponse?.message || "Failed to fetch banner listing",
          ),
        );
      }
      return resolve(getBannerResponse?.data);
    } catch (error) {
      return reject(error);
    }
  });
};

export const getCarDetailsApi = async (carId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const getCarDetailsRequest = await fetch(
        `${URL.getCarsDetails}&id=${carId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        },
      );
      const getCarDetailsResponse = await getCarDetailsRequest.json();
      if (
        !getCarDetailsResponse?.status ||
        getCarDetailsResponse?.status === "error"
      ) {
        return reject(
          new Error(
            getCarDetailsResponse?.message || "Failed to fetch car details",
          ),
        );
      }
      return resolve(getCarDetailsResponse?.data);
    } catch (error) {
      return reject(error.message || "Failed to fetch car details");
    }
  });
};

export const getSearchResults = async (text) => {
  return new Promise(async (resolve, reject) => {
    try {
      const getCarDetailsRequest = await fetch(
        `${URL.getCars}&search=${text}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        },
      );
      const getCarDetailsResponse = await getCarDetailsRequest.json();
      if (
        !getCarDetailsResponse?.status ||
        getCarDetailsResponse?.status === "error"
      ) {
        return reject(
          new Error(
            getCarDetailsResponse?.message || "Failed to fetch car details",
          ),
        );
      }
      return resolve(getCarDetailsResponse?.data);
    } catch (error) {
      return reject(error.message || "Failed to fetch car details");
    }
  });
};

export const getFleetListingApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const getFleetRequest = await fetch(URL.getFleet, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });
      const getFleetResponse = await getFleetRequest.json();
      if (!getFleetResponse?.status || getFleetResponse?.status === "error") {
        return reject(
          new Error(
            getFleetResponse?.message || "Failed to fetch fleet listing",
          ),
        );
      }
      return resolve(getFleetResponse?.data);
    } catch (error) {
      return reject(error?.message || "Failed to fetch fleet listing");
    }
  });
};

export const getPlansAndExtrasListingApi = async () => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: accessToken,
    };

    const [plansResponse, extrasResponse] = await Promise.all([
      fetch(URL.getPlans, {
        method: "GET",
        headers,
      }),
      fetch(URL.getExtras, {
        method: "GET",
        headers,
      }),
    ]);

    const [plansData, extrasData] = await Promise.all([
      plansResponse.json(),
      extrasResponse.json(),
    ]);

    // Check plans response
    if (!plansData?.status || plansData.status === "error") {
      throw new Error(plansData?.message || "Failed to fetch plans listing");
    }

    // Check extras response
    if (!extrasData?.status || extrasData.status === "error") {
      throw new Error(extrasData?.message || "Failed to fetch extras listing");
    }

    return {
      getPlansResponse: plansData?.data,
      getExtrasResponse: extrasData?.data,
    };
  } catch (error) {
    console.error("getPlansAndExtrasListingApi:", error);

    throw new Error(
      error?.message || "Failed to fetch plans and extras listing",
    );
  }
};

export const saveEmail = async (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const saveEmailRequest = await fetch(URL.saveNewsLetter, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify({ email }),
      });
      const saveEmailResponse = await saveEmailRequest.json();
      if (!saveEmailResponse?.status || saveEmailResponse?.status === "error") {
        return reject(saveEmailResponse?.message || "Failed to save email");
      }
      return resolve(saveEmailResponse?.message);
    } catch (error) {
      return reject(error);
    }
  });
};

export const postFinance = async (financeData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const postFinanceRequest = await fetch(URL.postFinance, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify(financeData),
      });
      const postFinanceResponse = await postFinanceRequest.json();
      if (
        !postFinanceResponse?.status ||
        postFinanceResponse?.status === "error"
      ) {
        return reject(
          postFinanceResponse?.message ||
            "Failed to submit finance information",
        );
      }
      return resolve(postFinanceResponse?.message);
    } catch (error) {
      return reject(error);
    }
  });
};

export const postContactUs = async (ContactUsData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const postContactUsRequest = await fetch(
        "https://carsy.astechnologies.pk/api_carsy/carsy_api/contactus_api.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
          body: JSON.stringify(ContactUsData),
        },
      );
      const postContactUsResponse = await postContactUsRequest.json();
      if (
        !postContactUsResponse?.status ||
        postContactUsResponse?.status === "error"
      ) {
        return reject(
          postContactUsResponse?.message || "Failed to submit information",
        );
      }
      return resolve(postContactUsResponse?.message);
    } catch (error) {
      return reject(error);
    }
  });
};

export const postEnquiry = async (enquiryData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const postEnquiryRequest = await fetch(URL.postEnquiry, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify(enquiryData),
      });
      const postEnquiryResponse = await postEnquiryRequest.json();
      if (
        !postEnquiryResponse?.status ||
        postEnquiryResponse?.status === "error"
      ) {
        return reject(
          postEnquiryResponse?.message ||
            "Failed to submit enquiry information",
        );
      }
      return resolve(postEnquiryResponse?.message);
    } catch (error) {
      return reject(error);
    }
  });
};

export const saveBooking = async (bookingData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const saveBookingRequest = await fetch(URL.saveBooking, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify(bookingData),
      });
      const saveBookingResponse = await saveBookingRequest.json();
      if (
        !saveBookingResponse?.status ||
        saveBookingResponse?.status === "error"
      ) {
        return reject(
          saveBookingResponse?.message ||
            "Failed to submit booking information",
        );
      }
      return resolve(saveBookingResponse?.message);
    } catch (error) {
      return reject(error);
    }
  });
};

export const getAchievementsListingApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const getAchievementsRequest = await fetch(URL.getWhyUs, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });
      const getAchievementsResponse = await getAchievementsRequest.json();
      if (
        !getAchievementsResponse?.status ||
        getAchievementsResponse?.status === "error"
      ) {
        return reject(
          new Error(
            getAchievementsResponse?.message ||
              "Failed to fetch achievements listing",
          ),
        );
      }
      return resolve(getAchievementsResponse?.data);
    } catch (error) {
      return reject(error?.message || "Failed to fetch Achievements listing");
    }
  });
};

export const getRecommendedListingApi = async (prop) => {
  return new Promise(async (resolve, reject) => {
    try {
      const getRecommendedRequest = await fetch(URL.getRecommended + prop, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });
      const getRecommendedResponse = await getRecommendedRequest.json();
      if (
        !getRecommendedResponse?.status ||
        getRecommendedResponse?.status === "error"
      ) {
        return reject(
          new Error(
            getRecommendedResponse?.message ||
              "Failed to fetch recommended listing",
          ),
        );
      }
      return resolve(getRecommendedResponse?.data);
    } catch (error) {
      return reject(error?.message || "Failed to fetch recommended listing");
    }
  });
};

export const getMapListingApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const getMapRequest = await fetch(URL.getNearby, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });
      const getMapResponse = await getMapRequest.json();
      if (!getMapResponse?.status || getMapResponse?.status === "error") {
        return reject(
          new Error(getMapResponse?.message || "Failed to fetch map listing"),
        );
      }
      return resolve(getMapResponse?.data);
    } catch (error) {
      return reject(error?.message || "Failed to fetch map listing");
    }
  });
};
