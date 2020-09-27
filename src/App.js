import React from 'react';
import { Route, Switch } from 'react-router';
import {JumbotronContainer} from './containers/jumbotron';
import {FooterContainer} from './containers/footer';
import { FaqsContainer } from './containers/faqs';
import * as ROUTES from './constants/routes';

function App() {
  return (
  <>
  <JumbotronContainer />
  <FaqsContainer />
  <FooterContainer />
  </>
  );
}

export default App;
