import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { authUser, logoutUser } from '../../modules/user/thunks';

export default function LandingPage(): JSX.Element {
  const { data } = useSelector((state: RootState) => state.user.userAuth);
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
      <h2>{data?.isAuth && `${data?.name}님 어서오세요`}</h2>
      {data && data.isAuth && <button onClick={onLogout}>로그아웃</button>}
    </div>
  );
}
