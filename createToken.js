import jwt from 'jsonwebtoken'

export const genToken = (res, userId) => {
  const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {
    expiresIn: '1h'
  })

  // set jwt as a http only cookie
  res.cookie(''jwt', token, {
    httpOnly: true,
    secure: process.env.JWT_NODE !== 'development',
    sameSite: 'strict',
    maxAge: 360000 //login session to last for one hour
  })

reurn token 

}
