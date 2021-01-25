import React, { useCallback, useMemo } from 'react';
import { Badge, Button, Menu, Switch } from 'antd';
import {
  HomeOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
  UploadOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import { Cart, logoutUser } from '../../../modules/user';
import { toggleTheme } from '../../../modules/ui';

function countCart(cart: Cart[]): number | null {
  if (!cart) return null;
  return cart.reduce((i, v) => i + v.quantity, 0);
}
type NavBarProps = {
  darkMode: boolean;
};
function NavBar({ darkMode }: NavBarProps): JSX.Element {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const cartLength = useMemo(() => countCart(userInfo?.cart as []), [userInfo]);
  const toggleDark = useCallback(() => {
    dispatch(toggleTheme());
  }, [darkMode]);

  return (
    <Menu mode="horizontal" theme={darkMode ? 'dark' : 'light'}>
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
            <Link to="/history">
              <span>Buy History</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="cart">
            <Badge count={cartLength}>
              <Link to="/user/cart">
                <ShoppingCartOutlined />
              </Link>
            </Badge>
          </Menu.Item>
          <Menu.Item>
            <Link to="/">
              <span>{userInfo && `${userInfo?.name}님 어서오세요`}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="logout">
            <Button type="primary" onClick={() => dispatch(logoutUser())}>
              로그아웃
            </Button>
          </Menu.Item>
        </>
      )}
      <Switch
        checkedChildren="LIGHT"
        unCheckedChildren="DARK"
        defaultChecked
        onChange={toggleDark}
      />
    </Menu>
  );
}

export default NavBar;
