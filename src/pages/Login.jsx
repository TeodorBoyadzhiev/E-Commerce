import React, { useState, useEffect, useRef } from 'react'
//api
import { login } from '../redux/apiCalls';
//styling
import styled from 'styled-components';
//responsive
import { mobile } from '../responsive';
//react hooks
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import useLoginFields from '../components/forms/useLoginFields';
//router
import { Link, useNavigate, useLocation } from 'react-router-dom';
//components
import BackButton from '../components/common/BackButton';
//reCaptcha
import ReCAPTCHA from 'react-google-recaptcha';

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
  border-radius: 40px 0px;
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
  align-items: center;
  justify-content: center;
`;
const InputField = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  position: relative;
  flex-basis: 37%;
  margin: 0px 10px 20px 0px;
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
`;
const Label = styled.label`
  position: absolute;
  cursor: text;
  transform: translate(11px, 3px);
  color: rgb(155, 155, 155);
  transition: 0.2s ease-in-out;
`;
const Recaptcha = styled.div`
  margin: 20px;
  display: ${props => props.showRecaptcha ? 'block' : 'none'};
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
  const { register, unregister, handleSubmit, formState, formState: { errors, submitCount } } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
      recaptcha: ''
    }
  });

  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const dispatch = useDispatch();
  const fields = useLoginFields(errors);
  const reRef = useRef();
  const navigate = useNavigate();
  const { state , pathname } = useLocation();
  const { isFetching, error } = useSelector((state) => state.user);
  
  const handleLogin = async (formValues) => {
    try {
      const username = formValues.username;
      const password = formValues.password;
      const token = await reRef.current.getValue();
      reRef.current.reset();
      
      await login(dispatch, { username, password, token });
      
      const direction = state ? pathname : "/";
      navigate(direction);

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => { submitCount === 2 && setShowRecaptcha(true); }, [submitCount]);

  return (
    <Container>
      <Wrapper>
        <BackButton />
        <Title>SIGN IN</Title>
        <Form onSubmit={handleSubmit(handleLogin)} noValidate>
          <InputField>
            <Input {...fields.username} {...register('username', fields.username.validation)} />
            <Label htmlFor="username">Username</Label>
            {errors.username && <Error>{errors.username.message}</Error>}
          </InputField>
          <InputField>
            <Input {...fields.password} {...register('password', fields.password.validation)} />
            <Label htmlFor="password">Password</Label>
            {errors.password && <Error>{errors.password.message}</Error>}
          </InputField>
          <Recaptcha
            showRecaptcha={showRecaptcha}
            {...register('recaptcha', {
              validate: () => {
                if (submitCount > 1 && formState.defaultValues.recaptcha === '') {
                  return 'This field is required'
                }
              }
            })}>
            <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} size="normal" onChange={() => unregister('recaptcha')} ref={reRef} />
            {errors.recaptcha && <Error>{errors.recaptcha.message}</Error>}
          </Recaptcha>
          <Button disabled={isFetching}>LOGIN</Button>
          {error && <Error>Something went wrong...</Error>}
          <Link to='/register' style={LinkStyles}>DO NOT REMMEMBER YOUR PASSWORD?</Link>
          <Link to='/register' style={LinkStyles}>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Login