import React, { useState, useEffect } from 'react';

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [exercise, setExercise] = useState('');
  const [duration, setDuration] = useState('');

  // Dynamic 1: Fetch workouts on load
  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    const res = await fetch('http://localhost:5000/api/workouts');
    const data = await res.json();
    setWorkouts(data);
  };

  // Dynamic 2: Log new workout
  const logWorkout = async (e) => {
    e.preventDefault();
    const workout = { exercise, duration, timestamp: new Date().toLocaleString() };
    await fetch('http://localhost:5000/api/workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workout)
    });
    setExercise(''); setDuration('');
    fetchWorkouts(); // Refresh list
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">Fitness Tracker</h1>
        
        {/* Log Workout Form - Dynamic Interaction 1 */}
        <form onSubmit={logWorkout} className="bg-gray-50 p-8 rounded-xl mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Log Workout</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Exercise (e.g., Running)"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              className="p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
              required
            />
            <input
              type="number"
              placeholder="Duration (minutes)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
              required
            />
          </div>
          <button type="submit" className="w-full mt-6 bg-blue-600 text-white py-4 rounded-xl text-xl font-bold hover:bg-blue-700 transition-all">
            Log Workout 💪
          </button>
        </form>

        {/* Workout History - Dynamic Interaction 2 */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Workout History ({workouts.length})</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {workouts.map((w, i) => (
              <div key={i} className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">{w.exercise}</div>
                <div className="text-lg opacity-90">{w.duration} minutes</div>
                <div className="text-sm opacity-75">{w.timestamp}</div>
              </div>
            ))}
            {workouts.length === 0 && (
              <p className="text-center text-gray-500 text-xl py-12">No workouts yet. Log your first one! 🚀</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
