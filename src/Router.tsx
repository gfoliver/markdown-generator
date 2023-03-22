import React from 'react';
import { createBrowserRouter } from "react-router-dom";

import Home from './pages/Home';
import Templates from './pages/Templates';

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/templates", element: <Templates /> },
]);

export default router;