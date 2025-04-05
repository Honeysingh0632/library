// src/App.js
import React, {  } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes ,Navigate} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Admin from './adminpanel/Adminpanel';
import BookSugguest from './components/BookSuggustion';
import ContactUser from './adminpanel/Contact-user-detaile';
import BookSugguestData from './adminpanel/BookSugust';
import NewAdd from './components/NewAdd';
import Login from './user/Login';
import Sign from './user/Sign';
import Services1 from './components/Services1';
import UserData from './adminpanel/UserData';
import Addbook from './adminpanel/Addbook';
import UserInfo from './components/UserInfo';
import Showbook from './components/Showbook';
import AdminUpdate from './adminpanel/AdminUpdate'
import ContactUpdate from './adminpanel/ContactUpdate';
import UserUpdate from './adminpanel/UserUpdate';
import Updatebook from './adminpanel/Updatebook';
import Allbook from './adminpanel/Allbook';
import Payment from './adminpanel/Payment';


import UserLogin from './adminpanel/User-login';
import Singlebook from './components/Singlebook';
import Forgot from './user/Forgot';

import Editprofile from './components/Editprofile';
import ResetPassword from './user/Resetpassword';
import User from './components/User';
import ScrollToTop from './scroll/ScrollToTop';
import Reasetpassword1 from './components/Resetpassword1';
import Profile from './user/Profile';
import Test from './test/Test';
import Order from './adminpanel/Order';
import Orderupdate from './adminpanel/Orderupdate';
import OrderList from './order/OrderList';
import OrderSingle from './order/Order-single';
import Banner from './adminpanel/Banner';
import Bannerlist from './adminpanel/bannerlist';
import Testorder from './test/Testorder';












const App = () => {

  const user = localStorage.getItem("token");

  



  return (
    <>
 
 
    <Router>
      
    <ScrollToTop/>

      <Routes>
       

        {user && <Route path="/" exact element={<Home />} />}
       

       
           <Route path="/login" exact element={  <Login/>}/>
        
       
        <Route  path="/signup" exact element={<Sign/>}/>

        <Route path="/" element={<Navigate replace to="/login" />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/Service' element={<Services1/>}></Route>
        <Route path='/BookSugguest' element={<BookSugguest/>}></Route>
        <Route path='/NewAdd' element={<NewAdd/>}></Route>
        <Route path='/Changepassword' element={<UserInfo/>}></Route>
        <Route path='/user' element={<User/>}></Route>
        <Route path='/User-profile' element={<Profile/>}/>

        <Route path='/showbook' element={<Showbook/>}></Route>
        <Route path='/OrderList' element={<OrderList/>}></Route>
        <Route path='/testOrderList' element={<Testorder/>}></Route>

        <Route path='/forgotpassword' element={<Forgot/>}></Route>
        <Route path='/reset-password/:id/' element={<Reasetpassword1/>}></Route>

        <Route path='/Singlebook/:id/edit' element={<Singlebook/>}></Route>
        <Route path="/payment/:id/" element={<Test />} />

        <Route path='/Editprofile' element={<Editprofile/>}/>
       
        <Route path="/password-reset/:id/:token" element={<ResetPassword/>} />
        <Route path="/Ordersingle/:id/" element={<OrderSingle />} />
       


         
      x



          <Route path="/AdminPanel" element={<Admin />} > 
            <Route path="ContactUser" element={<ContactUser />} />
            <Route path="Userlogin" element={<UserLogin />} />
            <Route path='BookSugguestData' element={<BookSugguestData/>} />
            <Route path='UserData' element={<UserData/>}></Route>
            <Route path='Addbook' element={<Addbook/>}></Route>
            <Route path='Allbook' element={<Allbook/>}></Route>
            <Route path='Payment' element={<Payment/>}></Route>
            <Route path='Order' element={<Order/>}></Route>
            <Route path='Banner' element={<Banner/>}></Route>
            <Route path='Bannerlist' element={<Bannerlist/>}></Route>
            <Route path='updatebook/:id/edit' element={<AdminUpdate/>}></Route>
            <Route path='updateorder/:id/edit' element={<Orderupdate/>}></Route>
            <Route path= 'contactupdate/:id/edit' element={<ContactUpdate/>}></Route>
            <Route path='userupdate/:id/edit' element={<UserUpdate/>}></Route>
            <Route path='update/addbook/:id/edit' element={<Updatebook/>}></Route>
            {/* <Route path='update/addbook/:id/edit' element={<Test/>}></Route> */}

          </Route>
          <Route path="*" element={<Navigate to="/" />} />

         
                
      </Routes>
   
   
    
    </Router>

  
    
     </>

  );
};

export default App;


