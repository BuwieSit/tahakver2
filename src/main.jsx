import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
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
import Profile from './pages/TouristPages/Profile';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';
import AdminDashboard from './pages/AdminPages/Dashboard';
import AdminLayout from './layouts/AdminLayout';
import ManagePackages from './pages/AdminPages/ManagePackages';
import ManageActivities from './pages/AdminPages/ManageActivities';

const Layout = () => (
  <>
    <ScrollToTop />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {index: true, element: <Home/>},
      {path: "our-story", element: <OurStory/>},
      {path: "packages", element: <Packages/>},
      {path: "create", element: <Create/>},
      {path: "partners", element: <Partners/>},
      {path: "faqs", element: <FAQs/>},
      {path: "booking", element: <Booking/>},
      {path: "privacy-policy", element: <PrivacyPolicy/>},
      {path: "profile", element: <Profile/>},
      {path: "access", element: <LandingPage/>},
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "packages", element: <ManagePackages /> },
          { path: "activities", element: <ManageActivities /> },
          { path: "bookings", element: <div className="text-white">Bookings Management (Coming Soon)</div> },
          { path: "users", element: <div className="text-white">User Management (Coming Soon)</div> },
          { path: "settings", element: <div className="text-white">Settings (Coming Soon)</div> },
        ]
      },
    ]
  },
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
