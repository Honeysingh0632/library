import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './user.css';
import { useState } from "react";
import axios from "axios";
import { IoBookSharp } from "react-icons/io5";
import styles from "./styles.module.css";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseurl } from "../Config/config";



const Login = () => {

    const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
   

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
      
		try {
			const url = `${baseurl}/auth`;
			const { data: res } = await axios.post(url, data);
           
			localStorage.setItem("token", res.data);
         
			window.location= '/';
            toast.success('login succesfully')
            
            
           

          
          
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
                toast.error('please fill correct ')
			}
		}
	};
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
 



    return(
        <>
       
       
        <div className="container login-main1 mt-2 ">
            <div className="row">
                <div className="col-lg">
               
                    
                    <div className="container  login-main m-auto mt-4  p-5">
                        <div className="left-3 ">
                                <h1 className="text-center fs-3 left-4-tx"> <i className='  log-i'><IoBookSharp /></i> Library</h1>

                                <h1 className="text-center mt-3">Welcome Back<span className="hi-1">!</span></h1>

                                <p className="text-center ">Enter your Credentials to access your account</p>

                        </div>
                        <div className="right-3 ">

                            <div className="show-div">
                            <h1 className="text-center fs-3"> <i className='  log-i'><IoBookSharp /></i> Library</h1>

                                <h1 className="text-center mt-1">Welcome Back<span className="hi-1">!</span></h1>

                                <p className="text-center ">Enter your Credentials to access your account</p>
                            </div>
                                <form  className="mt-5">
                                    <label for="email" className="label">Email</label><br />
                                    <input type="text" name="email" id="email" value={data.email} onChange={handleChange}
                                        className="input-login"></input><br /><br />

                                    <label for="password" className="label">Password</label><br />
                                    <input  name="password" 
                                     id="pass"
                                     type={
                                         showPassword ? "text" : "password"
                                     }
                                    
                                    value={data.password}
                                        onChange={handleChange} className="input-login"></input><br />

                                  {/* <input type="checkbox" className="me-2"/>Remember Me */}

                               

                                     <br/>
                                     <div className="mb-3 form-check">
                                     <input type="checkbox"  className="form-check-input" id="check"   value={showPassword}  onChange={() =>
                                            setShowPassword((prev) => !prev)
                                        }/>
                                        <label for="togglePassword" className="form-check-label">Show Password</label>
                                        </div>
                                     {error && <div className={styles.error_msg}>{error}</div>}

                                    <button className="login mt-2" onClick={handleSubmit} type="submit">Log in</button>
                                  <br/> 
                                  <br/>
                                   <Link to="/forgotpassword" className="mt-2 link-0 fs-5">forgot password?</Link>
                                 

                                </form>
                                <br />
                                <h6>or</h6>
                                <br />
                                <div className="other-login">
                                    <p className="border bordre-dark yup p-2 me-4"> <img className="google-icon " src={require('./images/google.jpeg')} />Continue with google</p>
                                    <p className="border bordre-dark p-2"><img className="google-icon " src={require('./images/apple.jpeg')} />Continue with apple</p>

                                </div>

                                <div className="d-flex mt-4 link-1 ">
                                    <p >Don't have an account</p>
                                    <Link to="/signup" className="link-0 ms-2 ">sign up</Link>
                                </div> 
                        </div>
                    
                        
                       
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Login;