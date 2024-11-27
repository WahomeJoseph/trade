import jwt from 'jsonwebtoken'

const genToken = (res, userId) => {
  const token = jwt.sign({userId})
}
