import { useState } from 'react'
import { useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation, useFetchCategoriesQuery } from '../../redux/api/CategoryApi.js'
import { toast } from 'react-hot-toast'
import { CategoryForm } from '../../components/CategoryForm.jsx'
import { Modal } from '../../components/Modal.jsx'
import { AdminMenu } from './AdminMenu.jsx'

export const Category = () => {
  const { data: categories } = useFetchCategoriesQuery()
  console.log(categories)
  const [name, setName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [updatingName, setUpdatingName] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  const [createCategory] = useCreateCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()

  const handleCategory = async (e) => {
    e.preventDefault()
    if (!name) {
      toast.error('Category Name is Required!')
      return
    }

    try {
      const result = await createCategory({ name }).unwrap()
      if (result.error) {
        toast.error(result.error)
      } else {
        setName('')
        toast.success(`${result.name} has been created.`)
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to Create Category!')
    }
  }

  const handleUpdateCategory = async (e) => {
    e.preventDefault()

    if (!updatingName) {
      toast.error('Category name is required!')
      return
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap()

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(`${result.name} is updated!`)
        setSelectedCategory(null)
        setUpdatingName('')
        setModalVisible(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap()

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(`${result.name} is deleted!`)
        setSelectedCategory(null)
        setModalVisible(false)
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to Delete Category!')
    }
  }
  // md:ml-[16rem] md:mr-[12rem] sm:ml-10 bg-cover items-center h-screen
  return (
    <div className='relative flex min-h-screen bg-transparent items-center justify-center p-4 sm:mx-auto py-10 sm:px-20 md:px-[20rem]'>
      <div className='absolute inset-0 bg-black bg-opacity-50'></div>
      <AdminMenu />
      <div className='relative flex flex-col bg-cover rounded-sm shadow-[0px_0px_20px_0px_rgba(165,_39,_255,_0.48)] w-full sm:mx-auto p-4 space-y-3'>
        <h2 className='text-2xl font-semi-bold md:text-left p-2 md:ml-2 sm:text-center text-gray-100'>Manage ¥ Categories</h2>

        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCategory}
        />

        <div className='flex gap-2 border-t-2 rounded-t border-[#080] p-4 max-h-[12rem] overflow-y-auto'>
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className='bg-gray-900 border-b border-[#080] text-gray-100 font-semi-bold text-xl py-2 px-5 rounded-sm m-3 sm:truncate  hover:bg-[#080] hover:border-gray-100 focus:outline-none'
                onClick={() => { { setModalVisible(true), setSelectedCategory(category), setUpdatingName(category.name) } }}>
                {category.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText='Update'
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  )
}