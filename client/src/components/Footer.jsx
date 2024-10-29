import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="flex flex-col lg:flex-row items-center justify-between gap-4 px-4 lg:px-44 py-5 bg-gray-100">
      {/* Logo */}
      <img src={assets.logo} alt="Company Logo" className="w-30 lg:w-35" />

      {/* Copyright Information */}
      <p className="text-sm lg:text-base text-gray-600 text-center">
        © {new Date().getFullYear()} vikashkamat124@gmail.com.| All rights reserved.|
      </p>

      {/* Social Media Icons */}
      <div className="flex gap-4">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <img width={50} src={assets.facebook_icon} alt="Facebook" />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <img width={50} src={assets.twitter_icon} alt="Twitter" />
        </a>
        <a href="https://plus.google.com" target="_blank" rel="noopener noreferrer">
          <img width={50} src={assets.google_plus_icon} alt="Google Plus" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
