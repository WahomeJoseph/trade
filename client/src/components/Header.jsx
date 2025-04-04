import { useGetTopProductsQuery } from '../redux/api/ProductApi.js'
import { Loader } from './Loader'
import SmallProduct from '../pages/products/SmallProducts.jsx'
import ProductCarousel from '../pages/products/ProductCarousel'
import { FaExclamationTriangle } from 'react-icons/fa'

export const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery()
  const products = Array.isArray(data) ? data : data?.products || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader size="xl" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-red-50 p-8 rounded-lg">
        <FaExclamationTriangle className="text-red-500 text-4xl mb-4" />
        <h1 className="text-2xl font-bold text-red-600 mb-2">Error Loading Products</h1>
        <p className="text-red-500">
          {error?.data?.message || "Please try again later"}
        </p>
      </div>
    )
  }

  return (
    <header className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-black"></div>
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-purple-600/20 filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-indigo-600/20 filter blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 flex flex-col lg:flex-row gap-12 min-h-screen">
        {/* Left column - Product grid */}
        <div className="w-full lg:w-1/2 bg-transparent p-2 rounded-xl flex flex-col">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-purple-100 mb-4">
              Discover Our <span className="text-[#7231ff]">Featured</span> Collection
            </h1>
            <p className="text-lg text-purple-100 max-w-lg">
              Explore our handpicked selection of premium products
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-grow">
            {products.slice(0, 10).map((product) => (
              <div 
                key={product._id} 
                className="transform transition-all hover:scale-[1.02] hover:shadow-lg"
              >
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Right column - Product carousel */}
        <div className="w-full lg:w-1/2 flex">
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 shadow-lg w-full flex flex-col">
            <h2 className="text-2xl font-bold text-purple-100 mb-6 text-center">
              Customer <span className="text-[#7231ff]">Favorites</span>
            </h2>
            <div className="flex-grow flex items-center">
              <ProductCarousel />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}