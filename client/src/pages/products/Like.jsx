import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addToFavorites, removeFromFavorites, setFavorites} from "../../redux/features/favs/FavsApi.js";

import { addFavoriteToLocalStorage, getFavoritesFromLocalStorage, removeFavoriteFromLocalStorage } from "../../utils/Localstorage.js";
import PropTypes from "prop-types";

const Like = ({ product }) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites) || [];
    const isFavorite = favorites.some((p) => p._id === product._id);

    useEffect(() => {
        const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
        dispatch(setFavorites(favoritesFromLocalStorage));
    }, []);

    const toggleFavorites = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(product));
            // remove the product from the localStorage as well
            removeFavoriteFromLocalStorage(product._id);
        } else {
            dispatch(addToFavorites(product));
            // add the product to localStorage as well
            addFavoriteToLocalStorage(product);
        }
    };

    return (
        <div
            className="absolute top-1 right-1 cursor-pointer"
            onClick={toggleFavorites}
        >
            {isFavorite ? (
                <FaHeart className="text-red-500" size={20} />
            ) : (
                <FaRegHeart className="text-pink-400 bg-transparent" size={20} />
            )}
        </div>
    );
};
Like.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
    }).isRequired,
};

export default Like;