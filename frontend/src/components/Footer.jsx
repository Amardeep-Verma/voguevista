import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className="my-10 mt-40 text-sm">
      
      {/* Top section: Logo + links + contact */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-10 pb-10 border-b border-gray-300">
        
        {/* Left: Logo + text */}
        <div className="flex flex-col max-w-sm">
          <img src={assets.logo} className="mb-5 w-32" alt="Logo" />
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, perspiciatis!
          </p>
        </div>

        {/* Middle: Company links */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Right: Contact info */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91 7340741973</li>
            <li>vermaamardeep86@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom section: Copyright */}
      <div className="pt-5">
        <p className="text-sm text-center text-gray-600">
          Copyright 2025 @ VogueVista.com — All Rights Reserved
        </p>
      </div>
    </div>
  )
}

export default Footer
