import React from 'react';
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoIosPin } from "react-icons/io";
import "./footer.css";

function Footer() {
    return (
        <footer className="container">
         <div className="containeriz"> 
            <p style={{ color: '#000000', fontWeight: 'bold' }}>LOGO</p>
            <p style={{ color: '#666666', display: 'flex', alignItems: 'center' }}>
                <MdOutlineEmail style={{ color: '#666666', marginRight: '5px'}} /> &nbsp; info@musicrent.com
            </p>
            <p style={{ color: '#666666'}}><IoIosPin style={{ color: '#666666', marginRight: '5px'}} /> &nbsp; Bogotá. Colombia</p>
         </div> 
         <div className="containerder"> 
            <p style={{ color: '#000000', fontWeight: 'bold' }}>SIGUENOS</p>
            <div className="socialmedia">
            <FaFacebookF style={{ color: '#666666', marginRight: '5px'}} />
            &nbsp;&nbsp;&nbsp;
            <FaTwitter style={{ color: '#666666', marginRight: '5px'}} />
            &nbsp;&nbsp;&nbsp;
            <FaInstagram style={{ color: '#666666', marginRight: '5px' }} />
            
            <p style={{ color: '#666666'}}>&copy; 2024 Copyright.MusicRent</p>
            </div>
         </div>    
        </footer>
    );
}
export default Footer;