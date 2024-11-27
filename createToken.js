import jwt from 'jsonwebtoken'

const genToken = (res, userId) => {
  const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {
    expiresIn: '30m'
  })

  // set jwt as a http only cookie
  res.cookie(''jwt', token, {
    httpOnly: true,
    secure: process.env.JWT_NODE !== 'development',
  })
}
