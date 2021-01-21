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
import { createGlobalStyle, css } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from './modules';

const Dark = createGlobalStyle<{ darkMode: boolean }>`
${props =>
  props.darkMode &&
  css`
    * {
      border-color: #555 !important;
    }
    body {
      background: #102027;
      color: #eee;
    }
    .ant-input-group-addon .ant-btn,
    .ant-table-thead > tr > th,
    .ant-table-cell,
    .ant-radio-inner,
    .ant-checkbox-inner,
    .ant-collapse {
      background: #99b1bd;
      color: #eee !important;
    }
    .ant-form-item-has-success .ant-input,
    .ant-form-item-has-error .ant-input,
    .ant-select:not(.ant-select-customize-input) .ant-select-selector,
    .ant-input-affix-wrapper,
    .ant-table-cell,
    .ant-input,
    .ant-collapse-content,
    .ant-card {
      color: #eee;
      background: #37474f;
    }
    .ant-form-item-label > label,
    h2.ant-typography,
    .ant-typography h2,
    .ant-table-cell,
    h1,
    h2,
    .ant-radio-wrapper,
    .ant-checkbox-wrapper,
    .ant-input-affix-wrapper,
    .ant-card-meta-description,
    .ant-descriptions-title,
    .ant-descriptions-item-label,
    .ant-descriptions-item-content,
    .ant-card-meta-title {
      color: #eee;
    }
    .ant-btn-primary {
      background: #a7c0cd;
    }
  `}
`;
function App(): JSX.Element {
  const { darkMode } = useSelector((state: RootState) => state.ui);
  return (
    <>
      <Dark darkMode={darkMode} />
      <NavBar darkMode={darkMode} />
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
