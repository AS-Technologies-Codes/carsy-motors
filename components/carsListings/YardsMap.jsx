"use client";
import { useEffect, useRef, useState } from "react";

import { cars } from "@/data/cars";
import { getMapListingApi } from "@/utils/APIs";
import { useResponsive } from "@/utils/useResponsive";

const defaultCenter = [-27.544, 153.0092];

export default function ListingMap({ height }) {
  const mapRef = useRef(null);
  const [getLocation, setLocation] = useState(null);
  const [MapListing, setMapListing] = useState([]);
  const [MapLoading, setMapLoading] = useState(true);
  const [mapReady, setMapReady] = useState(false);
  const { isMobile, isTablet, isDesktop, current } = useResponsive();

  const fetchMap = async () => {
    try {
      setMapLoading(true);
      const getMapData = await getMapListingApi();
      const filterMapData = getMapData.map((item) => ({ ...cars[0], ...item }));
      setMapListing(filterMapData);
    } catch (error) {
      toast.error(error);
    } finally {
      setMapLoading(false);
    }
  };

  useEffect(() => {
    // Initialize Leaflet map
    if (typeof window !== "undefined" && !mapReady) {
      setMapReady(true);
    }
    fetchMap();
  }, []);

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
      {MapLoading ? (
        <div className="center my-5">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="position-relative d-flex justify-content-center mb-5 rounded-4">
          {isMobile || isTablet ? (
            <LeafletMap
              mapRef={mapRef}
              center={defaultCenter}
              zoom={14}
              markers={MapListing}
              selectedLocation={getLocation}
              onMarkerClick={setLocation}
              height={height || "100%"}
            />
          ) : (
            <LeafletMap
              mapRef={mapRef}
              center={defaultCenter}
              zoom={16}
              markers={MapListing}
              selectedLocation={getLocation}
              onMarkerClick={setLocation}
              height={height || "100%"}
            />
          )}
        </div>
      )}
    </div>
  );
}

// Leaflet Map Component
function LeafletMap({
  mapRef,
  center,
  zoom,
  markers,
  selectedLocation,
  onMarkerClick,
  height,
}) {
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return;

    // Initialize map only once
    if (mapInstanceRef.current) return;

    // Dynamically import Leaflet
    import("leaflet").then((L) => {
      import("leaflet/dist/leaflet.css");

      // Check if map already exists on container and remove it
      if (mapRef.current._leaflet_id) {
        mapRef.current._leaflet_id = null;
      }

      // Fix marker icons
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current, {
        touchZoom: true,
        doubleClickZoom: true,
        scrollWheelZoom: false,
        dragging: true,
      }).setView(center, zoom);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    });

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); // Only initialize once

  // Update markers when they change
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      // Clear old markers
      markersRef.current.forEach((marker) => {
        mapInstanceRef.current.removeLayer(marker);
      });
      markersRef.current = [];

      // Add new markers
      markers.forEach((markerData) => {
        const lat = Number(markerData.lat);
        const lng = Number(markerData.lng);

        if (!isNaN(lat) && !isNaN(lng)) {
          // Create an inline SVG marker to avoid external image assets
          const svg = `
            <svg xmlns='http://www.w3.org/2000/svg' width='36' height='46' viewBox='0 0 36 46'>
              <path d='M18 0C11 0 6 5 6 12c0 10 12 34 12 34s12-24 12-34C30 5 25 0 18 0z' fill='#fd5a21'/>
              <circle cx='18' cy='12' r='5' fill='white'/>
            </svg>
          `;
          const encoded = encodeURIComponent(svg).replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
          const imgSrc = `data:image/svg+xml;charset=UTF-8,${encoded}`;

          const icon = L.divIcon({
            html: `<img src="${imgSrc}" style="width:36px;height:46px;display:block;"/>`,
            className: "",
            iconSize: [36, 46],
            iconAnchor: [18, 46],
          });

          const leafletMarker = L.marker([lat, lng], { icon })
            .addTo(mapInstanceRef.current)
            .on("click", () => onMarkerClick(markerData));

          // Add popup
          const popupContent = document.createElement("div");
          popupContent.innerHTML = `<div class="map-listing-item">
                  <div class="inner-box">
                    <div class="image-box">
                      <figure class="image">
                        <img src="${markerData.image}" style="height:120px;width:100%;object-fit:cover;border-radius:4px;" />
                      </figure>
                    </div>
                    <div class="content">
                      <p class="text-color-3 font">${markerData.name}</p>
                      <h5>
                        <a href="javascript:void(0)">${markerData.address}</a>
                      </h5>
                      <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}', '_blank')" class="sc-button border-0 btn-svg p-2 mt-3 d-flex align-items-center w-50 justify-content-center">
                        <span>Direction</span>
                      </button>
                    </div>
                  </div>
                </div>`;
          leafletMarker.bindPopup(popupContent);
          markersRef.current.push(leafletMarker);
        }
      });
    });
  }, [markers, onMarkerClick]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: height || "100%",
        minHeight: "500px",
        borderRadius: "8px",
      }}
    />
  );
}
