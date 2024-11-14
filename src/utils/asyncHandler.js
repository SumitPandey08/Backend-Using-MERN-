const asyncHandler = (requestHandeler) => {
   return (req , res , next) => {
        Promise.resolve(requestHandeler(req , res , next)).catch(
            (err) => next(err)
        )
    }
} 



export default asyncHandler ;



// also can be done in many way