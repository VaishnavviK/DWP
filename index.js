const express = require("express");
const path = require("path");
const API = require("./apiCall/api.js");

const app = express();
const router = express.Router();

app.use('/', router);

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

router.get('/LondonUsersAndNearby50Miles', async (req, res) => {
    const fromLondon = await API.londonUsers();
    const within50MilesRadius = await API.within50MilesofLondon();
    const finalList = fromLondon.concat(within50MilesRadius);

    res.send(finalList.toString());
});

app.listen(8080);
