const fetch = require('node-fetch')
const constants = require('./constants')

GITHUB_HOST = constants.GITHUB_HOST
GITHUB_USER_AGENT = constants.GITHUB_USER_AGENT

module.exports = url => {
  return new Promise((resolve, reject) => {
    let options = {
      hostname: GITHUB_HOST,
      path: url,
      headers: {
        'user-agent': GITHUB_USER_AGENT
      }
    }

    fetch(url, options).then(response => {
      return response.json().then(json => resolve({ response: json }))
    })
  })
}
