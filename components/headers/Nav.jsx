"use client";
import React from "react";
import Link from "next/link";
import { blogPages, homepages, listingPages, otherPages } from "@/data/menu";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const isActive = (menus) => {
    let active = false;

    menus.forEach((elm) => {
      if (elm.links) {
        elm.links.forEach((elm2) => {
          if (elm2.href.split("/")[1] == pathname.split("/")[1]) {
            active = true;
          }
        });
      } else {
        if (elm.href.split("/")[1] == pathname.split("/")[1]) {
          active = true;
        }
      }
    });
    return active;
  };
  return (
    <>
      <li
        className={"/"  == pathname.split("/")[1] ? "current" : ""}
      >
        <Link href="/">Home</Link>
      </li>
      <li className={"car-sells"  == pathname.split("/")[1] ? "current" : ""}>
        <Link href="/car-sells">Car Sells</Link>
      </li>
      <li className={"car-rentals" == pathname.split("/")[1] ? "current" : ""}>
        <Link href={`/car-rentals`}>Car Rentals</Link>
      </li>

      <li className={"blog"  == pathname.split("/")[1] ? "current" : ""}>
        <Link href="/blog">Blogs</Link>
      </li>
      <li className={"about-us" == pathname.split("/")[1] ? "current" : ""}>
        <Link href={`/about-us`}>About Us</Link>
      </li>
      <li className={"contact" == pathname.split("/")[1] ? "current" : ""}>
        <Link href={`/contact`}>Contact</Link>
      </li>
    </>
  );
}
