import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from '../../redux/features/cart/CartApi';
import { toast } from "react-hot-toast";
import { FaCartShopping } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import PropTypes from 'prop-types';
import { useState } from "react";

export const ProductCard = ({ products }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Added to cart", {
      position: "top-center",
      duration: 1500,
      style: {
        background: '#10B981',
        color: '#fff',
      },
    });
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(
      isWishlisted ? "Removed from wishlist!" : "Added to wishlist!",
      {
        position: "top-center",
        duration: 1500,
        style: {
          background: isWishlisted ? '#EF4444' : '#10B981',
          color: '#fff',
        },
      }
    );
  };

  return (
    <div
      className="relative bg-[#f1f1f1] rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {/* Wishlist Button */}
      <button
        onClick={toggleWishlist}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-colors duration-300 ${isWishlisted
          ? 'text-red-500 bg-white/90 shadow-md'
          : 'text-gray-400 bg-white/80 hover:text-red-500 hover:bg-white/90'
          }`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={isWishlisted ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>

      {/* Product Image */}
      <Link to={`/product/${products._id}`} className="block relative">
        <span className="absolute bottom-3 right-3 bg-purple-600 items-center text-white text-xs font-medium px-2.5 py-0.5 rounded-full z-10">
          {products?.brand}
        </span>

        {/* Image with hover effect */}
        <div className="relative overflow-hidden" style={{ paddingBottom: '75%' }}>
          <img
            className={`absolute w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'
              }`}
            src={products.image}
            alt={products.name}
            loading="lazy"
          />
        </div>
      </Link>

      {/* Quick View (appears on hover) */}
      {isHovered && (
        <Link
          to={`/product/${products._id}`}
          className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <button className="flex items-center justify-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg">
            <FiEye size={18} />
            <span className="text-sm font-medium">Quick View</span>
          </button>
        </Link>
      )}

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
          {products?.name}
        </h3>

        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-gray-900">
            {products?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
            })}
          </span>

          {/* Rating (if available) */}
          {products.rating && (
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(products.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-500'
                    }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-gray-500 ml-1">
                ({products.numReviews || 0})
              </span>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
          {products?.description}
        </p>
        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => addToCartHandler(products, 1)}
            className="flex gap-2 w-full items-center p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-pink-200 transition-colors duration-300"
            aria-label="Add to cart">
            Add To Cart <FaCartShopping size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  products: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    brand: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    rating: PropTypes.number,
    numReviews: PropTypes.number,
  }).isRequired,
};