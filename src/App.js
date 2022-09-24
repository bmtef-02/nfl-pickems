import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/HomepageComponent.js';
import Homepage2 from './components/HomepageComponent2.js';

function App() {
  return (
    <Routes>
        <Route path='/' element={<Homepage2 />} />
    </Routes>
  );
}

export default App;
