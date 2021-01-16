import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { authUser, registerUser } from '../../modules/user/thunks';

export default function RegisterPage({
  history,
}: RouteComponentProps): JSX.Element {
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
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordError) {
      return alert('비밀번호가 일치하지 않습니다.');
    }
    dispatch(registerUser({ email, password, name }));
    history.push('/');
  };
  useEffect(() => {
    dispatch(authUser());
  }, []);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input type="text" name="email" value={email} onChange={onChange} />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
        />
        <label>PasswordCheck</label>
        <input
          type="password"
          name="passwordCheck"
          value={passwordCheck}
          onChange={onChange}
        />
        <label>Name</label>
        <input type="text" name="name" value={name} onChange={onChange} />
        {passwordError && <div>비밀번호가 일치하지 않습니다</div>}
        <button>Login</button>
      </form>
    </div>
  );
}
