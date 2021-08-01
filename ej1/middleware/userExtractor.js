const jwt = require('jsonwebtoken')
module.exports = (request, response, next) => {
  let token = null
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    token = auth.substring(7)
  }

  let decodedToken = {}
  try {
    decodedToken = jwt.verify(token, process.env.SECRET_KEY)
  } catch (error) {
    next(error)
  }
  console.log(decodedToken)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const { id: userId } = decodedToken
  request.userId = userId
  next()
}
