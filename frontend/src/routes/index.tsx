import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login/Login';
import FeaturedItems from '../container/Product/Product';
import { RequireAuth } from '../utils/requireAuth';
import PageLayout from '../pages/BasePage/PageLayout';
import Home from '../pages/home/Home';



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path="/" element={
          <PageLayout >
            <Home />
          </PageLayout>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;