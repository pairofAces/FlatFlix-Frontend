import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HeaderContainer } from '../containers/header';
import { FooterContainer } from '../containers/footer';
import { Form } from '../components';
import * as ROUTES from '../constants/routes';
import baseUrl from '../helpers/routes';

export default function Signin() {
  const history = useHistory();
  const [emailAddress, setEmailAddress] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState('');

  const isInvalid = password === '' || emailAddress === ``;

  const handleSignIn = (e) => {
    e.preventDefault();

    fetch(baseUrl.signIn, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: emailAddress,
          password: password,
        },
      }),
    })
      .then((resp) => resp.json())
      // .then(data => )
      .then(console.log)
      .then(() => {
        history.push(ROUTES.BROWSE);
      })
      .catch((error) => {
        setEmailAddress('');
        setPassword('');
        setError(error.message);
      });
  };

  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Sign In</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}
          <Form.Base onSubmit={handleSignIn} method='POST'>
            <Form.Input
              placeholder='Email Address'
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <Form.Input
              type='password'
              placeholder='Password'
              autoComplete='off'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Form.Submit disabled={isInvalid} type='submit'>
              Sign In
            </Form.Submit>
          </Form.Base>
          <Form.Text>
            New to FlatFlix? <Form.Link to='/signup'>Sign up now.</Form.Link>
          </Form.Text>
          <Form.TextSmall>
            This page is protected by Google reCAPTCHA to ensure you are not a
            bot. Learn more.
          </Form.TextSmall>
        </Form>
      </HeaderContainer>
      <FooterContainer />
    </>
  );
}
