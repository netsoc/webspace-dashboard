const https = require('https')

// TODO: check authToken works globally
let authToken = ''

export const WEBSPACED_API_URL = 'webspaced.netsoc.ie/v1'
export const IAM_API_URL = 'iam.netsoc.ie/v1'

// Set and verify the new token if not empty
export function setAuthToken (newToken) {
  const oldToken = authToken
  authToken = newToken
  if (authToken.length !== 0) {
    fetch(IAM_API_URL + '/users/self/token').catch(authToken = oldToken) // TODO: is this correct?
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
    if (authToken.length !== 0) {
      options.headers.Authorization = 'Bearer ' + authToken
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
          } catch (e) {
            reject(e)
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
