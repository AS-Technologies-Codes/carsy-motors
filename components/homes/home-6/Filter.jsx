import FlatFilter2 from "@/components/common/FlatFilter2";
import React from "react";

export default function Filter() {
  return (
    <div className="flat-filter-search home6">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="flat-tabs">
              <FlatFilter2 styleClass="style2" tabStyle="style2" />
              <div className="wrap-icon flex align-center link-style-3 flex-wrap">
                <div className="icon-box text-color-1 font">
                  <span className="icon-autodeal-suv" />
                  <a href="javascript:void(0)">SUV</a>
                </div>
                <div className="icon-box text-color-1 font">
                  <span className="icon-autodeal-coupe" />
                  <a href="javascript:void(0)">Coupe</a>
                </div>
                <div className="icon-box text-color-1 font">
                  <span className="icon-autodeal-hatchback" />
                  <a href="javascript:void(0)">Hatchback</a>
                </div>
                <div className="icon-box text-color-1 font">
                  <span className="icon-autodeal-hybrid" />
                  <a href="javascript:void(0)">Hybrid</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
