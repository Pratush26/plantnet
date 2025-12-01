import { Outlet } from 'react-router'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'
const MainLayout = () => {
  return (
    <div className='flex flex-col w-full items-center justify-between min-h-screen'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout
