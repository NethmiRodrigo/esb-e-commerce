import axios from 'axios';
import jwtDecode from 'jwt-decode';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { JWT_TOKEN } from './utils/constants';

// ----------------------------------------------------------------------

axios.interceptors.request.use(
  (config) => {
    if (config.url.includes('localhost')) {
      const token = localStorage.getItem('Token');
      if (token) {
        const decodedToken = jwtDecode(token, JWT_TOKEN);
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('Token');
        } else config.headers.authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <Router />
    </ThemeProvider>
  );
}
