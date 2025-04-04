import { useGetTopProductsQuery } from "../../redux/api/ProductApi"
import { Message } from "../../components/Message"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import moment from "moment"
import { FaBox, FaChevronLeft, FaChevronRight, FaStar, FaClock, FaShoppingCart, FaStore, FaHeart } from "react-icons/fa"
import PropTypes from "prop-types"

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-62 z-10 -translate-y-1/2 bg-white/80 hover:bg-purple-50 text-gray-800 rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110 md:p-3"
    aria-label="Previous product">
    <FaChevronLeft className="text-sm md:text-base" />
  </button>
)

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-62 z-10 -translate-y-1/2 bg-white/80 hover:bg-purple-50 text-gray-800 rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110 md:p-3"
    aria-label="Next product">
    <FaChevronRight className="text-sm md:text-base" />
  </button>
)

PrevArrow.propTypes = NextArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
}

const ProductCarousel = () => {
  const { data, isLoading, error } = useGetTopProductsQuery()
  const products = data?.products || data || []

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    autoplay: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: true
        }
      },
      {
        breakpoint: 640,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ]
  }

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar 
        key={i} 
        className={`${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'} inline-block text-sm`}
      />
    ))
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse bg-gray-200 rounded-lg w-full h-full"></div>
      </div>
    )
  }

  if (error) {
    return (
      <Message variant="danger" className="my-8 mx-4">
        {error?.data?.message || error.error || "Failed to load products"}
      </Message>
    )
  }

  return (
    <div className="bg-[#f1f1f1]/95 rounded-xl shadow-md overflow-hidden mx-4 my-8">
      {Array.isArray(products) && products.length > 0 ? (
        <Slider {...settings} className="relative">
          {products.map((product) => (
            <div key={product._id} className="pb-8">
              {/* Product Image */}
              <div className="relative h-64 w-full overflow-hidden group">
                <img
                  src="/sonny.jpg"
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <button className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-all">
                  <FaHeart className="text-pink-500" />
                </button>
              </div>

              {/* Product Details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
                  <p className="text-lg font-bold text-gray-900">Price: <span className="text-lg font-bold text-purple-600">${product.price}.00</span></p>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {renderStars(product.rating || 0)}
                  </div>
                  <span className="text-sm text-gray-900">({product.numReviews || 0})</span>
                </div>

                <p className="text-gray-600 mb-5 line-clamp-2">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center text-sm">
                    <FaStore className="text-purple-500 mr-2" />
                    <span>{product.brand}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <FaClock className="text-purple-500 mr-2" />
                    <span>{moment(product.createdAt).fromNow()}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <FaBox className="text-purple-500 mr-2" />
                    <span>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                  </div>
                </div>

                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center justify-center">
                  <FaShoppingCart className="mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="p-8 text-center">
          <Message variant="info">No featured products available</Message>
        </div>
      )}
    </div>
  )
}

export default ProductCarousel