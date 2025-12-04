import UserDataRow from '../../../components/Dashboard/TableRows/UserDataRow'
import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import EmptyState from '../../../components/Shared/EmptyState';

export default function AddSeller() {
  const axis = useAxiosSecure();
  const { data, isLoading, error } = useQuery({
    queryKey: ['add-seller'],
    queryFn: () => axis.get(`${import.meta.env.VITE_SERVER}/seller-request`).then(res => res.data),
    staleTime: 5 * 60 * 1000,
  })
  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[80vh] w-full">
      <LoadingSpinner />
    </div>
  )
  if (error) return <EmptyState message={error.message} address='/' label="Back to Home"/>
  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full table-auto'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Seller Info
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Requested Role
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Status
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map(e => <UserDataRow e={e} key={e._id} />)
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}