import { Button } from 'antd';
import React from 'react';
import picture from '../assets/test.png';
const Hooks = () => {
  return (
    <div>
      <img src={picture} />
      <br />
      <Button type="primary">我是demo</Button>
    </div>
  );
};

export default Hooks;
