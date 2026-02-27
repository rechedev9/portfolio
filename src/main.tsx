import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { CSApp } from './CSApp';
import { PokemonApp } from './PokemonApp';
import { WarcraftApp } from './WarcraftApp';
import './index.css';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cs" element={<CSApp />} />
        <Route path="/pokemon" element={<PokemonApp />} />
        <Route path="/warcraft" element={<WarcraftApp />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
