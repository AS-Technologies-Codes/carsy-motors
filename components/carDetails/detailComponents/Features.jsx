import Accordion from "@/components/common/Accordions";
import React from "react";

export default function Features({ feat }) {
  console.log({ feat });

  const features = [
    {
      title: "Comfort & Convenience",
      content: feat?.comfort_convenience,
    },
    {
      title: "Interior",
      content: feat?.interior,
    },
    {
      title: "Exterior",
      content: feat?.exterior,
    },
    {
      title: "Safety",
      content: feat?.safety_features,
    },
    {
      title: "Entertainment & Communication",
      content: feat?.entertainment_communication,
    },
  ];


  return (
    <>
      <div className="footer-heading-mobie listing-details-mobie mb-30">
        <h2>Features</h2>
      </div>
      <div className="features-inner tf-collapse-content">
        <div className="inner">
          {feat?.features.length ? (
            feat?.features?.map((f) => (
              <div className="listing-feature-wrap flex" key={f}>
                <i className="icon-autodeal-check" />
                <p>{f}</p>
              </div>
            ))
          ) : (
            <div className="listing-feature-wrap flex">
              <p>Stay Tuned! More Content is Coming</p>
            </div>
          )}
        </div>
      </div>
      <div className="row" id="scrollspyHeading3">
        <div className="col-lg-12 flat-accordion">
          <Accordion parentClass="flat-toggle style-1" faqData={features} />
        </div>
      </div>
    </>
  );
}
