import React, { useState } from 'react';
//api
import axios from 'axios';
import { login } from '../../redux/apiCalls';
//react hooks
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useRegisterFields from '../../components/forms/useRegisterFields';
//router
import { useNavigate } from "react-router-dom";
//reCaptcha
import ReCAPTCHA from 'react-google-recaptcha';
//components
import BackButton from '../../components/common/BackButton';
//styling
import {
  Container,
  Wrapper,
  Title,
  Form,
  InputField,
  Input,
  Label,
  Agreement,
  Button,
  Recaptcha,
  Error
} from './Register.style';

const Register = () => {
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const { register, handleSubmit, formState, formState: { errors, submitCount }, unregister, watch } = useForm({
    mode: 'onBlur',
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

      await axios.post('http://localhost:5000/api/auth/register', { username, email, password, token, showRecaptcha });

      //login after successful register
      try {
        await login(dispatch, { username, password });
        return navigate('/');
      } catch (err) {
        console.log(err);
      }

      return reRef.current.reset();

    } catch (err) {
      console.log(err)
      // console.log(err.response.data)
    }
  }

  useEffect(() => { submitCount >= 2 && setShowRecaptcha(true); }, [submitCount]);

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
                if (submitCount > 1 && formState.defaultValues.recaptcha != '') {
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