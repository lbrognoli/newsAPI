const express = require("express")
const app = express()

app.get("/news", (req, res) => {
    const getNews = require("./src/getNews")()
    getNews.execute(req.query.searchTerm).then(r => res.send(r)).catch(e => res.send(e))
})

app.get("/", (req,res) => {
    res.send(`<h1> Welcome to the news API </h1>
                <h4>Sample: <a href="https://finewsapi.herokuapp.com/news?searchTerm=Brazil"> https://finewsapi.herokuapp.com/news?searchTerm=Brazil </a></h4>`)
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is up and running")
})