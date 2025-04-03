import { Link } from 'react-router-dom';
import moment from 'moment';
import { useAllProductsQuery } from '../../redux/api/ProductApi';
import { AdminMenu } from './AdminMenu';
import { Loader } from '../../components/Loader';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export const Products = () => {
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);

    // Skip query if user is not admin
    const {
        data: products,
        isLoading,
        isError,
        error
    } = useAllProductsQuery(undefined, {
        skip: !user?.isAdmin
    });

    // Redirect if not admin
    if (!user?.isAdmin) {
        navigate('/unauthorized');
        return null;
    }

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return (
            <div className="text-center py-8">
                <p className='text-2xl text-red-600 mb-4'>
                    {error?.data?.message || 'Error loading products!'}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-xl text-gray-600">No products found</p>
                <Link
                    to="/admin/product/new"
                    className="mt-4 inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Create New Product
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Main Content */}
                <div className="flex-1">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold">
                            All Products ({products.length})
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {products.map((product) => (
                            <div
                                key={product._id}
                                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex flex-col sm:flex-row">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full sm:w-48 h-48 object-cover"
                                    />

                                    <div className="p-4 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-semibold">
                                                {product.name}
                                            </h3>
                                            <span className="text-sm text-gray-500">
                                                {moment(product.createdAt).format('MMM D, YYYY')}
                                            </span>
                                        </div>

                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {product.description}
                                        </p>

                                        <div className="mt-auto flex justify-between items-center">
                                            <span className="text-lg font-bold">
                                                ${product.price}
                                            </span>

                                            <Link
                                                to={`/admin/product/update/${product._id}`}
                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center gap-2"
                                            >
                                                Update
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Admin Sidebar */}
                <div className="md:w-64">
                    <AdminMenu />
                </div>
            </div>
        </div>
    );
};