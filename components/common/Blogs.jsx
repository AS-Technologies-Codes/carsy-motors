"use client";
// import { blogSlides } from "@/data/blogs";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function Blogs({ parentClass = "section-blog tf-section" }) {
  const [BlogsListing, setBlogsListing] = useState([]);
  const [BlogsLoading, setBlogsLoading] = useState(true);

  const fecthBlogs = async () => {
    setBlogsLoading(true);
    const getBlogsRequest = await fetch(
      "https://carsymotors.com.au/api_carsy/carsy_api/cars_api.php?action=get_whats_new",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer dfsdgs43543534543gdsfdsfdsfa22342222@@222",
        },
      },
    );
    const getBlogsResponse = await getBlogsRequest.json();
    setBlogsListing(getBlogsResponse?.data);
    setBlogsLoading(false);
  };
  useEffect(() => {
    fecthBlogs();
  }, []);

  return (
    <>
      <section className={parentClass}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className=" flex align-center justify-space flex-wrap gap-20">
                <h2
                  className="wow fadeInUpSmall"
                  data-wow-delay="0.2s"
                  data-wow-duration="1000ms"
                >
                  What's New?
                </h2>
                {/* <Link
                href={`/blog-grid`}
                className="tf-btn-arrow wow fadeInUpSmall"
                data-wow-delay="0.2s"
                data-wow-duration="1000ms"
              >
                View all
                <i className="icon-autodeal-btn-right" />
              </Link> */}
              </div>
              <p className="mt-18 heading-section">
                Find all the latest and intresting news about our cars here!
              </p>
              <Swiper
                className="swiper tf-sw-mobile"
                slidesPerView={3}
                breakpoints={{
                  1024: {
                    slidesPerView: 3,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  0: {
                    slidesPerView: 1,
                  },
                }}
                spaceBetween={30}
              >
                {BlogsLoading ? (
                  <div className="center my-5">
                    <span className="loader"></span>
                  </div>
                ) : (
                  BlogsListing.map((slide, index) => (
                    <SwiperSlide className="swiper-slide" key={index}>
                      <div className="blog-article-item style1 hover-img">
                        <div className="images img-style relative flex-none">
                          <Image
                            className="lazyload"
                            data-src={slide.image}
                            alt={slide.link_name}
                            src={slide.image}
                            width={500}
                            height={300}
                          />
                          <div className="date">{slide.created_at.split(" ")[0]}</div>
                        </div>
                        <div className="content">
                          <div className="sub-box flex align-center fs-13 fw-6">
                            <a
                              href="javascript:void(0)"
                              className="admin fw-7 text-color-2"
                            >
                              {slide.title}
                            </a>
                            <a
                              href="javascript:void(0)"
                              className="category text-color-3"
                            >
                              {slide?.category}
                            </a>
                          </div>
                          <h3>
                            <Link href={`/blog-detail/${slide.id}`}>
                              {slide.link_name}
                            </Link>
                          </h3>
                          <p>{slide.short_description}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))
                )}

                <div className="swiper-pagination3" />
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
