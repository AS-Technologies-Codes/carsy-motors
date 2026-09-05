"use client";

import React, { useState } from "react";

export default function Pagination({
  itemLength = 200,
  itemPerPage = 10,
  setPage = (num) => { },
  currentPage,
}) {
  const totalPages = Math.ceil(itemLength / itemPerPage); // Adjust as needed

  const handlePageClick = (page) => {
    if (page != 0 && page <= totalPages) {
      setPage(page);
    }
    // Add navigation logic here, e.g., using a router or window.location
  };

  return (
    <>
      {totalPages > 1 ? (
        <React.Fragment>
          {" "}
          <li onClick={() => handlePageClick(currentPage - 1)}>
            <a href="#section3" className={`page-numbers style`}>
              <i className="far fa-angle-left" />
            </a>
          </li>
          {[...Array(totalPages)].slice(0, 4).map((_, index) => {
            const page = index + 1;
            return (
              <li key={page}>
                <a
                href="#section3"
                  className={`page-numbers ${currentPage === page ? "current" : ""
                    }`}
                  onClick={() => handlePageClick(page)}
                >
                  {page}
                </a>
              </li>
            );
          })}
          {currentPage >= 5 && (
            <li>
              <a href="#section3" className={`page-numbers current`}>
                {currentPage}
              </a>
            </li>
          )}
          {totalPages >= 5 && currentPage != totalPages && (
            <li>
              <a href="#section3" className={`page-numbers dot`}>
                ...
              </a>
            </li>
          )}
          <li onClick={() => handlePageClick(currentPage + 1)}>
            <a href="#section3" className={`page-numbers style`}>
              <i className="far fa-angle-right" />
            </a>
          </li>{" "}
        </React.Fragment>
      ) : (
        ""
      )}
    </>
  );
}
