import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-[#f0f0f0] border-t-2 border-black">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap -m-4 justify-between">
          {/* Logo and Copyright */}
          <div className="w-full sm:w-1/2 lg:w-5/12 p-4">
            <div className="flex flex-col justify-between h-full text-center sm:text-left">
              <div className="mb-4 inline-flex items-center justify-center sm:justify-start">
                <h1 className="text-xl font-bold">Logo</h1>
              </div>
              <p className="text-sm text-gray-600">&copy; 2023. All Rights Reserved by DevUI.</p>
            </div>
          </div>

          {/* Links Sections */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-2/12 p-4">
            <h3 className="text-xs font-semibold uppercase text-gray-500 mb-3">Company</h3>
            <ul className="space-y-2">
              <li><Link className="text-gray-900 hover:text-gray-700" to="/">Features</Link></li>
              <li><Link className="text-gray-900 hover:text-gray-700" to="/">Pricing</Link></li>
              <li><Link className="text-gray-900 hover:text-gray-700" to="/">Affiliate Program</Link></li>
              <li><Link className="text-gray-900 hover:text-gray-700" to="/">Press Kit</Link></li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-2/12 p-4">
            <h3 className="text-xs font-semibold uppercase text-gray-500 mb-3">Support</h3>
            <ul className="space-y-2">
              <li><Link className="text-gray-900 hover:text-gray-700" to="/">Account</Link></li>
              <li><Link className="text-gray-900 hover:text-gray-700" to="/">Help</Link></li>
              <li><Link className="text-gray-900 hover:text-gray-700" to="/">Contact Us</Link></li>
              <li><Link className="text-gray-900 hover:text-gray-700" to="/">Customer Support</Link></li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-3/12 p-4">
            <h3 className="text-xs font-semibold uppercase text-gray-500 mb-3">Legals</h3>
            <ul className="space-y-2">
              <li><Link className="text-gray-900 hover:text-gray-700" to="/">Terms & Conditions</Link></li>
              <li><Link className="text-gray-900 hover:text-gray-700" to="/">Privacy Policy</Link></li>
              <li><Link className="text-gray-900 hover:text-gray-700" to="/">Licensing</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
