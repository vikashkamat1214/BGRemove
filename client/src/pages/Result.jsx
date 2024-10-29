import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Result = () => {
  const { resultImage, image } = useContext(AppContext);

  return (
    <div className="mx-4 my-3 lg:mx-44 mt-44 min-h-[70vh]">
      <div className="bg-white rounded-lg px-8 py-6 drop-shadow-sm">
        {/*------ Image Container ------*/}
        <div className="flex flex-col sm:grid grid-cols-2 gap-8">
          {/*------ Left Side: Original Image ------*/}
          <div>
            <p className="font-semibold text-gray-600 mb-2">Original</p>
            {image ? (
              <img
                className="rounded-md border"
                src={URL.createObjectURL(image)}
                alt="Original Image with Background"
              />
            ) : (
              <p className="text-gray-400">No image uploaded</p>
            )}
          </div>

          {/*------ Right Side: Background Removed ------*/}
          <div className="flex flex-col">
            <p className="font-semibold text-gray-600 mb-2">Background Removed</p>
            <div className="rounded-md border border-gray-300 h-full relative bg-layer overflow-hidden">
              {resultImage ? (
                <img src={resultImage} alt="Image with Background Removed" />
              ) : (
                image && (
                  <div className="absolute inset-0 flex justify-center items-center">
                    <div className="border-4 border-violet-600 rounded-full h-12 w-12 border-t-transparent animate-spin"></div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/*------ Buttons Section ------*/}
        {resultImage && (
          <div className="flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-6">
            <button
              className="px-8 py-2.5 text-violet-600 text-sm border border-violet-600 rounded-full hover:scale-105 transition-all duration-700"
              onClick={() => window.location.reload()}
            >
              Try another image
            </button>
            <a
              className="px-8 py-2.5 text-white text-sm bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full hover:scale-105 transition-all duration-700"
              href={resultImage} 
              download
            >
              Download image
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
