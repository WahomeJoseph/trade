import jwt from 'jsonwebtoken'
export const genToken = (res, userId) => {
// create a token using user id as the payload
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn: '1min'
  })

  // set jwt as a http only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 60000 //login session to expire after a minute
  })

return token 

}
