import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import PrivateRoute from './components/routing/PrivateRoute';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/auth/Dashboard';
import Schedule from './pages/main/Schedule';
import Supports from './pages/main/Supports';
import Management from './pages/main/Management';

import User from './pages/management/Users';
import Students from './pages/management/Students';
import Standbys from './pages/management/Standbys';
import ReviewPeriods from './pages/management/ReviewPeriods';

axios.defaults.baseURL = 'http://localhost:8000/';
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute Component={Dashboard} />} />
          <Route path="/schedule" element={<PrivateRoute Component={Schedule} />} />
          <Route path="/management" element={<PrivateRoute Component={Management} />} />
          <Route path="/supports" element={<PrivateRoute Component={Supports} />} />
          
          <Route path="/management/users" element={<PrivateRoute Component={User} />} />
          <Route path="/management/students" element={<PrivateRoute Component={Students} />} />
          <Route path="/management/standbys" element={<PrivateRoute Component={Standbys} />} />
          <Route path="/management/periods" element={<PrivateRoute Component={ReviewPeriods} />} />

          <Route path="*" element={<div>404</div>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
