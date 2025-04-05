import React from "react";


const Services = () => {

    return(
        <>

      

        <div className="service-main mt-5 ">
            <h3 className="service-text1 mt-5">Start Learning</h3>
            <h1 className="service-text">Build Better skills, faster From Today.</h1>
            <h3 className="mt-3 our-text">Our Services</h3>
        </div>

        <div className="container-fluid mt-5">
                <div className="row">
                    <div className=" container card card1 col-lg-4">
                       <h1 className="card-text"> Silent Reading</h1>
                       <p className="card-text1"> One Needs Silence to read Books or to Study, Our Library has Special Arrangment for the Silence Zone.</p>
                       <button style={{'--clr': '#7808d0'}}  className="btn-ex">Explore More</button>

                    </div>
                    <div className=" container  card1 card col-lg-4">
                       <h1 className="card-text"> Books Rentals</h1>
                        <p className="card-text1" > Apart From Reading inside Library, we also provide facility to rent and return book on the time </p>
                       <button style={{'--clr': '#7808d0'}}  className="btn-ex">Explore More</button>


                    </div>
                    <div className=" container card1  card col-lg-4">
                       <h1 className="card-text">  Books Collection </h1>
                       <p className="card-text1"> We have excellent colection of bookes Categorized under childeren, fiction, cook books etc for easy access </p>
                       <button  style={{'--clr': '#7808d0'}}  className="btn-ex">Explore More</button>



                    </div>
                </div>
            </div>
            
         
        

        </>
    )
}

export default Services;