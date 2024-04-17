const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const path = require('path');

const port = 5117

app.use(bodyParser.json())
// absolute path for the directories holding the files that are needed
const resources_dir = path.join(__dirname, 'resources');
// will hold the html file
const html_dir = path.join(__dirname, 'html');

// serve static files (css, js) from this directory when they are requested
app.use(express.static(resources_dir));


app.get('/', (req, res) => {
    res.sendFile((path.join(html_dir, 'basic.html')));
});

app.post('/addcontent', (req, res) =>{
    let delta = req.body.content
    let html = req.body.html

    // process the data
    // sanitize html, add delta/html to database, etc.
})


app.get('/quillExample', (req, res)=>{

})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

