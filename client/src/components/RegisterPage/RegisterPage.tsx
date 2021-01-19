import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../modules';
import { authUser, registerUser } from '../../modules/user';
import { LoginContainer } from '../LoginPage/LoginPage';

export default function RegisterPage({
  history,
}: RouteComponentProps): JSX.Element {
  const {
    userRegister: { data: success, loading },
    userInfo,
    errorMsg: error,
  } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    name: '',
  });
  const [passwordError, setPasswordError] = useState(false);
  const { email, password, name, passwordCheck } = inputs;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    if (name === 'passwordCheck') {
      setPasswordError(!(value === password));
    }
  };

  const onSubmit = () => {
    if (passwordError) {
      return alert('비밀번호가 일치하지 않습니다.');
    }
    dispatch(registerUser({ email, password, name }));
    history.push('/');
  };

  useEffect(() => {
    dispatch(authUser());
  }, []);

  useEffect(() => {
    if (userInfo) {
      history.push('/');
    }
    if (success) {
      message.success('회원가입 성공');
      history.push('/login');
    } else if (error) {
      message.error(error);
    }
  }, [userInfo, success]);

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
          rules={[{ required: true, message: '비밀번호를 입력해 주세요!' }]}
        >
          <Input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item
          label="PWCheck"
          name="passwordCheck"
          rules={[{ required: true }]}
        >
          <Input
            type="password"
            name="passwordCheck"
            value={passwordCheck}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: '이름을 입력해 주세요!' }]}
        >
          <Input type="text" name="name" value={name} onChange={onChange} />
        </Form.Item>

        {passwordError && (
          <div style={{ color: '#df6c88' }}>비밀번호가 일치하지 않습니다</div>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            회원가입
          </Button>
          <Button onClick={() => history.push('/')}>취소</Button>
        </Form.Item>
      </Form>
    </LoginContainer>
  );
}
