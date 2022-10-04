//import jwt, { decode } from 'jsonwebtoken'
const jwt = require('jsonwebtoken')
//import { getToken } from '../controllers/Tokens.js'
const Token = require('../controllers/Tokens')

module.exports.auth = async (req, res, next) => {
  // get accessToken from request
  const accessToken = req.cookies['access_token']

  // get refresh accessToken from request
  const refreshToken = req.cookies['refresh_token']

  if(accessToken !== undefined) {

    // get xsrf token from request
    const xsrfToken = req.headers['x-xsrf-token']

    // verify the accessToken validity
    jwt.verify(accessToken, process.env.JWTKEY, (err, decoded) => {
      if (err) {
        // check if accessToken has expired
        if (err.name === 'TokenExpiredError') {

          // if refresh token exist
          if (refreshToken !== undefined) return res.status('401').json({ message: 'we are going to refresh your session' })

          // if no refresh token is available
          return res.status('403').json({ messsage: 'your session has expired' })
        }

      } 

      // check if the xrsf token is the in the request and in the accessToken
      if (decoded.xsrfToken !== xsrfToken) return res.status('403').json({ messsage: 'attack CSRF decteted' })
      
      // set the role in the request
      req.roles = decoded.roles

      // pass to the next step
      next()
    })
  }
  // if refresh token doesn\'t exist
  else if(refreshToken !== undefined) return res.status('401').json({message: 'we are refreshing you session'})
  
  // send 403 response no accessToken and no refrsh token are available
  else {return res.status('403').json({ messsage: 'no token available' })}
}


  /*
  // check access token
  if (token != undefined) {
    // get xsrf token from request
    const xsrfToken = req.headers['x-xsrf-token']
    // verify access token
    jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
      if (err) {
        // check if token has expired
        if (err.name === 'TokenExpiredError') {
          // get refresh token from request
          const refreshToken = req.cookies['refresh_token']
          // if refresh token exist
          if (refreshToken != undefined) {
            // check if refresh token is in database
            if (Token.getToken(refreshToken)) {
              jwt.verify(refreshToken,process.env.REFRESHKEY,
                (error, user) => {
                  if (error) return res.status(403).json(error)
                  //create JWT token
                  const jwtToken = jwt.sign(
                    { id: user.id, roles: user.roles, xsrfToken }, //data stored in the token
                    process.env.JWTKEY, //jwt's private key
                    { expiresIn: '10m' } //token's validity time
                  )
                  res.cookie('access_token', jwtToken, {
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                    //TODO: passer le site https
                    //secure: true, // true to force https
                  })
                  next()
                }
              )
            } else {
              res
                .status(403)
                .json({ message: 'refresh token isn\'t available' })
            }
          }
          res.status('403').json({ messsage: 'token as expired' })
        }
      } else if (decoded.xsrfToken != xsrfToken) {
        res.status('403').json({ messsage: 'attack CSRF decteted' })
      } else {
        req.roles = decoded.roles
        next()
      }
    })
  } 
  else {
    res.status(403).json({ messsage: 'Invalid JWT Token' })
  }*/

