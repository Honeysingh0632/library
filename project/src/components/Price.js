import React from "react";

const Price = () => {
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <h6 className=" mt-5 text-center price-text">PRICING PLAN</h6>
                    <h1 className="text-center price-text2 "> Take A Look At The <span className="price-text1">Pricing Plan</span> </h1>
                    <div className="col-lg-4 card-price">
                        <div className="color mt-3">
                            <h2 >Starter<br/>
                                $0<br/>
                                Monthly</h2>
                        </div>
                        <p className="mt-4">Unlimited Projects</p>
                        <p>Unlimited activity log</p>
                        <p>Umlimited file storage</p>
                        <p>List view projects</p>
                        <p>Full course details</p>
                        <p>2500+ Online course</p>
                        <button className="btn btn-primary mt-3 mb-3">
                            Order Now
                        </button>

                    </div>
                    <div className="col-lg-4 card-price">
                        <div className="color-1 mt-3">
                            <h2 >Agency<br/>
                                $29<br/>
                                Monthly</h2>
                        </div>
                        <p className="mt-4">Unlimited Projects</p>
                        <p>Unlimited activity log</p>
                        <p>Umlimited file storage</p>
                        <p>List view projects</p>
                        <p>Full course details</p>
                        <p>2500+ Online course</p>
                        <button className="btn btn-primary mt-3 mb-3">
                            Order Now
                        </button>


                    </div>
                    <div className="col-lg-4 card-price">
                        <div className="color-2 mt-3">
                            <h2 className="text-light ">Enterrises<br/>
                                $49<br/>
                                Monthly</h2>
                        </div>
                        <p className="mt-4">Unlimited Projects</p>
                        <p>Unlimited activity log</p>
                        <p>Umlimited file storage</p>
                        <p>List view projects</p>
                        <p>Full course details</p>
                        <p>2500+ Online course</p>
                        <button className="btn btn-primary mt-3 mb-3">
                            Order Now
                        </button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Price;