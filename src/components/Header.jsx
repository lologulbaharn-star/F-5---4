import React, { useState, useEffect } from 'react';

const Header = ({ onSearch }) => {
  const [term, setTerm] = useState('');


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(term);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [term]);

  return (
    <header className="pt-16 pb-8 px-4 text-center animate-in fade-in duration-1000">
      <h1 className="text-6xl md:text-7xl text-[#2D3E40] mb-4 tracking-tight font-serif">Chef Academy</h1>
      <p className="text-[#C5A358] font-light tracking-[0.3em] uppercase text-xs mb-10">
        Taste the elegance of professional cooking
      </p>
      
      <div className="max-w-xl mx-auto relative group">
        <input
          type="text"
          placeholder="ابحث عن إلهامك القادم..."
          className="w-full bg-white border border-[#C5A358]/20 px-8 py-4 rounded-none focus:outline-none focus:border-[#C5A358] transition-all text-right shadow-sm group-hover:shadow-md"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <span className="absolute left-4 top-4 text-[#C5A358] transition-transform group-hover:scale-110">🔍</span>
      </div>
    </header>
  );
};

export default Header;