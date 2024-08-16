import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import SearchPage from './pages/SearchPage';
import GifDetailPage from './pages/GifDetailPage';
import Navbar from './pages/Navbar';


const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/gif/:id" element={<GifDetailPage />} />
      </Routes>
      
    </Router>
  );
};

export default App;
