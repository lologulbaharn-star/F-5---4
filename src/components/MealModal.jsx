import React, { useEffect, useState } from 'react';

const MealModal = ({ mealId, onClose }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then(res => res.json())
      .then(data => setDetails(data.meals[0]));
  }, [mealId]);

  if (!details) return null;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (details[`strIngredient${i}`]) {
      ingredients.push({name: details[`strIngredient${i}`], measure: details[`strMeasure${i}`]});
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 glass-modal">
      <div className="bg-white w-full max-w-6xl h-full overflow-y-auto shadow-2xl flex flex-col md:flex-row">
        
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img src={details.strMealThumb} className="w-full h-full object-cover" alt="" />
        </div>

       
        <div className="w-full md:w-1/2 p-8 md:p-16 relative">
          <button onClick={onClose} className="absolute top-8 left-8 text-2xl text-[#C5A358]">&times;</button>
          
          <h2 className="text-5xl text-[#2D3E40] mb-2">{details.strMeal}</h2>
          <p className="text-[#C5A358] uppercase tracking-widest text-sm mb-10">{details.strArea} Cuisine</p>

          <div className="mb-12 text-right">
            <h4 className="text-2xl mb-6 border-b border-[#C5A358]/20 pb-2">المكونات</h4>
            <div className="grid grid-cols-2 gap-y-3">
              {ingredients.map((ing, i) => (
                <div key={i} className="text-sm flex justify-between px-4">
                  <span className="text-gray-400">{ing.measure}</span>
                  <span className="font-bold text-[#2D3E40]">{ing.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-right">
            <h4 className="text-2xl mb-6 border-b border-[#C5A358]/20 pb-2">طريقة التحضير</h4>
            <p className="text-sm leading-8 text-gray-600 font-light">
              {details.strInstructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealModal;