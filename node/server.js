const express = require('express');
<<<<<<< Updated upstream
const path = require('path');
const app = express();
const port = 3000;

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname + '/html/index.html'));
});
=======
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));
>>>>>>> Stashed changes

app.listen(port, () => console.log(`Example app listening on port ${port}!`));