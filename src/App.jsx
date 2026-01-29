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
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('chef_favs') || '[]'));

  useEffect(() => {
    localStorage.setItem('chef_favs', JSON.stringify(favorites));
  }, [favorites]);

  const fetchMeals = async (url, catName = '') => {
    setLoading(true);
    setActiveCat(catName);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setMeals(data.meals || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (meal) => {
    setFavorites(prev => prev.some(f => f.idMeal === meal.idMeal) 
      ? prev.filter(f => f.idMeal !== meal.idMeal) 
      : [...prev, meal]);
  };

  useEffect(() => {
    fetchMeals('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  }, []);

  return (
    <div className="max-w-[1500px] mx-auto min-h-screen pb-20" dir="rtl">
      <Header onSearch={(t) => fetchMeals(`https://www.themealdb.com/api/json/v1/1/search.php?s=${t}`, '')} />
      
      <CategoryFilters 
        activeCat={activeCat}
        onCategoryClick={(c) => fetchMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${c}`, c)} 
      />

      <main className="px-6">
        
        {favorites.length > 0 && !activeCat && (
          <div className="mb-16">
            <h3 className="text-[#C5A358] text-xs tracking-[0.3em] uppercase mb-6 text-center">Your Favorites</h3>
            <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar">
               {favorites.map(meal => (
                 <div key={meal.idMeal} className="min-w-[280px]">
                    <MealCard 
                        meal={meal} 
                        isFav={true} 
                        onToggleFav={toggleFavorite} 
                        onClick={() => setSelectedMeal(meal.idMeal)} 
                    />
                 </div>
               ))}
            </div>
          </div>
        )}

        {loading ? <Loader /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
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
      </main>

      {selectedMeal && <MealModal mealId={selectedMeal} onClose={() => setSelectedMeal(null)} />}
    </div>
  );
}

export default App;