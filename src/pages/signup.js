import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { HeaderContainer } from '../containers/header';
import { FooterContainer } from '../containers/footer';
import { Footer, Form } from '../components';
import * as ROUTES from '../constants/routes';
import baseUrl from '../helpers/routes';

export default function Signup() {
  const history = useHistory();

  const [firstName, setFirstName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isInvalid = firstName === '' || password === '' || emailAddress === '';

  const handleSignUp = (e) => {
    e.preventDefault();

    fetch(baseUrl.signUp, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        user: {
          name: firstName,
          email: emailAddress,
          password: password,
        },
      }),
    })
      .then((resp) => resp.json())
      // .then(data => )
      .then(() => {
        history.push(ROUTES.BROWSE);
      })
      .catch((error) => {
        setFirstName('');
        setEmailAddress('');
        setPassword('');
        setError(error.message);
      });
  };

  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Sign Up</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}

          <Form.Base onSubmit={handleSignUp} method='POST'>
            <Form.Input
              placeholder='First Name'
              value={firstName}
              onChange={({ target }) => setFirstName(target.value)}
            />
            <Form.Input
              placeholder='Email Address'
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <Form.Input
              type='password'
              placeholder='Password'
              value={password}
              autoComplete='off'
              onChange={({ target }) => setPassword(target.value)}
            />

            <Form.Submit disabled={isInvalid} type='submit'>
              Sign Up
            </Form.Submit>

            <Form.Text>
              Already a user? <Form.Link to='/signin'>Sign in now.</Form.Link>
            </Form.Text>

            <Form.TextSmall>
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot. Learn more.
            </Form.TextSmall>
          </Form.Base>
        </Form>
      </HeaderContainer>
      <FooterContainer />
    </>
  );
}
