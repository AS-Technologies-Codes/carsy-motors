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
import Slider1 from "../carDetails/sliders/SliderViewer";
import { useResponsive } from "@/utils/useResponsive";
import ComingSoon1 from "../../public/assets/images/car-list/buy-coming-soon.png"
import ComingSoon2 from "../../public/assets/images/car-list/coming-soon-mobile.png"
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function CarSells() {
  const [PaginationKeys, setPaginationKeys] = useState({});
  const [CarsLoading, setCarsLoading] = useState(true);
  const { state, dispatch } = useCarFilter();
  const { isMobile } = useResponsive();
  const searchParams = useSearchParams() || "";
  const [ComingSoon, setComingSoon] = useState(false);

  // useEffect(() => {
  //   if (window.location.origin.includes("carsymotors")) {
  //     setTimeout(() => {
  //       setComingSoon(true);
  //     }, 2000);
  //   }
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
    itemPerPage,
    filterOptions,
    seat,
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
    setItemPerPage: (value) => {
      (dispatch({ type: "SET_CURRENT_PAGE", payload: 1 }),
        dispatch({ type: "SET_ITEM_PER_PAGE", payload: value }));
    },
  };

  const priceFilter = (oldPrice) => {
    if (!oldPrice.includes("-"))
      return ({
        ...(oldPrice.split(",")[0] ? { priceMin: oldPrice.split(",")[0] } : {}),
        ...(oldPrice.split(",")[1] ? { priceMax: oldPrice.split(",")[1] } : {})
      });

    const price = oldPrice.replace(/[,$]/g, "");
    const priceMin = price.split("-")[0].trim();
    const priceMax = price.split("-")[1].trim();
    console.log({ priceMin, priceMax });

    return ({
      ...(priceMin ? { priceMin } : {}),
      ...(priceMax ? { priceMax } : {})
    });
  };

  const clean = (val) =>
    typeof val === "string" ? val.replace(/\s*\(\d+\)/g, "") : val;

  const fecthGetCars = async () => {
    setCarsLoading(true);

    const allParams = {
      page: PaginationKeys?.page || 1,
      ...(!price?.includes("Any") ? priceFilter(price) : {}),
      ...(km[0] ? { kmMin: km[0] } : {}),
      ...(km[1] > 100000 ? {} : { kmMax: km[1] }),
      ...(year[0] > 1997 ? { yearMin: year[0] } : {}),
      ...(year[1] <= new Date().getFullYear() ? { yearMax: year[1] } : {}),
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
      ...(searchParams?.get("search") ? { search: searchParams?.get("search") } : {}),
    };

    const params = new URLSearchParams(allParams);

    const getGetCarsRequest = await fetch(
      `${URL.getCars}&limit=${allProps.itemPerPage}&${params.toString()}`,
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
    allProps.setItemPerPage(pagination.limit);
    setPaginationKeys(pagination);
    setCarsLoading(false);
  };
  useEffect(() => {
    fecthGetCars();
  }, [
    price,
    km,
    year,
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
    searchParams,
    PaginationKeys?.page || 1,
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
  }, [filtered, sortingOption]);

  const handleWhatsApp = (carItem) => {
    if (typeof window !== "undefined") {
      const phoneNumber = "+923473456750"; // Replace with your actual phone number
      const message = `Hi! I'm interested in this car:\n\nModel: ${carItem?.model || "N/A"}\nPrice: $${carItem?.price || "N/A"}\nKM: ${carItem?.km || "N/A"}\nFuel: ${carItem?.fuelType || "N/A"}\n\nPlease provide more details.`;
      const encodedMessage = encodeURIComponent(message);
      window.open(
        `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
        "_blank",
      );
    }
  };

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


  return (
    <>
      {
        ComingSoon && <div className="blur position-fixed w-100 top-0 left-0 d-flex justify-content-center align-items-center" style={{ zIndex: 999, height: '100vh' }}>
          <Image src={ComingSoon1} className="w-75 d-none d-md-block border border-5 border-primary" objectFit="cover" />
          <Image src={ComingSoon2} className="w-75 d-md-none border border-5 border-primary" objectFit="cover" />
        </div>
      }
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
                      <div className="form-group">
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
                      </div>
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
                      <div className="form-group wg-box3">
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
                        {/* /.widget_price */}
                      </div>
                      <div className="form-group wg-box3">
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
                        {/* /.widget_price */}
                      </div>

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
                          className={`list-car-list-1 ${!isMobile ? "list-car-grid-1" : ""}`}
                        >
                          {sorted.map((car, i) => (
                            <div
                              key={i}
                              className="box-car-list style-2 hv-one"
                            >
                              <Slider1
                                car={car}
                                images={car?.images.map((img) => img.src)}
                              />
                              <div className="content">
                                <div className="inner1">
                                  <div className="text-address">
                                    <p className="text-color-3 font">
                                      {car.type}
                                    </p>
                                  </div>
                                  <h5 className="link-style-1">
                                    <Link
                                      href={`/listing-detail-v1/${car.id}`}
                                      style={{
                                        height: isMobile ? "auto" : "50px",
                                      }}
                                    >
                                      {car.title}
                                    </Link>
                                  </h5>
                                  <div className="icon-box flex flex-wrap">
                                    <div className="icons flex-three">
                                      <i className="icon-autodeal-km1" />
                                      <span>{car.km?.toLocaleString()} kms</span>
                                    </div>
                                    <div className="icons flex-three">
                                      <i className="icon-autodeal-diesel" />
                                      <span>{car.fuelType}</span>
                                    </div>
                                    <div className="icons flex-three">
                                      <i className="icon-autodeal-automatic" />
                                      <span>{car.transmission}</span>
                                    </div>
                                  </div>
                                  <div className="flex align-items-center">
                                    <div className="money fs-20 fw-5 lh-25 text-color-3 me-2">
                                      ${car.price?.toLocaleString()}
                                    </div>
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
                                    <div className="money fs-12 fw-5 lh-25 text-color-3">
                                      ${(car.price / 10000 * 39).toFixed(1)}
                                    </div>
                                    <span className="fs-12 ms-1">/ week</span>
                                  </div>
                                </div>
                                <div className="w-100 d-flex d-md-none justify-content-between align-items-center">
                                  <Link
                                    href={`/listing-detail-v1/${car.id}`}
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
                                <div className="inner2 w-100">
                                  <div
                                    className={`days-box d-flex flex-row mb-2 justify-content-between h-100 w-100`}
                                  >
                                    <Link
                                      href={`/listing-detail-v1/${car.id}`}
                                      className="view-car"
                                    >
                                      View car
                                    </Link>

                                    <div className="d-flex justify-content-end">
                                      <Link
                                        href={`javascript:void(0)`}
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
                                    <Link
                                      href="javascript:void(0)"
                                      onClick={() => handleWhatsApp(car)}
                                      className="chat m-0"
                                    >
                                      <div className="icon">
                                        <svg
                                          width={18}
                                          height={18}
                                          viewBox="0 0 18 18"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M8.99982 0.875C7.59706 0.874694 6.21811 1.23757 4.9972 1.9283C3.77629 2.61904 2.75501 3.6141 2.03277 4.81664C1.31052 6.01918 0.911915 7.38822 0.875748 8.79052C0.839581 10.1928 1.16709 11.5806 1.82638 12.8188L0.939664 15.4789C0.866215 15.6992 0.855555 15.9355 0.908881 16.1615C0.962207 16.3874 1.07741 16.5941 1.24158 16.7582C1.40575 16.9224 1.61239 17.0376 1.83836 17.0909C2.06432 17.1443 2.30067 17.1336 2.52091 17.0602L5.18107 16.1734C6.27073 16.753 7.47811 17.0767 8.71156 17.12C9.94501 17.1633 11.1721 16.925 12.2997 16.4232C13.4273 15.9215 14.4258 15.1694 15.2194 14.2241C16.0129 13.2789 16.5807 12.1652 16.8796 10.9678C17.1785 9.77029 17.2007 8.52047 16.9445 7.31315C16.6882 6.10584 16.1603 4.97276 15.4008 3.99993C14.6413 3.02711 13.6701 2.24009 12.561 1.69864C11.4519 1.15718 10.234 0.875506 8.99982 0.875ZM8.99982 15.875C7.79121 15.8758 6.6038 15.5575 5.55763 14.9523C5.48104 14.9079 5.39587 14.8803 5.30779 14.8713C5.2197 14.8622 5.13071 14.872 5.0467 14.9L2.12482 15.875L3.09904 12.9531C3.12712 12.8692 3.13705 12.7802 3.12816 12.6921C3.11927 12.604 3.09177 12.5188 3.04748 12.4422C2.28964 11.132 1.98537 9.60827 2.18187 8.10747C2.37837 6.60667 3.06466 5.21267 4.13426 4.14171C5.20387 3.07076 6.597 2.38271 8.09755 2.18431C9.5981 1.98592 11.1222 2.28826 12.4334 3.04444C13.7445 3.80062 14.7695 4.96837 15.3493 6.36652C15.9291 7.76468 16.0313 9.3151 15.64 10.7773C15.2487 12.2394 14.3858 13.5316 13.1852 14.4533C11.9846 15.375 10.5134 15.8748 8.99982 15.875Z"
                                            fill="CurrentColor"
                                          />
                                        </svg>
                                      </div>
                                      <span>Chat</span>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="themesflat-pagination clearfix mt-40">
                          <ul>
                            <Pagination
                              currentPage={PaginationKeys?.page || 1}
                              setPage={(value) =>
                                setPaginationKeys((prev) => ({ ...prev, page: value }))
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
