"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Product360Viewer({
  images = [],
  width = "100%",
  height = 500,
  dragSensitivity = 8,
}) {
  const [frame, setFrame] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const isDragging = useRef(false);
  const lastX = useRef(0);

  // Preload all images
  useEffect(() => {
    console.log({images});
    
    if (!images.length) return;

    let count = 0;

    images?.forEach((src) => {
      const img = new window.Image();

      img.src = src;

      img.onload = () => {
        count++;

        if (count === images.length) {
          setLoaded(true);
        }
      };

      img.onerror = () => {
        count++;

        if (count === images.length) {
          setLoaded(true);
        }
      };
    });
  }, [images]);

  const rotate = (delta) => {
    if (Math.abs(delta) < dragSensitivity) return;

    setFrame((prev) => {
      if (delta > 0) {
        return (prev + 1) % images.length;
      }

      return (prev - 1 + images.length) % images.length;
    });
  };

  // Mouse
  const onMouseDown = (e) => {
    isDragging.current = true;
    lastX.current = e.clientX;
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;

    const delta = e.clientX - lastX.current;

    rotate(delta);

    if (Math.abs(delta) >= dragSensitivity) {
      lastX.current = e.clientX;
    }
  };

  const stopDragging = () => {
    isDragging.current = false;
  };

  // Touch
  const onTouchStart = (e) => {
    lastX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e) => {
    const delta = e.touches[0].clientX - lastX.current;

    rotate(delta);

    if (Math.abs(delta) >= dragSensitivity) {
      lastX.current = e.touches[0].clientX;
    }
  };

  if (!images.length) {
    return (
      <div
        style={{
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        No Images
      </div>
    );
  }

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        overflow: "hidden",
        cursor: isDragging.current ? "grabbing" : "grab",
        userSelect: "none",
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    >
      {!loaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#fff",
            zIndex: 2,
          }}
        >
          Loading...
        </div>
      )}

      <Image
        src={images[frame]}
        alt={`360 View ${frame + 1}`}
        fill
        priority
        draggable={false}
        sizes="100vw"
        style={{
          objectFit: "contain",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}