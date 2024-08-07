// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import Login from './components/login';
import WorkShopLogin from './components/WorkShoplogin';
import SuperAdminLogin from './components/SuperAdminLogin';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './components/Dashboard';
import { Provider } from 'react-redux';
import store from './redux/store';



const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/workshop-login" element={<WorkShopLogin />} />
          <Route path="/super-login" element={<SuperAdminLogin />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
