import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { loginUser } from '../../modules/user/thunks';

export default function LoginPage({
  history,
}: RouteComponentProps): JSX.Element {
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
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputs);
    dispatch(loginUser(inputs));
    history.push('/');
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input type="text" name="email" value={email} onChange={onChange} />
        <label>Password</label>
        <input
          type="text"
          name="password"
          value={password}
          onChange={onChange}
        />
        <button>Login</button>
      </form>
    </div>
  );
}
