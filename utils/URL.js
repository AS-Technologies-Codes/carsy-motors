const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const accessToken = process.env.NEXT_PUBLIC_PRIVATE_API_KEY;

const URL = {
  getReviews: baseUrl + "get_reviews",
  getWhatsNew: baseUrl + "get_whats_new",
  getBanner: baseUrl + "get_banners",
  getCars: baseUrl + "get_cars",
  getWhyUs: baseUrl + "get_why_us",
  getNearby: baseUrl + "get_nearby",
  getFleet: baseUrl + "get_fleet",
  // getCashForCarPrice: baseUrl + "get_cash_price",
  // getBlogDetails: baseUrl + "get_news",
};

export { URL, accessToken };
