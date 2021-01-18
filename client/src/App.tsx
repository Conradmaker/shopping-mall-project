import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Button, Menu } from 'antd';
import {
  HomeOutlined,
  LoginOutlined,
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

function App(): JSX.Element {
  const { userAuth } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  return (
    <>
      <Menu mode="horizontal">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">HOME</Link>
        </Menu.Item>

        {!userAuth.data?.isAuth ? (
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
              <span>
                {userAuth.data?.isAuth && `${userAuth.data?.name}님 어서오세요`}
              </span>
            </Menu.Item>
            <Menu.Item>
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
      </Switch>
    </>
  );
}

export default App;
