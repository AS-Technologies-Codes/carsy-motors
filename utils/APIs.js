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
      if (getReviewsResponse?.status === "error") {
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
      if (getBannerResponse?.status === "error") {
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
      if (getCarDetailsResponse?.status === "error") {
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
      if (getFleetResponse?.status === "error") {
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
      if (saveEmailResponse?.status === "error") {
        return reject(saveEmailResponse?.message || "Failed to save email");
      }
      return resolve(saveEmailResponse?.message);
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
      if (getAchievementsResponse?.status === "error") {
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
      if (getMapResponse?.status === "error") {
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
