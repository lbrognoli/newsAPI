const express = require("express")
const app = express()

app.get("/news", (req, res) => {
    const getNews = require("./src/getNews")()
    getNews(req.query.searchTerm).then(r => res.send(r)).catch(e => res.send(e))
})

app.listen(3000 || process.env.PORT)