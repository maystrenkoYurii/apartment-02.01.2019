import React, { Component } from 'react';

import Wrapper from '../../../../containers/Pages/Wrapper';
import AboutImage from '../../../../containers/Pages/Public/Home/AboutImage';
import MenuPanel from '../../../../containers/Pages/Public/Home/MenuPanel';
import SystemInfo from '../../../../containers/Pages/Public/Home/SystemInfo';

class Home extends Component {
  render() {
    return (
      <Wrapper>
        <AboutImage />
        <MenuPanel />
        <SystemInfo />
      </Wrapper>
    );
  }
}

export default Home;
