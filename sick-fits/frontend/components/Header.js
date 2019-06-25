import Nav from './Nav'

const Header = props => (
  <div>
    <div className='bar'>
      <a href='/'>Pham Fits 5</a>
      <Nav />
    </div>
    <div className='sub-bar'>
      <p>Search</p>
    </div>
    <div>Cart</div>
  </div>
)

export default Header
