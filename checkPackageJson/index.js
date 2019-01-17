/*
  la tâche pour détecter les mis à jours de node modules dans les 3 derniers jours
  https://github.com/FnacDarty/fnac-pop/issues/2925
*/

const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const { promisify } = require('util')

const ENCODING = 'utf-8'
const millisecondsToDays = millisecond =>
  parseInt(millisecond / (1000 * 60 * 60 * 24), 10)

const promisifyReadFile = promisify(fs.readFile)

// pour récuperer les dependencies prod dans package.json
async function getDependenciesFromPackageJson() {
  const response = await promisifyReadFile(
    path.resolve(`${__dirname}/../`, 'package.json'),
    ENCODING
  )
  const dependencies = await Object.keys(JSON.parse(response).dependencies)
  return dependencies
}

// helper fonction pour appel git api
async function callApi(url) {
  const options = {
    path: url
  }
  const response = await fetch(url, options)
  const data = await response.json()
  return data
}

/**
 *
 * get the last update
 *
 * */
async function getLatestUpdate(dependencies) {
  const url = 'https://registry.npmjs.org/'
  const result = await Promise.all(
    dependencies.map(dependency =>
      callApi(`${url}${dependency}`).then(response => {
        const createdDate = new Date(response.time.modified)
        const today = new Date()
        if (millisecondsToDays(today - createdDate) < 3) {
          console.log(dependency, 'is updated on', createdDate)
          return true
        }
        return false
      })
    )
  )
  return result.includes(true)
}

// entry point
getDependenciesFromPackageJson().then(dependencies => {
  getLatestUpdate(dependencies).then(hasRecentUpdate => {
    if (!hasRecentUpdate) {
      console.log('There isn\'t recent update in the last 3 days.')
    }
  })
})
