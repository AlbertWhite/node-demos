var fs = require('fs')
var http = require('http')
var folderPath = 'F:code/fnac-pop/assets/src/components'
var maxLineNumber = 150
var encoding = 'utf-8'

function checkLineNumber(str) {
  var length = str.split(/\r\n|\r|\n/).length
  if (length > maxLineNumber) {
    return length
  }
  return false
}

function readFile(path) {
  var file = fs.readFileSync(path, encoding)
  if (file) {
    var length = checkLineNumber(file)
    if (length) {
      console.log(path, length)
    }
  }
}

function readFolder(folderPath) {
  fs.readdir(folderPath, encoding, function(err, fileNames) {
    fileNames.forEach(function(fileName) {
      var filePath = folderPath + '/' + fileName
      var stats = fs.statSync(filePath)
      if (stats.isFile() && filePath.indexOf('.js') !== -1) {
        readFile(filePath)
      }
      if (stats.isDirectory()) {
        readFolder(filePath)
      }
    })
  })
}

readFolder(folderPath)
