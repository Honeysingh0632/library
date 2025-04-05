import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { baseurl } from "../Config/config";
import "./HomeStyle.css";


const Home2 = () => {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`${baseurl}/post/banner`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch the banner");
        }

        const result = await response.json();

        if (result.length > 0) {
          const latestBanner = result.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )[0];
          setBanner(latestBanner);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load the banner");
      }
    };

    fetchBanner();
  }, []);

  return (
    <div className="container  ">
   
  {banner && banner.banner && (
    <>
      <img
        src={`${baseurl}${banner.banner}`}
        alt="Library Banner"
        className="banner-image "
      />
      {/* <div className="banner-gradient">
        
        </div> */}
    </>
  )}


      {/* <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
          For Exclusive Range Of Books <br /> At Our Library
        </h1>

        <div className="flex space-x-4 mb-6">
          <Link
            to="/Newadd"
            className="px-6 py-3 bg-purple-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-purple-700"
          >
            Enquire Now
          </Link>
          <Link
            to="/BookSugguest"
            className="px-6 py-3 bg-purple-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-purple-700"
          >
            Book Suggest
          </Link>
        </div>

        <p className="text-lg md:text-xl text-center max-w-2xl">
          Where every page is an adventure. Start your reading journey today.
        </p>
      </div> */}
       <div className="main1 ">
                  {/* <div className="main-imb-db">
                      <img src="/uploads/image-1737373599030.jpg" height={500} width={400}></img>
                      </div> */}
                 
                  <h1 className="main-text"> For Exclusive Range Of books At Our Library</h1>
                  <button className="main-btn"> <Link to="/Newadd" className="link">Enquire Now</Link></button>
                  <button className="main-btn ms-3" >   <Link to="/BookSugguest" className="link">Book Sugguest</Link>
                  </button>
                
                
                  <div className="main-head mb-5">
                      <p>where every page is a Adventure. start your reading journey today </p>
                  </div>
             
               </div>
    </div>
  );
};

export default Home2;
