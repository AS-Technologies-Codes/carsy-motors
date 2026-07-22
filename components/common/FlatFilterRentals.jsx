"use client";

import { useEffect, useState } from "react";
import { useCarFilter } from "@/context/providers/CarFilterContext";
import { accessToken, URL } from "@/utils/URL";
import Link from "next/link";
import DateRangeLong from "./DateRange";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";

export default function FlatFilterRentals({
  styleClass = "",
  justifyClass = "",
  tabStyle = "",
}) {
  const pathName = usePathname();
  const defaultValues = {
    age: 0,
    YardLocation: "carsyYard",
    pickUpDate: new Date().toISOString().toString().split("T")[0],
    ReturnDate: "",
    pickUpTime: new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // Forces 24-hour mode
    }).toString(),
    weeks: "1 Week",
    ReturnTime: "",
    type: pathName.toString().includes("short") ? "short" : "long"
  }
  const [formData, setFormData] = useState(defaultValues);
  const { state, dispatch } = useCarFilter();
  const { countMake, countModel, countPrice, filterOptions } = state;



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

  const fecthGetCars = async () => {
    setCarsLoading(true);

    // Build URL with filter parameters
    const params = new URLSearchParams({
      ...(countPrice.split(",")[0]
        ? { priceMin: countPrice.split(",")[0] }
        : {}),
      ...(countPrice.split(",")[1]
        ? { priceMax: countPrice.split(",")[1] }
        : {}),
      // ...(countPrice !== "Any Price" ? { price: countPrice } : {}),
      ...(countMake !== "Any Make" ? { make: countMake } : {}),
      ...(countModel !== "Any Model" ? { model: countModel } : {}),
    });

    const getGetCarsRequest = await fetch(
      `${URL.getCars}&${params.toString()}`,
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
  }, [countPrice, countMake, countModel]);


  console.log(formData);

  const searchFilter = () => {
    dispatch({ type: "SET_MAKE", payload: countMake });
    dispatch({ type: "SET_MODEL", payload: countModel });
    dispatch({
      type: "SET_PRICE",
      payload: countPrice,
    });
  };

  return (
    <>
      <div className={`content-tab ${tabStyle}`}>
        <div className="content-inner tab-content">
          <div className="form-sl">
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

                  {formData.type && <DateRangeLong
                    setFormData={setFormData}
                    formData={formData}
                    type={formData.type}
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
                  {/* <div className="form-group-1">
                    <label>Body</label>
                    <div className="group-select tf-select">
                      <select 
                        className="nice-select"
                        value={body}
                        onChange={(e) => allProps.setBody(e.target.value)}
                      >
                        <option>Body</option>
                        <option value="Convertible">Convertible</option>
                        <option value="Coupe">Coupe</option>
                        <option value="Crossover">Crossover</option>
                        <option value="Hatchback">Hatchback</option>
                        <option value="Minivan">Minivan</option>
                      </select>
                    </div>
                  </div> */}
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
