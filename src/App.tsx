import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from './NotFound';
import { Portfolio } from './Portfolio';

// Shared by the browser entry and the prerender, so both build the same tree and useId agrees.
export function App(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
