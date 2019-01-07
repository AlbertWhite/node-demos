const fs = require('fs')
const path = require('path')
const callApi = require('./callApi.js')
const constants = require('./constants')

ENCODING = constants.ENCODING
GITHUB_LATEST_RELEASE_API = constants.GITHUB_LATEST_RELEASE_API

// callApi(GITHUB_LATEST_RELEASE_API).then(({ response }) => {
//   const createdTime = response.created_at
//   console.log('createdTime', createdTime)
// })

// console.log({ createdTime })

fs.readFile(
  path.resolve(__dirname + '/../', 'package.json'),
  ENCODING,
  function(err, data) {
    const obj = JSON.parse(data)
    const dependencies = obj.dependencies
    console.log(Object.keys(dependencies))

    //loop the dependencies
    //find the repo
    //find time
    //filter time if it is less than 3 days
  }
)
