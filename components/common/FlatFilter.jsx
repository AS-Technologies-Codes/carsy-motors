"use client";

import { useEffect, useState } from "react";
import { useCarFilter } from "@/context/providers/CarFilterContext";
import { accessToken, URL } from "@/utils/URL";

export default function FlatFilter({
  styleClass = "",
  justifyClass = "",
  tabStyle = "",
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { state, dispatch } = useCarFilter();
  const { countMake, countModel, countPrice, filterOptions } = state;

  const handleClick = (index) => {
    setActiveIndex(index);
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
    console.log("dsds", filters_count);

    dispatch({ type: "SET_FILTER_OPTIONS", payload: filters_count });
    setCarsLoading(false);
  };
  useEffect(() => {
    fecthGetCars();
  }, [countPrice, countMake, countModel, activeIndex]);

  const searchFilter = () => {
    dispatch({ type: "SET_MAKE", payload: countMake });
    dispatch({ type: "SET_MODEL", payload: countModel });
    dispatch({
      type: "SET_PRICE",
      payload: [countPrice.split(",")[0], countPrice.split(",")[1]],
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
                  <div className="form-group-1">
                    <label>Make</label>
                    <div className="group-select tf-select">
                      <select
                        disabled={CarsLoading}
                        className="nice-select"
                        value={countMake}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_COUNT_MAKE",
                            payload: e.target.value,
                          })
                        }
                      >
                        <option>Any Make</option>
                        {filterOptions?.make?.map((make) => (
                          <option value={make?.name}>
                            {make?.name} ({make?.count || 0})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group-1">
                    <label>Model</label>
                    <div className="group-select tf-select">
                      <select
                        disabled={CarsLoading}
                        className="nice-select"
                        value={countModel}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_COUNT_MODEL",
                            payload: e.target.value,
                          })
                        }
                      >
                        <option>Any Model</option>
                        {filterOptions?.model?.map((model) => (
                          <option value={model?.name}>
                            {model?.name} ({model?.count || 0})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* <div className="form-group-1">
                    <label>Door</label>
                    <div className="group-select tf-select">
                      <select 
                        className="nice-select"
                        value={door}
                        onChange={(e) => setDoor(e.target.value)}
                      >
                        <option>Door</option>
                        <option value={2}>2</option>
                        <option value={4}>4</option>
                        <option value={6}>6</option>
                        <option value={8}>8</option>
                        <option value={10}>10</option>
                      </select>
                    </div>
                  </div> */}
                  <div className="form-group-1">
                    <label>Price</label>
                    <div className="group-select tf-select">
                      <select
                        className="nice-select"
                        disabled={CarsLoading}
                        value={countPrice}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_COUNT_PRICE",
                            payload: e.target.value,
                          })
                        }
                      >
                        <option>Any Price</option>
                        {filterOptions?.price?.map((price) => (
                          <option value={price?.name}>
                            {price?.name} ({price?.count || 0})
                          </option>
                        ))}
                        {/* <option value="10000,15000">$10,000 - $15,000</option>
                        <option value="15000,20000">$15,000 - $20,000</option>
                        <option value="20000,25000">$20,000 - $25,000</option>
                        <option value="25000,30000">$25,000 - $30,000</option>
                        <option value="30000,35000">$30,000 - $35,000</option>
                        <option value="35000,40000">$35,000 - $40,000</option>
                        <option value="40000,60000">$40,000 - $60,000</option>
                        <option value="60000,80000">$60,000 - $80,000</option>
                        <option value="80000,100000">$80,000 - $100,000</option>
                        <option value="100000,150000">
                          $100,000 - $150,000
                        </option> */}
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
                  <a className="sc-button" onClick={searchFilter}>
                    {CarsLoading ? (
                      <span>...</span>
                    ) : (
                      <>
                        <span>Show me {Total} cars</span>
                        <i className="far fa-search text-color-1" />
                      </>
                    )}
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
