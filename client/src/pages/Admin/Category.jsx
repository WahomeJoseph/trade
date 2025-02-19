/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation, useFetchCategoriesQuery } from "../../redux/api/CategoryApi.js";
import { toast } from "react-toastify"
import CategoryForm from "../../components/CategoryForm.jsx"
import Modal from "../../components/Modal.jsx"
import AdminMenu from "./AdminMenu.jsx"

const Category = () => {
  const { data: categories } = useFetchCategoriesQuery()
  console.log(categories)
  const [name, setName] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [updatingName, setUpdatingName] = useState("")
  const [modalVisible, setModalVisible] = useState(false)

  const [createCategory] = useCreateCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()

  const handleCategory = async (e) => {
    e.preventDefault()
    if (!name) {
      toast.error("Category Name is Required!");
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
      console.error(error);
      toast.error("Creating category failed, try again!")
    }
  }

  const handleUpdateCategory = async (e) => {
    e.preventDefault()

    if (!updatingName) {
      toast.error("Category name is required!")
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
        setSelectedCategory(null);
        setUpdatingName("");
        setModalVisible(false);
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
      console.error(error);
      toast.error("Category deletion failed. Try again!")
    }
  }

  return (
    <div className="p-4 md:ml-[16rem] md:mr-[12rem] sm:ml-10 bg-cover items-center h-screen">
      <AdminMenu />
      <div className="flex flex-col bg-cover bg-black rounded-sm shadow-xl w-full sm:mx-auto p-4 space-y-3">
        <h2 className="text-2xl font-semi-bold md:text-left p-2 md:ml-2 sm:text-center text-gray-100">Manage Categories</h2>

        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCategory}
        />

        <div className="flex gap-2 border-t-2 rounded-t border-gray-900 p-4 max-h-[12rem] overflow-y-auto">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className="bg-gray-100 border font-semi-bold text-xl py-2 px-4 shadow-md rounded-md m-3 sm:truncate  hover:bg-gray-900 hover:text-white focus:outline-none"
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
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  )
}

export default Category