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
      toast.error("Category name is required!");
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
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <AdminMenu />
      <div className="md:w-3/4 p-3">
        <h2 className="h-12 text-xl">Manage Categories</h2>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCategory}/>
        <br />
        <hr />
        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none foucs:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                onClick={() => {{setModalVisible(true), setSelectedCategory(category), setUpdatingName(category.name)}}}>
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