const fetch = require("node-fetch");
const GeoPoint = require("geopoint");

// This function returns who lives in London
exports.londonResidents = async () => {
    try {
        let nameList = [];
        const users = await fetch('https://bpdts-test-app.herokuapp.com/city/London/users').then((res) => {
            return res.json();
        });

        for(const i in users) {
            const name = (users[i].first_name).concat(" ", users[i].last_name);
            nameList.push(name);
        }
        return nameList;
    } catch (e) {
        return e;
    }
};

// This function returns who lives within 50 miles of London
exports.within50MilesofLondon = async () => {
    try {
        let nameList = [];
        const londonLatLong = new GeoPoint(51.509865, -0.118092);
        const users = await fetch('https://bpdts-test-app.herokuapp.com/users').then(res => { return res.json(); });

        for(const i in users) {

            // GeoPoint plugin helps to find the geographical distance between latlongs
            const current = new GeoPoint(parseInt(users[i].latitude), parseInt(users[i].longitude));
            const distance = londonLatLong.distanceTo(current, true);
            const miles = GeoPoint.kilometersToMiles(distance);

            //  Add if the distance in miles is less than 50
            if (parseInt(miles) <= 50) {
                const name = (users[i].first_name).concat(" ", users[i].last_name);
                nameList.push(name);
            }
        }
        return nameList;
    } catch (e) {
        return e;
    }
};
