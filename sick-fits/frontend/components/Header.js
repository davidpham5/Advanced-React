import Link from 'next/link'
import styled from 'styled-components'
import Nav from './Nav'
import Router from 'next/router';
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => {
  NProgress.done()
}
Router.onRouteChangeError = () => {
  NProgress.done()
}

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
    /* background: ${props => props.theme.purple}; */
    /* color: ${props => props.theme.logoGreen}; */
    text-decoration: none;
    text-transform: uppercase;
    background: #11998e;  /* fallback for old browsers */
    background: linear-gradient(to right, #38ef7d, #11998e);

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  @media (max-width: ${props => props.theme.maxWidth}) {
    margin: 0;
    text-align: center;
  }
`;

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid ${props => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: ${props => props.theme.maxWidth}) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightGrey}
  }
`;

const Header = props => (
  <HeaderStyles>
    <div className='bar'>
      <Logo>
        <Link href='/'>
          <a>Hack the Planet</a>
        </Link>
      </Logo>
      <Nav />
    </div>
    <div className='sub-bar'>
      <p>Search</p>
    </div>
    <div>Cart</div>
  </HeaderStyles>
)

export default Header
