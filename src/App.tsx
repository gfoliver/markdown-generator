import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { useDarkMode } from './context/Dark';

import router from './Router';

function App() {
  const {isDarkMode} = useDarkMode();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="flex flex-col w-full min-h-screen bg-light dark:bg-dark text-text dark:text-text-dark">
        <div className="container flex flex-col flex-grow py-12 mx-auto">
          <RouterProvider router={router} />
        </div>
      </div>
    </div>
  );
}

export default App;
