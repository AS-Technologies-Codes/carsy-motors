"use client";

import { useEffect, useState } from "react";
import { useCarFilter } from "@/context/providers/CarFilterContext";
import { accessToken, URL } from "@/utils/URL";
import Link from "next/link";
import DateRangeLong from "./DateRange";
import toast from "react-hot-toast";
import { defaultValuesRentFilter } from "@/context/reducer/carFilterReducer";
import { usePathname } from "next/navigation";

export default function FlatFilterRentals({
  styleClass = "",
  justifyClass = "",
  tabStyle = "",
}) {
 
  const { state, dispatch } = useCarFilter();
  const { rental_type } = state;
  const [formData, setFormData] = useState(defaultValuesRentFilter);
  const pathname = usePathname();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (Number(formData.age) > 0 && Number(formData.age) < 25) {
      showActionToast()
    }
  }, [formData.age])

  const showActionToast = () => {
    toast((t) => (
      <div className="gap-3 flex justify-content-center flex-column align-items-center">
        {/* <h1 className="fs-4">Please select an age</h1> */}
        <div className="fw-bold mt-3">The minimum age to rent  most vehicles is 25.</div>
        <div className="center">Drivers under 25 may drive certain vehicles, but may incur a Young Driver Surcharge.</div>
        <div>For more details of our age policy <a className="text-color-3" href="javascipt:void(0)">click here</a>.</div>

        {/* <div className="button-search sc-btn-top"> */}
        <Link href="javascipt:void(0)"
          onClick={() => toast.dismiss(t.id)}
          className="sc-button"
        >
          <span>Got it!</span>
        </Link>
        {/* </div> */}
      </div>
    ), {
      // Optional: Stop the toast from automatically hiding 
      // so the user is forced to click "OK"
      duration: Infinity,
    });
  };

  const [CarsLoading, setCarsLoading] = useState(true);
  const [Total, setTotal] = useState(0);
  const carTypes = ["Long Term", "Short Term"];
  const [activeIndex, setActiveIndex] = useState(0); // Initially "All Car" is active

  const setRentalType = (payload) => {
    dispatch({
      type: "RENTAL_TYPE",
      payload: payload,
    });
  };


  const handleClick = (index) => {
    setActiveIndex(index); // Update the active index when clicked
    // setFormData(ele => ({ ...ele, type: index == 0 ? "long" : "short" }))
    setRentalType(index == 0 ? "long" : "short")
  };
  const fecthGetCars = async () => {
    setCarsLoading(true);

    // Build URL with filter parameters

    console.log({formData});
    
    const params = new URLSearchParams({
      ...formData
      // ...(countPrice.split(",")[0]
      //   ? { priceMin: countPrice.split(",")[0] }
      //   : {}),
      // ...(countPrice.split(",")[1]
      //   ? { priceMax: countPrice.split(",")[1] }
      //   : {}),
      // // ...(countPrice !== "Any Price" ? { price: countPrice } : {}),
      // ...(countMake !== "Any Make" ? { make: countMake } : {}),
      // ...(countModel !== "Any Model" ? { model: countModel } : {}),
    });

    console.log({ rental_type });
    const rental_type_pathname = pathname.includes("short") ? "short" : "long";
console.log("asasa", rental_type || rental_type_pathname);
console.log("asa", rental_type_pathname);

    const getGetCarsRequest = await fetch(
      `${URL.getCars}&car_type=rent&rent_type=${rental_type || rental_type_pathname}&${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      },
    );
    const getGetCarsResponse = await getGetCarsRequest.json();
    const { filters_count, pagination } = getGetCarsResponse;
    setTotal(pagination.total);
    dispatch({ type: "SET_FILTER_OPTIONS", payload: filters_count });
    setCarsLoading(false);
  };
  useEffect(() => {
    fecthGetCars();
    setActiveIndex(rental_type == "long" ? 0 : 1)
  }, [rental_type, formData]);


  console.log(formData);

  const searchFilter = () => {
    // dispatch({ type: "SET_MAKE", payload: countMake });
    // dispatch({ type: "SET_MODEL", payload: countModel });
    dispatch({
      type: "SET_RENT_FILTER_VALUES",
      payload: formData,
    });
  };

  return (
    <>
      <div className={`box-tab ${styleClass} center`}>
        <ul className={`menu-tab tab-title ${justifyClass} flex`}>
          {carTypes.map((car, index) => (
            <li
              key={index}
              className={`item-title style ${index === activeIndex ? "active" : ""
                }`}
              onClick={() => handleClick(index)} // Set active when clicked
            >
              <span className="inner fs-16 fw-5 lh-20">{car}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={`content-tab ${tabStyle}`}>
        <div className="content-inner tab-content">
          <div className="form-sl" style={{ borderTopLeftRadius: 0 }}>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="wd-find-select flex">
                <div className="inner-group select-style">
                  <div className="form-group-1" >
                    <label>Pick up & Return Location</label>
                    <div className="group-select tf-select">
                      <select
                        // disabled={CarsLoading}
                        className="nice-select"
                        name="YardLocation"
                        value={formData.YardLocation}
                        onChange={handleChange}
                      >
                        <option value={"carsyYard"}>Carsy Yard (Auto Select)</option>
                        {/* {filterOptions?.make?.map((make) => (
                          <option value={make?.name}>
                            {make?.name} ({make?.count || 0})
                          </option>
                        ))} */}
                      </select>
                    </div>
                  </div>

                  {rental_type && <DateRangeLong
                    setFormData={setFormData}
                    formData={formData}
                    type={rental_type}
                  />}


                  <div className="form-group-1">
                    <label>Driver Age</label>
                    <div className="group-select tf-select">
                      <select
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="nice-select"
                      // value={door}
                      // onChange={(e) => setDoor(e.target.value)}
                      >
                        <option>Select Age</option>
                        <option value={18}>18</option>
                        <option value={19}>19</option>
                        <option value={20}>20</option>
                        <option value={21}>21</option>
                        <option value={22}>22</option>
                        <option value={23}>23</option>
                        <option value={24}>24</option>
                        <option value={25}>25</option>
                        <option value={26}>26+</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group-2 form-style"></div>
                <div className="button-search sc-btn-top">
                  <Link
                    className="sc-button"
                    href="#section3"
                    onClick={searchFilter}
                  >
                    {CarsLoading ? (
                      <span>...</span>
                    ) : (
                      <>
                        <span>Show me {Total} cars</span>
                        <i className="far fa-search text-color-1" />
                      </>
                    )}
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
