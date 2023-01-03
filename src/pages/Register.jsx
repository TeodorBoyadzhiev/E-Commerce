import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import BackButton from '../components/partials/BackButton';

const Container = styled.div`
  width:100vw;
  height:100vh;
  background: linear-gradient(
    rgba(255,255,255,0.5), 
    rgba(255,255,255,0.5)
  ), 
  url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") 
  center;
  background-size:cover;
  display:flex;
  align-items:center;
  justify-content:center;
`;
const Wrapper = styled.div`
  position: relative;
  width:40%;
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
  display:grid;
  grid-template-columns: 1fr 1fr;
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
const Agreement = styled.span`
  font-size:12px;
  margin:20px 0px;
`;
const Button = styled.button`
  width:40%;
  border:none;
  padding:15px 20px;
  background-color:teal;
  color:white;
  cursor:pointer;
`;

const Register = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Container>
      <Wrapper>
        <BackButton />
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <InputField>
            <Input id="name" required/>
            <Label htmlFor="name">Name</Label>
          </InputField>
          <InputField>
            <Input id="Last name" required/>
            <Label htmlFor="Last name">Last name</Label>
          </InputField>
          <InputField>
            <Input id="Username" required/>
            <Label htmlFor="Username">Username</Label>
          </InputField>
          <InputField>
            <Input id="Email" required/>
            <Label htmlFor="Email">Email</Label>
          </InputField>
          <InputField>
            <Input id="Password" required/>
            <Label htmlFor="Password">Password</Label>
          </InputField>
          <InputField>
            <Input id="Confirm Password" required/>
            <Label htmlFor="Confirm Password">Confirm Password</Label>
          </InputField>
          <Button onClick={handleRegister}>CREATE</Button>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register