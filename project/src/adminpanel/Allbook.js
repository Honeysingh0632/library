import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./adminstyle.css";
import { baseurl } from "../Config/config";

const Allbook = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const itemsPerPage = 2;

  const indexOfLastPage = currentPage * itemsPerPage;
  const indexOfFirstPage = indexOfLastPage - itemsPerPage;
  const currentPageData = data.slice(indexOfFirstPage, indexOfLastPage);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Retrieve the token

      try {
        const response = await fetch(`${baseurl}/addbook`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log(result);
        setData(result); // Handle data as needed
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${baseurl}/addbook/delete/${id}`);
      setData(data.filter((item) => item._id !== id)); // Update state after deletion

      toast.success("Book deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const initPayment = (data, book) => {
    const options = {
      key: "rzp_test_IBv200U5UqHLvw",
      amount: data.amount,
      currency: data.currency,
      name: book.AddBookname,
      description: "Test Transaction",
      image: `${baseurl}${book.image}`,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:8080/api/payment/verify";
          const result = await axios.post(verifyUrl, response);
          console.log(result.data);
          toast.success("Payment Successful!");
        } catch (error) {
          console.error(error);
          toast.error("Payment Verification Failed!");
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async (book) => {
    try {
      const orderUrl = "http://localhost:8080/api/payment/orders";
      const { data } = await axios.post(orderUrl, { amount: book.bookprice });
      console.log(data);
      initPayment(data.data, book);
    } catch (error) {
      console.error(error);
      toast.error("Error in initiating payment");
    }
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          {currentPageData.length > 0 ? (
            currentPageData.map((value, index) => (
              <div
                className="card-book2 p-3 mt-5 col-lg-3 text-center"
                key={value._id}
              >
                {value.image && (
                  <img
                    src={`${baseurl}${value.image}`}
                    alt={value.AddBookname}
                    width="200"
                    className="add-book-card"
                  />
                )}
                <p>{value.AddBookname}</p>
                <p>{value.AddAuthorname}</p>
                <p>{value.bookdesc}</p>
                <p>Price: {value.bookprice}$</p>
                <p>Old Price: {value.bookoldprice}$</p>
                <p>Rating: {value.bookrating}/5</p>
                <div className="mt-3">
                  <button className="btn btn-success btn-sm">
                    <Link
                      className="link text-light"
                      to={`/AdminPanel/update/addbook/${value._id}/edit`}
                    >
                      Update Book
                    </Link>
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={() => deleteUser(value._id)}
                  >
                    Delete Now
                  </button>
                </div>
                <button
                  className="btn btn-primary btn-sm mt-2"
                  onClick={() => handlePayment(value)}
                >
                  Buy Now
                </button>
              </div>
            ))
          ) : (
            <div className="text-center">No data found</div>
          )}
        </div>
        <div className="text-center">
          <button
            className="btn btn-primary mt-2"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`btn btn-light ms-2 ${
                currentPage === index + 1 ? "btn-active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="btn btn-primary ms-2 mt-2"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Allbook;
