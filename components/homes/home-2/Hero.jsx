  "use client";
import DropdownSelect from "@/components/common/DropDownSelect";
import React, { useState } from "react";

export default function Hero() {
  const categories = ["All Car", "New Car", "Used Car"];
  const [activeIndex, setActiveIndex] = useState(0); // Default active is the first item
  return (
    <div className="slider home2">
      <video autoPlay muted loop>
        <source src="/assets/images/section/video.mp4" type="video/mp4" />
      </video>
    
    </div>
  );
}
