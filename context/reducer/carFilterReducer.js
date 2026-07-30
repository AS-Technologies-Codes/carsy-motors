// import { allCars } from "@/data/cars";

export const defaultValuesRentFilter = {
  age: 0,
  YardLocation: "carsyYard",
  pickUpDate: new Date().toISOString().toString().split("T")[0],
  ReturnDate: "",
  pickUpTime: new Date()
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Forces 24-hour mode
    })
    .toString(),
  weeks: "1 Week",
  ReturnTime: "",
};

export const getFiltersData = () =>
  JSON.parse(window.localStorage.getItem("filters"));

export const setFiltersData = (values) => {
  const oldValues = JSON.parse(window.localStorage.getItem("filters"));

  window.localStorage.setItem(
    "filters",
    JSON.stringify({ ...oldValues, ...values }),
  );
};
const allCars = [
  {
    id: 4,
    featured: true,
    year: 9,
    type: "N",
    title: "9 Toyota  Mera 2025",
    km: 0,
    fuelType: "N",
    transmission: "Automatic",
    location: "Unknown",
    model: "Mera",
    make: "Toyota ",
    body: "N",
    color: null,
    cylinder: 0,
    door: 2,
    price: 0,
    features: [],
    authorImage: "/assets/images/author/avt-cm1.jpg",
    authorName: "Admin",
    imgSrc:
      "https://carsy.astechnologies.pk/api_carsy/api_carsy/uploads/263671.jpg",
    images: [
      {
        src: "https://carsy.astechnologies.pk/api_carsy/api_carsy/uploads/263671.jpg",
        alt: "car image",
        width: 615,
        height: 462,
      },
      {
        src: "https://carsy.astechnologies.pk/api_carsy/api_carsy/uploads/263669.jpg",
        alt: "car image",
        width: 615,
        height: 462,
      },
    ],
  },
  {
    id: 3,
    featured: true,
    year: 2025,
    type: "Steel",
    title: "2025 Toyota  Mera 2025",
    km: 0,
    fuelType: "Manual",
    transmission: "Manual",
    location: "Unknown",
    model: "Mera",
    make: "Toyota ",
    body: "Steel",
    color: null,
    cylinder: 70,
    door: 3,
    price: 0,
    features: [],
    authorImage: "/assets/images/author/avt-cm1.jpg",
    authorName: "Admin",
    imgSrc:
      "https://carsy.astechnologies.pk/api_carsy/api_carsy/uploads/263345.jpg",
    images: [
      {
        src: "https://carsy.astechnologies.pk/api_carsy/api_carsy/uploads/263345.jpg",
        alt: "car image",
        width: 615,
        height: 462,
      },
    ],
  },
  {
    id: 2,
    featured: true,
    year: 2,
    type: "Steel",
    title: "2 Toyota  Mera 2025",
    km: 0,
    fuelType: "Manual",
    transmission: "Automatic",
    location: "Unknown",
    model: "Mera",
    make: "Toyota ",
    body: "Steel",
    color: null,
    cylinder: 70,
    door: 4,
    price: 0,
    features: [],
    authorImage: "/assets/images/author/avt-cm1.jpg",
    authorName: "Admin",
    imgSrc:
      "https://carsy.astechnologies.pk/api_carsy/api_carsy/uploads/262276.jpg",
    images: [
      {
        src: "https://carsy.astechnologies.pk/api_carsy/api_carsy/uploads/262276.jpg",
        alt: "car image",
        width: 615,
        height: 462,
      },
    ],
  },
  {
    id: 1,
    featured: true,
    year: 324,
    type: "32434",
    title: "324 fdsf dsfdsf sdfdsfds",
    km: 0,
    fuelType: "324",
    transmission: "Automatic",
    location: "Unknown",
    model: "dsfdsf",
    make: "fdsf",
    body: "32434",
    color: null,
    cylinder: 324324,
    door: 2,
    price: 0,
    features: [],
    authorImage: "/assets/images/author/avt-cm1.jpg",
    authorName: "Admin",
    imgSrc:
      "https://carsy.astechnologies.pk/api_carsy/api_carsy/uploads/KHI-99999681595322.png",
    images: [
      {
        src: "https://carsy.astechnologies.pk/api_carsy/api_carsy/uploads/KHI-99999681595322.png",
        alt: "car image",
        width: 615,
        height: 462,
      },
      {
        src: "https://carsy.astechnologies.pk/api_carsy/api_carsy/uploads/QuillBot-generated-image-1 (1).png",
        alt: "car image",
        width: 615,
        height: 462,
      },
      {
        src: "https://carsy.astechnologies.pk/api_carsy/api_carsy/uploads/QuillBot-generated-image-1.png",
        alt: "car image",
        width: 615,
        height: 462,
      },
    ],
  },
];

