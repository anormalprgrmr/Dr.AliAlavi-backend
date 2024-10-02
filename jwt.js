const jwt = require('jsonwebtoken')

secretKey = '5b69489ecf45d9736986cdc402b20165d496210b94c6f53b78446a51e4d4100c032d3845f1d65d25613c88deeb978e085cbfa95b87dbf97e304995443b9f3db2'

const generateAccessToken = (payload) => {
    const options = {
        expiresIn:"1h",
    }

    const token = jwt.sign(payload,secretKey,options)
    return token
}

module.exports = {
    generateAccessToken
}