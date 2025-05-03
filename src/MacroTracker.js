import React, { useState, useEffect } from 'react';

const MacroTracker = () => {
  // State for form inputs
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  
  // State for goals
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [proteinGoal, setProteinGoal] = useState(150);
  const [carbGoal, setCarbGoal] = useState(200);
  const [fatGoal, setFatGoal] = useState(65);
  
  // State for tracking meals
  const [meals, setMeals] = useState([]);
  
  // State for totals
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  
  // Update totals when meals change
  useEffect(() => {
    const newTotalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
    const newTotalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
    const newTotalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
    const newTotalFat = meals.reduce((sum, meal) => sum + meal.fat, 0);
    
    setTotalCalories(newTotalCalories);
    setTotalProtein(newTotalProtein);
    setTotalCarbs(newTotalCarbs);
    setTotalFat(newTotalFat);
  }, [meals]);
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new meal object
    const newMeal = {
      id: Date.now(),
      name: mealName,
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      fat: Number(fat)
    };
    
    // Add meal to list
    setMeals([...meals, newMeal]);
    
    // Reset form
    setMealName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
  };
  
  // Handle meal deletion
  const handleDeleteMeal = (id) => {
    setMeals(meals.filter(meal => meal.id !== id));
  };
  
  // Calculate percentage for progress circles
  const calculatePercentage = (current, goal) => {
    return Math.min(100, Math.round((current / goal) * 100));
  };
  
  // Progress Circle Component
  const ProgressCircle = ({ percentage, label, current, goal, color }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (

      
      <div className="flex flex-col items-center">
        <svg width="100" height="100" className="transform -rotate-90">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#e6e6e6"
            strokeWidth="10"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={color}
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="text-center mt-2">
          <p className="text-lg font-bold">{label}</p>
          <p className="text-sm">
            {current} / {goal}g {percentage}%
          </p>
        </div>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <h1 className="text-3xl font-bold text-center mb-8">Meal & Macro Tracker</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add Meal</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Meal Name</label>
              <input
                type="text"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Calories</label>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Protein (g)</label>
                <input
                  type="number"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Carbs (g)</label>
                <input
                  type="number"
                  value={carbs}
                  onChange={(e) => setCarbs(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Fat (g)</label>
                <input
                  type="number"
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
            >
              Add Meal
            </button>
          </form>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Daily Goals</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Calories</label>
                <input
                  type="number"
                  value={calorieGoal}
                  onChange={(e) => setCalorieGoal(Number(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Protein (g)</label>
                <input
                  type="number"
                  value={proteinGoal}
                  onChange={(e) => setProteinGoal(Number(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Carbs (g)</label>
                <input
                  type="number"
                  value={carbGoal}
                  onChange={(e) => setCarbGoal(Number(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Fat (g)</label>
                <input
                  type="number"
                  value={fatGoal}
                  onChange={(e) => setFatGoal(Number(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress Circles */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Today's Progress</h2>
          
          <div className="grid grid-cols-2 gap-6">
            <ProgressCircle
              percentage={calculatePercentage(totalCalories, calorieGoal)}
              label="Calories"
              current={totalCalories}
              goal={calorieGoal}
              color="#FF6B6B"
            />
            
            <ProgressCircle
              percentage={calculatePercentage(totalProtein, proteinGoal)}
              label="Protein"
              current={totalProtein}
              goal={proteinGoal}
              color="#4ECDC4"
            />
            
            <ProgressCircle
              percentage={calculatePercentage(totalCarbs, carbGoal)}
              label="Carbs"
              current={totalCarbs}
              goal={carbGoal}
              color="#FFD166"
            />
            
            <ProgressCircle
              percentage={calculatePercentage(totalFat, fatGoal)}
              label="Fat"
              current={totalFat}
              goal={fatGoal}
              color="#6B5B95"
            />
          </div>
        </div>
      </div>
      
      {/* Meal List */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Today's Meals</h2>
        
        {meals.length === 0 ? (
          <p className="text-gray-500">No meals added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Meal</th>
                  <th className="p-2 text-left">Calories</th>
                  <th className="p-2 text-left">Protein (g)</th>
                  <th className="p-2 text-left">Carbs (g)</th>
                  <th className="p-2 text-left">Fat (g)</th>
                  <th className="p-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {meals.map((meal) => (
                  <tr key={meal.id} className="border-b">
                    <td className="p-2">{meal.name}</td>
                    <td className="p-2">{meal.calories}</td>
                    <td className="p-2">{meal.protein}</td>
                    <td className="p-2">{meal.carbs}</td>
                    <td className="p-2">{meal.fat}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleDeleteMeal(meal.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="font-bold bg-gray-50">
                  <td className="p-2">Total</td>
                  <td className="p-2">{totalCalories}</td>
                  <td className="p-2">{totalProtein}</td>
                  <td className="p-2">{totalCarbs}</td>
                  <td className="p-2">{totalFat}</td>
                  <td className="p-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MacroTracker;