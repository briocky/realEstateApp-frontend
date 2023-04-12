import { createTheme, ThemeProvider } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AuthContext from './components/context/AuthContext';
import OAuth2Redirect from './components/oauth2/OAuth2Redirect';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AddOfferPage from './pages/AddOfferPage';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#F79256"
      },
      secondary: {
        main: "#CCD5AE"
      },
      white: {
        main: "#FFFFFF"
      },
      black: {
        main: "#000000"
      },
      grey: {
        main: grey[600]
      }
    }
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
