const { google } = require("googleapis")
const customsearch = google.customsearch("v1")
const R = require("ramda")

const getNews = () => {
    const settings = {
        apiKey : process.env.API_KEY,
        cseId : process.env.CX
    }
    
    const runSearch = async (query) => {
        const response = await customsearch.cse.list({
            auth : settings.apiKey,
            cx : settings.cseId,
            q : query,
            dateRestrict : "w2"
        })
    
        return response.data.items
    }
    
    const validate = (item) => {
        if(item.pagemap && item.pagemap.metatags && item.pagemap.metatags[0]){
              return true;
          } else {
              return false;
          }
    };
    
    const formatNews = (newsData) => {
        return R.map(item => {
            if( validate(item) ){
                let date;
                if( item.pagemap.article && item.pagemap.article[0] ){
                    date = item.pagemap.article[0].datemodified ? item.pagemap.article[0].datemodified  : item.pagemap.article[0].datepublished;
                } else {
                    date = item.pagemap.metatags[0].date;
                }
    
                return {
                    "Title": item.pagemap.metatags[0]["og:title"] ? item.pagemap.metatags[0]["og:title"] : item.title,
                    "Description": item.pagemap.metatags[0]["og:description"] ? item.pagemap.metatags[0]["og:description"] : item.snippet,
                    "Url": item.pagemap.metatags[0]["og:url"] ? item.pagemap.metatags[0]["og:url"] : item.link,
                    "ImageUrl": item.pagemap.cse_thumbnail ? item.pagemap.cse_thumbnail[0].src : "",
                    "Provider": item.displayLink,
                    "DatePublished": date
                  };
                } else {
                    return null;
                }
            }, newsData)
    }
    
    const execute = async (query) => {
        const rawNews = await runSearch(query)
        return formatNews(rawNews)
    }

    return {
        execute
    }
}

module.exports = getNews


