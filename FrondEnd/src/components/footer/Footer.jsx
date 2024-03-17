   import React from 'react';
   import { FaFacebookF } from "react-icons/fa";
   import { FaTwitter } from "react-icons/fa6";
   import { FaInstagram } from "react-icons/fa";
   import { MdOutlineEmail } from "react-icons/md";
   import { IoIosPin } from "react-icons/io";
   import logo from "../../assets/Header/logo.svg";
   import "./footer.css";


   function Footer() {
      return (
         <footer style={{flexShrink: 0}}>
            <div className="container-footer"> 
               <p className='logo'><img  src={logo} alt="Logo" /></p>
               <p className='Copy'>&copy; 2024 Copyright.MusicRent</p>
               
            </div>
         </footer>
      );
   }

   export default Footer;



