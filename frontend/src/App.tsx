import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './utils/theme';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <ThemeProvider theme={theme}> */}
        <Router>
          <AppRoutes />
        </Router>
        {/* </ThemeProvider> */}
      </QueryClientProvider>
    </>
  );
}

export default App;