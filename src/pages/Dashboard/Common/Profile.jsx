import useAuth from '../../../hooks/useAuth'
import coverImg from '../../../assets/images/cover.jpg'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import EmptyState from '../../../components/Shared/EmptyState';
import { AiFillLike } from 'react-icons/ai';
import { MdSell } from 'react-icons/md';

const Profile = () => {
  const { user } = useAuth()
  const axis = useAxiosSecure();
  const { data, isLoading, error } = useQuery({
    queryKey: ['profile-details', user?.email],
    queryFn: () => axis.get(`${import.meta.env.VITE_SERVER}/profile-details?email=${user?.email}`).then(res => res.data),
    staleTime: 5 * 60 * 1000,
    enabled: !!user?.email
  })
  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[80vh] w-full">
      <LoadingSpinner />
    </div>
  )
  if (error) return <EmptyState message={error.message} address='/' label="Back to Home" />
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5'>
        <img
          alt='cover photo'
          src={coverImg}
          className='w-full mb-4 rounded-t-lg h-56 object-cover'
        />
        <div className='flex flex-col items-center justify-center p-4 -mt-16'>
          <img
            alt='profile picture'
            src={data?.image}
            className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
          />

          <p className='p-2 px-4 text-xs text-white bg-lime-600 font-semibold rounded-full'>
            {data?.role}
          </p>
          <div className='flex items-center gap-2'>
            <span className='flex items-center gap-1 text-gray-600 text-lg' title='Total Liked'>{data?.liked}<AiFillLike /></span>
            <span className='flex items-center gap-1 text-gray-600 text-lg' title='Total Sold'>{data?.totalSold}< MdSell /></span>
          </div>
          <div className='w-full p-2 mt-4 rounded-lg'>
            <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
              <p className='flex flex-col'>
                Name
                <span className='font-bold text-gray-600 '>
                  {data?.name}
                </span>
              </p>
              <p className='flex flex-col'>
                Email
                <span className='font-bold text-gray-600 '>{data?.email}</span>
              </p>
              <p className='flex flex-col'>
                Phone
                <span className='font-bold text-gray-600 '>
                  {data?.phone}
                </span>
              </p>
            </div>
          </div>
          <div className='flex gap-4 justify-between items-center p-2 w-full'>
            <p className='flex flex-col'>
              Address
              <span className='font-bold text-gray-600 '>{data?.address}</span>
            </p>
            <div className='flex flex-wrap gap-4 text-white font-medium'>
              <button className='bg-lime-500  px-6 py-1 rounded-lg cursor-pointer hover:bg-lime-800'>
                Update Profile
              </button>
              <button className='bg-lime-500 px-6 py-1 rounded-lg cursor-pointer hover:bg-lime-800'>
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
