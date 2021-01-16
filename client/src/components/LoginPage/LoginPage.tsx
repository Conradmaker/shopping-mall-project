import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../modules';
import { authUser, loginUser } from '../../modules/user/thunks';

export default function LoginPage({
  history,
}: RouteComponentProps): JSX.Element {
  const { data: isLogin } = useSelector(
    (state: RootState) => state.user.userAuth
  );
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
  };
  useEffect(() => {
    dispatch(authUser());
  }, []);

  console.log(isLogin);
  if (isLogin) {
    alert('로그인유저만 접근할 수 있습니다.');
    history.push('/');
  }
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
