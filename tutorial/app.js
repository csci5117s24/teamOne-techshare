const express = require('express');
const app = express();
const path = require('path');

const port = 5117

// absolute path for the directories holding the files that are needed
const resources_dir = path.join(__dirname, 'resources');
// will hold the html file
const html_dir = path.join(__dirname, 'html');

// serve static files (css, js) from this directory when they are requested
app.use(express.static(resources_dir));


app.get('/', (req, res) => {
    res.sendFile((path.join(html_dir, 'basic.html')));
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

