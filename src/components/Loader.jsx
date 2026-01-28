import React from 'react';

const Loader = () => (
  <div className="flex flex-col justify-center items-center my-20 animate-pulse">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl">🥗</span>
    </div>
    <p className="mt-4 text-gray-500 font-bold">جاري تحضير المكونات...</p>
  </div>
);

export default Loader;