import { Dialog, DialogTitle, DialogPanel } from '@headlessui/react'
import { useContext } from 'react'
import { AuthContext } from '../../providers/AuthContext'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'

export default function BecomeSellerModal({ closeModal, isOpen }) {
  const { user } = useContext(AuthContext)
  const axis = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const obj = {
      address: e.target.location.value,
      name: user?.displayName,
      requestedRole: "seller",
      image: user?.photoURL,
      email: user?.email
    };

    try {
      const res = await axis.post('/seller-request', obj);
      if (res?.data?.success) toast.success(res.data.message || "Successfully submitted seller request");
      else toast.error(res.data.message || "Failed to submit seller request");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Dialog
      open={isOpen}
      as='div'
      className='relative z-10 focus:outline-none '
      onClose={close}
    >
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <form onSubmit={handleSubmit} className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel
            transition
            className='w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl'
          >
            <DialogTitle
              as='h3'
              className='text-lg font-semibold text-center leading-6 text-gray-900 my-2'
            >
              Become A Seller!
            </DialogTitle>
            <div className='flex flex-col gap-2'>
              <label htmlFor="location" className='text-sm font-medium'>Location:</label>
              <input type="text" name="location" id="location" placeholder='Enter your/store location' className='bg-gray-200 px-4 py-2 rounded-lg focus:outline-none' required />
            </div>
            <div className='flex mt-2 justify-around'>
              <button
                type='submit'
                className='cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
              >
                Continue
              </button>
              <button
                type='button'
                className='cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </form>
      </div>
    </Dialog>
  )
}