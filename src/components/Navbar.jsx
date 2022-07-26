// Material-UI 
import { Badge } from '@material-ui/core';
import { Search, ShoppingCartOutlined } from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// React
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// Styling
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
  height: 50px;
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
  width: 25%;
  ${mobile({ marginLeft: "10px" })}

`;

const Input = styled.input`
    font-weight: bold;
    border:none;
    outline:none;
    transition: all 0.5s ease;
    border-bottom: 0.7px solid transparent;
    width: 100%;
    padding: 0;
  ${mobile({ width: "50px" })}
  &:focus {
    border-bottom-color: black;
  }
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
  text-decoration: none;
  color: black; 
  font-weight: bold;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;


const Navbar = () => {
  const ref = useRef(null);
  const quantity = useSelector(state => state.cart.quantity);

  const handleClick = () => {
    ref.current.focus();
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
            <Search onClick={handleClick} style={{ color: "black", fontWeight: "bold", cursor: "pointer" }} />
            <Input ref={ref} placeholder="Search" />
          </SearchContainer>
          <MenuItem><Link to='/register' style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}>Register</Link></MenuItem>
          <MenuItem><Link to='/login' style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}>Sign In</Link></MenuItem>
          <Link to="/wishlist" style={{ color: "black" }}>
            <MenuItem>
              <FavoriteBorderIcon />
            </MenuItem>
          </Link>
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