import React from "react";
import { Link ,useNavigate} from "react-router-dom";
import { IoBookSharp } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import './user.css';
import { toast } from "react-toastify";
import { baseurl } from "../Config/config";

const Sign = () => {

    const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `${baseurl}/user`;
			const { data: res } = await axios.post(url, data);
            toast.success('register succesfully')
			navigate("/login");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

    return(
        <>
       <div className="container mt-1 ">
        <div className="row">
            <div className="col-lg">
            <div className="container login-main m-auto  p-4">
                <div className="left-3">
                <h1 className="text-center fs-3 left-4-tx"> <i className='  log-i'><IoBookSharp/></i> Library</h1>

                <h1 className="text-center  mt-3">Get Started <span className="hi-1">Now</span></h1>
                <p className="text-center">Please fill out all the rquired fielids to create your acount!</p>

                </div>
                <div className="right-3">

                <div className="show-div">
                            <h1 className="text-center fs-3"> <i className='  log-i'><IoBookSharp /></i> Library</h1>

                                <h1 className="text-center mt-1">Get Started<span className="hi-1">Now</span></h1>

                                <p className="text-center ">Please fill out all the rquired fielids to create your acount!</p>
                            </div>
                 <form className="mt-1" onSubmit={handleSubmit}>

                <label for="firstName" className="label">First Name</label><br/>
                <input 
                type="text"
                name="firstName"
                onChange={handleChange}
                value={data.firstName}
                className="input-login"
                ></input>
                <br/><br/>

                <label for="lastName" className="label">Last Name</label><br/>

                <input type="text" 
                name="lastName"  
                onChange={handleChange} 
                value={data.lastName}
                className="input-login"
                ></input>
                <br/><br/>

                <label for="email" className="label">Email</label><br/>

                <input type="email" 
                name="email"  
                onChange={handleChange} 
                value={data.email}
                className="input-login"
                ></input>
                <br/><br/>

                <label for="password" className="label">Password</label><br/>
                <input type="password" 
                name="password"  
                onChange={handleChange} 	
                value={data.password} 
                className="input-login"
                ></input>
                <br/><br/>

              
                {error && <div className={styles.error_msg}>{error}</div>}

               

                    <input type="checkbox" className="me-2"/>Remember Me
                    <br/>
                <button className="login mt-3" type="submit">Sign up</button>
              

                                 </form>
                               
                                    <h6 className="mt-3">or</h6>
                             
                         
                                 
                      

                        <div className="other-login mt-3">
                        <p className="border bordre-dark yup p-2 me-4"> <img className="google-icon "src={require('./images/google.jpeg')}/>Continue with google</p> 
                        <p className="border bordre-dark p-2"><img className="google-icon "src={require('./images/apple.jpeg')}/>Continue with apple</p>

                        </div>

                        <div className="d-flex mt-2 link-1 "> 
                        <p >Already have an account?</p>
                        <Link to="/Login" className="link-0 ms-2 ">sign in</Link>
                        </div> 

                </div>
                    </div>
            </div>
        </div>
       </div>
        </>
    )
}
export default Sign;