import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './home-page/home-page';
import LoginPage from './login/login-page';
import { getUser } from './core/user-utils';
import CreatePersonalTrainer from './users/create-personal-trainer-form';

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
      </Routes>
    </div>
  );
}

export default App;
