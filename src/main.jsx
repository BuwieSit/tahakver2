import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './styles.css';
import LandingPage from './pages/LoginRegister';
import Home from './pages/TouristPages/Home';
import OurStory from './pages/TouristPages/OurStory';
import Packages from './pages/TouristPages/Packages';
import Create from './pages/TouristPages/Create';
import Partners from './pages/TouristPages/Partners';
import FAQs from './pages/TouristPages/FAQs';

const router = createBrowserRouter([
  {path: "/", element: <Home/>},
  {path: "/our-story", element: <OurStory/>},
  {path: "/packages", element: <Packages/>},
  {path: "/create", element: <Create/>},
  {path: "/partners", element: <Partners/>},
  {path: "/faqs", element: <FAQs/>},
  {path: "/access", element: <LandingPage/>},
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
