import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateProductMutation } from '../../redux/api/ProductApi'
import { useFetchCategoriesQuery } from '../../redux/api/CategoryApi'
import toast from 'react-hot-toast'
import { AdminMenu } from './AdminMenu'
// import { AdminMenu } from './AdminMenu'

export const Product = () => {
    // const [image, setImage] = useState('')
    // const [imageUrl, setImageUrl] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState('')
    const [brand, setBrand] = useState('')
    const [stock, setStock] = useState(0)

    const navigate = useNavigate()

    // const [uploadProductImage] = useUploadProductImageMutation()
    const [createProduct] = useCreateProductMutation()
    const { data: categories } = useFetchCategoriesQuery()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name || !description || !price || !quantity || !brand || !category || !stock) {
            toast.error('All Inputs are Required!')
            return
        }
        try {
            const productData = {
                name, brand, price, description, category, quantity, stock
            }
            // productData.append('image', image)
            // productData.append('name', name)
            // productData.append('description', description)
            // productData.append('price', price)
            // productData.append('category', category)
            // productData.append('quantity', quantity)
            // productData.append('brand', brand)
            // productData.append('countInStock', stock)

            const { data } = await createProduct(productData)
            if (!data || data.error) {
                // console.log(data.error)
                toast.error('Failed to Add Product!')
                return
            } else {
                toast.success(`${data.name} has been created`)
                navigate('/')
            }
        } catch (error) {
            console.error(error)
            toast.error('Failed to Add Product!')
        }
    }

    // const uploadFileHandler = async (e) => {
    //     const formData = new FormData()
    //     formData.append('image', e.target.files[0])
    //     try {
    //         const response = await uploadProductImage(formData).unwrap()
    //         toast.success(response.message)
    //         setImage(response.image)
    //         setImageUrl(response.image)
    //     } catch (error) {
    //         toast.error(error?.data?.message || error.error)
    //     }
    // }

    return (
        <div className='relative flex min-h-screen bg-transparent items-center justify-center sm:mx-auto py-10 sm:px-20 md:px-[12rem]'>
            <div className='absolute inset-0 bg-black bg-opacity-50'></div>
            <div className='relative w-full grid grid-cols-1 p-10 md:mx-10 sm:mx-4 shadow-[0px_0px_20px_0px_rgba(165,_39,_255,_0.48)] mt-6'>
                <AdminMenu />
                {/* <div className='max-w-[30rem]'>
                    <AdminMenu />
                    <img src='https://images.unsplash.com/photo-1541727261696-8680e53c1149?q=80&w=3165&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='w-full object-cover' alt='' />
                </div> */}

                <div className=''>
                    <h2 className='text-[2rem] text-center text-gray-100 p-2 font-semi-bold'>Upload å Product</h2>

                    {/* image preview */}
                    {/* {imageUrl ? <img src={imageUrl} alt='product' className='block mx-auto max-h-[200px]' /> : (
                        <div className='w-full rounded-sm text-xl text-center text-gray-600 p-1 mb-2'>No Preview Image</div>
                    )} */}

                    {/* <div className='mb-3'>
                        <label className='bg-red-900 border border-gray-100 text-gray-100 block w-full text-center rounded-lg py-10'>
                            {image ? image.name : 'Upload Product Image'}
                            <input
                                type='file'
                                name='image'
                                accept='image/*'
                                onChange={uploadFileHandler}
                                className={!image ? '' : ''}
                            />
                        </label>
                    </div> */}

                    <form className='flex flex-col space-y-3'>
                        <article className='grid grid-cols-2 gap-3 p-3'>
                            <div className='flex flex-col p-1 space-y-1'>
                                <label htmlFor='name' className='block font-bold text-xl text-gray-100'>Name:</label>
                                <input type='text' className='p-4 mb-3 border border-gray-900 focus:outline-none rounded-sm bg-[#101011] text-white'
                                    value={name} onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col p-1 space-y-1'>
                                <label htmlFor='name' className='block font-bold text-xl text-gray-100'>Price:</label>
                                <input type='number' className='p-4 mb-3 border border-gray-900 focus:outline-none rounded-sm bg-[#101011] text-white'
                                    value={price} onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </article>

                        <article className='grid grid-cols-2 gap-3 p-3'>
                            <div className='flex flex-col p-1 space-y-1'>
                                <label htmlFor='name' className='block font-bold text-xl text-gray-100'>Quantity:</label>
                                <input type='number' className='p-4 mb-3 border border-gray-900 focus:outline-none rounded-sm bg-[#101011] text-white'
                                    value={quantity} onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col p-1 space-y-1'>
                                <label htmlFor='name' className='block font-bold text-xl text-gray-100'>Brand:</label>
                                <input type='text' className='p-4 mb-3 border border-gray-900 focus:outline-none rounded-sm bg-[#101011] text-white'
                                    value={brand} onChange={(e) => setBrand(e.target.value)}
                                />
                            </div>
                        </article>

                        <article className='flex flex-col p-3 space-y-1'>
                            <label htmlFor='description' className='block font-bold text-xl text-gray-100'>Description</label>
                            <textarea type='text' rows={7} className='p-4 mb-3 border border-gray-900 focus:outline-none rounded-sm bg-[#101011] text-white'
                                value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </article>

                        <article className='grid grid-cols-2 gap-3 p-3'>
                            <div className='flex flex-col p-1 space-y-1'>
                                <label htmlFor='name' className='block font-bold text-xl text-gray-100'>Count In Stock:</label>
                                <input type='text' className='p-4 mb-3 border border-gray-900 focus:outline-none rounded-sm bg-[#101011] text-white focus:outline-none'
                                    value={stock} onChange={(e) => setStock(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col p-1 space-y-1'>
                                <label htmlFor='category' className='block font-bold text-gray-100 text-xl'>Category:</label>
                                <select placeholder='Choose Category' className='p-4 mb-3 border border-gray-900 rounded-sm bg-[#101011] text-white'
                                    onChange={(e) => setCategory(e.target.value)}>
                                    {categories?.map((cart) => (
                                        <option key={cart._id} value={cart._id}>
                                            {cart.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </article>

                        <button type='submit' onClick={handleSubmit}
                            className='px-10 cursor-pointer py-4 bg-transparent border border-gray-900 bg-gray-900 mt-5 mb-10 md:mx-[10rem] text-gray-100 hover:shadow-[0px_0px_20px_0px_rgba(165,_39,_255,_0.48)] hover:outline-none rounded-sm text-lg font-bold'>
                            Upload
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}