const parseMD = require("parse-md").default
const path = require("path")
const fs = require("fs")

const postPath = path.join(__dirname, "../src/posts")

let postlist = []

const getPosts = async () => {
  await fs.readdir(postPath, (err, files) => {
    if (err) {
      return console.log("Failed to get files in posts folder:  " + err)
    }
    // console.log(files)
    files.forEach((file, i) => {
      // let postObj = {}
      let post
      fs.readFile(`${postPath}/${file}`, 'utf8', (err, contents) => {
        if (err) {
          return console.log("Failed to read files in posts folder:  " + err)
        }
        const { metadata, content } = parseMD(contents)
        // console.log('*******************************')
        // console.log('METADATA', metadata)
        console.log('CONTENT', content, typeof content)
        post = {
          id: i + 1,
          title: metadata.title ? metadata.title : "No title",
          date: metadata.date ? metadata.date : "No date",
          author: metadata.author ? metadata.author : "No author",
          summary: metadata.summary ? metadata.summary : "No summary",
          keywords: metadata.keywords ? metadata.keywords : " ",
          filename: metadata.filename ? metadata.filename : "",
          content: content ? content : "No content"
        }
        // console.log('POST', post)
        postlist.push(post)
        if (i === files.length - 1) {
          // console.log(postlist)
          let data = JSON.stringify(postlist)
          fs.writeFileSync("src/posts.json", data)
        }
      })
    })
  })

}

getPosts()