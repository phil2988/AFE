import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './home-page/home-page';
import LoginPage from './login/login-page';
import { getUser } from './core/user-utils';
import CreatePersonalTrainer from './personal-trainer/create-personal-trainer-form';
import CreateClient from './client/create-client-form';
import CreateWorkout from './workout/create-workout-form';

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
      </Routes>
    </div>
  );
}

export default App;
