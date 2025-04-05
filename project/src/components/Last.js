import React from "react";
import { IoIosSend } from "react-icons/io";
import { RiMailSendFill } from "react-icons/ri";

const Last = () => {

    return(
        <>
        <div className="container last mt-5">
            <div className="row">
                <div className="col-lg text-center mt-5">
                    <h1 className="last-text"  >Subscribe to our newsletter, </h1>
                      <h1 className="last-text">We don't make any spam.</h1>  
                    
                    <p className= "mt-4 last-text-1 ">A fraud is a fraud. Different rules don't apply in the City than they do for you and me. I might go my whole life stealing money.</p>

                    <input type="text"
                     className="for-email mt-4"
                     placeholder="Enter Your Email Address"
                     ></input><br/><br/>
                    
                        <i className="send-icon"><RiMailSendFill/></i>

                 
                </div>
            </div>
        </div>
        </>
    )
}
export  default Last;