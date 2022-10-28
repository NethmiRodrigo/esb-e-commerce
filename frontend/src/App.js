import { ToastContainer } from 'react-toastify';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import 'react-toastify/dist/ReactToastify.css';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Router>
    </ThemeProvider>
  );
}
