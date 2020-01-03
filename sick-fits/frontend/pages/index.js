import Link from 'next/link';
import Items from './items';

const Home = props => {
  console.log(props.query)
  return (
    <div>
      <Items page={parseFloat(props.query.page) || 1} />
    </div>
  )
}

export default Home
