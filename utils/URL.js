const baseUrl = "https://carsy.astechnologies.pk/api_carsy/carsy_api/cars_api.php?action=";
const accessToken = "Bearer dfsdgs43543534543gdsfdsfdsfa22342222@@223";

const URL = {
  getReviews: baseUrl + "get_reviews",
  getWhatsNew: baseUrl + "get_whats_new",
  getBanner: baseUrl + "get_banners",
  getCars: baseUrl + "get_cars",
  getCarsDetails: baseUrl + "get_car_details",
  getWhyUs: baseUrl + "get_why_us",
  getNearby: baseUrl + "get_nearby_locations",
  getFleet: baseUrl + "get_cars&car_type=fleet",
  saveNewsLetter: baseUrl + "save_newsletter",
  postFinance: baseUrl + "submit_finance",
  postEnquiry: baseUrl + "submit_enquiry",
  saveBooking: baseUrl + "save_booking",
  // getCashForCarPrice: baseUrl + "get_cash_price",
  // getBlogDetails: baseUrl + "get_news",
};

export { URL, accessToken };

