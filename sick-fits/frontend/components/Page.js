import React, { Component } from 'react';
import styled, {ThemeProvider, injectGlobal} from 'styled-components';
import Header from '../components/Header';
import Meta from '../components/Meta';

const theme = {
  red: '#ff0000',
  black: '#393939',
  grey: '#3a3a3a',
  lightGrey: '#e1e1e1',
  offWhite: '#hsla(257, 21%, 94%, 1.00)',
  maxWidth: '1200px',
  purple: 'hsl(296, 89%, 25%)',
  accent: 'hsl(296, 89%, 25%)',
  logoGreen: 'HSLA(135, 100%, 47%, 1.00)',
  bs: '0 12px 24px 0 rbga(0, 0, 0, 0.09)'
}

const LayoutStyles = styled.div`
  background: ${props => props.theme.offWhite};
  color: ${props => props.theme.black};
`;

const ContainerStyles = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
  box-shadow: ${props => props.theme.bs};
`;

injectGlobal`
  @font-face {
    font-family: 'radnika-next';
    src: url('/static/radnikanext-medium-webfont.woff2')
    format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'radnika-next';
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
`
class Page extends Component {
  render () {
    return (
      <ThemeProvider theme={theme}>
        <LayoutStyles>
          <Meta />
          <Header />
          <ContainerStyles>
            {this.props.children}
          </ContainerStyles>
        </LayoutStyles>
      </ThemeProvider>
    )
  }
}

export default Page
