"use client";
import { blogPages, homepages, listingPages, otherPages } from "@/data/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export default function MobileNav() {
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

  const handleActive1 = (event) => {
    const dropdown = event.currentTarget.closest(".dropdown2.parent-menu-1");
    const allDropdowns = document.querySelectorAll(".dropdown2.parent-menu-1");
    if (dropdown) {
      const ulElement = dropdown.querySelector("ul");
      if (dropdown.classList.contains("open")) {
        dropdown.classList.remove("open");

        if (ulElement) {
          ulElement.style.height = `0px`;
          ulElement.style.padding = "0px 20px";
        }
      } else {
        dropdown.classList.add("open");

        if (ulElement) {
          ulElement.style.height = `${ulElement.scrollHeight + 30}px`;
          ulElement.style.padding = "15px 20px";
        }
        allDropdowns.forEach((elm) => {
          if (elm !== dropdown) {
            elm.classList.remove("open");
            const ulElement2 = elm.querySelector("ul");
            if (ulElement2) {
              ulElement2.style.height = `0px`;
              ulElement2.style.padding = "0px 20px";
            }
          }
        });
      }
    }
  };
  const handleActive2 = (event) => {
    const dropdown = event.currentTarget.closest(
      ".dropdown2:not(.parent-menu-1)",
    );
    if (dropdown) {
      const ulElement = dropdown.querySelector("ul");
      if (dropdown.classList.contains("open")) {
        dropdown.classList.remove("open");

        if (ulElement) ulElement.style.height = `0px`;
        ulElement.style.padding = "0px 20px";
      } else {
        dropdown.classList.add("open");

        if (ulElement)
          ulElement.style.height = `${ulElement.scrollHeight + 30}px`;
        ulElement.style.padding = "15px 20px";
      }
    }
    const parentElement = dropdown.closest(".dropdown2.parent-menu-1");
    const ulElement2 = parentElement.querySelector("ul");
    ulElement2.style.height = `auto`;
  };
  useEffect(() => {
    document.body.classList.remove("mobile-menu-visible");
  }, [pathname]);

  return (
    <div className="menu-outer">
      <div
        className="navbar-collapse collapse clearfix"
        id="navbarSupportedContent"
      >
        <ul className="navigation clearfix">
          <li className={"/" == pathname.split("/")[1] ? "current" : ""}>
            <Link href="/">Home</Link>
          </li>
          <li
            className={"buy" == pathname.split("/")[1] ? "current" : ""}
          >
            <Link href="/buy">Buy</Link>
          </li>
          <li
            className={`tf-megamenu dropdown2 parent-menu-1 ${
              isActive([
                { text: "Short-term Hire", href: "/car-rentals/short" },
                { text: "Long-term Hire", href: "/car-rentals/long" },
              ])
                ? "current"
                : ""
            } `}
          >
            <Link href="#">Hire</Link>
            <ul>
              {[
                { text: "Short-term Hire", href: "#" },
                { text: "Long-term Hire", href: "#" },
              ].map((page, index) => (
                <li
                  key={index}
                  className={
                    page.href.split("/")[2] == pathname.split("/")[2]
                      ? ""
                      : ""
                  }
                >
                  <Link href={page.href}>{page.text}</Link>
                </li>
              ))}
            </ul>
            <div className="dropdown2-btn" onClick={handleActive1} />
          </li>

          {/* <li className={"blog" == pathname.split("/")[1] ? "current" : ""}>
        <Link href="/blog">Blogs</Link>
      </li> */}
          <li className={"about-us" == pathname.split("/")[1] ? "current" : ""}>
            <Link href={`/about-us`}>About Us</Link>
          </li>
          <li
            className={"contact-us" == pathname.split("/")[1] ? "current" : ""}
          >
            <Link href={`/contact-us`}>Contact Us</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
