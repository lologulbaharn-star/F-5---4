import React from 'react';

const categories = [
  { id: 'Beef', name: 'اللحوم الحمراء' },
  { id: 'Chicken', name: 'الدواجن' },
  { id: 'Seafood', name: 'المأكولات البحرية' },
  { id: 'Vegetarian', name: 'النباتي' },
  { id: 'Dessert', name: 'الحلويات' }
];

const CategoryFilters = ({ onCategoryClick, activeCat }) => (
  <div className="flex flex-wrap justify-center gap-8 mb-16 border-y border-[#C5A358]/10 py-4">
    {categories.map((cat) => (
      <button
        key={cat.id}
        onClick={() => onCategoryClick(cat.id)}
        className={`text-sm tracking-widest transition-all duration-500 hover:text-[#C5A358] ${
          activeCat === cat.id ? 'text-[#C5A358] font-bold' : 'text-[#2D3E40]/60'
        }`}
      >
        {cat.name.toUpperCase()}
      </button>
    ))}
  </div>
);

export default CategoryFilters;