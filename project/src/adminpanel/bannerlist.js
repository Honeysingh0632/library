import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./adminstyle.css";
import { baseurl } from "../Config/config";

const Bannerlist = () => {
  const [banners, setBanners] = useState([]); // Store multiple banners

  // Fetch banners from the API
  useEffect(() => {
    const fetchBanners = async () => {
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
          throw new Error("Failed to fetch banners");
        }

        const result = await response.json();
        setBanners(result); // Set banners to state
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load banners");
      }
    };

    fetchBanners();
  }, []);

  // Delete a specific banner
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${baseurl}/post/banner/${id}`);
      setBanners(banners.filter((item) => item._id !== id)); // Update state after deletion

      toast.success("Book deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="container mt-4 text-center">
      {banners.length > 0 ? (
        banners.map((banner) => (
          <div key={banner._id} className="card-book2 p-3 mt-5 text-center">
            {banner.banner && (
              <img
                src={`${baseurl}${banner.banner}`}
                alt="Banner"
                width="300"
                className="add-book-card"
              />
            )}
            <div className="mt-3">
            <button
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={() => deleteUser(banner._id)}
                  >
                    Delete Now
                  </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">No banners available</div>
      )}
    </div>
  );
};

export default Bannerlist;
