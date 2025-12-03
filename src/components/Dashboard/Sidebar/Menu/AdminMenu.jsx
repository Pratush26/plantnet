import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Add Seller' address='add-seller' />
    </>
  )
}

export default AdminMenu
