import Container from '../../components/Shared/Container'
import Heading from '../../components/Shared/Heading'
import Button from '../../components/Shared/Button/Button'
import PurchaseModal from '../../components/Modal/PurchaseModal'
import { useState } from 'react'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import EmptyState from '../../components/Shared/EmptyState'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { AiFillLike } from 'react-icons/ai'
import { MdSell } from 'react-icons/md'

const PlantDetails = () => {
  let [isOpen, setIsOpen] = useState(false)
  const { data, isLoading, error } = useQuery({
    queryKey: ['all-plants', "sd"],
    queryFn: () => axios(`${import.meta.env.VITE_SERVER}/plant/69303d67fd04dec2bd7f3050`).then(res => res?.data),
    staleTime: 5 * 60 * 1000,
  })

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[80vh] w-full">
      <LoadingSpinner />
    </div>
  )
  if (error) return <EmptyState message={error.message} address='/' label="Back to Home" />
  const closeModal = () => {
    setIsOpen(false)
  }
  console.log(data)
  return (
    <Container>
      <div className='mx-auto flex flex-col lg:flex-row justify-between items-center w-full gap-12 my-10'>
        {/* Header */}
        <div className='flex flex-col gap-6 flex-1'>
          <div>
            <div className='w-full overflow-hidden rounded-xl'>
              <img
                className='object-cover w-full'
                src={data?.image}
                alt='header image'
              />
            </div>
          </div>
        </div>
        <div className='md:gap-10 flex-1'>
          {/* Plant Info */}
          <h1 className='text-3xl font-bold'>{data?.title}</h1>
          <div className='my-4'>
            {
              data?.categories?.map((e, i) => <span key={i} className='px-4 py-1 rounded-full bg-zinc-200 text-xs font-semibold capitalize'>{e}</span>)
            }
          </div>
          <p className='text-gray-700 text-sm mt-6'>{data?.description}</p>
          <div className='space-y-2 my-4'>
            <p className='text-lg font-semibold'>Price: ${data?.price}</p>
            <p>Available Stock: {data?.stock}</p>

          </div>
          <article className='border-b border-t border-gray-400 my-4'>
            <h3 className='text-xl font-semibold my-4'>Seller Details</h3>
            <section className='flex gap-3 text-sm'>
              <img
                className='rounded-full h-12 aspect-square object-cover'
                alt='seller image'
                src={data?.seller?.image}
              />
              <span>
                <p className='text-base font-semibold'>{data?.seller?.name}</p>
                <p>{data?.seller?.email}</p>
              </span>
            </section>
            <div className='my-3 space-y-1'>
              <div className='flex items-center gap-2'>
                <span className='flex items-center gap-1 text-gray-600 text-lg' title='Total Liked'>{data?.seller?.liked}<AiFillLike /></span>
                <span className='flex items-center gap-1 text-gray-600 text-lg' title='Total Sold'>{data?.seller?.totalSold}< MdSell /></span>
              </div>
              <p><span className='font-medium'>Contact:</span> {data?.seller?.phone}</p>
              <p><span className='font-medium'>Address:</span> {data?.seller?.address}</p>
            </div>
          </article>
          <div className='flex justify-between'>
            <div>
              <Button onClick={() => setIsOpen(true)} label='Purchase' />
            </div>
          </div>
          <PurchaseModal closeModal={closeModal} isOpen={isOpen} />
        </div>
      </div>
    </Container>
  )
}

export default PlantDetails
