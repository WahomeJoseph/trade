import { useGetTopProductsQuery } from '../redux/api/ProductApi.js'
import { Loader } from './Loader'
// import SmallProduct from '../pages/Products/SmallProduct'
// import ProductCarousel from '../pages/Products/ProductCarousel'

export const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery()

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <h1>ERROR</h1>
  }
  console.log("API Response:", data); // Debugging log

  // Ensure data is in the correct format
  const products = Array.isArray(data) ? data : data?.products || [];

  return (
    <>
      <div className='flex justify-around'>
        <div className='xl:block lg:hidden md:hidden:sm:hidden'>
          <div className='grid grid-cols-2'>
            {products.map((product) => (
              <div key={product._id}>
                {/* <SmallProduct product={product} /> */}
              </div>
            ))}
          </div>
        </div>
        {/* <ProductCarousel /> */}
      </div>
    </>
  )
}