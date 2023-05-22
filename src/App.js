import { createTheme, ThemeProvider } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AuthContext from './components/context/AuthContext';
import OAuth2Redirect from './components/oauth2/OAuth2Redirect';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AddOfferPage from './pages/AddOfferPage';
import RequireAuth from './components/requireauth/RequireAuth';
import ListOffersPage from './pages/ListOffersPage';
import OfferDetailsPage from './pages/OfferDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import { TOKEN_KEY_NAME } from './constants/consts';
import ListMyOffersPage from './pages/ListMyOffersPage';

function App() {
  const [user, setUser] = useState({ isFetched: false, token: sessionStorage.getItem(TOKEN_KEY_NAME) });

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
      <AuthContext.Provider value={{ user, setUser }}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/oauth2/redirect" element={<OAuth2Redirect />} />
            <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
            <Route path="/offer/add" element={<RequireAuth><AddOfferPage /></RequireAuth>} />
            <Route path="/offers" element={<ListOffersPage />} />
            <Route path="/notfound" element={<NotFoundPage />} />
            <Route path="/offer/details/:id" element={<OfferDetailsPage />} />
            <Route path="/offers/my" element={<ListMyOffersPage />} />
          </Routes>
        </ThemeProvider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
