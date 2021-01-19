import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Badge, Button, Menu } from 'antd';
import {
  HomeOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
  UploadOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UploadProductPage from './components/UploadProductPage/UploadProductPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './modules';
import { logoutUser } from './modules/user';
import DetailPage from './components/DetailPage/DetailPage';
import CartPage from './components/CartPage/CartPage';

function App(): JSX.Element {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const cartLength = userInfo?.cart?.reduce((i, v) => i + v.quantity, 0);
  return (
    <>
      <Menu mode="horizontal">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">HOME</Link>
        </Menu.Item>

        {!userInfo ? (
          <>
            <Menu.Item key="login" icon={<LoginOutlined />}>
              <Link to="/login">LOGIN</Link>
            </Menu.Item>

            <Menu.Item key="register" icon={<UserAddOutlined />}>
              <Link to="/register">REGISTER</Link>
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="upload" icon={<UploadOutlined />}>
              <Link to="/product/upload">UPLOAD</Link>
            </Menu.Item>
            <Menu.Item>
              <span>{userInfo && `${userInfo?.name}님 어서오세요`}</span>
            </Menu.Item>
            <Menu.Item key="cart">
              <Badge count={cartLength}>
                <Link to="/user/cart">
                  <ShoppingCartOutlined />
                </Link>
              </Badge>
            </Menu.Item>
            <Menu.Item key="logout">
              <Button type="primary" onClick={() => dispatch(logoutUser())}>
                로그아웃
              </Button>
            </Menu.Item>
          </>
        )}
      </Menu>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/product/upload" component={UploadProductPage} />
        <Route path="/detail/:id" component={DetailPage} />
        <Route path="/user/cart" component={CartPage} />
      </Switch>
    </>
  );
}

export default App;
