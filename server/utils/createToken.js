import jwt from 'jsonwebtoken'
export const genToken = (res, userId) => {
// create a token using user id as the payload
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })

  // set jwt as a http only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'production',
    sameSite: 'strict',
    maxAge: 3600000 //login session to expire after an hour
  })

return token 

}
