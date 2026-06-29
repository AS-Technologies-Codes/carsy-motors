import Accordion from "@/components/common/Accordions";
import React from "react";

export default function Features({ feat }) {
  console.log({ feat });

  const features = [
    ...(feat?.comfort_convenience && feat?.comfort_convenience?.length
      ? [
          {
            title: "Comfort & Convenience",
            content: feat?.comfort_convenience,
          },
        ]
      : []),
    ...(feat?.interior && feat?.interior?.length
      ? [
          {
            title: "Interior",
            content: feat?.interior,
          },
        ]
      : []),
    ...(feat?.exterior && feat?.exterior?.length
      ? [
          {
            title: "Exterior",
            content: feat?.exterior,
          },
        ]
      : []),
    ...(feat?.safety_features && feat?.safety_features?.length
      ? [
          {
            title: "Safety",
            content: feat?.safety_features,
          },
        ]
      : []),
    ...(feat?.entertainment_communication &&
    feat?.entertainment_communication?.length
      ? [
          {
            title: "Entertainment & Communication",
            content: feat?.entertainment_communication,
          },
        ]
      : []),
  ];

  console.log(features);

  return (
    <>
      <div className="footer-heading-mobie listing-details-mobie mb-30">
        <h2>Features</h2>
      </div>
      <div className="features-inner tf-collapse-content">
        <div className="inner">
          {feat?.features?.length ? (
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
