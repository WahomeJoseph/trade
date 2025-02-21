import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateProductMutation, useUploadProductImageMutation } from '../../redux/api/ProductApi';
import { useFetchCategoriesQuery } from '../../redux/api/CategoryApi'
import { toast } from 'react-toastify';
import { AdminMenu } from './AdminMenu';

export const Product = () => {
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [brand, setBrand] = useState('');
    const [stock, setStock] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);

    const navigate = useNavigate();

    const [uploadProductImage] = useUploadProductImageMutation();
    const [createProduct] = useCreateProductMutation();
    const { data: categories } = useFetchCategoriesQuery();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append('image', image);
            productData.append('name', name);
            productData.append('description', description);
            productData.append('price', price);
            productData.append('category', category);
            productData.append('quantity', quantity);
            productData.append('brand', brand);
            productData.append('countInStock', stock);

            const { data } = await createProduct(productData);
            if (data.error) {
                toast.error('Failed to Add Product!');
            } else {
                toast.success(`${data.name} has been created`);
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to Add Product!');
        }
    };

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);

        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
            setImageUrl(res.image);
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    };

    return (
        <div className='bg-cover md:ml-[14rem] md:mx-[10rem] sm:mx-4'>
            {/* <div className="absolute inset-0 min-h-screen bg-black bg-opacity-50"></div> */}
            <div className='relative shadow-[0px_20px_207px_10px_rgba(165,_39,_255,_0.48)] p-6 flex-col'>
                <AdminMenu />

                <div className='md:w-full p-3'>
                    <h2 className='text-[2rem] p-2 font-semi-bold'>Create Product</h2>

                    {imageUrl && (
                        <div className='text-center'>
                            <img src={imageUrl} alt='product'
                                className='block mx-auto max-h-[200px]'
                            />
                        </div>
                    )}

                    <div className='mb-3'>
                        <label className='bg-red-900 border border-gray-100 text-gray-900 space-y-3 px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-10'>
                            {image ? image.name : 'Upload Image'}
                            <input
                                type='file'
                                name='image'
                                accept='image/*'
                                onChange={uploadFileHandler}
                                className={!image ? 'visible' : 'text-black'}
                            />
                        </label>
                    </div>

                    <form className='flex flex-col space-y-3'>
                        <article className='grid grid-cols-2 gap-3 bg-red-400 p-3'>
                            <div className='flex flex-col p-1 space-y-1'>
                                <label htmlFor='name' className='block font-bold text-xl'>Name:</label>
                                <input type='text' className='p-4 mb-3 border rounded-sm bg-[#101011] text-white'
                                    value={name} onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col p-1 space-y-1'>
                                <label htmlFor='name' className='block font-bold text-xl'>Price:</label>
                                <input type='number' className='p-4 mb-3 border rounded-sm bg-[#101011] text-white'
                                    value={price} onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </article>

                        <article className='grid grid-cols-2 gap-3 bg-blue-400 p-3'>
                            <div className='flex flex-col p-1 space-y-1'>
                                <label htmlFor='name' className='block font-bold text-xl'>Quantity:</label>
                                <input type='number' className='p-4 mb-3 border rounded-sm bg-[#101011] text-white'
                                    value={quantity} onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col p-1 space-y-1'>
                                <label htmlFor='name' className='block font-bold text-xl'>Brand:</label>
                                <input type='text' className='p-4 mb-3 border rounded-sm bg-[#101011] text-white'
                                    value={brand} onChange={(e) => setBrand(e.target.value)}
                                />
                            </div>
                        </article>

                        <article className='flex flex-col p-1 space-y-1'>
                            <label htmlFor='description' className='block font-bold text-xl'>Description</label>
                            <textarea type='text' rows={7} className='p-4 mb-3 border rounded-sm bg-[#101011] text-white'
                                value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </article>

                        <article className='bg-green-700 grid grid-cols-2 gap-3 p-3'>
                            <div className='flex flex-col p-1 space-y-1'>
                                <label htmlFor='name' className='block font-bold text-xl'>Count In Stock:</label>
                                <input type='text' className='p-4 mb-3 border rounded-sm bg-[#101011] text-white'
                                    value={stock} onChange={(e) => setStock(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col p-1 space-y-1'>
                                <label htmlFor='category' className='block font-bold text-xl'>Category:</label>
                                <select placeholder='Choose Category' className='p-4 mb-3 border rounded-sm bg-[#101011] text-white'
                                    onChange={(e) => setCategory(e.target.value)}>
                                    {categories?.map((cart) => (
                                        <option key={cart._id} value={cart._id}>
                                            {cart.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </article>

                        <button onClick={handleSubmit}
                            className='flex justify-center items-center mx-[12rem] p-4 border border-gray-100 bg-gray-900 mt-5 mb-10 text-gray-100 rounded-sm text-lg font-bold'>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};