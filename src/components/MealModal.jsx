import React, { useEffect, useState } from 'react';

const MealModal = ({ mealId, onClose }) => {
  const [details, setDetails] = useState(null);
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then(res => res.json())
      .then(data => setDetails(data.meals[0]));
  }, [mealId]);

  const toggleIngredient = (index) => {
    setCheckedIngredients(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("تم نسخ رابط الموقع لمشاركة الوصفة! 🔗");
  };

  if (!details) return null;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (details[`strIngredient${i}`]) {
      ingredients.push({name: details[`strIngredient${i}`], measure: details[`strMeasure${i}`]});
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-10 glass-modal animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-6xl h-full md:h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row relative">
        
        
        <div className="absolute top-6 left-6 z-20 flex gap-4">
            <button onClick={handleShare} className="bg-white/80 p-2 rounded-full shadow hover:bg-white text-[#C5A358]" title="مشاركة">🔗</button>
            <button onClick={onClose} className="bg-[#2D3E40] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black">&times;</button>
        </div>

        <div className="w-full md:w-5/12 h-64 md:h-full sticky top-0 md:relative">
          <img src={details.strMealThumb} className="w-full h-full object-cover" alt="" />
        </div>

        <div className="w-full md:w-7/12 p-8 md:p-16 text-right">
          <span className="text-[#C5A358] uppercase tracking-widest text-[10px] mb-2 block">— {details.strArea} Cuisine</span>
          <h2 className="text-4xl md:text-5xl text-[#2D3E40] mb-8 font-serif leading-tight">{details.strMeal}</h2>

          
          <div className="mb-12">
            <h4 className="text-xl font-bold mb-6 border-b border-[#C5A358]/10 pb-2">قائمة المكونات (اضغط للتجهيز)</h4>
            <div className="grid grid-cols-1 gap-3">
              {ingredients.map((ing, i) => (
                <div 
                    key={i} 
                    onClick={() => toggleIngredient(i)}
                    className={`flex justify-between items-center p-3 cursor-pointer transition-all border-r-2 ${checkedIngredients.includes(i) ? 'bg-gray-50 border-gray-300 opacity-40 italic' : 'bg-[#F9F7F2] border-[#C5A358]'}`}
                >
                  <span className="text-xs text-[#C5A358]">{ing.measure}</span>
                  <span className={`text-sm ${checkedIngredients.includes(i) ? 'line-through' : ''}`}>{ing.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h4 className="text-xl font-bold mb-6 border-b border-[#C5A358]/10 pb-2">خطوات التحضير</h4>
            <p className="text-md leading-9 text-gray-700 font-light whitespace-pre-line px-2">
              {details.strInstructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealModal;