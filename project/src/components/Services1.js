import React, { lazy, Suspense } from "react";
import Navbar from "./Navbar";
import Rugh from "./Rugh";
import Services from "./Services";
import Price from "./Price";
import Footer from "./Footer";



const Services1 = () => {

    return(
        <>
        <Navbar/>
        <Rugh/>
      <Services/>
        <Price/>
        <Footer/>
        </>
    )
}

export default Services1;