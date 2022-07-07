import { Badge } from '@material-ui/core';
import { Search, ShoppingCartOutlined } from '@mui/icons-material';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
  height: 70px;
  ${mobile({ height: "60px" })}
`;

const Wrapper = styled.div`
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ marginLeft: "10px" })}

`;

const Input = styled.input`
  border: none;
  /* border-bottom: ${props => props.isActive ? "1px solid black" : "none"}; */
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px", marginLeft: "10px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;


const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const quantity = useSelector(state => state.cart.quantity);

  const handleStyle = (e) => {
    e.target.style.borderBottom = "1px solid black";
    // setIsActive(() => !isActive);
  }
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language style={{ color: "black", fontWeight: "bold" }}>EN</Language>
        </Left>
        <Center><Logo><Link to='/' style={{ textDecoration: "none", color: "black" }}>TUSHIBA.</Link></Logo></Center>
        <Right>
          <SearchContainer style={{ border: "none" }} >
            <Search onClick={handleStyle} style={{ color: "black", fontWeight: "bold", cursor: "pointer" }} />
            <Input placeholder="Search" isActive={isActive} style={{ outline: "none", paddingBottom: "2px" }} />
          </SearchContainer>
          <MenuItem><Link to='/register' style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}>Register</Link></MenuItem>
          <MenuItem><Link to='/login' style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}>Sign In</Link></MenuItem>
          <Link to="/cart" style={{ color: "black" }}>
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container >
  )
}

export default Navbar