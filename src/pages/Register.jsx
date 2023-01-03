import React from 'react';
//api
import axios from 'axios';
//styling
import styled from 'styled-components';
//responsive
import { mobile } from '../responsive';
//react hooks
import { useForm } from 'react-hook-form';
//util
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
  width:35%;
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
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;
const InputField = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  flex-basis: 48%;
  margin: 0px 10px 20px 0px;
  & > input {
    border: ${props=>props.hasError ? '2px solid red' : ''};
    outline: ${props=>props.hasError ? 'red' : ''};
  }
`;
const Input = styled.input`
  flex:1;
  min-width:40%;
  padding:10px;
  height: fit-content;
  &:focus + Label,
  &:valid + Label {
    transform: translate(5px, -7px);
    color: black;;
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
const Error = styled.span`
  color: red;
`;

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });
  const handleRegister = async (formValues) => {
    try {
      const username = formValues.username;
      const email = formValues.email;
      const password = formValues.password;
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
        <Form onSubmit={handleSubmit(handleRegister)} noValidate>
          <InputField hasError={errors.firstName ? true : false}>
            <Input
              id="firstName" 
              {...register('firstName', { required: 'This filed is required', minLength: {value: 11, message: 'Required at least 11 charcters'} })} 
              required />
              <Label htmlFor="firstName">First Name</Label>
              {errors.firstName && <Error>{errors.firstName.message}</Error>}
          </InputField>
          <InputField hasError={errors.lastName ? true : false}>
            <Input
              id="lastName"
              {...register('lastName', { required: 'This filed is required', minLength: {value: 7, message: 'Required at least 7 charcters'} })}
              required />
            <Label htmlFor="lastName">Last name</Label>
            {errors.lastName && <Error>{errors.lastName.message}</Error>}
          </InputField>
          <InputField hasError={errors.username ? true : false}>
            <Input
              id="username"
              {...register('username', { required: 'This filed is required', minLength: {value: 4, message: 'Required at least 4 charcters'} })}
              required />
              <Label htmlFor="username">Username</Label>
              {errors.username ? <Error>{errors.username.message}</Error> : ''}
          </InputField>
          <InputField hasError={errors.email ? true : false}>
            <Input
            id="email" {...register('email', { required: 'This filed is required', pattern: {value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z]+\.(com|bg|net)$/, message: 'This email is invalid'}})} required />
            <Label htmlFor="email">Email</Label>
            {errors.email ? <Error>{errors.email.message}</Error> : ''}
          </InputField>
          <InputField hasError={errors.password ? true : false}>
            <Input
            id="password" {...register('password', { required: 'This filed is required', minLength: {value: 5, message: 'Required at least 5 charcters'} })} required />
            <Label htmlFor="password">Password</Label>
            {errors.password ? <Error>{errors.password.message}</Error> : ''}
          </InputField>
          <InputField hasError={errors.confirmPassword ? true : false}>
            <Input
            id="confirmPassword" {...register('confirmPassword', { required: 'This filed is required', minLength: {value: 5, message: 'Required at least 5 charcters'} })} required />
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            {errors.confirmPassword ? <Error>{errors.confirmPassword.message}</Error> : ''}
          </InputField>
          <Button type='submit'>CREATE</Button>
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