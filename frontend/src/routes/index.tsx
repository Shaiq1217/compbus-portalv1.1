import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login/Login';
import FeaturedItems from '../container/FeaturedItems/FeaturedItems';
import { RequireAuth } from '../utils/requireAuth';
import PageLayout from '../pages/BasePage/PageLayout';
import Home from '../pages/home/Home';
import Product from 'src/pages/Product/Product';
import Cart from 'src/container/Cart/Cart';



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
      <Route path="/products/:productId" element={
        <PageLayout >
          <Product />
        </PageLayout>} />
      <Route path="/cart" element={
        <PageLayout >
          <Cart />
        </PageLayout>} />
    </Routes>
  );
};

export default AppRoutes;