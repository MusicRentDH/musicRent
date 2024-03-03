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
      <footer>
         <div className="container"> 
            <p className='p2'><img  src={logo} alt="Logo" /></p>
            <p className='Copy'>&copy; 2024 Copyright.MusicRent</p>
            
         </div> 
            
      </footer>
   );
}
export default Footer;

/* Aquí va debajo de la p */
/*<p style={{ color: '#666666', display: 'flex', alignItems: 'center' }}>
                <MdOutlineEmail style={{ color: '#666666', marginRight: '10px'}} />info@musicrent.com
            </p>*/
/*<p style={{ color: '#666666'}}><IoIosPin style={{ color: '#666666', marginRight: '10px'}} />Bogotá. Colombia</p>*/

/* aqui va redes sociales */
/*<div className="containerder"> 
            <p className='p3' style={{ color: '#000000', fontWeight: 'bold'}}>SIGUENOS</p>
            <div className="socialmedia">
            <p><FaFacebookF style={{ color: '#666666', marginRight: '10px'}} />
            &nbsp;
               <FaTwitter style={{ color: '#666666', marginRight: '10px'}} />
            &nbsp;
               <FaInstagram style={{ color: '#666666', marginRight: '10px' }} />
            </p>
            
            </div>
         </div>*/ 