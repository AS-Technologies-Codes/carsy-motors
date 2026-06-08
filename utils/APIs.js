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
      return resolve(getBannerResponse?.data);
    } catch (error) {
      return reject(error);
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
      return resolve(getFleetResponse?.data);
    } catch (error) {
      return reject(error);
    }
  });
};
