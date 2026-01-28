import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CategoryFilters from './components/CategoryFilters';
import MealCard from './components/MealCard';
import MealModal from './components/MealModal';
import Loader from './components/Loader';

function App() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [activeCat, setActiveCat] = useState('');
  

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('chef_academy_favs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('chef_academy_favs', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (meal) => {
    setFavorites(prev => {
      const isExist = prev.find(f => f.idMeal === meal.idMeal);
      if (isExist) {
        return prev.filter(f => f.idMeal !== meal.idMeal);
      }
      return [...prev, meal];
    });
  };


  const fetchMeals = async (url, catName = '') => {
    setLoading(true);
    setActiveCat(catName);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setMeals(data.meals || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  }, []);

  return (
    <div className="max-w-[1600px] mx-auto min-h-screen px-4 md:px-10" dir="rtl">
      
      <Header onSearch={(t) => fetchMeals(`https://www.themealdb.com/api/json/v1/1/search.php?s=${t}`, '')} />
      
      <CategoryFilters 
        activeCat={activeCat}
        onCategoryClick={(c) => fetchMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${c}`, c)} 
      />

      {favorites.length > 0 && !activeCat && (
        <section className="mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-[#2D3E40]">وصفاتك المفضلة</h2>
            <div className="flex-1 h-[1px] bg-[#C5A358]/20"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {favorites.map(meal => (
              <MealCard 
                key={meal.idMeal} 
                meal={meal} 
                isFav={true}
                onToggleFav={toggleFavorite}
                onClick={() => setSelectedMeal(meal.idMeal)} 
              />
            ))}
          </div>
        </section>
      )}

      <section className="pb-20">
        {activeCat && (
          <h2 className="text-2xl mb-8 text-[#C5A358] font-light tracking-widest text-center uppercase">
            — {activeCat} Collection —
          </h2>
        )}

        {loading ? <Loader /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {meals.map(meal => (
              <MealCard 
                key={meal.idMeal} 
                meal={meal} 
                onToggleFav={toggleFavorite}
                isFav={favorites.some(f => f.idMeal === meal.idMeal)}
                onClick={() => setSelectedMeal(meal.idMeal)} 
              />
            ))}
          </div>
        )}
      </section>

      {selectedMeal && (
        <MealModal 
          mealId={selectedMeal} 
          onClose={() => setSelectedMeal(null)} 
        />
      )}
      
      <footer className="py-10 text-center border-t border-[#C5A358]/10 text-[#2D3E40]/40 text-xs tracking-[0.2em]">
        &copy; 2026 CHEF ACADEMY LUXURY DINING. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}

export default App;