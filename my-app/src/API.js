const https = require('https')

export const WEBSPACED_API_URL = 'webspaced.netsoc.ie/v1'
export const IAM_API_URL = 'iam.netsoc.ie/v1'

// Checks if the user has a valid token
export async function isUserLoggedIn () {
  // Check if a token is set
  if (localStorage.getItem('token') === null) {
    return false
  }

  // Check if the token is valid
  try {
    await fetch(IAM_API_URL + '/users/self/token')
    return true
  } catch (err) {
    return false
  }
}

// Set a new token
export async function setToken (token) {
  localStorage.setItem('token', token)
  await isUserLoggedIn()
}

export function clearToken () {
  // TODO (Ted): I'm getting a 'Failed to fetch' error when I attempt this.
  fetch(IAM_API_URL + '/users/self/login', 'DELETE').catch(err => console.error(err.message))
  localStorage.removeItem('token')
}

// General method for making calls to the Netsoc API
export function fetch (url, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    // Request options
    const options = {
      host: url.substring(0, url.indexOf('/')),
      path: url.substring(url.indexOf('/')),
      method: method,
      headers: {}
    }

    // Authenticate with token if set
    if (localStorage.getItem('token') !== null) {
      options.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
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
