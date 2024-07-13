import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Product from '../pages/Product/Product';
import { RequireAuth } from '../utils/requireAuth';
// import SignUpPage from "../pages/signup/signup";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Product />} />
        {/* <Route path="notfication/:eventId/edit/:id" element={<EditScreen />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;