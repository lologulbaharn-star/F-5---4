import React from 'react';

const MealCard = ({ meal, onClick, onToggleFav, isFav }) => {
  return (
    <div className="group cursor-pointer bg-white p-5 transition-all duration-700 hover:shadow-[0_30px_60px_rgba(45,62,64,0.08)] relative border border-transparent hover:border-[#C5A358]/20">
      
      
      <button 
        onClick={(e) => {
          e.stopPropagation(); 
          onToggleFav(meal);
        }}
        className="absolute top-8 right-8 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm transition-transform hover:scale-110 active:scale-90"
        title={isFav ? "إزالة من المفضلات" : "إضافة للمفضلات"}
      >
        <span className={`text-xl transition-colors duration-300 ${isFav ? 'text-red-500' : 'text-gray-300'}`}>
          {isFav ? '❤️' : '🤍'}
        </span>
      </button>

      <div onClick={onClick}>
        <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-[#f1f1f1]">
          <img 
            src={meal.strMealThumb} 
            alt={meal.strMeal} 
            loading="lazy"
            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s] ease-out"
          />
          <div className="absolute inset-0 bg-[#2D3E40]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>

        <div className="text-center">
          <p className="text-[10px] text-[#C5A358] uppercase tracking-[0.4em] mb-2 font-light">Chef's Selection</p>
          <h3 className="text-xl text-[#2D3E40] font-bold mb-4 line-clamp-1 h-7">{meal.strMeal}</h3>
          <div className="inline-block relative">
            <span className="text-[11px] text-[#C5A358] tracking-widest font-bold">VIEW RECIPE</span>
            <div className="h-[1px] w-0 group-hover:w-full bg-[#C5A358] transition-all duration-500 absolute -bottom-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCard;