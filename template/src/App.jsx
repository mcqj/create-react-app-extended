import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import useLiveReload from './hooks/useLiveReload';
import About from './About';
import Home from './Home';

export default function App() {
  useLiveReload();

  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
       </Routes>
    </>
  );
}
