const fetch = require("node-fetch");
const GeoPoint = require("geopoint");

// This function returns who lives in London
exports.londonUsers = async () => {
    try {
        let nameList = [];
        const users = await fetch('https://bpdts-test-app.herokuapp.com/city/London/users').then((res) => {
            return res.json();
        });

        for(const i in users) {
            const name = (users[i].first_name).concat(" ", users[i].last_name)
            nameList.push(name);
        }
        return nameList;
    } catch (e) {
        return e;
    }
}

// This function returns who lives nearby 50 miles of London
exports.within50MilesofLondon = async () => {
    try {
        const users = await fetch('https://bpdts-test-app.herokuapp.com/users').then(res => { return res.json(); });
        const londonLatLong = new GeoPoint(51.509865, -0.118092);
        let nameList = [];


        for(const i in users) {
            const current = new GeoPoint(parseInt(users[i].latitude), parseInt(users[i].longitude));
            const val = londonLatLong.distanceTo(current, true);
            const miles = GeoPoint.kilometersToMiles(val);

            if (parseInt(miles) <= 50) {
                const name = (users[i].first_name).concat(" ", users[i].last_name)
                nameList.push(name);
            }
        }
        return nameList;
    } catch (e) {
        return e;
    }
}
