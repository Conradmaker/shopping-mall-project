/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authUser } from '../modules/user/thunks';

// type adminRouteType = null | any;
export default function (
//   SpecificComponent: React.FC<any>,
//   option: null | boolean,
//   adminRoute: adminRouteType = null
) {
  function AuthenticationCheck(): any {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(authUser());
    }, []);
  }
  return AuthenticationCheck;
}
