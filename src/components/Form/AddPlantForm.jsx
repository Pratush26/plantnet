import toast from "react-hot-toast"
import useAxiosSecure from "../../hooks/useAxiosSecure"
import axios from "axios"

const AddPlantForm = () => {
  const axis = useAxiosSecure()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("image", e.target.image.files[0]);

    const imgResult = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_BB_KEY}`, formData);
    const obj = {
      title: e.target.title.value,
      categories: e.target.categories.value,
      description: e.target.description.value,
      price: e.target.price.value,
      stock: e.target.stock.value,
      image: imgResult.data.data.display_url,
    }
    console.log(obj)
    try {
      const res = await axis.post('/create-plant', obj);
      if (res?.data?.success) toast.success(res.data.message || "Successfully created plant");
      else toast.error(res.data.message || "Failed to create plant");
      e.target.reset()
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }
  return (
    <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <div className='space-y-6'>
            {/* Name */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='title' className='block text-gray-600'>
                Title
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                name='title'
                id='title'
                type='text'
                placeholder='Enter title'
                required
              />
            </div>
            {/* Category */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='categories' className='block text-gray-600 '>
                Category
              </label>
              <input type="text" name="categories" id="categories" placeholder="e.g. indoor, outdoor, flower" className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white" />
            </div>
            {/* Description */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='description' className='block text-gray-600'>
                Description
              </label>

              <textarea
                id='description'
                placeholder='Write plant description here...'
                className='block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border border-lime-300 bg-white focus:outline-lime-500 '
                name='description'
              ></textarea>
            </div>
          </div>
          <div className='space-y-6 flex flex-col'>
            {/* Price & stock */}
            <div className='flex justify-between gap-2'>
              {/* Price */}
              <div className='space-y-1 text-sm'>
                <label htmlFor='price' className='block text-gray-600 '>
                  Price
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                  name='price'
                  id='price'
                  type='number'
                  placeholder='Price per unit'
                  required
                />
              </div>

              {/* stock */}
              <div className='space-y-1 text-sm'>
                <label htmlFor='stock' className='block text-gray-600'>
                  Stock
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                  name='stock'
                  id='stock'
                  type='number'
                  placeholder='Available stock'
                  required
                />
              </div>
            </div>
            {/* Image */}
            <div className=' p-4  w-full  m-auto rounded-lg grow'>
              <div className='file_upload px-5 py-3 border-4 border-dotted border-gray-300 rounded-lg'>
                <div className='flex flex-col w-max mx-auto text-center'>
                  <label>
                    <input
                      className='text-sm cursor-pointer w-full'
                      type='file'
                      name='image'
                      id='image'
                      accept='image/*'
                    />
                    <div className='bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500'>
                      Upload
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full cursor-pointer p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 '
            >
              Save & Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddPlantForm
