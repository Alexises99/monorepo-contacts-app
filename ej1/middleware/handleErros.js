
const ERROR_HANDLER = {
  CastError: response => {
    response.status(400).send({ error: 'id used is malformed' })
  },

  ValidationError: (response, error) => {
    response.status(409).send({
      error: error.message
    })
  },

  JsonWebTokenError: response => {
    response.status(401).json({ error: 'token is missing or invalid' })
  },

  TokenExpirerError: response => {
    response.status(401).json({ error: 'token expired' })
  },

  defaultError: response => response.status(500).end()
}

module.exports = (error, request, response, next) => {
  console.error(error)
  const handler = ERROR_HANDLER[error.name] || ERROR_HANDLER.defaultError
  handler(response, error)
}
