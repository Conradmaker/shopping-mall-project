import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Menu } from 'antd';
import {
  HomeOutlined,
  LoginOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';

function App(): JSX.Element {
  return (
    <>
      <Menu mode="horizontal">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">HOME</Link>
        </Menu.Item>

        <Menu.Item key="login" icon={<LoginOutlined />}>
          <Link to="/login">LOGIN</Link>
        </Menu.Item>

        <Menu.Item key="register" icon={<UserAddOutlined />}>
          <Link to="/register">REGISTER</Link>
        </Menu.Item>
      </Menu>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </Switch>
    </>
  );
}

export default App;
