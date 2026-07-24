"use client";
import { pricingPlans } from '@/data/pricing'
import React, { useState } from 'react'

const CarProtection = () => {
      const [isYearly, setIsYearly] = useState(false);
    
    return (
        <div className='p-3'>
            <h2 className='mb-4'>
                Choose your protection & extras
            </h2>

            <div className="content-tab">
                <div className="content-inner tab-content">
                    <div className="row">
                        {pricingPlans.map((plan, index) => (
                            <div className="col-lg-4 col-md-6" key={index}>
                                <div className="widget-pricing">
                                    {plan.badge && (
                                        <div className="badge-table">
                                            <span>{plan.badge}</span>
                                        </div>
                                    )}
                                    <div className="pricing-heading">
                                        <h2 className="sub-title">{plan.title}</h2>
                                        <p className="text-sub lh-16 fs-12">
                                            {plan.description}
                                        </p>
                                    </div>
                                    <div className="title-price flex-three">
                                        <h2>$</h2>
                                        <div className="price fw-6 font text-color-2">
                                            {isYearly
                                                ? Math.round((plan.price / 100) * 90 * 12)
                                                : plan.price}
                                        </div>
                                    </div>
                                        <h3 className="sub-title">{plan?.title2}</h3>

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
                                    <div className="button-pricing">
                                        <a className="sc-button btn-1 w-100" href="javascript:void(0)">
                                            <span>Get started</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarProtection