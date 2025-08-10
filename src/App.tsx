import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import { Register } from "./pages/auth/Register";
import { Login } from "./pages/auth/Login";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { useAuth } from "./hooks/useAuth";
import { useState } from "react";
import { MediaDetails } from "./components/MediaDetails";
import { DefaultLayout } from "./layouts/DefautLayout";
import { LoadingScreen } from "./components/LoadingScreen";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user && location.pathname !== '/login' && location.pathname !== '/register') {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedMediaType, setSelectedMediaType] = useState<'movies' | 'series'>('movies');

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      <Routes>
        <Route 
          path="/login" 
          element={<Login />}
        />
        <Route 
          path="/register" 
          element={<Register />}
        />

        <Route 
          path="/" 
          element={
            <AuthWrapper>
              <DefaultLayout
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                selectedMediaType={selectedMediaType}
              />
            </AuthWrapper>
          }
        >
          <Route 
            index 
            element={
              <Home 
                searchQuery={searchValue} 
                onSearchChange={setSearchValue}
                onMediaTypeChange={setSelectedMediaType}
              />
            } 
          />
          <Route 
            path="media/:mediaType/:id" 
            element={<MediaDetails />} 
          />
          <Route 
            path="profile/:userId" 
            element={<Profile />} 
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;