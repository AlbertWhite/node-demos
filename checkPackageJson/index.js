const fs = require('fs')
const path = require('path')
const callApi = require('./callApi.js')
const constants = require('./constants')

ENCODING = constants.ENCODING
GITHUB_LATEST_RELEASE_API = constants.GITHUB_LATEST_RELEASE_API
GITHUB_SEARCH_API = constants.GITHUB_SEARCH_API
millisecondsToDays = constants.millisecondsToDays

fs.readFile(
  path.resolve(__dirname + '/../', 'package.json'),
  ENCODING,
  function(err, data) {
    const obj = JSON.parse(data)
    const dependencies = Object.keys(obj.dependencies)
    dependencies.forEach(dependency => {
      const url = GITHUB_SEARCH_API + dependency
      callApi(url).then(({ response }) => {
        const {
          name,
          owner: { login }
        } = response.items[0]
        const repo = name
        const owner = login
        const url = GITHUB_LATEST_RELEASE_API(owner, repo)

        callApi(url).then(({ response }) => {
          const createdDate = new Date(response.created_at)
          const today = new Date()

          //if (createdDate && millisecondsToDays(today - createdDate) < 3) {
          console.log('The repo', name, 'is created on', createdDate)
          // }
        })
      })
    })
  }
)
