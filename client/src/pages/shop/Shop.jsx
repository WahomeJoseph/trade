import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useGetFilteredProductsQuery } from '../../redux/api/ProductApi'
import { useFetchCategoriesQuery } from '../../redux/api/CategoryApi'
import { setCategories, setProducts, setChecked, setSelectedBrand } from '../../redux/features/shop/ShopApi'
// import { Loader } from "../../components/Loader"
import { ProductCard } from "../products/ProductCard"

export const Shop = () => {
    const dispatch = useDispatch()
    const { categories, products, checked, radio } = useSelector((state) => state.shop)

    const categoriesQuery = useFetchCategoriesQuery()
    const [priceFilter, setPriceFilter] = useState("")
    const [sortOption, setSortOption] = useState('featured')

    const filteredProductsQuery = useGetFilteredProductsQuery({
        checked,
        radio,
    })
    // console.log('Filtered Products Query Data:', filteredProductsQuery.data)

    useEffect(() => {
        if (!categoriesQuery.isLoading && categoriesQuery.data) {
            dispatch(setCategories(categoriesQuery.data))
        }
    }, [categoriesQuery.data, categoriesQuery.isLoading, dispatch])

    useEffect(() => {
        if (!checked.length || !radio.length) {
            if (!filteredProductsQuery.isLoading && Array.isArray(filteredProductsQuery.data?.products)) {
                let filteredProducts = filteredProductsQuery.data.products.filter(
                    (product) => {
                        return (
                            product.price.toString().includes(priceFilter) ||
                            product.price === parseInt(priceFilter, 10)
                        )
                    }
                )
                // Apply sorting
                switch (sortOption) {
                    case "price-low":
                        filteredProducts.sort((a, b) => a.price - b.price)
                        break
                    case "price-high":
                        filteredProducts.sort((a, b) => b.price - a.price)
                        break
                    case "newest":
                        filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        break
                    default:
                        // Default sorting (featured)
                        break
                }
                dispatch(setProducts(filteredProducts))
            }
        }
    }, [checked, radio, filteredProductsQuery.data, filteredProductsQuery.isLoading, dispatch, priceFilter, sortOption])


    const handleBrandClick = (brand) => {
        const productsByBrand = filteredProductsQuery.data?.products.filter(
            (product) => product.brand === brand
        )
        dispatch(setProducts(productsByBrand))
    }

    const handleCheck = (value, id) => {
        const updatedChecked = value
            ? [...checked, id]
            : checked.filter((c) => c !== id)
        dispatch(setChecked(updatedChecked))
    }

    const uniqueBrands = Array.isArray(filteredProductsQuery.data?.products)
        ? [
            ...new Set(
                filteredProductsQuery.data?.products
                    .map((product) => product.brand)
                    .filter((brand) => brand !== undefined)
            ),
        ]
        : []


    const handlePriceChange = (e) => {
        setPriceFilter(e.target.value)
    }

    return (
        <>
            <div className="relative flex items-center justify-center bg-cover bg-center mx-auto px-4 py-8">
                {/* relative flex items-center justify-center min-h-screen bg-cover bg-center */}
                <div className='absolute inset-0 bg-black bg-opacity-50'></div>
                <div className="relative flex flex-col px-[10rem] py-4 lg:flex-row gap-10">
                    {/* Filter Section */}
                    <div className="bg-[#151515] p-3 mt-2 mb-2 rounded-sm space-y-4">
                        <h2 className="h4 text-center py-2 bg-black text-gray-500 rounded-full mb-2">
                            Filter by Categories
                        </h2>
                        <div className="p-5 w-[25rem] overflow-y-auto">
                            {categories?.map((category) => (
                                <div key={category._id} className="mb-2">
                                    <div className="flex ietms-center mr-4">
                                        <input
                                            type="checkbox"
                                            id="red-checkbox"
                                            onChange={(e) => handleCheck(e.target.checked, category._id)}
                                            className="w-4 h-4 text-purple-600 bg-purple-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-offset-gray-800 focus:ring-2 transition-colors duration-300"
                                        />

                                        <label
                                            htmlFor="pink-checkbox"
                                            className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                                        >
                                            {category.name}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h2 className="h4 text-center py-2 bg-black text-gray-500 rounded-full mb-2">
                            Filter by Brands
                        </h2>

                        <div className="p-5">
                            {uniqueBrands?.map((brand) => (
                                <div key={brand} className="flex items-enter mr-4 mb-5">
                                    <input
                                        type="radio"
                                        id={brand}
                                        name="brand"
                                        onChange={() => handleBrandClick(brand)}
                                        className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />

                                    <label
                                        htmlFor="pink-radio"
                                        className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                                    >
                                        {brand}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <h2 className="h4 text-center py-2 bg-black text-gray-500 rounded-full mb-2">
                            Filer by Price
                        </h2>

                        <div className="p-5 w-full">
                            <input
                                type="text"
                                placeholder="Enter Price"
                                value={priceFilter}
                                onChange={handlePriceChange}
                                className="w-full bg-purple-100 px-3 py-4 mx-0 placeholder-gray-400 border rounded-sm focus:outline-none focus:ring focus:border-purple-300"
                            />
                        </div>

                        <div className="p-5 pt-0">
                            <button
                                className="w-full bg-purple-600 p-3 border-none my-0 cursor-pointer hover:bg-purple-700 text-white rounded-sm focus:outline-none"
                                onClick={() => {
                                    dispatch(setChecked([]))
                                    setPriceFilter('')
                                    setCategories('')
                                    setSortOption('featured')
                                    setSelectedBrand(null)
                                }}>
                                Reset Filters
                            </button>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="lg:w-3/4">
                        {/* Products Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-0">
                                {products.length} {products.length === 1 ? 'Product' : 'Products'}
                            </h2>
                            <div className="flex items-center space-x-2">
                                <span className="text-base text-gray-500">Sort by:</span>
                                <select
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                    className="block w-full items-center pl-3 pr-20 py-2 mx-0 text-xl text-amber-400 border border-gray-500 focus:outline-none focus:ring-purple-100 focus:border-purple-100 sm:text-sm rounded-md"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="newest">Newest</option>
                                </select>
                            </div>
                        </div>

                        {/* Products Grid */}
                        {filteredProductsQuery.isLoading ? (
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                        <div className="animate-pulse">
                                            <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                                            <div className="p-4 space-y-3">
                                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No products match your filters</p>
                                <button
                                    onClick={() => {
                                        dispatch(setChecked([]))
                                        setPriceFilter('')
                                        setCategories('')
                                        setSortOption('featured')
                                        setSelectedBrand(null)
                                    }}
                                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
                                {products.map((products) => (
                                    <ProductCard key={products._id} products={products} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}