import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Like from "./Like";
import { FaShoppingCart, FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const SmallProduct = ({ product }) => {

  const stars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400 text-sm" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 text-sm" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400 text-sm" />);
      }
    }
    return stars;
  }
  return (
    <div className="max-w-[80rem] bg-[#f1f1f1]/95 rounded-lg  ml-[2rem] p-3">
      {/* products card */}
      <div className="relative group">
        <Link to={`/product/${product._id}`} className="block">
          <img
            src='/sonny.jpg'
            alt={product.name}
            className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-101"
            loading="lazy"
          />
        </Link>
        <div className="absolute top-3 right-3 z-10">
          <Like product={product} />
        </div>

        <div className="absolute inset-0 bg-blue/40 bg-opacity-0 group-hover:bg-opacity-20 transition-all ease-in duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
          <button className="bg-purple-100 text-gray-900 px-4 py-2 rounded-full font-medium text-sm flex items-center space-x-2 shadow-md hover:bg-purple-200 transition-colors duration-300">
            <FaShoppingCart className="text-purple-600" size={20}/>
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
      {/* product details */}
      <div className="p-4">
        <Link to={`/product/${product._id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 hover:text-purple-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
          
          <div className="flex items-center mb-2">
            <div className="flex mr-1">
              {stars(product.rating || 0)}
            </div>
            <span className="text-xs text-gray-500">
              ({product.numReviews || 3})
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-purple-600">
              ${product.price.toFixed(2)}
            </span>
            {product.countInStock > 0 ? (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                In Stock
              </span>
            ) : (
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Out of Stock
              </span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};
SmallProduct.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    numReviews: PropTypes.number.isRequired,
    countInStock: PropTypes.number.isRequired,
  }).isRequired,
};

export default SmallProduct;