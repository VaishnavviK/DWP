const express = require("express");
const path = require("path");
const API = require("./apiCall/api.js");

const app = express();
const router = express.Router();
const port = 8080;

app.use('/', router);

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// Calls API to return people from London and within its 50 miles radius
router.get('/londonResidentsAndNearby50Miles', async (req, res) => {
    const fromLondon = await API.londonResidents();
    const within50MilesRadius = await API.within50MilesofLondon();

    const list = fromLondon.concat(within50MilesRadius);
    const finalList = list.toString().replace(/,/g, ", ");

    res.send(finalList);
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
