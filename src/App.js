import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './application/store';
import services from './infrastructure/services';
import HomePage from './components/HomePage';
import Login from './components/Login'; // We'll create this below

// Initialize Supabase client
// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseAnonKey);
import { supabase } from "./supabaseClient";

function App() {
  const [session, setSession] = useState(null); // Store the user's session

  // Check authentication status on mount and listen for changes
  useEffect(() => {
    // Get the current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth state changes (e.g., login, logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup listener on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <Provider store={configureStore(services)}>
      <Router>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-300">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <Routes>
          {/* If authenticated, show HomePage; otherwise, redirect to Login */}
          <Route
            path="/"
            element={session ? <HomePage /> : <Navigate to="/login" />}
          />
          {/* Login page */}
          <Route path="/login" element={<Login />} />
          {/* Optional: Redirect any unknown routes to login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        </div>
      </div>
      </Router>
    </Provider>
  );
}

export default App;