import React, { useState } from 'react';
//api
import axios from 'axios';
import { login } from '../redux/apiCalls';
//styling
import styled from 'styled-components';
//responsive
import { mobile, mobileLarge, mobileMedium } from '../responsive';
//react hooks
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useRegisterFields from '../components/forms/useRegisterFields';
//router
import { useNavigate } from "react-router-dom";
//reCaptcha
import ReCAPTCHA from 'react-google-recaptcha';
//components
import BackButton from '../components/common/BackButton';

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
  border-radius: 40px 0px;
  ${mobile({ width: "75%" })};   
  ${mobileMedium({ width: "75%" })};   
  ${mobileLarge({ width: "75%", transition: '1s ease-in-out' })};   

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
    ${mobile({width: 'auto', margin: '0 30px'})}
    ${mobileMedium({width: 'auto', margin: '0 30px'})}
`;
const InputField = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  flex-basis: 37%;
  margin: 0px 10px 20px 0px;
  ${mobileMedium({margin: '0px 0px 20px 0px'})}

`;
const Input = styled.input`
  min-width:40%;
  padding: 10px 40px 10px 10px;
  height: fit-content;
  border: ${props => props.hasError && '2px solid red'};
  outline: ${props => props.hasError && 'red'};
  &:focus + Label,
  &:valid + Label {
    transform: translate(5px, -7px);
    color: ${props => props.hasError ? 'red' : 'black'};
    font-size: 0.75em;
    background-color: white;
    transition: 0.2s ease-in-out;
  }
  ${mobile({padding: '10px 20px 10px 10px'})}
  ${mobileMedium({padding: '10px 20px 10px 10px'})}
  ${mobileLarge({transition: '1s ease-in-out'})}
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
  margin: 0 25px;
  cursor:pointer;
`;
const Recaptcha = styled.div`
  margin: 20px;
  display: ${props => props.showRecaptcha ? 'block' : 'none'};
`;
const Error = styled.span`
  color: red;
`;

const Register = () => {
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const { register, handleSubmit, formState, formState: { errors, submitCount }, unregister, watch } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      recaptcha: 'recaptcha'
    }
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fields = useRegisterFields(watch, errors);
  const reRef = useRef();

  const handleRegister = async (formValues) => {
    try {
      const username = formValues.username;
      const email = formValues.email;
      const password = formValues.password;
      const token = await reRef.current.getValue();

      reRef.current.reset();
      const res = await axios.post('http://localhost:5000/api/auth/register', { username, email, password, token });

      //login after successful register
      try {
        const log = await login(dispatch, { username, password });
        return navigate('/');
      } catch (err) {
        console.log(err);
      }

    } catch (err) {
      console.log(err)
      // console.log(err.response.data)
    }
  }

  useEffect(() => { submitCount === 2 && setShowRecaptcha(true); }, [submitCount]);

  return (
    <Container>
      <Wrapper>
        <BackButton />
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit(handleRegister)} noValidate>
          <InputField>
            <Input {...fields.username} {...register('username', fields.username.validation)} />
            <Label htmlFor="username">Username</Label>
            {errors.username && <Error>{errors.username.message}</Error>}
          </InputField>
          <InputField>
            <Input {...fields.email} {...register('email', fields.email.validation)} />
            <Label htmlFor="email">Email</Label>
            {errors.email && <Error>{errors.email.message}</Error>}
          </InputField>
          <InputField>
            <Input {...fields.password} {...register('password', fields.password.validation)} />
            <Label htmlFor="password">Password</Label>
            {errors.password && <Error>{errors.password.message}</Error>}
          </InputField>
          <InputField>
            <Input {...fields.confirmPassword} {...register('confirmPassword', fields.confirmPassword.validation)} />
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            {errors.confirmPassword && <Error>{errors.confirmPassword.message}</Error>}
          </InputField>
          <Recaptcha
            showRecaptcha={showRecaptcha}
            {...register('recaptcha', {
              validate: () => {
                if (submitCount > 1 && formState.defaultValues.recaptcha) {
                  return 'This field is required'
                }
              }
            })}>
            <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} size="normal" onChange={() => unregister('recaptcha')} ref={reRef} />
            {errors.recaptcha && <Error>{errors.recaptcha.message}</Error>}
          </Recaptcha>
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