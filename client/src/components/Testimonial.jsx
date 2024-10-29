import React from 'react';
import { testimonialsData } from '../assets/assets'; // Ensure the correct path to your assets

const Testimonial = () => {
  return (
    <div className="p-8 bg-gray-100 text-center">
      {/* ----Title---- */}
      <h1 className="mb-12 sm:mb-20 text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent">
        Customer Testimonial
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto px-4 py-8">
        {testimonialsData.map((item, index) => (
          <div 
            className="bg-white rounded-xl p-6 shadow-md max-w-lg m-auto hover:scale-105 transition-transform duration-700" 
            key={index}
          >
            <blockquote className="text-gray-500">
              { <p className="text-4xl mb-2">”</p> }
              <p className="text-1xl">{item.text}</p>
            </blockquote>
            <div className="flex items-center gap-3 mt-5">
              <img 
                className="w-12 h-12 rounded-full" 
                src={item.image} 
                alt={`${item.author}'s photo`} 
              />
              <div>
                <p className="font-semibold">{item.author}</p>
                <p className="text-sm text-gray-600">{item.jobTitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
