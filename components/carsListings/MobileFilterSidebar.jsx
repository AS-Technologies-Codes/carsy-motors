"use client";
import Pricing from "../common/Pricing";
import DropdownSelect from "../common/DropDownSelect";
import { useCarFilter } from "@/context/providers/CarFilterContext";

export default function FilterSidebar({ allProps, clearFilter }) {
  const { state } = useCarFilter();

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
        <div className="form-filter-siderbar">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="wd-find-select">
              <div className="form-group">
                <DropdownSelect
                  selectedValue={state.make}
                  onChange={allProps.setMake}
                  options={[
                    "Any Body",
                    ...(state.filterOptions?.make?.map(
                      (body_type) =>
                        `${body_type?.name} (${body_type?.count || 0})`,
                    ) || []),
                  ]}
                />
              </div>
              <div className="form-group">
                <div>
                  <DropdownSelect
                    selectedValue={state.model}
                    onChange={allProps.setModel}
                    options={[
                      "Any Model",
                      ...(state.filterOptions?.model?.map(
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
                    selectedValue={state.price}
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
                  selectedValue={state.body}
                  onChange={allProps.setBody}
                  options={[
                    "Any Body",
                    ...(state.filterOptions?.body_type?.map(
                      (body_type) =>
                        `${body_type?.name} (${body_type?.count || 0})`,
                    ) || []),
                  ]}
                />
              </div>
              <div className="form-group">
                <div>
                  <DropdownSelect
                    selectedValue={state.fuel}
                    onChange={allProps.setFuel}
                    options={[
                      "Any Type",
                      ...(state.filterOptions?.fuel_type?.map(
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
                    selectedValue={state.drive_type}
                    onChange={allProps.setDriveType}
                    options={[
                      "Any Type",
                      ...(state.filterOptions?.drive_type?.map(
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
                    selectedValue={state.transmission}
                    onChange={allProps.setTransmission}
                    options={[
                      "Any Transmission",
                      ...(state.filterOptions?.transmission?.map(
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
                    selectedValue={state.door}
                    onChange={allProps.setDoor}
                    options={[
                      "Any Doors",
                      ...(state.filterOptions?.doors?.map(
                        (doors) => `${doors?.name} (${doors?.count || 0})`,
                      ) || []),
                    ]}
                  />
                </div>
              </div>
              <div className="form-group">
                <div>
                  <DropdownSelect
                    selectedValue={state.seat}
                    onChange={allProps.setSeat}
                    options={[
                      "Any Seats",
                      ...((1)?.seats?.map(
                        (seats) => `${seats?.name} (${seats?.count || 0})`,
                      ) || []),
                    ]}
                  />
                </div>
              </div>
              <div className="form-group">
                <div>
                  <DropdownSelect
                    selectedValue={state.color}
                    onChange={allProps.setColor}
                    options={[
                      "Any Colors",
                      ...(state.filterOptions?.color?.map(
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
                        Year: {state.year[0]} - {state.year[1]}
                      </span>
                    </div>
                  </div>
                  <Pricing
                    MIN={1998}
                    MAX={new Date().getFullYear()}
                    priceRange={state?.year}
                    setPriceRange={allProps.setYear}
                  />
                </div>
              </div>
              <div className="form-group wg-box3">
                <div className="widget widget-price">
                  <div className="caption flex-two">
                    <div>
                      <span className="fw-6">
                        KM: {state.km[0]} km - {state.km[1]} km
                      </span>
                    </div>
                  </div>
                  <Pricing
                    MIN={0}
                    MAX={100000}
                    priceRange={state.km}
                    setPriceRange={allProps.setKM}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
