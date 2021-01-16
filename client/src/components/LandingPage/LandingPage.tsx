import axios from 'axios';
import React, { useEffect } from 'react';

export default function LandingPage(): JSX.Element {
  useEffect(() => {
    axios.get('/11').then(res => console.log(res.data));
  }, []);
  return <div>메인</div>;
}
