const asyncHandler = () => (req,res,next) => {
   Promise.resolve((req,res,next)).catch((error)=> {
    res.status(500).json({message: error.message})
   }) 
}

export default asyncHandler