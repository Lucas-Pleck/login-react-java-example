import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/dashboard/Admin';
import Moderator from './pages/dashboard/Moderator';
import User from './pages/dashboard/User';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/admin" element={<Admin />} />
        <Route path="/moderator" element={<Moderator />} />
        <Route path="/user" element={<User />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    <Toaster
      position="top-right"
      toastOptions={{ duration: 2000, className: 'toastStyle' }}
    />
  </Router>
);

export default App;
