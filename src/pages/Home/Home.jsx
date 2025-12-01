import { Link } from 'react-router'
import Plants from '../../components/Home/Plants'

const Home = () => {
  return (
    <main>
      <section className='text-center flex flex-col items-center justify-center gap-2'>
        <h1 className='text-5xl font-bold text-green-800'>Welcome to PlantNet</h1>
        <p>We are always with you to make the earth more greener, more beautiful and healthy</p>
        <p>All existance lies on the existance of plants</p>
        <p>So, Plant more trees, save lives</p>
        <Link to='/' className='btn trns bg-green-700 hover:bg-green-800 rounded-full text-white font-bold'>Explore our Trees collection</Link>
      </section>
    </main>
  )
}

export default Home
