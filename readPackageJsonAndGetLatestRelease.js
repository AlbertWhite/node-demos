const fs = require("fs")
const path = require("path")
const https = require("https")
const ENCODING = "utf-8"

const GITHUB_HOST = "api.github.com"
const GITHUB_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36"
const GITHUB_SEARCH_API = "/search/repositories?q="
const GITHUB_LATEST_RELEASE_API = "/repos/facebook/react/releases/latest"

const httpsRequest = url => {
  let options = {
    hostname: GITHUB_HOST,
    path: url,
    headers: {
      "user-agent": GITHUB_USER_AGENT
    }
  }

  https
    .get(options, res => {
      console.log(res.statusCode)
      res.setEncoding(ENCODING)
      let data = ""
      res.on("data", chunk => {
        data += chunk
      })
      res.on("end", () => {
        let json = JSON.parse(data)
        console.log({ json })
        return json
      })
    })
    .on("error", error => {
      console.log({ error })
    })
}

const json = httpsRequest(GITHUB_LATEST_RELEASE_API)
const createdTime = json.created_at
console.log({ createdTime })
// fs.readFile(path.resolve(__dirname, "package.json"), ENCODING, function(
//   err,
//   data
// ) {
//   const obj = JSON.parse(data)
//   const dependencies = obj.dependencies
//   console.log({ dependencies })
// })
