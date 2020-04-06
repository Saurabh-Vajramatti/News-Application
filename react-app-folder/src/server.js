//const server_http=require('http');
//const App=require('./App')

// const server_port=process.env.PORT || 3000;

// const server=http.createServer(App);

// server.listen(server_port);


const express = require('express')
const app = express()
const port = 3002
const cors = require('cors')
const fetch = require('node-fetch');

app.use(cors())

app.get('/hello', (req, res) => { console.log("Hello"); res.send('Hello nn World')})

app.get('/getHomepageGuardianCardNews',(req, res) => 
    { 
        console.log("GET Guardian Homepage Card News");
        
        
        fetch("https://content.guardianapis.com/search?api-key=5631901b-74bc-475e-8f28-bdf311cb74c9&section=(sport|business|technology|politics)&show-blocks=all")
        .then(response => { return response.json()})
        .then(data=> 
            {
                res.send(data)
            })
        

        // Guardian
        // https://content.guardianapis.com/search?api-key=5631901b-74bc-475e-8f28-bdf311cb74c9&section=(sport|business|technology|politics)&show-blocks=all 
        // NY
        // 
        
    }
)


app.get('/getHomepageNYCardNews',(req, res) => 
    { 
        console.log("GET NY Homepage Card News");
        
        
        fetch("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=DXNhYbJijwtz5G7wE8vTnLSuljXZPOFk")
        .then(response => { return response.json()})
        .then(data=> 
            {
                res.send(data)
            })
        

        // Guardian
        // https://content.guardianapis.com/search?api-key=5631901b-74bc-475e-8f28-bdf311cb74c9&section=(sport|business|technology|politics)&show-blocks=all 
        // NY
        // 
        
    }
)

app.get('/getMyCardDetailedPage',(req, res) => 
    { 
        console.log("GET detailed");
        console.log(req.query.detailedPageLink)
        var linkToDetailedPage
        if(req.query.detailedPageLink.includes("https://content.guardianapis.com"))
        {
            linkToDetailedPage= req.query.detailedPageLink+"&show-blocks=all";
        }
        else
        {
            linkToDetailedPage= req.query.detailedPageLink+"&api-key=DXNhYbJijwtz5G7wE8vTnLSuljXZPOFk"
        }
        
        // console.log(linkToDetailedPage)
        fetch(linkToDetailedPage)
        .then(response => { return response.json()})
        .then(data=> 
            {
                res.send(data)
            }) 
    }
)

app.get('/getMySearchResults',(req, res) => 
    { 
        console.log("GET search results");
        let keyword=req.query.q
        let newsBrand=req.query.brand
        var linkToDetailedPage
        if(newsBrand=="guardian")
        {
            linkToDetailedPage="https://content.guardianapis.com/search?q="+keyword+"&api-key=5631901b-74bc-475e-8f28-bdf311cb74c9&show-blocks=all"
        }
        else
        {
            linkToDetailedPage="https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+keyword+"&api-key=DXNhYbJijwtz5G7wE8vTnLSuljXZPOFk"              
        }
        
        console.log(linkToDetailedPage)
        fetch(linkToDetailedPage)
        .then(response => { return response.json()})
        .then(data=> 
            {
                let firstTenArray
                if(newsBrand=="guardian")
                {
                    firstTenArray=data.response.results.slice(0,10)
                }
                else
                {
                    firstTenArray=data.response.docs.slice(0,10)
                }
                res.send(firstTenArray)
            }) 
    }
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))