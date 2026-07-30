"use client";
import React, { useEffect, useState } from "react";
import Pricing from "../common/Pricing";
import Link from "next/link";
import DropdownSelect from "../common/DropDownSelectFilter";
import { featureOptions } from "@/data/filterOptions";
import { useCarFilter } from "@/context/providers/CarFilterContext";
import Pagination from "../common/Pagination";
import FilterSidebar from "./MobileFilterSidebar";
import { accessToken, URL } from "@/utils/URL";
import Slider1 from "../carDetails/sliders/Slider1";
import { useResponsive } from "@/utils/useResponsive";
// // import { useSearchParams } from "next/navigation";
// import ComingSoon1 from "../../public/assets/images/car-list/buy-coming-soon.png"
// import ComingSoon2 from "../../public/assets/images/car-list/coming-soon-mobile.png"
import Image from "next/image";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { setFiltersData } from "@/context/reducer/carFilterReducer";

export default function CarRent() {
  const [PaginationKeys, setPaginationKeys] = useState({});
  const [CarsLoading, setCarsLoading] = useState(true);
  const { state, dispatch } = useCarFilter();
  const router = useRouter();
  const { isMobile } = useResponsive();
  // const searchParams = useSearchParams() || "";
  const pathname = usePathname();
  // const [ComingSoon, setComingSoon] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setComingSoon(true);
  //   }, 2000);
  // }, [])

  const {
    price,
    km,
    year,
    body,
    make,
    model,
    fuel,
    transmission,
    location,
    door,
    cylinder,
    color,
    drive_type,
    features,
    filtered,
    sortingOption,
    evsOnly,
    sorted,
    currentPage,
    itemPerPage,
    filterOptions,
    seat,
    rental_type,
    rentalFilters
  } = state;

  const allProps = {
    ...state,
    setData: (value) => dispatch({ type: "SET_Data", payload: value }),
    setPrice: (value) => dispatch({ type: "SET_PRICE", payload: value }),
    setYear: (value) => dispatch({ type: "SET_YEAR", payload: value }),
    setModel: (value) => dispatch({ type: "SET_MODEL", payload: value }),
    setKM: (value) => dispatch({ type: "SET_KM", payload: value }),
    setBody: (value) => dispatch({ type: "SET_BODY", payload: value }),
    setMake: (value) => dispatch({ type: "SET_MAKE", payload: value }),
    setFuel: (value) => dispatch({ type: "SET_FUEL", payload: value }),
    setTransmission: (value) =>
      dispatch({ type: "SET_TRANSMISSION", payload: value }),
    setLocation: (value) => dispatch({ type: "SET_LOCATION", payload: value }),
    setDoor: (value) => dispatch({ type: "SET_DOOR", payload: value }),
    setDriveType: (value) =>
      dispatch({ type: "SET_DRIVE_TYPE", payload: value }),
    setSeat: (value) => dispatch({ type: "SET_SEAT", payload: value }),
    setCylinder: (value) => dispatch({ type: "SET_CYLINDER", payload: value }),
    setColor: (value) => dispatch({ type: "SET_COLOR", payload: value }),
    setEvsOnly: (value) => dispatch({ type: "SET_EVS_ONLY", payload: value }),

    setFeatures: (newFeature) => {
      const updated = [...features].includes(newFeature)
        ? [...features].filter((elm) => elm != newFeature)
        : [...features, newFeature];
      dispatch({ type: "SET_FEATURES", payload: updated });
    },
    setSortingOption: (value) =>
      dispatch({ type: "SET_SORTING_OPTION", payload: value }),
    setCurrentPage: (value) =>
      dispatch({ type: "SET_CURRENT_PAGE", payload: value }),
    setItemPerPage: (value) => {
      (dispatch({ type: "SET_CURRENT_PAGE", payload: 1 }),
        dispatch({ type: "SET_ITEM_PER_PAGE", payload: value }));
    },
  };

  const priceFilter = (oldPrice) => {
    if (!oldPrice.includes("-"))
      return {
        priceMin: oldPrice.split(",")[0],
        priceMax: oldPrice.split(",")[1],
      };

    const price = oldPrice.replace(/[,$]/g, "");
    const priceMin = price.split("-")[0].trim();
    const priceMax = price.split("-")[1].trim();
    console.log({ priceMin, priceMax });

    return { priceMin, priceMax };
  };
  const clean = (val) =>
    typeof val === "string" ? val.replace(/\s*\(\d+\)/g, "") : val;

  const fecthGetCars = async () => {
    setCarsLoading(true);
    console.log({ price });

    const allParams = {
      page: allProps.currentPage,
      ...rentalFilters,
      // ...(!price?.includes("Any") ? priceFilter(price) : {}),
      // ...(km[0] ? { kmMin: km[0] } : {}),
      // ...(km[1] > 100000 ? {} : { kmMax: km[1] }),
      // ...(year[0] > 1997 ? { yearMin: year[0] } : {}),
      // ...(year[1] <= new Date().getFullYear() ? { yearMax: year[1] } : {}),
      ...(!body.includes("Any") ? { body: clean(body) } : {}),
      ...(!make.includes("Any") ? { make: clean(make) } : {}),
      ...(!model.includes("Any") ? { model: clean(model) } : {}),
      ...(!drive_type.includes("Any") ? { drive_type: clean(drive_type) } : {}),
      ...(!fuel.includes("Any") ? { fuelType: clean(fuel) } : {}),
      ...(!transmission.includes("Any")
        ? { transmission: clean(transmission) }
        : {}),
      // ...(evsOnly ? { is_ev: 1 } : {}),
      ...(!door.includes("Any") ? { door: clean(door) } : {}),
      ...(!seat.includes("Any") ? { seat: clean(seat) } : {}),
      ...(!cylinder.includes("Any") ? { cylinder: clean(cylinder) } : {}),
      ...(!color.includes("Any") ? { color: clean(color) } : {}),
      // ...(searchParams?.get("search") ? { search: searchParams?.get("search") } : {}),
    };

    const params = new URLSearchParams(allParams);
    const rental_type_pathname = pathname.includes("short") ? "short" : "long";
    const getGetCarsRequest = await fetch(
      `${URL.getCars}&car_type=rent&rent_type=${rental_type || rental_type_pathname}&limit=${allProps.itemPerPage}&${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      },
    );
    const getGetCarsResponse = await getGetCarsRequest.json();
    const { data, pagination } = getGetCarsResponse;
    const filteredData = data?.map((item) =>
      JSON.parse(window.localStorage.getItem("favouriteCar") || "[]").some(
        (car) => car.id === item.id,
      )
        ? { ...item, favorite: "#fd5a21" }
        : { ...item, favorite: "none" },
    );
    allProps.setData(filteredData);
    allProps.setCurrentPage(pagination.page);
    allProps.setItemPerPage(pagination.limit);
    setPaginationKeys(pagination);
    setCarsLoading(false);
  };
  useEffect(() => {
    fecthGetCars();
  }, [
    // price,
    // km,
    // year,
    body,
    make,
    model,
    evsOnly,
    fuel,
    transmission,
    location,
    door,
    seat,
    cylinder,
    color,
    features,
    drive_type,
    featureOptions,
    rental_type,
    rentalFilters
    // searchParams
  ]);

  const clearFilter = () => {
    dispatch({ type: "CLEAR_FILTER" });
  };


  useEffect(() => {
    if (sortingOption === "Price Ascending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => a.price - b.price),
      });
    } else if (sortingOption === "Price Descending") {
      dispatch({
        type: "SET_SORTED",
        payload: filtered,
        // payload: [...filtered].sort((a, b) => b.price - a.price),
      });
    } else {
      dispatch({ type: "SET_SORTED", payload: filtered });
    }
    dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
  }, [filtered, sortingOption]);


  const handleFavourite = async (carItem) => {
    let favouriteCars =
      JSON.parse(window.localStorage.getItem("favouriteCar")) || [];

    const isFavourite = favouriteCars.some((car) => car.id === carItem.id);
    if (isFavourite) {
      favouriteCars = favouriteCars.filter((car) => car.id !== carItem.id);
    } else {
      const {
        id,
        featured,
        year,
        type,
        title,
        km,
        fuelType,
        transmission,
        price,
        images,
      } = carItem;
      favouriteCars.push({
        id,
        featured,
        year,
        type,
        title,
        km,
        fuelType,
        transmission,
        price,
        images,
        // type: "rent/"
      });
    }
    window.localStorage.setItem("favouriteCar", JSON.stringify(favouriteCars));
    const updatedData = sorted.map((car) =>
      car.id === carItem.id
        ? { ...car, favorite: isFavourite ? "none" : "#fd5a21" }
        : car,
    );
    allProps.setData(updatedData);
  };


  const saveBooking = (car) => {
    if (car.rent_type === "short" && !rentalFilters.ReturnDate) {
      toast.error("Please provide duration and search for available vehicles!");
      return;
    }
    if (!rentalFilters.age) {
      toast.error("Please provide your age and search for available vehicles!");
      return;
    }
    let values = { ...rentalFilters };

    if (!values?.ReturnDate) {
      const dateObj = new Date(`${rentalFilters.pickUpDate}T${rentalFilters.pickUpTime}`);
      dateObj.setDate(dateObj.getDate() + (parseFloat(rentalFilters.weeks) * 7));

      const ReturnDate = dateObj.toISOString().split('T')[0];
      values = { ...values, carId: car.id, ReturnDate, ReturnTime: rentalFilters.pickUpTime };
    }

    setFilters(values);
    router.push(`/rentals/listing-detail-v1/${car.id}`)
  }


  const setFilters = (payload) => {
    dispatch({
      type: "SET_RENT_FILTER_VALUES",
      payload,
    });
  };


  const getDifference = () => {
    // 3. Create valid Date objects (Format: YYYY-MM-DDTHH:mm)
    const start = new Date(`${rentalFilters.pickUpDate}T${rentalFilters.pickUpTime}`);
    const end = new Date(`${rentalFilters.ReturnDate}T${rentalFilters.ReturnTime}`);

    // 4. Calculate the difference in milliseconds
    const differenceInMs = end - start;

    // 5. Convert milliseconds to days
    return differenceInMs / (1000 * 60 * 60 * 24);
  }

  console.log({ sorted });


  return (
    <>
      {/* {
        ComingSoon && <div className="blur position-fixed w-100 top-0 left-0 d-flex justify-content-center align-items-center" style={{ zIndex: 999, height: '100vh' }}>
          <Image src={ComingSoon1} className="w-75 d-none d-md-block border border-5 border-primary" objectFit="cover" />
          <Image src={ComingSoon2} className="w-75 d-md-none border border-5 border-primary" objectFit="cover" />
        </div>
      } */}
      <section className="listing-grid tf-section3" id="section3">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="heading-section">
                <h2>{PaginationKeys.total}+ Get Your Dream Car </h2>
                <p className="mt-20">
                  Explore our selection of high-quality best cars. Our inventory
                  includes top brands like Toyota, Mercedes, Honda, and more.
                  Find the perfect car for your needs.
                </p>
              </div>
            </div>
            <div className="col-lg-12 flex gap-30 text-start">
              <div className="sidebar-right-listing style-2">
                <div className="sidebar-title flex-two flex-wrap">
                  <h4>Filters and Sort</h4>
                  <a
                    className="fw-5 font claer text-color-2"
                    onClick={clearFilter}
                  >
                    <i className="icon-autodeal-plus" />
                    Clear
                  </a>
                </div>
                <div className="form-filter-siderbar">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="wd-find-select">
                      <div className="form-group">
                        <DropdownSelect
                          // selectedValue={`${make} ${make !== "Any Make" ? `(${filterOptions.make[0].count})` : ""}`}
                          selectedValue={make}
                          onChange={allProps.setMake}
                          options={[
                            "Any Body",
                            ...(filterOptions?.make?.map(
                              (body_type) =>
                                `${body_type?.name} (${body_type?.count || 0})`,
                            ) || []),
                          ]}
                        />
                      </div>
                      <div className="form-group">
                        <div>
                          <DropdownSelect
                            // selectedValue={`${model} ${model !== "Any Model" ? `(${filterOptions.model[0].count})` : ""}`}
                            selectedValue={model}
                            onChange={allProps.setModel}
                            options={[
                              "Any Model",
                              ...(filterOptions?.model?.map(
                                (body_type) =>
                                  `${body_type?.name} (${body_type?.count || 0})`,
                              ) || []),
                            ]}
                          />
                        </div>
                      </div>
                      {/* <div className="form-group">
                        <div>
                          <DropdownSelect
                            selectedValue={price}
                            onChange={allProps.setPrice}
                            options={[
                              "Any Price",
                              ...(filterOptions?.price?.map(
                                (price) => "$" + price?.name.split(",")[0] + " - " + "$" + price?.name.split(",")[1] + " (" + price?.count + ")"
                              ) || []),
                            ]}
                          />
                        </div>
                      </div> */}
                      <div className="form-group">
                        <DropdownSelect
                          selectedValue={body}
                          onChange={allProps.setBody}
                          options={[
                            "Any Body",
                            ...(filterOptions?.body_type?.map(
                              (body_type) =>
                                `${body_type?.name} (${body_type?.count || 0})`,
                            ) || []),
                          ]}
                        />
                      </div>
                      {/* <div className="form-group wg-box3">
                        <div className="widget widget-price">
                          <div className="caption flex-two">
                            <div>
                              <span className="fw-6">
                                Price: ${price[0]} - ${price[1]}
                              </span>
                            </div>
                          </div>
                          <Pricing
                            MIN={0}
                            MAX={100000}
                            priceRange={price}
                            setPriceRange={allProps.setPrice}
                          />
                        </div>
                      </div> */}
                      <div className="form-group">
                        <div>
                          <DropdownSelect
                            selectedValue={fuel}
                            onChange={allProps.setFuel}
                            options={[
                              "Any Type",
                              ...(filterOptions?.fuel_type?.map(
                                (fuel_type) =>
                                  `${fuel_type?.name} (${fuel_type?.count || 0})`,
                              ) || []),
                            ]}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div>
                          <DropdownSelect
                            selectedValue={drive_type}
                            onChange={allProps.setDriveType}
                            options={[
                              "Any Type",
                              ...(filterOptions?.drive_type?.map(
                                (drive_type) =>
                                  `${drive_type?.name} (${drive_type?.count || 0})`,
                              ) || []),
                            ]}
                          />
                        </div>
                      </div>

                      {/* <div className="form-group">
                        <div>
                          <label className="flex-three">
                            <input
                              readOnly
                              className="d-none"
                              checked={evsOnly}
                              type="checkbox"
                              onClick={() => allProps.setEvsOnly(!evsOnly)}
                            />
                            <span className="btn-checkbox" />
                            <span className="text-color-2 font-2">
                              Show Ev's only
                            </span>
                          </label>
                        </div>
                      </div> */}

                      <div className="form-group">
                        <div>
                          <DropdownSelect
                            selectedValue={transmission}
                            onChange={allProps.setTransmission}
                            options={[
                              "Any Transmission",
                              ...(filterOptions?.transmission?.map(
                                (transmission) =>
                                  `${transmission?.name} (${transmission?.count || 0})`,
                              ) || []),
                            ]}
                          />
                        </div>
                      </div>
                      {/* <div className="form-group">
                        <div>
                          <DropdownSelect
                            selectedValue={location}
                            onChange={allProps.setLocation}
                            options={[
                              "Any State / Region",
                              ...(filterOptions?.state_region?.map(
                                (state_region) =>
                                  `${state_region?.name} (${state_region?.count || 0})`,
                              ) || []),
                            ]}
                          />
                        </div>
                      </div> */}
                      <div className="form-group">
                        <div>
                          <DropdownSelect
                            selectedValue={door}
                            onChange={allProps.setDoor}
                            options={[
                              "Any Doors",
                              ...(filterOptions?.doors?.map(
                                (doors) =>
                                  `${doors?.name} (${doors?.count || 0})`,
                              ) || []),
                            ]}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div>
                          <DropdownSelect
                            selectedValue={seat}
                            onChange={allProps.setSeat}
                            options={[
                              "Any Seats",
                              ...(filterOptions?.seats?.map(
                                (seats) =>
                                  `${seats?.name} (${seats?.count || 0})`,
                              ) || []),
                            ]}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div>
                          <DropdownSelect
                            selectedValue={color}
                            onChange={allProps.setColor}
                            options={[
                              "Any Colors",
                              ...(filterOptions?.color?.map(
                                (color) =>
                                  `${color?.name} (${color?.count || 0})`,
                              ) || []),
                            ]}
                          />
                        </div>
                      </div>
                      {/* <div className="form-group wg-box3">
                        <div className="widget widget-price">
                          <div className="caption flex-two">
                            <div>
                              <span className="fw-6">
                                Year: {year[0]} - {year[1]}
                              </span>
                            </div>
                          </div>
                          <Pricing
                            MIN={1998}
                            MAX={new Date().getFullYear()}
                            priceRange={year}
                            setPriceRange={allProps.setYear}
                          />
                        </div>
                      </div> */}
                      {/* <div className="form-group wg-box3">
                        <div className="widget widget-price">
                          <div className="caption flex-two">
                            <div>
                              <span className="fw-6">
                                KM: {km[0]} km - {km[1]} km
                              </span>
                            </div>
                          </div>
                          <Pricing
                            MIN={0}
                            MAX={100000}
                            priceRange={km}
                            setPriceRange={allProps.setKM}
                          />
                        </div>
                      </div> */}

                      {/* <div className="features-wrap">
                        <h4>Featured</h4>
                        <div className="form-group">
                          <div className="tf-amenities bg-white">
                            {featureOptions.map((feature, index) => (
                              <label className="flex-three" key={index}>
                                <input
                                  readOnly
                                  checked={features.includes(feature)}
                                  type="checkbox"
                                  onClick={() => allProps.setFeatures(feature)}
                                />
                                <span className="btn-checkbox" />
                                <span className="text-color-2 font-2">
                                  {feature}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </form>
                </div>
              </div>
              <div className="sidebar-left-listing">
                <div className="row">
                  <div className="col-lg-12 listing-list-car-wrap">
                    <div className="category-filter flex justify-space align-center mb-30 flex-wrap gap-8">
                      <div className="box-1 flex justify-space align-center flex-wrap gap-8 w-100">
                        <p className="">
                          Showing {PaginationKeys.page} -{" "}
                          {PaginationKeys.total_pages} of {PaginationKeys.total}{" "}
                          results
                        </p>
                        <div className="filter-mobie">
                          <a
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight"
                            className="filter"
                          >
                            Filter
                            <i className="icon-autodeal-filter" />
                          </a>
                        </div>
                      </div>
                      {/* <ListGridToggler
                          isGrid={isGrid}
                          setIsGrid={setIsGrid}
                        /> */}
                      {/* <div className="box-2 flex flex-wrap gap-8">
                        <div className="wd-find-select flex gap-8">
                          <div>
                            <DropdownSelect
                              width="178px"
                              selectedValue={sortingOption}
                              onChange={allProps.setSortingOption}
                              addtionalParentClass="list-sort"
                              options={[
                                "Sort by (Default)",

                                "Price Ascending",
                                "Price Descending",
                              ]}
                            />
                          </div>
                        </div>
                      </div> */}
                    </div>
                    {CarsLoading ? (
                      <div className="center my-5">
                        <span className="loader"></span>
                      </div>
                    ) : sorted.length == 0 ? (
                      <div className="center my-5">
                        <p>
                          Oops! No Car matched your search, but don’t worry,
                          because we sure that excellence is just around some
                          corner!
                        </p>
                      </div>
                    ) : (
                      <>
                        <div
                          className={`list-car-list-1`}
                        >
                          {sorted.map((car, i) => (
                            <div
                              key={i}
                              className="box-car-list style-2 hv-one" style={{ height: isMobile ? "auto" : 200 }}
                            >
                              <div className="image-group relative">
                                <div className="top flex-two">
                                  <ul className="d-flex gap-8">
                                    <li className="flag-tag success">
                                      {car.featured ? "Featured" : ""}
                                    </li>
                                    <li className="flag-tag style-1">
                                      <div className="icon">
                                        <svg
                                          width={16}
                                          height={13}
                                          viewBox="0 0 16 13"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M1.5 9L4.93933 5.56067C5.07862 5.42138 5.24398 5.31089 5.42597 5.2355C5.60796 5.16012 5.80302 5.12132 6 5.12132C6.19698 5.12132 6.39204 5.16012 6.57403 5.2355C6.75602 5.31089 6.92138 5.42138 7.06067 5.56067L10.5 9M9.5 8L10.4393 7.06067C10.5786 6.92138 10.744 6.81089 10.926 6.7355C11.108 6.66012 11.303 6.62132 11.5 6.62132C11.697 6.62132 11.892 6.66012 12.074 6.7355C12.256 6.81089 12.4214 6.92138 12.5607 7.06067L14.5 9M2.5 11.5H13.5C13.7652 11.5 14.0196 11.3946 14.2071 11.2071C14.3946 11.0196 14.5 10.7652 14.5 10.5V2.5C14.5 2.23478 14.3946 1.98043 14.2071 1.79289C14.0196 1.60536 13.7652 1.5 13.5 1.5H2.5C2.23478 1.5 1.98043 1.60536 1.79289 1.79289C1.60536 1.98043 1.5 2.23478 1.5 2.5V10.5C1.5 10.7652 1.60536 11.0196 1.79289 11.2071C1.98043 11.3946 2.23478 11.5 2.5 11.5ZM9.5 4H9.50533V4.00533H9.5V4ZM9.75 4C9.75 4.0663 9.72366 4.12989 9.67678 4.17678C9.62989 4.22366 9.5663 4.25 9.5 4.25C9.4337 4.25 9.37011 4.22366 9.32322 4.17678C9.27634 4.12989 9.25 4.0663 9.25 4C9.25 3.9337 9.27634 3.87011 9.32322 3.82322C9.37011 3.77634 9.4337 3.75 9.5 3.75C9.5663 3.75 9.62989 3.77634 9.67678 3.82322C9.72366 3.87011 9.75 3.9337 9.75 4Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </div>
                                      {car.images.length}
                                    </li>
                                  </ul>
                                  <div className="year flag-tag">
                                    {car.year}
                                  </div>
                                </div>
                                {/* <ul className="change-heart flex">
                                    <li className="box-icon w-32">
                                      <a
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#offcanvasBottom"
                                        aria-controls="offcanvasBottom"
                                        className="icon"
                                      >
                                        <svg
                                          width={18}
                                          height={18}
                                          viewBox="0 0 18 18"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M5.25 16.5L1.5 12.75M1.5 12.75L5.25 9M1.5 12.75H12.75M12.75 1.5L16.5 5.25M16.5 5.25L12.75 9M16.5 5.25H5.25"
                                            stroke="CurrentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </a>
                                    </li>
                                    <li className="box-icon w-32">
                                      <Link
                                        href={`/my-favorite`}
                                        className="icon"
                                      >
                                        <svg
                                          width={18}
                                          height={16}
                                          viewBox="0 0 18 16"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M16.5 4.875C16.5 2.80417 14.7508 1.125 12.5933 1.125C10.9808 1.125 9.59583 2.06333 9 3.4025C8.40417 2.06333 7.01917 1.125 5.40583 1.125C3.25 1.125 1.5 2.80417 1.5 4.875C1.5 10.8917 9 14.875 9 14.875C9 14.875 16.5 10.8917 16.5 4.875Z"
                                            stroke="CurrentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </Link>
                                    </li>
                                  </ul> */}
                                <div className="img-style buy-car-slider">
                                  {/* <Image
                                      className="lazyload"
                                      alt="image"
                                      src={car.imgSrc}
                                      width={450}
                                      height={338}
                                    /> */}
                                  <Slider1
                                    images={car?.images.map((img) => img.src)}
                                  />
                                </div>
                              </div>
                              <div className="content">
                                <div className="inner1  flex flex-column justify-content-between">
                                  <div>
                                    <div className="text-address">
                                      <p className="text-color-3 font">
                                        {car.type}
                                      </p>
                                    </div>
                                    <h5 className="link-style-1">
                                      <Link
                                        href={`/rentals/listing-detail-v1/${car.id}`}
                                        style={{
                                          height: isMobile ? "auto" : "30px",
                                        }}
                                      >
                                        {car.title}
                                      </Link>
                                    </h5>
                                    <div className="icon-box flex flex-wrap">
                                      {car?.km ?
                                        <div className="icons flex-three">
                                          <i className="icon-autodeal-km1" />
                                          <span>{car.km?.toLocaleString()} kms</span>
                                        </div>
                                        :
                                        null
                                      }
                                      {car?.fuelType ?
                                        <div className="icons flex-three">
                                          <i className="icon-autodeal-diesel me-1" />
                                          <span>{car.fuelType}</span>
                                        </div>
                                        :
                                        null
                                      }
                                      {car.transmission ?
                                        <div className="icons flex-three">
                                          <i className="icon-autodeal-automatic" />
                                          <span>{car.transmission}</span>
                                        </div>
                                        :
                                        null
                                      }

                                      {car?.seats ? (
                                        <div className="icons flex-three">

                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={17}
                                            height={17}
                                            viewBox="0 0 20 20"
                                            fill="none"
                                          >
                                            <path
                                              d="M17.5 18.1252C17.5 18.2909 17.4341 18.4499 17.3169 18.5671C17.1997 18.6843 17.0407 18.7502 16.875 18.7502H8.74998C8.58422 18.7502 8.42525 18.6843 8.30804 18.5671C8.19083 18.4499 8.12498 18.2909 8.12498 18.1252C8.12498 17.9594 8.19083 17.8004 8.30804 17.6832C8.42525 17.566 8.58422 17.5002 8.74998 17.5002H16.875C17.0407 17.5002 17.1997 17.566 17.3169 17.6832C17.4341 17.8004 17.5 17.9594 17.5 18.1252ZM17.5 12.5002V15.0002C17.5 15.3317 17.3683 15.6496 17.1339 15.884C16.8994 16.1185 16.5815 16.2502 16.25 16.2502H8.91482C8.68238 16.2509 8.45439 16.1865 8.25666 16.0643C8.05893 15.9421 7.89938 15.767 7.79607 15.5588L3.25623 6.49626C3.16991 6.32242 3.125 6.13097 3.125 5.93688C3.125 5.7428 3.16991 5.55134 3.25623 5.37751L4.98435 1.94001C5.13103 1.64729 5.38671 1.4238 5.69642 1.31759C6.00613 1.21139 6.34515 1.23093 6.6406 1.37204L9.27263 2.48298L9.30935 2.50016C9.60567 2.6485 9.83097 2.90843 9.93571 3.22281C10.0405 3.5372 10.0161 3.88031 9.86795 4.17673C9.86555 4.18268 9.86268 4.18843 9.85935 4.19391L8.74998 6.25016L11.2328 11.2502H16.25C16.5815 11.2502 16.8994 11.3819 17.1339 11.6163C17.3683 11.8507 17.5 12.1686 17.5 12.5002ZM16.25 12.5002H11.232C10.9997 12.5009 10.7718 12.4365 10.5741 12.3143C10.3765 12.1921 10.2171 12.017 10.114 11.8088L7.63045 6.80876C7.54434 6.63528 7.49953 6.44423 7.49953 6.25055C7.49953 6.05688 7.54434 5.86583 7.63045 5.69235L7.63982 5.67516L8.74998 3.61891L6.13826 2.51657C6.12574 2.51176 6.11348 2.50628 6.10154 2.50016L4.37498 5.93766L8.91404 15.0002H16.25V12.5002Z"
                                              fill="#696665"
                                            />
                                          </svg>
                                          <span className="ms-1">{car.seats} Seats</span>
                                        </div>
                                      ) : null}
                                      {car?.door ? (
                                        <div className="icons flex-three">

                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={14}
                                            height={14}
                                            viewBox="0 0 20 20"
                                            fill="none"
                                          >
                                            <path
                                              d="M18.125 16.875H16.25V3.125C16.25 2.79348 16.1183 2.47554 15.8839 2.24112C15.6495 2.0067 15.3315 1.875 15 1.875H5C4.66848 1.875 4.35054 2.0067 4.11612 2.24112C3.8817 2.47554 3.75 2.79348 3.75 3.125V16.875H1.875C1.70924 16.875 1.55027 16.9408 1.43306 17.0581C1.31585 17.1753 1.25 17.3342 1.25 17.5C1.25 17.6658 1.31585 17.8247 1.43306 17.9419C1.55027 18.0592 1.70924 18.125 1.875 18.125H18.125C18.2908 18.125 18.4497 18.0592 18.5669 17.9419C18.6842 17.8247 18.75 17.6658 18.75 17.5C18.75 17.3342 18.6842 17.1753 18.5669 17.0581C18.4497 16.9408 18.2908 16.875 18.125 16.875ZM5 3.125H15V16.875H5V3.125ZM13.125 10.3125C13.125 10.4979 13.07 10.6792 12.967 10.8333C12.864 10.9875 12.7176 11.1077 12.5463 11.1786C12.375 11.2496 12.1865 11.2682 12.0046 11.232C11.8227 11.1958 11.6557 11.1065 11.5246 10.9754C11.3935 10.8443 11.3042 10.6773 11.268 10.4954C11.2318 10.3135 11.2504 10.125 11.3214 9.95373C11.3923 9.78243 11.5125 9.63601 11.6667 9.533C11.8208 9.42998 12.0021 9.375 12.1875 9.375C12.4361 9.375 12.6746 9.47377 12.8504 9.64959C13.0262 9.8254 13.125 10.0639 13.125 10.3125Z"
                                              fill="#696665"
                                            />
                                          </svg>
                                          <span className="ms-1">{car.door} Doors</span>
                                        </div>
                                      ) : null}
                                      {car?.aircondition ? (
                                        <div className="icons flex-three">

                                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#696665" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wind-icon lucide-wind"><path d="M12.8 19.6A2 2 0 1 0 14 16H2" /><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" /><path d="M9.8 4.4A2 2 0 1 1 11 8H2" /></svg>
                                          <span className="ms-1">A/C</span>
                                        </div>
                                      ) : null}
                                      {!car?.age ? (
                                        <div className="icons flex-three">

                                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#696665" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-plus-icon lucide-calendar-plus"><path d="M16 19h6" /><path d="M16 2v4" /><path d="M19 16v6" /><path d="M21 12.598V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5" /><path d="M3 10h18" /><path d="M8 2v4" /></svg>
                                          <span className="ms-1">{car?.age}+ Years</span>
                                        </div>
                                      ) : null}


                                    </div>
                                  </div>
                                  {/* <div className="flex align-items-center">
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
                                      class="lucide lucide-landmark-icon lucide-landmark me-1 text-color-3"
                                    >
                                      <path d="M10 18v-7" />
                                      <path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z" />
                                      <path d="M14 18v-7" />
                                      <path d="M18 18v-7" />
                                      <path d="M3 22h18" />
                                      <path d="M6 18v-7" />
                                    </svg>
                                    <div className="fs-12 fw-5 lh-25 text-color-3">
                                      ${(car.price / 10000 * 39).toFixed(1)}
                                    </div>
                                    <span className="fs-12 ms-1">/ week</span>
                                  </div> */}



                                  <div className="features-inner m-0 p-0 bor">
                                    <div className="inner d-flex flex-column w-100 gap-2">
                                      <div className="listing-feature-wrap flex">
                                        <i className="icon-autodeal-check" />
                                        <p>Unlimited mileage</p>
                                      </div>
                                      <div className="listing-feature-wrap flex">
                                        <i className="icon-autodeal-check" />
                                        <p>Basic protection included</p>
                                      </div>
                                    </div>
                                  </div>

                                </div>

                                <div className={`inner2 flex flex-column justify-content-start justify-md-content-between ${isMobile ? "w-100" : ""}`}>

                                  <div className="d-flex justify-content-end">
                                    <Link
                                      href={``}
                                      onClick={() => handleFavourite(car)}
                                      className="text-color-3 d-none d-md-block"
                                    >
                                      <svg
                                        width={18}
                                        height={16}
                                        viewBox="0 0 18 16"
                                        fill={car?.favorite || "none"}
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M16.5 4.875C16.5 2.80417 14.7508 1.125 12.5933 1.125C10.9808 1.125 9.59583 2.06333 9 3.4025C8.40417 2.06333 7.01917 1.125 5.40583 1.125C3.25 1.125 1.5 2.80417 1.5 4.875C1.5 10.8917 9 14.875 9 14.875C9 14.875 16.5 10.8917 16.5 4.875Z"
                                          stroke="CurrentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </Link>
                                  </div>
                                  <div className="fs-20 fw-5 lh-25  text-end text-md-center text-color-3 me-2">
                                    {/* ${car.price?.toLocaleString()} */}
                                    <span className="fw-3">${rental_type == "short" ? `${car?.per_day_price || 0} / day` : `${(car?.per_day_price * 7) || 0} / week`}</span>
                                  </div>

                                  <div className="fs-13 fw-5 mb-2 lh-25 text-end text-md-center text-color-2 me-2">
                                    Total: ${rentalFilters?.pickUpDate && rentalFilters?.ReturnDate ? getDifference() * car?.per_day_price || 0 :
                                      rental_type == "short" ? car?.per_day_price : car?.per_day_price * 7}
                                  </div>

                                  <button
                                    type="button"
                                    // href={`javascript:void(0)`}
                                    onClick={() => saveBooking(car)}
                                    className="chat m-0 d-flex align-items-center"
                                  >
                                    <span className="relative me-1">Select Car</span>
                                    <div className="icon text-color-2">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-car-icon lucide-car"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" /></svg>
                                    </div>
                                  </button>
                                </div>
                                <div className="w-100 d-flex d-md-none justify-content-between align-items-center">
                                  <Link
                                    href={`/rentals/listing-detail-v1/${car.id}`}
                                    className="view-car"
                                  >
                                    View details
                                    <i className="icon-autodeal-btn-right" />
                                  </Link>
                                  <Link
                                    href={`javascript:void(0)`}
                                    onClick={() => handleFavourite(car)}
                                    className="text-color-3"
                                  >
                                    <svg
                                      width={18}
                                      height={16}
                                      viewBox="0 0 18 16"
                                      fill={car?.favorite || "none"}
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M16.5 4.875C16.5 2.80417 14.7508 1.125 12.5933 1.125C10.9808 1.125 9.59583 2.06333 9 3.4025C8.40417 2.06333 7.01917 1.125 5.40583 1.125C3.25 1.125 1.5 2.80417 1.5 4.875C1.5 10.8917 9 14.875 9 14.875C9 14.875 16.5 10.8917 16.5 4.875Z"
                                        stroke="CurrentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="themesflat-pagination clearfix mt-40">
                          <ul>
                            <Pagination
                              currentPage={currentPage}
                              setPage={(value) =>
                                allProps.setCurrentPage(value)
                              }
                              itemLength={PaginationKeys.total}
                              itemPerPage={itemPerPage}
                            />
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FilterSidebar allProps={allProps} clearFilter={clearFilter} />
    </>
  );
}
