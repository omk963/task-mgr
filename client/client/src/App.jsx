import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import TasksPage from './pages/TasksPage';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/auth/register' element={<RegisterPage />} />
          <Route path='/auth/login' element={<LoginPage />} />
          <Route path='/tasks' element={<TasksPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;