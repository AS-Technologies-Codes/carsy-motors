// components/Map.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { getMapListingApi } from "@/utils/APIs";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const fallbackMarkers = [
    {
      id: 1,
      name: "Rocklea Warehouse",
      address: "Rocklea, QLD",
      lat: -27.544,
      lng: 153.0092,
      image: "/assets/img/car/1.jpg",
    },
  ];
  const [MapListing, setMapListing] = useState(fallbackMarkers);
  const [MapLoading, setMapLoading] = useState(true);
  // 🔑 Get your API key from https://maptiler.com
  const MAPTILER_KEY = "Wo1g8lU181ICQZpv28HQ";

  const fetchMap = async () => {
    try {
      setMapLoading(true);
      const getMapData = await getMapListingApi();
      setMapListing(getMapData);
    } catch (error) {
      setMapListing();
      console.error("Failed to fetch map listing data", error);
      setMapListing(fallbackMarkers);
    } finally {
      setMapLoading(false);
    }
  };

  useEffect(() => {
    fetchMap();
  }, []);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    maptilersdk.config.apiKey = MAPTILER_KEY;

    // 1. Initialize the map canvas thread
    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [153.0092, -27.545], // [Lng, Lat]
      zoom: 14,
      scrollZoom: false, // ❌ Disable mouse scroll wheel zoom (scrollWheelZoom: false)
      dragPan: true, //  Enable clicking and dragging the map (dragging: true)
      doubleClickZoom: true, //  Enable double clicking to zoom (doubleClickZoom: true)
      touchZoomRotate: true,
    });

    // 2. Add markers from hardcoded data
    MapListing.forEach((marker) => {
      const cardContent = `<div class="map-listing-item">
                  <div class="inner-box">
                    <div class="image-box">
                      <figure class="image">
                        <img src="${marker.image}" style="height:120px;width:100%;object-fit:cover;border-radius:4px;" />
                      </figure>
                    </div>
                    <div class="content">
                      <p class="text-color-3 font">${marker.name}</p>
                      <h5>
                        <a href="javascript:void(0)">${marker.address}</a>
                      </h5>
                      <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${marker.lat},${marker.lng}', '_blank')" class="sc-button border-0 btn-svg p-2 mt-3 d-flex align-items-center w-50 justify-content-center">
                        <span>Direction</span>
                      </button>
                    </div>
                  </div>
                </div>`;

      const popup = new maptilersdk.Popup({
        offset: 25,
        closeButton: true,
        closeOnClick: false,
      }).setHTML(cardContent);

      new maptilersdk.Marker({ color: "#FF0000" })
        .setLngLat([marker.lng, marker.lat])
        .setPopup(popup)
        .addTo(map.current);
    });

    // Clean up pipeline when component unmounts
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [MapLoading]);

  return (
    <div className="container">
      <div className="col-lg-12">
        <div
          className="heading-section wow fadeInUpSmall"
          data-wow-delay="0.2s"
          data-wow-duration="1000ms"
        >
          <h2 className="text-center text-md-start">Nearby Locations</h2>
          <p className="mt-18 text-center text-md-start">
            Browse nearby warehouse locations tailored to your area.{" "}
          </p>
        </div>
      </div>
      <div style={{ width: "100%", height: "700px", position: "relative" }}>
        <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
}
