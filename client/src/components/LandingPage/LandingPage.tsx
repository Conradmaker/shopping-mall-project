import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authUser, logoutUser } from '../../modules/user/thunks';

export default function LandingPage(): JSX.Element {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logoutUser());
  };
  useEffect(() => {
    dispatch(authUser());
  }, []);
  return (
    <div>
      <h1>메인</h1>
      <button onClick={onLogout}>로그아웃</button>
    </div>
  );
}
