import jwt, { decode } from 'jsonwebtoken'
import { getToken } from '../controllers/Tokens.js'

export const auth = async (req, res, next) => {
  // get access token from request
  const token = req.cookies['access_token']
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
            if (getToken(refreshToken)) {
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
  } else {
    res.status(403).json({ messsage: 'Invalid JWT Token' })
  }
}
