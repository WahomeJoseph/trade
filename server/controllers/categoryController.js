import Category from "../models/categoryModel.js"

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body
    if (!name) {
      res.json({ error: "Category name is required!" })
      return
    }

    const existingCategory = await Category.findOne({ name })
    if (existingCategory) {
      res.json({ error: "Category already exists!" })
      return
    }

    const category = await new Category({ name }).save()
    res.json(category)
  } catch (error) {
    res.status(400).json(error)
    return
  }
}

export const updateCategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body
    const category = await Category.findOne({ _id: categoryId })

    if (!category) {
      res.status(404).json({ error: "Category not found" })
      return
    }

    category.name = name
    const updatedCategory = await category.save()
    res.json(updatedCategory)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
    return
  }
}

export const removeCategory = async (req, res) => {
  try {
    const removed = await Category.findByIdAndRemove(req.params.categoryId)
    res.json(removed)
    return
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
    return
  }
}

export const listCategory = async (req, res) => {
  try {
    const all = await Category.find({})
    res.json(all)
    return
  } catch (error) {
    res.status(400).json(error.message)
    return
  }
}

export const readCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id })
    res.json(category)
    return
  } catch (error) {
    console.log(error)
    res.status(400).json(error.message)
    return
  }
}