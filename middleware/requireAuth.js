const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required' , "isAuthorised" : false})
  }

  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)

    req.user = await User.findOne({ _id }).select('_id')
    res.status(200).json({ "isAuthorised" : true})
    next()

  } catch (error) {
    res.status(401).json({error: 'Request is not authorized' , "isAuthorised" : false})
  }
}

module.exports = requireAuth
