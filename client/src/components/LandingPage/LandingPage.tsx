import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../modules';
import { authUser, logoutUser } from '../../modules/user';

const LandingPageContaiber = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 90vh;
`;
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
    <LandingPageContaiber>
      <h1>메인페이지</h1>
      <h2>{data?.isAuth && `${data?.name}님 어서오세요`}</h2>
      {data && data.isAuth && <button onClick={onLogout}>로그아웃</button>}
    </LandingPageContaiber>
  );
}
