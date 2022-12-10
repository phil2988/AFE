import { Routes, Route } from 'react-router-dom';
import HomePage from './home-page/home-page';
import LoginPage from './login/login-page';
import { getUser } from './core/user-utils';
import CreatePersonalTrainer from './personal-trainer/create-personal-trainer-form';
import CreateClient from './client/create-client-form';
import CreateWorkout from './workout/create-workout-form';
import AddExerciseToWorkout from './exercise/create-exercise-form';
import SeeWorkout from './workout/see-workouts';
import SeeWorkouts from './workout/see-workouts';
import SeeClients from './client/see-clients';

function App() {
  if (!getUser().loggedIn) return <LoginPage />;
  return (
    <div className="app">
      <Routes>
        <Route
          path="/create-personal-trainer"
          element={<CreatePersonalTrainer />}
        />
        <Route path="*" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/create-client" element={<CreateClient />} />
        <Route path="/create-workout" element={<CreateWorkout />} />
        <Route path="/create-exercise" element={<AddExerciseToWorkout />} />
        <Route path="/see-workouts" element={<SeeWorkouts />} />
        <Route path="/see-clients" element={<SeeClients />} />
      </Routes>
    </div>
  );
}

export default App;
