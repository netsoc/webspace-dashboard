const https = require('https')

// TODO: move jwt to localstorage instead of this variable
let token = ''

export const WEBSPACED_API_URL = 'webspaced.netsoc.ie/v1'
export const IAM_API_URL = 'iam.netsoc.ie/v1'

export function userIsLoggedIn () {
  return token.length !== 0
}

// Set authToken and verify the if not empty
export function setToken (newToken) {
  token = newToken
  if (userIsLoggedIn()) {
    fetch(IAM_API_URL + '/users/self/token').catch(err => {
      // Failed to validate new JWT
      console.error(err.message)
      token = ''
    })
  }
}

// General method for making calls to the Netsoc API
// TODO: do we need custom request headers?
export function fetch (url, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    // Request options
    const options = {
      host: url.substring(0, url.indexOf('/')),
      path: url.substring(url.indexOf('/')),
      method: method,
      headers: {}
    }

    // Authenticate with JWT if set
    if (userIsLoggedIn()) {
      options.headers.Authorization = 'Bearer ' + token
    }

    // Create the request
    const req = https.request(options, res => {
      // Reject on response error
      if (res.statusCode < 200 || res.statusCode >= 300) {
        reject(new Error(res.statusCode))
      }

      // Receive any response data
      let data = ''
      res.on('data', d => {
        data += d
      })

      // Parse and resolve successful on end
      res.on('end', () => {
        if (data.length === 0) {
          resolve()
        } else {
          try {
            resolve(JSON.parse(data))
          } catch (err) {
            reject(err)
          }
        }
      })
    })

    // Reject on request error
    req.on('error', err => {
      reject(err)
    })

    // Write request body if not empty
    if (body) {
      req.write(JSON.stringify(body))
    }

    // End the request
    req.end()
  })
}