export const initialState = {
  // price: [0, 100000],
  price: "Any Price",
  km: [0, 100001],
  year: [1997, new Date().getFullYear() + 1],
  body: "Any Body",
  make: "Any Make",
  model: "Any Model",
  fuel: "Any Fuel",
  transmission: "Any Transmission",
  location: "Any State / Region",
  door: "Any Door",
  drive_type: "Any Type",
  seat: "Any Seat",
  cylinder: "Any Cylinder",
  color: "Any Color",
  condition: "All",
  evsOnly: false,
  features: [],
  filtered: allCars,
  sortingOption: "Sort by (Default)",
  sorted: allCars,
  currentPage: 1,
  itemPerPage: 20,
  filterOptions: {},
  countMake: "Any Make",
  countModel: "Any Model",
  countPrice: "",
  rental_type: "",
  rentalFilters:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("filters") || "{}")
      : {},
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_Data":
      return { ...state, sorted: action.payload };
    case "SET_PRICE":
      return { ...state, price: action.payload };
    case "SET_YEAR":
      return { ...state, year: action.payload };
    case "SET_KM":
      return { ...state, km: action.payload };
    case "SET_MODEL":
      return { ...state, model: action.payload };
    case "SET_BODY":
      return { ...state, body: action.payload };
    case "SET_MAKE":
      return { ...state, make: action.payload };
    case "SET_FUEL":
      return { ...state, fuel: action.payload };
    case "SET_TRANSMISSION":
      return { ...state, transmission: action.payload };
    case "SET_LOCATION":
      return { ...state, location: action.payload };
    case "SET_DOOR":
      return { ...state, door: action.payload };
    case "SET_DRIVE_TYPE":
      return { ...state, drive_type: action.payload };
    case "SET_SEAT":
      return { ...state, seat: action.payload };
    case "SET_CYLINDER":
      return { ...state, cylinder: action.payload };
    case "SET_COLOR":
      return { ...state, color: action.payload };
    case "SET_FEATURES":
      return { ...state, features: action.payload };
    case "SET_FILTERED":
      return { ...state, filtered: [...action.payload] };
    case "SET_SORTING_OPTION":
      return { ...state, sortingOption: action.payload };
    case "SET_SORTED":
      return { ...state, sorted: [...action.payload] };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_ITEM_PER_PAGE":
      return { ...state, itemPerPage: action.payload };
    case "SET_COUNT_MAKE":
      return { ...state, countMake: action.payload };
    case "SET_COUNT_MODEL":
      return { ...state, countModel: action.payload };
    case "SET_COUNT_PRICE":
      return { ...state, countPrice: action.payload };
    case "SET_CONDITION":
      return { ...state, condition: action.payload };
    case "RENTAL_TYPE":
      return { ...state, rental_type: action.payload };
    case "SET_RENT_FILTER_VALUES": {
      console.log("state.rentalFilters", action.payload);
      const rentalFilters = action.payload;

      window.localStorage.setItem("filters", JSON.stringify(rentalFilters));
      return { ...state, rentalFilters };
    }
    case "SET_EVS_ONLY":
      return { ...state, evsOnly: action.payload };
    case "SET_FILTER_OPTIONS":
      return { ...state, filterOptions: action.payload };

    case "CLEAR_FILTER": {
      window.localStorage.removeItem("filters");
      return {
        ...state,
        // price: [0, 100000],
        price: "Any Price",
        km: [0, 100001],
        year: [1997, new Date().getFullYear() + 1],
        body: "Any Body",
        make: "Any Make",
        model: "Any Model",
        fuel: "Any Fuel",
        transmission: "Any Transmission",
        location: "Any State / Region",
        door: "Any Door",
        drive_type: "Any Type",
        Seat: "Any seat",
        cylinder: "Any Cylinder",
        color: "Any Color",
        condition: "All",
        evsOnly: false,
        features: [],
        countMake: "Any Make",
        countModel: "Any Model",
        countPrice: "",
        rentalFilters: {},
      };
    }
    default:
      return state;
  }
}
