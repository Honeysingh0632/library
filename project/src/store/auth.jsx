import { createContext, useContext,useEffect,useState } from "react";
import { baseurl } from "../Config/config";
import axios from "axios";



export const Authcontext = createContext();

export const Authprovider = ({children}) => {

    const storetoken = () => {
        return localStorage.getItem('token')
    }

    const [data, setData] = useState(null); // Initialize as null or empty object
    const [error, setError] = useState(null);
    const [isLoadind,setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                setLoading(true);
                const response = await fetch(`${baseurl}/singleuser`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    }
                });
    
                if (!response.ok) throw new Error('Network response was not ok');
    
                const result = await response.json();
                console.log("API Result:", result); // Log to check data structure
                
                // Check if `message` exists in result
                if (result && result.message) {
                    setData(result.message); 
                    setLoading(false)// Set data to `message` object
                } else {
                    setError("No data found in response"); // Set error if `message` is missing
                }
            } catch (error) {
                console.error('Fetch error:', error);
                setError(error.message); // Update error state
            }
        };
    
        fetchData();
    }, []);


  // 📚 Book data and search
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  useEffect(() => {
    const fetchBooks = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`${baseurl}/addbook/getapi`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    fetchBooks();
  }, []);

  // 🔎 Filter logic
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.AddBookname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.AddAuthorname?.toLowerCase().includes(searchTerm.toLowerCase());

    const price = parseFloat(book.bookprice);

    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "10-100" && price >= 10 && price <= 50) ||
      (priceFilter === "50-100" && price > 50 && price <= 100) ||
      (priceFilter === "50-100" && price > 100 && price <= 150) ||
      (priceFilter === "100-200" && price > 150 && price <= 200);

    return matchesSearch && matchesPrice;
  });

    
    return <Authcontext.Provider value={{storetoken,data,isLoadind,
        error,
        books,
        filteredBooks,
        searchTerm,
        setSearchTerm,
        priceFilter,
        setPriceFilter,
    }} >
        {children} 
    </Authcontext.Provider>

}
export const useAuth = () => {
    const authvalue = useContext(Authcontext);
    if(!authvalue){
        throw new Error ('error')
    }
    return authvalue;
};