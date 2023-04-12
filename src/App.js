import { createTheme, ThemeProvider } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AuthContext from './components/context/AuthContext';
import OAuth2Redirect from './components/oauth2/OAuth2Redirect';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function App() {
  const [user, setUser] = useState(null);
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
            <Route path="/oauth2/redirect" element={<OAuth2Redirect />} />
          </Routes>
        </ThemeProvider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
