const https = require('https')

export const WEBSPACED_API_URL = 'webspaced.netsoc.ie/v1'
export const IAM_API_URL = 'iam.netsoc.ie/v1'

// TODO: (global?) jwt authentication
// TODO: better error handling
// TODO: POST body

export function fetch (url, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const host = url.substring(0, url.indexOf('/'))
    const path = url.substring(url.indexOf('/'))
    const options = {
      host: host,
      path: path,
      method: method,
      headers: {
      }
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
        try {
          resolve(JSON.parse(data))
        } catch (e) {
          reject(e)
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
