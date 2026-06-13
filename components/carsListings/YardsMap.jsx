"use client";
import {
  GoogleMap,
  OverlayView,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { cars } from "@/data/cars";
import { getMapListingApi } from "@/utils/APIs";

const option = {
  zoomControl: true,
  disableDefaultUI: true,
  scrollwheel: false,
  styles: [
    {
      featureType: "all",
      elementType: "geometry.fill",
      stylers: [
        {
          weight: "2.00",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#9c9c9c",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [
        {
          color: "#f2f2f2",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [
        {
          saturation: -100,
        },
        {
          lightness: 45,
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#7b7b7b",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "all",
      stylers: [
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          color: "#46bcec",
        },
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#c8d7d4",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#070707",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
  ],
};

export default function ListingMap({ height }) {
  const [getLocation, setLocation] = useState(null);
  const [MapListing, setMapListing] = useState([]);
  const [MapLoading, setMapLoading] = useState(true);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_PRIVATE_MAP_API_KEY,
  });
  const center = useMemo(
    () => ({ lat: -33.794180834121846, lng: 150.8865883451136 }),
    [],
  );

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

  console.log(MapListing);

  useEffect(() => {
    fetchMap();
  }, []);

  const containerStyle = {
    width: "100%",
    height: height || "100%",
  };
  const CustomMarker = ({ elm }) => {
    return (
      <div className="marker-container" onClick={() => setLocation(elm)}>
        <div className="marker-card">
          <div className="front face">
            <div />
          </div>
          <div className="back face">
            <div />
          </div>
          <div className="marker-arrow" />
        </div>
      </div>
    );
  };

  // close handler
  const closeCardHandler = () => {
    setLocation(null);
  };
  const getDirection = (lat, lng) => {
    if (window !== undefined) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      );
    }
  };
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
      {!isLoaded || MapLoading ? (
        <div className="center my-5">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="position-relative d-flex justify-content-center mb-5  rounded-4">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={4}
            options={option}
          >
            {MapListing.map((marker, i) => (
              <OverlayView
                key={i}
                position={{
                  lat: Number(marker.lat),
                  lng: Number(marker.lng),
                }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <CustomMarker elm={marker} />
              </OverlayView>
            ))}
            {getLocation?.lat != null && getLocation?.lng != null && (
              <InfoWindow
                position={{
                  lat: Number(getLocation.lat),
                  lng: Number(getLocation.lng),
                }}
                onCloseClick={closeCardHandler}
              >
                <div className="map-listing-item">
                  <div className="inner-box">
                    <div className="image-box">
                      <figure className="image">
                        <img src={getLocation.image} alt="" />
                      </figure>
                    </div>
                    <div className="content">
                      <p className="text-color-3 font">{getLocation.name}</p>
                      <h5>
                        {/* <Link href={`/property-detail-v1/${getLocation.id}`}> */}
                        <Link href={`javascript:void(0)`}>
                          {getLocation.address}
                        </Link>
                      </h5>
                      {/* <div className="flex flex-wrap gap-8">
                        <p className="location">
                          <i className="icon-autodeal-km1" />
                          {getLocation.km.toLocaleString()} kms
                        </p>
                        <p className="location">
                          <i className="icon-autodeal-diesel" />
                          {getLocation.fuelType}
                        </p>
                        <p className="location">
                          <i className="icon-autodeal-automatic" />
                          {getLocation.transmission}
                        </p>
                      </div>
                      <h3>
                        <a>${getLocation.price.toLocaleString()}</a>
                      </h3> */}
                      <button
                        onClick={() =>
                          getDirection(getLocation.lat, getLocation.lng)
                        }
                        className={`sc-button border-0 btn-svg p-2 mt-2 d-flex align-items-center w-50 justify-content-center`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-map-pin-icon lucide-map-pin me-1"
                        >
                          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>Direction</span>
                      </button>
                    </div>
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>

          {/* <div
            className="tf-icon-box style-1 mx-3 my-10 position-absolute"
            style={{ top: "70%" }}
          >
            <div className="content d-flex align-items-center flex-column">
              <h3>
                <a href="javascript:void(0)">The right ride, right nearby</a>
              </h3>
              <p>
                With neighbourhood locations nationwide, a Hertz car rental
                location is right around the corner.{" "}
              </p>
              <div className="meta style">
                <a href="javascript:void(0)" className="btn-button">
                  <span>Find Nearby Locations</span>
                </a>
              </div>
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
}
