import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Planes from './Planes';
import Nosotros from './Nosotros';
import reportWebVitals from './reportWebVitals';
import { ParallaxProvider } from 'react-scroll-parallax';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Terms from './Terms';
import Products from './Productos';
import Home from './Home'
import Viajeros from './Viajeros.js'
import Pagos from './Pagos.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: '/planes',
    element: <Planes />
  },
  {
    path: '/nosotros',
    element: <Nosotros />
  },
  {
    path: '/terms',
    element: <Terms />
  },
  {
    path: '/productos',
    element: <Products />
  },
  {
    path: '/Testing',
    element: <App />
  },
  {
    path: '/Viajeros',
    element: <Viajeros/>
  },
  {
    path: '/Pagos',
    element: <Pagos/>
  }
  
]);


root.render(
  <ParallaxProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ParallaxProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
