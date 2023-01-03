import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { login } from '../redux/apiCalls';
import { mobile } from '../responsive';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import BackButton from '../components/partials/BackButton';

const Container = styled.div`
  width:100vw;
  height:100vh;
  background: linear-gradient(
    rgba(255,255,255,0.5), 
    rgba(255,255,255,0.5)
  ), 
  url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") 
  center;
  background-size:cover;
  display:flex;
  align-items:center;
  justify-content:center;
  `;
const Wrapper = styled.div`
  position: relative;
  width:25%;
  padding:40px 20px 20px 30px;
  background-color:white;
  ${mobile({ width: "75%" })};   

`;
const Title = styled.h1`
  position: absolute;
  top: -37px;
  font-size:24px;
  font-weight:300;
`;
const Form = styled.form`
  display:flex;
  flex-direction:column;
`;
const InputField = styled.div`
  display: flex;
  position: relative;
  margin: 0px 10px 20px 0px;
`;
const Input = styled.input`
  flex:1;
  min-width:40%;
  margin: 0px 10px 20px 0px;
  padding:10px;
  &:focus + Label,
  &:valid + Label {
      transform: translate(5px, -7px);
      color: black;
      font-size: 0.75em;
      background-color: white;
      transition: 0.2s ease-in-out;
    }
`;
const Label = styled.label`
  position: absolute;
  cursor: text;
  transform: translate(11px, 3px);
  color: rgb(155, 155, 155);
  transition: 0.2s ease-in-out;
`;
const Button = styled.button`
  width:40%;
  border:none;
  padding:15px 20px;
  background-color:teal;
  color:white;
  cursor:pointer;
  margin-bottom:10px;
  &:disabled{
    color:green;
    cursor:not-allowed;
  }
`;
const LinkStyles = {
  margin: '5px 0px',
  fontSize: '12px',
  textDecoration: 'none',
  color: 'rgb(155,155,155)',
  cursor: 'pointer'
};
const Error = styled.span`
  color:red;
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault();

    login(dispatch, { username, password })
  }
  return (
    <Container>
      <Wrapper>
        <BackButton />
        <Title>SIGN IN</Title>
        <Form>
          <InputField>
            <Input
              id="Username"
              onChange={(e) => setUsername(e.target.value)}
              required />
            <Label htmlFor="Username">Username</Label>
          </InputField>
          <InputField>
            <Input
              id="Password"
              onChange={(e) => setPassword(e.target.value)}
              required />
            <Label htmlFor="Password">Password</Label>
          </InputField>
          <Button onClick={handleLogin} disabled={isFetching}>LOGIN</Button>
          {error && <Error>Something went wrong...</Error>}
          <Link to='/register' style={LinkStyles}>DO NOT REMMEMBER YOUR PASSWORD?</Link>
          <Link to='/register' style={LinkStyles}>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Login