import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Form, Input, message } from 'antd';
import { RootState } from '../../modules';
import { authUser, loginUser } from '../../modules/user';

export const LoginContainer = styled.div`
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  form {
    width: 400px;
    label {
      width: 100px;
    }
    div {
      display: flex;
      justify-content: flex-end;
    }
    button + button {
      margin-left: 20px;
    }
  }
  @media screen and (max-width: 1200px) {
    padding: 20px;
    .ant-form-item-label {
      justify-content: flex-start;
    }
  }
`;

export default function LoginPage({
  history,
}: RouteComponentProps): JSX.Element {
  const {
    userInfo,
    userLogin: { data: success },
    errorMsg: error,
  } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const { email, password } = inputs;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = () => {
    dispatch(loginUser(inputs));
  };

  useEffect(() => {
    dispatch(authUser());
  }, []);

  useEffect(() => {
    if (userInfo) {
      history.push('/');
    }
    if (success) {
      message.success('로그인 성공');
      history.push('/');
    } else if (error) {
      message.error(error);
    }
  }, [error, success, userInfo]);

  return (
    <LoginContainer>
      <Form onFinish={onSubmit}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: '이메일을 입력해 주세요!' }]}
        >
          <Input type="text" name="email" value={email} onChange={onChange} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
        >
          <Input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            로그인
          </Button>
          <Button onClick={() => history.push('/register')}>회원가입</Button>
        </Form.Item>
      </Form>
    </LoginContainer>
  );
}
