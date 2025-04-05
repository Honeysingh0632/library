import React, { useEffect, useState } from 'react';

const About1 = () => {

    const [bgSize, setBgSize] = useState(100);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newBgSize = 100 + scrollY * 0.1; // Adjust the multiplier to control the zoom speed
      setBgSize(newBgSize);
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
   

    return(

        <>
       
            <div className="container about1" style={{ backgroundSize: `${bgSize}%` }}>
                <div className='row'>
                      <div className="about-text col-lg-6 ">
                      <h1 className="mt-3 about-text1 ">About our Library</h1>
                    <p className="mt-4 responsive-text">Learning is a lifetime journey. To make this journey enjoyable, we, Noble Library, 
                    situated at Malad West, Mumbai, Maharashtra, provide an extensive list of books that you will find 
                    informative and mind-changing all at once. Reading is the best way to pass time and what better way 
                   . </p>
                    <button className="about-btn mt-3">Learn More</button>

                    {/* <div style={{ height: '200vh' }}></div> */}
              </div>
                </div>
                
              

            </div>

            
            
  
        
        </>
    )

}
export default About1;
   
