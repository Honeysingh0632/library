import React, { lazy, Suspense } from "react";

import Skelton from "../skeltonloading/Skelton";
import Showbook from "./Showbook";
import Home2 from "./Home2";
import Chatbot from "../chatbot/chat";
import ChatLauncher from "../chatbot/ChatLauncher";
const Home1 = lazy( () => import('./Home1'));
const About1 = lazy( () => import('./About1'));
const Footer = lazy( () => import('./Footer'));
const Services = lazy( () => import('./Services'));
const NewBooks = lazy( () => import('./NewBooks'));
const Contact1 = lazy( () => import('./Contact1'));
const Price = lazy( () => import('./Price'));
const Last = lazy( () => import('./Last'));
const Navbar = lazy( () => import('./Navbar'));
const Rugh = lazy( () => import('./Rugh'));








const Home = () => {

    return(
        <> 
    {/* <Skelton/> */}
    <div className="responsive">

    
         
      <Suspense fallback={<Skelton/>}>

      <Navbar/>
      <Rugh/>
     <ChatLauncher/>
      <Home1/>
       
        <Showbook/>
        <Services/>
    
       
      <NewBooks/>
      <About1/>
      <Contact1/>
      <Price/>
      {/* <div className="container">
        <div className="row">
            <div className="col-lg">
              
            </div>
        </div>
      </div>
     */}
       <Last/>
    <Footer/>
      </Suspense>
        </div>

      
        </>
    )
}

export default Home;