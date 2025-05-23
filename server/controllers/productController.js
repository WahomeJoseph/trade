import Product from "../models/productModel.js"

// add a new product
export const addProduct = async (req, res) => {
  try {
    const { name, brand, description, price, category, quantity, image, countInStock } = req.body
    switch (true) {
      case !name:
        return res.json({ error: "Name is required!" })
      case !brand:
        return res.json({ error: "Brand is required" })
      case !description:
        return res.json({ error: "Description is required" })
      case !price:
        return res.json({ error: "Price is required" })
      case !category:
        return res.json({ error: "Category is required" })
      case !quantity:
        return res.json({ error: "Quantity is required" })
      case !image:
        return res.json({ error: "Image is required" })
      case !countInStock:
        return res.json({ error: "Count in Stock is required" })
    }

    const product = new Product({ ...req.body })
    await product.save()
    return res.status(200).json({ message: 'Product Added Succesfully', product })

  } catch (error) {
    return res.status(401).json({ message: 'Failed to Add Product'})
  }
}

// update a product
export const updateProduct = async (req, res) => {
  try {
    const { name, brand, description, price, category, quantity, image, countInStock } = req.body
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" })
      case !brand:
        return res.json({ error: "Brand is required" })
      case !description:
        return res.json({ error: "Description is required" })
      case !price:
        return res.json({ error: "Price is required" })
      case !category:
        return res.json({ error: "Category is required" })
      case !quantity:
        return res.json({ error: "Quantity is required" })
      case !image:
        return res.json({ error: "Image is required" })
      case !countInStock:
        return res.json({ error: "Count in Stock is required" })
    }

    const product = await Product.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
    await product.save()
    return res.status(200).json({ message: 'Product Updated Successfully!', product })

  } catch (error) {
    return res.status(400).json({ message: 'Failed to Update Product!'})
  }
}

// remove a product
export const removeProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    return res.status(200).json({ message: 'Product Deleted Successfully!', product })
  } catch (error) {
    return res.status(500).json({ message: 'Failed to Delete Product!'})
  }
}

// fetch only the indicated amout of products
export const fetchProducts = async (req, res) => {
  try {
    const pageSize = 5
    const keyword = req.query.keyword
      ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
      : {}

    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword }).limit(pageSize)

    return res.json({
      products,
      page: 2,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error'})
  }
}

// fetch a single product
export const fetchProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      return res.status(200).json({ message: 'Product Fetched Successfully!', product })
    } else {
      return res.status(404).json({ message: 'No Product Found!' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error!'})
  }
}

// fetch all products
export const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(20)
      .sort({ createAt: -1 })
    return res.status(200).json({ message: 'Products Loaded Successfully!', products })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error!'})
  }
}

// add rating & review to a product
export const addProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)

    if (product) {
      const alreadyReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString())
      if (alreadyReviewed) {
        return res.status(40).json({ message: 'Product Already Reviewed!' })
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }

      product.reviews.push(review)
      product.numReviews = product.reviews.length

      product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length

      await product.save()
      return res.status(200).json({ message: 'Product Review Added!' })
    } else {
      return res.status(400).json({ message: 'Product Review not Added!' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error'})
  }
}

// filter by getting top products based on the rating and reviews
export const fetchTopProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1, numReviews: -1 }).limit(10).exec()

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No Top-rated Products Found!' })
    }
    return res.status(200).json({ message: 'Top Product Sales!', products })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error!'})
  }
}

// filter by getting newest products
export const fetchNewProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 }).limit(5)
    return res.status(200).json({ message: 'Newest Products!', products })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error!'})
  }
}

// filter products based on price choice
export const filterProducts = async (req, res) => {
  try {
    const { checked, radio } = req.body

    let args = {}
    if (checked.length > 0) args.category = checked
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }

    const products = await Product.find(args)
    return res.status(200).json({ message: 'Filtered Products', products })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error!'})
  }
}