import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth.functions";
import { LoadingOutlined } from "@ant-design/icons";

// import Header from './components/navigation/Header';
// import SideDrawer from "./components/drawer/side.drawer";
// import Home from './pages/Home';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import RegisterComplete from "./pages/auth/RegisterComplete";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import History from "./pages/user/History";
// import Password from "./pages/user/Password";
// import Wishlist from "./pages/user/Wishlist";
// import UserRoute from "./components/routes/user.route";
// import AdminRoute from "./components/routes/admin.route";
// import AdminDashboard from "./pages/admin/admin.dashboard";
// import CategoryCreate from "./pages/admin/category/category.create";
// import CategoryUpdate from "./pages/admin/category/category.update";
// import SubCreate from "./pages/admin/sub/sub.create";
// import SubUpdate from "./pages/admin/sub/sub.update";
// import ProductCreate from "./pages/admin/product/product.create";
// import AllProducts from "./pages/admin/product/all.products";
// import ProductUpdate from "./pages/admin/product/product.update";
// import CreateCouponPage from "./pages/admin/coupon/coupon.create";
// import Payment from "./pages/Payment";
// import Product from "./pages/Product";
// import CategoryHome from "./pages/category/category.home";
// import SubHome from "./pages/sub/sub.home";
// import Shop from "./pages/Shop";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";

const Header = lazy(() => import("./components/navigation/Header"));
const SideDrawer = lazy(() => import("./components/drawer/side.drawer"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const History = lazy(() => import("./pages/user/History"));
const Password = lazy(() => import("./pages/user/Password"));
const Wishlist = lazy(() => import("./pages/user/Wishlist"));
const UserRoute = lazy(() => import("./components/routes/user.route"));
const AdminRoute = lazy(() => import("./components/routes/admin.route"));
const AdminDashboard = lazy(() => import("./pages/admin/admin.dashboard"));
const CategoryCreate = lazy(() => import("./pages/admin/category/category.create"));
const CategoryUpdate = lazy(() => import("./pages/admin/category/category.update"));
const SubCreate = lazy(() => import("./pages/admin/sub/sub.create"));
const SubUpdate = lazy(() => import("./pages/admin/sub/sub.update"));
const ProductCreate = lazy(() => import("./pages/admin/product/product.create"));
const AllProducts = lazy(() => import("./pages/admin/product/all.products"));
const ProductUpdate = lazy(() => import("./pages/admin/product/product.update"));
const CreateCouponPage = lazy(() => import("./pages/admin/coupon/coupon.create"));
const Payment = lazy(() => import("./pages/Payment"));
const Product = lazy(() => import("./pages/Product"));
const CategoryHome = lazy(() => import("./pages/category/category.home"));
const SubHome = lazy(() => import("./pages/sub/sub.home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));

const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      // console.log("user", user);
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense
    fallback={
      <div className="col text-center p-5">
        __ React Redux EC
        <LoadingOutlined />
        MMERCE __
      </div>
      }
    >
      <Header/>
      <SideDrawer />
      <ToastContainer/>
      <Switch>
        <AdminRoute
          exact
          path="/admin/product/:slug"
          component={ProductUpdate}
        />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={CategoryUpdate}
        />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />

        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/checkout" component={Checkout} />
        <UserRoute exact path="/payment" component={Payment} />

        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/sub/:slug" component={SubHome} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/" component={Home} />

      </Switch>
    </Suspense>
  );
};

export default App;
