import React, { useState, useEffect, useRef } from 'react';
//api
import { login } from '../../redux/apiCalls';
//react hooks
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import useLoginFields from '../../components/forms/useLoginFields';
//router
import { Link, useNavigate, useLocation } from 'react-router-dom';
//components
import BackButton from '../../components/common/BackButton';
//reCaptcha
import ReCAPTCHA from 'react-google-recaptcha';
//styling
import {
  Container,
  Wrapper,
  Title,
  Form,
  InputField,
  Input,
  Label,
  Recaptcha,
  Button,
  Error,
  LinkStyles
} from './Login.style';


const Login = () => {
  const { register, unregister, handleSubmit, formState, formState: { errors, submitCount } } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
      recaptcha: ''
    }
  });

  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const { isFetching, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reRef = useRef();
  const fields = useLoginFields(errors);
  const { state, pathname } = useLocation();

  const handleLogin = async (formValues) => {
    try {
      const username = formValues.username; 
      const password = formValues.password;
      const recaptchaToken = await reRef.current.getValue();
      reRef.current.reset();

      await login(dispatch, { username, password, token: recaptchaToken});

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
          <Button >LOGIN</Button>
          {error && <Error>Something went wrong...</Error>}
          <Link to='/register' style={LinkStyles}>DO NOT REMMEMBER YOUR PASSWORD?</Link>
          <Link to='/register' style={LinkStyles}>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Login