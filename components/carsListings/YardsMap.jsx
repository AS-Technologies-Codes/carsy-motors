"use client";
import { useEffect, useRef, useState } from "react";

import { cars } from "@/data/cars";
import { getMapListingApi } from "@/utils/APIs";
import { useResponsive } from "@/utils/useResponsive";

const defaultCenter = [-27.544, 153.0092];
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
      const sourceData = Array.isArray(getMapData) ? getMapData : fallbackMarkers;
      const filterMapData = sourceData.map((item) => ({ ...cars[0], ...item }));
      setMapListing(filterMapData.length ? filterMapData : fallbackMarkers);
    } catch (error) {
      console.error("Failed to fetch map listing data", error);
      setMapListing(fallbackMarkers);
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
  const markerLayerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(center, zoom);
      setTimeout(() => mapInstanceRef.current.invalidateSize(), 150);
      return;
    }

    let isCancelled = false;

    import("leaflet").then((L) => {
      if (isCancelled) return;

      import("leaflet/dist/leaflet.css");

      if (mapRef.current && mapRef.current._leaflet_id) {
        mapRef.current._leaflet_id = null;
      }

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

      markerLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;

      setTimeout(() => map.invalidateSize(), 250);
    });

    return () => {
      isCancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerLayerRef.current = null;
      }
    };
  }, [center, zoom]);

  useEffect(() => {
    if (!mapInstanceRef.current || !markerLayerRef.current) return;

    import("leaflet").then((L) => {
      markerLayerRef.current.clearLayers();
      markersRef.current = [];

      markers.forEach((markerData) => {
        const lat = Number(markerData.lat);
        const lng = Number(markerData.lng);

        if (!isNaN(lat) && !isNaN(lng)) {
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

          const leafletMarker = L.marker([lat, lng], { icon }).on("click", () => onMarkerClick(markerData));
          leafletMarker.addTo(markerLayerRef.current);

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

      setTimeout(() => mapInstanceRef.current.invalidateSize(), 100);
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
