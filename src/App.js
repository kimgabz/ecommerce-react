import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Header from './components/navigation/Header';

import Home from './pages/Home';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";

import History from "./pages/user/History";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";

import UserRoute from "./components/routes/user.route";
import AdminRoute from "./components/routes/admin.route";

import AdminDashboard from "./pages/admin/admin.dashboard";
import CategoryCreate from "./pages/admin/category/category.create";
import CategoryUpdate from "./pages/admin/category/category.update";

import SubCreate from "./pages/admin/sub/sub.create";
import SubUpdate from "./pages/admin/sub/sub.update";

import ProductCreate from "./pages/admin/product/product.create";
import AllProducts from "./pages/admin/product/all.products";
import ProductUpdate from "./pages/admin/product/product.update";
import Product from "./pages/Product";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth.functions";

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
    <>
      <Header/>
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
        <UserRoute exact path="/user/password" component={Password} />

        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <UserRoute exact path="/user/history" component={History} />

        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  );
};

export default App;
