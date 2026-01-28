import React, { useState } from 'react';

const Header = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  return (
    <header className="pt-16 pb-12 px-4 text-center">
      <h1 className="text-6xl md:text-7xl text-[#2D3E40] mb-4 tracking-tight">Chef Academy</h1>
      <p className="text-[#C5A358] font-light tracking-widest uppercase text-sm mb-10">
        Uncover the secrets of world-class cuisine
      </p>
      
      <div className="max-w-xl mx-auto relative">
        <input
          type="text"
          placeholder="البحث عن وصفة ملكية..."
          className="w-full bg-white border border-[#C5A358]/20 px-8 py-4 rounded-none focus:outline-none focus:border-[#C5A358] transition-all text-right"
          onChange={(e) => onSearch(e.target.value)}
        />
        <span className="absolute left-4 top-4 text-[#C5A358]">🔍</span>
      </div>
    </header>
  );
};

export default Header;