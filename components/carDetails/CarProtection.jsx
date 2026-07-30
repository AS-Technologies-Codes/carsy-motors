"use client";
import { useCarFilter } from '@/context/providers/CarFilterContext';
// import { setFiltersData } from '@/context/reducer/carFilterReducer';
import { pricingPlans } from '@/data/pricing'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const CarProtection = () => {
    const [Plan, setPlan] = useState(0);
    const [extraValues, setextraValues] = useState({});
    const { state, dispatch } = useCarFilter();
    const { rentalFilters } = state;

    const setFilters = (values) => {
        const payload = { ...rentalFilters, extra: values };
        console.log('state.rentalFilters', values);
        dispatch({
            type: "SET_RENT_FILTER_VALUES",
            payload,
        });
    };

    const setPlans = (values) => {
        const payload = { ...rentalFilters, ...values };
        dispatch({
            type: "SET_RENT_FILTER_VALUES",
            payload,
        });
    };

    // const extraValues = {};
    // useEffect(() => {
    //     setFilters({ extra: extraValues });
    // }, [extraValues])


    console.log({ extraValues });

    const extras = [
        {
            id: "1",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className='me-1' width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trees-icon lucide-trees"><path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" /><path d="M7 16v6" /><path d="M13 19v3" /><path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5" /></svg>,
            title: "Offset Carbon Emissions",
            desc: "Your contribution will find Greenfleet Carbon Offset reforestation projects around the world",
            price: "4.00",
            type: "single",
        },
        {
            id: "2",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className='me-1' width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trees-icon lucide-trees"><path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" /><path d="M7 16v6" /><path d="M13 19v3" /><path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5" /></svg>,
            title: "Offset Carbon Emissions",
            desc: "Your contribution will find Greenfleet Carbon Offset reforestation projects around the world",
            price: "4.00",
            type: "multiple",
        },
        {
            id: "3",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className='me-1' width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trees-icon lucide-trees"><path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" /><path d="M7 16v6" /><path d="M13 19v3" /><path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5" /></svg>,
            title: "Offset Carbon Emissions",
            desc: "Your contribution will find Greenfleet Carbon Offset reforestation projects around the world",
            price: "4.00",
            type: "multiple",
        },
        {
            id: "4",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className='me-1' width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trees-icon lucide-trees"><path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" /><path d="M7 16v6" /><path d="M13 19v3" /><path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5" /></svg>,
            title: "Offset Carbon Emissions",
            desc: "Your contribution will find Greenfleet Carbon Offset reforestation projects around the world",
            price: "4.00",
            type: "multiple",
        },
        {
            id: "5",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className='me-1' width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trees-icon lucide-trees"><path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" /><path d="M7 16v6" /><path d="M13 19v3" /><path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5" /></svg>,
            title: "Offset Carbon Emissions",
            desc: "Your contribution will find Greenfleet Carbon Offset reforestation projects around the world",
            price: "4.00",
            type: "multiple",
        },
        {
            id: "6",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className='me-1' width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trees-icon lucide-trees"><path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" /><path d="M7 16v6" /><path d="M13 19v3" /><path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5" /></svg>,
            title: "Offset Carbon Emissions",
            desc: "Your contribution will find Greenfleet Carbon Offset reforestation projects around the world",
            price: "4.00",
            type: "multiple",
        },
    ]
    return (
        <div className='p-3'>
            <h2 className='mb-4'>
                Choose your protection & extras
            </h2>

            <h3 className='mb-4'>
                Protection Plans
            </h3>

            <div className="content-tab">
                <div className="content-inner tab-content">
                    <div className="row">
                        {pricingPlans.map((plan, index) => (
                            <div className="col-lg-4 col-md-6 " key={index}>
                                <div className="widget-pricing">
                                    {plan.badge && (
                                        <div className="badge-table">
                                            <span>{plan.badge}</span>
                                        </div>
                                    )}
                                    <div className="flex flex-column justify-content-between mb-2" style={{ minHeight: 180 }}>
                                        <div className="pricing-heading">
                                            <h2 className="sub-title d-flex align-items-center">{plan.title}
                                                <div className='fs-6'>{plan.stars}</div>
                                            </h2>
                                            <p className="text-sub lh-16 fs-12">
                                                {plan.description}
                                            </p>
                                            <h4 className="text-sub lh-16 fw-bold fs-16 text-color-3">
                                                <s>{plan.crossPrice}</s>
                                            </h4>
                                        </div>
                                        {/* <div className="title-price flex-three">
                                        <h2>$</h2>
                                        <div className="price fw-6 font text-color-2">
                                            {isYearly
                                                ? Math.round((plan.price / 100) * 90 * 12)
                                                : plan.price}
                                        </div>
                                    </div> */}

                                        <div>
                                            <h3 className="sub-title mb-1">{plan?.title2}</h3>
                                            <h4 className="text-sub lh-16 fs-16">
                                                {plan.price ? `Total ${plan.price}` : null}
                                            </h4>
                                        </div>
                                    </div>
                                    <ul className="check">
                                        {plan.features.map((feature, i) => (
                                            <li
                                                key={i}
                                                className={`flex-three ${feature.disabled
                                                    ? "de-check-icon"
                                                    : "check-icon"
                                                    }`}
                                            >
                                                {feature.feature || feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="button-pricing"
                                        onClick={() => { setPlans(index); setPlans({ plan: plan.title, plan_amount: plan.price }) }}>
                                        <a className={`sc-button ${Plan == index ? "btn-2" : "btn-1"} w-100`} href="javascript:void(0)">
                                            <span>{Plan == index ? "Selected" : "Select Plan"}</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <h3 className='my-5'>
                Available Extras
            </h3>

            <div className="row col-md-12">
                {extras.map((item, index) =>
                    <Extra
                        item={item}
                        extraValues={rentalFilters?.extra || []}
                        setextraValues={setFilters}
                        index={index}
                    />)}
            </div>
        </div>
    )
}

export default CarProtection


const Extra = ({ item, extraValues, setextraValues, index }) => {
    let [Increment, setIncrement] = useState(0);

    return (
        <div className="col-md-6 p-2">
            <div className="widget-listing h-100">
                <div className="profile-contact d-flex flex-column gap-2">
                    {/* <div>
                                <label className="border px-2 border-2 border-primary text-primary rounded-4 fw-bold">
                                    NO DISCOUNT
                                </label>
                            </div> */}
                    <h3 className='flex align-items-end text-color-3'>
                        {item?.icon}
                        {item?.title + " " + item?.id}</h3>
                    <p>
                        {item?.desc}
                    </p>

                    <div className="fs-26 fw-5 text-color-2 font mt-3">
                        {/* ${car.price?.toLocaleString()} */}
                        ${item.price}
                        <span className="fw-3">{" / "} Total</span>
                    </div>
                    <div className="fs-13 fw-5 mb-2 lh-25 text-color-2 me-2">
                        Total: ${Increment * item.price}.00
                    </div>

                    {item?.type === "single" ?
                        <div className="btn-contact">
                            <Link
                                href={"javascript:void(0)"}
                                onClick={() => {
                                    extraValues[index] = 1;
                                    setextraValues([...extraValues]);
                                    setIncrement(1)
                                }}
                                className="btn-pf bg-green mt-3"
                            >
                                <span className="fs-16 fw-5 lh-20 font text-color-1  mt-1">
                                    Select
                                </span>
                            </Link>
                        </div>
                        :
                        <div className="btn-contact flex align-items-center">
                            <Link
                                href={"javascript:void(0)"}
                                onClick={() => {
                                    const exp = Increment == 0 ? 0 : Increment - 1;
                                    extraValues[index] = exp;
                                    setextraValues([...extraValues]);
                                    setIncrement(exp)
                                }}
                                className="btn-pf bg-green mt-3"
                            >
                                <span className="fs-22 fw-5 lh-20 font text-color-1  mt-1">
                                    -
                                </span>
                            </Link>
                            <h3 className='relative center' style={{ top: 10, minWidth: 20 }}>{Increment}</h3>
                            <Link
                                href={"javascript:void(0)"}
                                onClick={() => {
                                    extraValues[index] = Increment + 1;
                                    setextraValues([...extraValues]);
                                    setIncrement(Increment + 1)
                                }}
                                className="btn-pf bg-orange mt-3"
                            >
                                <span className="fs-22 fw-5 lh-20 font text-color-1  mt-1">
                                    +
                                </span>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </div >)
}