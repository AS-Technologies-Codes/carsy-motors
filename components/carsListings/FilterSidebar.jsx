"use client";
import Pricing from "../common/Pricing";
import DropdownSelect from "../common/DropDownSelect";
import { useCarFilter } from "@/context/providers/CarFilterContext";

export default function FilterSidebar({ allProps, clearFilter }) {
    const { state} = useCarFilter();
  
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
  } = state;

  return (
    <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight">
      <div className="offcanvas-header">
        <h4 className="offcanvas-title" id="offcanvasRightLabel">
          Filters and Sort
        </h4>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="offcanvas-body">
        <a
          className="tf-btn-arrow wow fadeInUpSmall clear-filter mb-2"
          onClick={clearFilter}
        >
          <i
            className="icon-autodeal-plus "
            style={{ transform: "rotate(25deg)" }}
          />{" "}
          Clear Filter
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
                    "$10,000 - $15,000",
                    "$15,000 - $20,000",
                    "$20,000 - $25,000",
                    "$25,000 - $30,000",
                    "$30,000 - $35,000",
                    "$35,000 - $40,000",
                    "$40,000 - $60,000",
                    "$60,000 - $80,000",
                    "$80,000 - $100,000",
                    "$100,000 - $150,000",
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
            <div className="form-group">
              <div>
                <DropdownSelect
                  selectedValue={door}
                  onChange={allProps.setDoor}
                  options={[
                    "Any Doors",
                    ...(filterOptions?.doors?.map(
                      (doors) => `${doors?.name} (${doors?.count || 0})`,
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
                      (seats) => `${seats?.name} (${seats?.count || 0})`,
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
                      (color) => `${color?.name} (${color?.count || 0})`,
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
          </div>
        </form>
      </div>
    </div>
  );
}
