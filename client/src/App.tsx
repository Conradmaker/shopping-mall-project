import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UploadProductPage from './components/UploadProductPage/UploadProductPage';
import DetailPage from './components/DetailPage/DetailPage';
import CartPage from './components/CartPage/CartPage';
import HistoryPage from './components/HistoryPage/HistoryPage';
import NavBar from './components/common/NavBar/NavBar';

function App(): JSX.Element {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/product/upload" component={UploadProductPage} />
        <Route path="/detail/:id" component={DetailPage} />
        <Route path="/user/cart" component={CartPage} />
        <Route path="/history" component={HistoryPage} />
      </Switch>
    </>
  );
}

export default App;
