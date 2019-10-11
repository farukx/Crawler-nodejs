
const express  = require('express');
const metascraper = require('metascraper')([
    require('metascraper-title')(),
    require('metascraper-description')(),
    require('metascraper-logo')(),
    require('metascraper-amazon')(),
    require('metascraper-url')(),
    require('metascraper-video')(),
    require('metascraper-youtube')(),
    require('metascraper-image')(),
    require('metascraper-lang')(),
    require('metascraper-publisher')(),
    require('metascraper-author')()
])
const got = require('got')
const  send  = require('micro')

const app = express()

app.get('/', async function(req, res) {
    const  site = req.query.url
        const {body: html, url} = await got(site).catch((e)=>{console.log(e)})
        const metadata = await metascraper({html, url})
        res.json({metadata})
        
      //  

 } )
app.listen(8888);

