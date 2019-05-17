const express = require("express")
const app = express()

app.get("/news", (req, res) => {
    const getNews = require("./src/getNews")()
    getNews.execute().then(r => res.send(r)).catch(e => res.send(e))
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is up and running")
})