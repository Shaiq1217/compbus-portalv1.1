
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './utils/theme';
import { ThemeProvider } from '@mui/material';
import { ToastProvider } from './components/Toast/Toast';
import { CartProvider } from './components/Cart/CartProvider';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <CartProvider>
            <Router>
              <AppRoutes />
            </Router>
          </CartProvider>
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
