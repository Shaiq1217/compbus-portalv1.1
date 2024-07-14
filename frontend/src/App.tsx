
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';

import theme from './utils/theme';
import { ThemeProvider } from '@mui/material';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
      <Router>
          <AppRoutes />
      </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
