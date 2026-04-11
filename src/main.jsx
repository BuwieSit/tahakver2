import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './styles.css';
import { LanguageProvider } from './contexts/LanguageContext';
import LandingPage from './pages/LoginRegister';
import Home from './pages/TouristPages/Home';
import OurStory from './pages/TouristPages/OurStory';
import Packages from './pages/TouristPages/Packages';
import Create from './pages/TouristPages/Create';
import Partners from './pages/TouristPages/Partners';
import FAQs from './pages/TouristPages/FAQs';
import Booking from './pages/TouristPages/Booking';
import PrivacyPolicy from './pages/TouristPages/PrivacyPolicy';
import LoadingScreen from './components/LoadingScreen';

const router = createBrowserRouter([
  {path: "/", element: <Home/>},
  {path: "/our-story", element: <OurStory/>},
  {path: "/packages", element: <Packages/>},
  {path: "/create", element: <Create/>},
  {path: "/partners", element: <Partners/>},
  {path: "/faqs", element: <FAQs/>},
  {path: "/booking", element: <Booking/>},
  {path: "/privacy-policy", element: <PrivacyPolicy/>},
  {path: "/access", element: <LandingPage/>},
])

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <LanguageProvider>
        <RouterProvider router={router}/>
    </LanguageProvider>
  );
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
