import { Link, useParams } from 'react-router-dom'
import { useGetProductsQuery } from '../../redux/api/ProductApi.js'
import { Loader } from '../../components/Loader'
import { Message } from '../../components/Message'
import { AddProduct } from '../Admin/AddProduct'
import { Header } from '../../components/Header'

export const Hero = () => {
  const { keyword } = useParams()
  const { data, isLoading, isError, error } = useGetProductsQuery({ keyword })

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (<Loader />) : isError ? (<Message variant='danger'>
        {error?.data.message || error.message || 'An error occurred'}
      </Message>) : (
        <>
          <div className='flex justify-between items-center'>
            <h1 className='ml-[20rem] mt-[10rem] text-[3rem]'>
              Special Products
            </h1>

            <Link
              to='/shop'
              className='bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]'
            >
              Shop
            </Link>
          </div>

          <div>
            <div className='flex justify-center flex-wrap mt-[2rem]'>
              {data.products.map((product) => (
                <div key={product._id}>
                  <AddProduct product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
        {/* {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        
      )} */}
      </>
      )
}
