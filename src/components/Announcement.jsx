import React, { Component } from 'react';
import styled from '@emotion/styled';

import Typical from 'react-typical';

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 14px;
  font-weight: 500;
`;
const Wrapper = styled.div`
`;


const Announcement = () => {

  return (
    <Wrapper>
      <Container>
        <Typical
          steps={['Hello!', 3000, 'Super Deal!Free Shipping on Orders Over $50', 2000]}
          loop={Infinity}
          wrapper="p"
        />
        <Typical
          steps={['Hello!', 3000, 'Super Deal!Free Shipping on Orders Over $50', 2000]}
          loop={Infinity}
          wrapper="p"
        />
      </Container>

    </Wrapper>
  )
}


export default Announcement
