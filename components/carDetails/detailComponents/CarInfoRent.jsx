import { useCarFilter } from "@/context/providers/CarFilterContext";
import { getFiltersData } from "@/context/reducer/carFilterReducer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CarInfo({ carItem, step, setCurrentStep }) {
  const router = useRouter();
  const [CarData, setCarData] = useState(carItem || {});
  const [Filters, setFilters] = useState(null);
  const handleFavourite = async (car) => {
    let favouriteCars =
      JSON.parse(window.localStorage.getItem("favouriteCar")) || [];

    const isFavourite = favouriteCars.some((car) => car.id == car.id);
    if (isFavourite) {
      favouriteCars = favouriteCars.filter((car) => car.id != car.id);
    } else {
      const {
        id,
        featured,
        year,
        type,
        title,
        km,
        fuelType,
        transmission,
        price,
        images,
      } = car;
      favouriteCars.push({
        id,
        featured,
        year,
        type,
        title,
        km,
        fuelType,
        transmission,
        price,
        images,
      });
    }
    window.localStorage.setItem("favouriteCar", JSON.stringify(favouriteCars));
    setCarData({ ...car, favorite: isFavourite ? "none" : "#fd5a21" });
    // allProps.setData(updatedData);
  };
  const { state, dispatch } = useCarFilter();
  console.log("state.rentalFilters", state.rentalFilters);
  const { rentalFilters } = state;

  console.log({ Filters });
  useEffect(() => {
    const filters = getFiltersData();
    setFilters(filters);
    const { car_type, rent_type, per_day_price, id } = carItem;

    dispatch({
      type: "SET_RENT_FILTER_VALUES",
      payload: { ...filters, car_type, rent_type, per_day_price, id },
    });

    if (CarData.car_type === "used") {
      router.push("/listing-detail-v1/" + CarData.id);
      return;
    }
  }, [])


  const handlePrint = (id) => {
    if (typeof window !== "undefined") {
      window.open(
        `https://carsy.astechnologies.pk/api_carsy/car_view.php?id=${id}&token=dfaf55df456ds4ds5f4ds33`,
      );
    }
  };



  const handleShare = async ({ car }) => {
    // 1. Ensure navigator exists (client-side check)
    if (typeof window === 'undefined') return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: car.title,
          text: car.description,
          url: window.location.href, // Captures current route dynamic URL
        });
      } catch (error) {
        if ((error).name !== 'AbortError') {
          console.error('Error sharing:', error);
          try {
            await navigator.clipboard.writeText(window.location.href);
            toast('Link copied to clipboard!');
          } catch (err) {
            console.error('Failed to copy:', err);
          }

        }
      }
    } else {
      // 2. Fallback: Copy to clipboard if Web Share API is unsupported
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const handleWhatsApp = () => {
    if (typeof window !== "undefined") {
      const phoneNumber = "+923473456750"; // Replace with your actual phone number
      const message = `Hi! I'm interested in this car:\n\nModel: ${carItem?.model || "N/A"}\nPrice: $${carItem?.price || "N/A"}\nKM: ${carItem?.km || "N/A"}\nFuel: ${carItem?.fuelType || "N/A"}\n\nPlease provide more details.`;
      const encodedMessage = encodeURIComponent(message);
      window.open(
        `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
        "_blank",
      );
    }
  };


  const getDifference = () => {
    // 3. Create valid Date objects (Format: YYYY-MM-DDTHH:mm)
    const start = new Date(`${Filters?.pickUpDate}T${Filters?.pickUpTime}`);
    const end = new Date(`${Filters?.ReturnDate}T${Filters?.ReturnTime}`);

    // 4. Calculate the difference in milliseconds
    const differenceInMs = end - start;

    // 5. Convert milliseconds to days
    return differenceInMs / (1000 * 60 * 60 * 24);
  }

  return (
    <>
      <div className="icon-box flex flex-wrap">
        <div className="icon-box flex flex-wrap">
          {CarData?.km ?
            <div className="icons flex-three">
              <i className="icon-autodeal-km1" />
              <span>{CarData.km?.toLocaleString()} kms</span>
            </div>
            :
            null
          }
          {CarData?.fuelType ?
            <div className="icons flex-three">
              <i className="icon-autodeal-diesel me-1" />
              <span>{CarData.fuelType}</span>
            </div>
            :
            null
          }
          {CarData.transmission ?
            <div className="icons flex-three">
              <i className="icon-autodeal-automatic" />
              <span>{CarData.transmission}</span>
            </div>
            :
            null
          }

          {CarData?.seats ? (
            <div className="icons flex-three">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={17}
                height={17}
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M17.5 18.1252C17.5 18.2909 17.4341 18.4499 17.3169 18.5671C17.1997 18.6843 17.0407 18.7502 16.875 18.7502H8.74998C8.58422 18.7502 8.42525 18.6843 8.30804 18.5671C8.19083 18.4499 8.12498 18.2909 8.12498 18.1252C8.12498 17.9594 8.19083 17.8004 8.30804 17.6832C8.42525 17.566 8.58422 17.5002 8.74998 17.5002H16.875C17.0407 17.5002 17.1997 17.566 17.3169 17.6832C17.4341 17.8004 17.5 17.9594 17.5 18.1252ZM17.5 12.5002V15.0002C17.5 15.3317 17.3683 15.6496 17.1339 15.884C16.8994 16.1185 16.5815 16.2502 16.25 16.2502H8.91482C8.68238 16.2509 8.45439 16.1865 8.25666 16.0643C8.05893 15.9421 7.89938 15.767 7.79607 15.5588L3.25623 6.49626C3.16991 6.32242 3.125 6.13097 3.125 5.93688C3.125 5.7428 3.16991 5.55134 3.25623 5.37751L4.98435 1.94001C5.13103 1.64729 5.38671 1.4238 5.69642 1.31759C6.00613 1.21139 6.34515 1.23093 6.6406 1.37204L9.27263 2.48298L9.30935 2.50016C9.60567 2.6485 9.83097 2.90843 9.93571 3.22281C10.0405 3.5372 10.0161 3.88031 9.86795 4.17673C9.86555 4.18268 9.86268 4.18843 9.85935 4.19391L8.74998 6.25016L11.2328 11.2502H16.25C16.5815 11.2502 16.8994 11.3819 17.1339 11.6163C17.3683 11.8507 17.5 12.1686 17.5 12.5002ZM16.25 12.5002H11.232C10.9997 12.5009 10.7718 12.4365 10.5741 12.3143C10.3765 12.1921 10.2171 12.017 10.114 11.8088L7.63045 6.80876C7.54434 6.63528 7.49953 6.44423 7.49953 6.25055C7.49953 6.05688 7.54434 5.86583 7.63045 5.69235L7.63982 5.67516L8.74998 3.61891L6.13826 2.51657C6.12574 2.51176 6.11348 2.50628 6.10154 2.50016L4.37498 5.93766L8.91404 15.0002H16.25V12.5002Z"
                  fill="#696665"
                />
              </svg>
              <span className="ms-1">{CarData.seats} Seats</span>
            </div>
          ) : null}
          {CarData?.door ? (
            <div className="icons flex-three">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={14}
                height={14}
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M18.125 16.875H16.25V3.125C16.25 2.79348 16.1183 2.47554 15.8839 2.24112C15.6495 2.0067 15.3315 1.875 15 1.875H5C4.66848 1.875 4.35054 2.0067 4.11612 2.24112C3.8817 2.47554 3.75 2.79348 3.75 3.125V16.875H1.875C1.70924 16.875 1.55027 16.9408 1.43306 17.0581C1.31585 17.1753 1.25 17.3342 1.25 17.5C1.25 17.6658 1.31585 17.8247 1.43306 17.9419C1.55027 18.0592 1.70924 18.125 1.875 18.125H18.125C18.2908 18.125 18.4497 18.0592 18.5669 17.9419C18.6842 17.8247 18.75 17.6658 18.75 17.5C18.75 17.3342 18.6842 17.1753 18.5669 17.0581C18.4497 16.9408 18.2908 16.875 18.125 16.875ZM5 3.125H15V16.875H5V3.125ZM13.125 10.3125C13.125 10.4979 13.07 10.6792 12.967 10.8333C12.864 10.9875 12.7176 11.1077 12.5463 11.1786C12.375 11.2496 12.1865 11.2682 12.0046 11.232C11.8227 11.1958 11.6557 11.1065 11.5246 10.9754C11.3935 10.8443 11.3042 10.6773 11.268 10.4954C11.2318 10.3135 11.2504 10.125 11.3214 9.95373C11.3923 9.78243 11.5125 9.63601 11.6667 9.533C11.8208 9.42998 12.0021 9.375 12.1875 9.375C12.4361 9.375 12.6746 9.47377 12.8504 9.64959C13.0262 9.8254 13.125 10.0639 13.125 10.3125Z"
                  fill="#696665"
                />
              </svg>
              <span className="ms-1">{CarData.door} Doors</span>
            </div>
          ) : null}
          {CarData?.aircondition ? (
            <div className="icons flex-three">

              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#696665" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wind-icon lucide-wind"><path d="M12.8 19.6A2 2 0 1 0 14 16H2" /><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" /><path d="M9.8 4.4A2 2 0 1 1 11 8H2" /></svg>
              <span className="ms-1">A/C</span>
            </div>
          ) : null}
          {!CarData?.age ? (
            <div className="icons flex-three">

              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#696665" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-plus-icon lucide-calendar-plus"><path d="M16 19h6" /><path d="M16 2v4" /><path d="M19 16v6" /><path d="M21 12.598V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5" /><path d="M3 10h18" /><path d="M8 2v4" /></svg>
              <span className="ms-1">{CarData?.age}+ Years</span>
            </div>
          ) : null}
        </div>
      </div>
      <ul className="action-icon flex flex-wrap my-2">
        {CarData?.favorite === "none" ?
          <li>
            <a href="javascript:void(0)" className="icon"
              onClick={() => handleFavourite(CarData)}
            >
              <svg
                width={16}
                height={14}
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.75 4.1875C14.75 2.32375 13.1758 0.8125 11.234 0.8125C9.78275 0.8125 8.53625 1.657 8 2.86225C7.46375 1.657 6.21725 0.8125 4.76525 0.8125C2.825 0.8125 1.25 2.32375 1.25 4.1875C1.25 9.6025 8 13.1875 8 13.1875C8 13.1875 14.75 9.6025 14.75 4.1875Z"
                  stroke="CurrentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </li>
          :
          <li>
            <Link
              onClick={() => handleFavourite(CarData)}
              href="javascript:void(0)"
              className="icon"
              style={{ backgroundColor: "f59e0b" }}
            >

              <svg
                width={16}
                height={14}
                viewBox="0 0 16 14"
                fill={"#f59e0b"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.75 4.1875C14.75 2.32375 13.1758 0.8125 11.234 0.8125C9.78275 0.8125 8.53625 1.657 8 2.86225C7.46375 1.657 6.21725 0.8125 4.76525 0.8125C2.825 0.8125 1.25 2.32375 1.25 4.1875C1.25 9.6025 8 13.1875 8 13.1875C8 13.1875 14.75 9.6025 14.75 4.1875Z"
                  stroke="CurrentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
        }
        {/* <li>
          <a href="javascript:void(0)" className="icon">
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.625 14.75L1.25 11.375M1.25 11.375L4.625 8M1.25 11.375H11.375M11.375 1.25L14.75 4.625M14.75 4.625L11.375 8M14.75 4.625H4.625"
                stroke="CurrentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </li> */}
        <li>
          <a href="javascript:void(0)" onClick={handleShare} className="icon">
            <svg
              width={16}
              height={18}
              viewBox="0 0 16 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.41276 8.18022C4.23116 7.85345 3.94619 7.59624 3.60259 7.44895C3.25898 7.30167 2.8762 7.27265 2.51432 7.36645C2.15244 7.46025 1.83196 7.67157 1.60317 7.96722C1.37438 8.26287 1.25024 8.62613 1.25024 8.99997C1.25024 9.37381 1.37438 9.73706 1.60317 10.0327C1.83196 10.3284 2.15244 10.5397 2.51432 10.6335C2.8762 10.7273 3.25898 10.6983 3.60259 10.551C3.94619 10.4037 4.23116 10.1465 4.41276 9.81972M4.41276 8.18022C4.54776 8.42322 4.62501 8.70222 4.62501 8.99997C4.62501 9.29772 4.54776 9.57747 4.41276 9.81972M4.41276 8.18022L11.5873 4.19472M4.41276 9.81972L11.5873 13.8052M11.5873 4.19472C11.6924 4.39282 11.8361 4.56797 12.0097 4.70991C12.1834 4.85186 12.3836 4.95776 12.5987 5.02143C12.8138 5.08509 13.0394 5.10523 13.2624 5.08069C13.4853 5.05614 13.7011 4.98739 13.8972 4.87846C14.0933 4.76953 14.2657 4.62261 14.4043 4.44628C14.5429 4.26995 14.645 4.06775 14.7046 3.85151C14.7641 3.63526 14.78 3.40931 14.7512 3.18686C14.7225 2.96442 14.6496 2.74994 14.537 2.55597C14.3151 2.17372 13.952 1.89382 13.5259 1.77643C13.0997 1.65904 12.6445 1.71352 12.2582 1.92818C11.8718 2.14284 11.585 2.50053 11.4596 2.92436C11.3341 3.34819 11.38 3.80433 11.5873 4.19472ZM11.5873 13.8052C11.4796 13.999 11.4112 14.2121 11.3859 14.4323C11.3606 14.6525 11.3789 14.8756 11.4398 15.0887C11.5007 15.3019 11.603 15.5009 11.7408 15.6746C11.8787 15.8482 12.0494 15.9929 12.2431 16.1006C12.4369 16.2082 12.65 16.2767 12.8702 16.302C13.0905 16.3273 13.3135 16.3089 13.5267 16.248C13.7398 16.1871 13.9389 16.0848 14.1125 15.947C14.2861 15.8092 14.4309 15.6385 14.5385 15.4447C14.7559 15.0534 14.809 14.5917 14.686 14.1612C14.563 13.7307 14.274 13.3668 13.8826 13.1493C13.4913 12.9319 13.0296 12.8789 12.5991 13.0019C12.1686 13.1249 11.8047 13.4139 11.5873 13.8052Z"
                stroke="CurrentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            onClick={() => handlePrint(CarData?.id)}
            className="icon"
          >
            <svg
              width={16}
              height={18}
              viewBox="0 0 16 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.04 10.3718C3.86 10.3943 3.68 10.4183 3.5 10.4438M4.04 10.3718C6.66969 10.0418 9.33031 10.0418 11.96 10.3718M4.04 10.3718L3.755 13.5M11.96 10.3718C12.14 10.3943 12.32 10.4183 12.5 10.4438M11.96 10.3718L12.245 13.5L12.4167 15.3923C12.4274 15.509 12.4136 15.6267 12.3762 15.7378C12.3388 15.8489 12.2787 15.951 12.1996 16.0376C12.1206 16.1242 12.0244 16.1933 11.9172 16.2407C11.8099 16.288 11.694 16.3125 11.5767 16.3125H4.42325C3.92675 16.3125 3.53825 15.8865 3.58325 15.3923L3.755 13.5M3.755 13.5H2.9375C2.48995 13.5 2.06072 13.3222 1.74426 13.0057C1.42779 12.6893 1.25 12.2601 1.25 11.8125V7.092C1.25 6.28125 1.826 5.58075 2.62775 5.46075C3.10471 5.3894 3.58306 5.32764 4.0625 5.2755M12.2435 13.5H13.0618C13.2834 13.5001 13.5029 13.4565 13.7078 13.3718C13.9126 13.287 14.0987 13.1627 14.2555 13.006C14.4123 12.8493 14.5366 12.6632 14.6215 12.4585C14.7063 12.2537 14.75 12.0342 14.75 11.8125V7.092C14.75 6.28125 14.174 5.58075 13.3723 5.46075C12.8953 5.38941 12.4169 5.32764 11.9375 5.2755M11.9375 5.2755C9.32022 4.99073 6.67978 4.99073 4.0625 5.2755M11.9375 5.2755V2.53125C11.9375 2.0655 11.5595 1.6875 11.0938 1.6875H4.90625C4.4405 1.6875 4.0625 2.0655 4.0625 2.53125V5.2755M12.5 7.875H12.506V7.881H12.5V7.875ZM10.25 7.875H10.256V7.881H10.25V7.875Z"
                stroke="CurrentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </li>
      </ul>



      <div className="money text-color-3 font">
        ${CarData.rent_type == "short" ?
          <>{CarData?.per_day_price || 0}
            <span className="fw-3"> / day</span></>
          :
          <>{(CarData?.per_day_price * 7) || 0}
            <span className="fw-3">/ week</span></>}
      </div>

      <div className="fs-6 fw-5 mb-2 lh-25 text-center text-md-start text-color-2 me-2">
        Total:
        ${Filters?.pickUpDate && Filters?.ReturnDate ?
          getDifference() * CarData?.per_day_price || 0 :
          CarData.rent_type == "short" ? CarData?.per_day_price : CarData?.per_day_price * 7}
      </div>


      <fieldset className="email-wrap style-text">
        <label className="font-1 fs-14 fw-5 mb-1">Pick Up</label>
        <input
          type="text"
          className="tb-my-input fs-5 fw-semibold"
          name="pickUpTime"
          disabled
          value={`${Filters?.pickUpDate} ${Filters?.pickUpTime}`}
        />
      </fieldset>
      <fieldset className="email-wrap style-text">
        <label className="font-1 fs-14 fw-5 mb-1">Return</label>
        <input
          type="text"
          className="tb-my-input fs-5 fw-semibold"
          name="ReturnDate"
          disabled
          value={`${Filters?.ReturnDate} ${Filters?.ReturnTime}`}
        />
      </fieldset>

      <div className="my-4">
        {step != 2 ?
          <>
            <h6 className="mb-1 fw-bold">Payemet Method: <span className="text-color-3">{rentalFilters.payment_type}</span></h6>
            <div className="listing-line my-2" />
            <h6 className="mb-1 fw-bold">Plan Price: <span className="text-color-3">({rentalFilters?.plan}) {rentalFilters?.plan_amount}</span></h6>
            <div className="listing-line my-2" />
            <h6 className="fw-bold">Available Extras: <span className="text-color-3">{rentalFilters?.extra}</span></h6>
            <div className="listing-line my-2" />
          </>
          :
          null
        }
      </div>


      <div className="profile-contact mt-3">
        <div className="btn-contact flex-two">
          <a href="#" onClick={step == 2 ? handleWhatsApp : () => setCurrentStep(step + 1)} className="btn-pf bg-green">
            <span className="fs-16 fw-5 lh-20 font text-color-1">
              {step == 2 ?
                "Chat with Dealer"
                :
                "Go to review & checkout"
              }
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
