const fs = require('fs')
const path = require('path')
const callApi = require('./callApi.js')
const constants = require('./constants')
const promisify = require('util').promisify

ENCODING = constants.ENCODING
GITHUB_LATEST_RELEASE_API = constants.GITHUB_LATEST_RELEASE_API
GITHUB_SEARCH_API = constants.GITHUB_SEARCH_API
millisecondsToDays = constants.millisecondsToDays

const promisifyReadFile = promisify(fs.readFile)

promisifyReadFile(
  path.resolve(`${__dirname}/../`, 'package.json'),
  ENCODING
).then(data => {
  const obj = JSON.parse(data)
  const dependencies = Object.keys(obj.dependencies)
  console.log('dependencies', dependencies)
})
