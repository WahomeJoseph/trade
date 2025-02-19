import Category from "../models/categoryModel.js"

// add new category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body
    if (!name) {
      res.json({ error: "Category Name is Required!" })
      return
    }

    const existingCategory = await Category.findOne({ name })
    if (existingCategory) {
      res.json({ error: "Category Already Exists!" })
      return
    }

    const category = await new Category({ name }).save()
    res.json(category)
  } catch (error) {
    res.status(400).json(error)
    return
  }
}

// update a category
export const updateCategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body
    const updatedCategory = await Category.findByIdAndUpdate({ _id: categoryId }, 
     { name },
     {new: true}
    )

    if (!updatedCategory) {
      res.status(404).json({ error: "Category Not Found!"})
      return
    }
    res.status(200).json({message: 'Category Updated Successfully!',updatedCategory})

  } catch (error) {
    res.status(500).json({ error: "Internal server error"})
  }
}

// remove / delete category
export const removeCategory = async (req, res) => {
  try {
    const {categoryId} = req.params
    const removeCategory = await Category.findByIdAndDelete(categoryId)

    if (!removeCategory) {
      res.status(404).json({message: 'Category Not Found!'})
      return 
    }
    res.status(200).json({message: 'Category Successfully Removed!', removeCategory})
    return 
  } catch (error) {
    res.status(500).json({ error: "Internal server error"})
  }
}

// list all categories available
export const listCategories = async (req, res) => {
  try {
    const categories = await Category.find({})
    if (!categories) {
      res.status(404).json({message: 'No Categories Found!'})
      return
    }
    res.status(200).json(categories)
    return

  } catch (error) {
    res.status(404).json(error.message)
  }
}

// find for category by id
export const readCategory = async (req, res) => {
  try {
    const showCategory = await Category.findOne({ _id: req.params.id })
    if (!showCategory) {
      res.status(404).json({message: 'Category Not Found!'})
      return 
    }
    res.json(showCategory)
    return

  } catch (error) {
    res.status(500).json({message: 'Internal Server Error!'})
  }
}