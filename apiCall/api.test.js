const API = require('./api.js');
const fetch =  require('node-fetch');

jest.mock('node-fetch', () => jest.fn());

describe("Lives in London function", () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test("it should call api and return london users", async () => {
        fetch.mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve([
                {
                    id: 688,
                    first_name: 'Tiffi',
                    last_name: 'Colbertson',
                    email: 'tcolbertsonj3@vimeo.com',
                    ip_address: '141.49.93.0',
                    latitude: 37.13,
                    longitude: -84.08
                },
                {
                    id: 794,
                    first_name: 'Katee',
                    last_name: 'Gopsall',
                    email: 'kgopsallm1@cam.ac.uk',
                    ip_address: '203.138.133.164',
                    latitude: 5.7204203,
                    longitude: 10.901604
                }
            ]),
        }))
        const apiCall = await API.londonUsers();

        expect(apiCall).toEqual(["Tiffi Colbertson", "Katee Gopsall"]);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    test("it should return error when API call fails", async () => {
        fetch.mockImplementationOnce(() => Promise.reject("API is down"));

        const apiCall = await API.londonUsers();

        expect(apiCall).toEqual("API is down");
        expect(fetch).toHaveBeenCalledTimes(1);
    });
});

describe("Lives within 50 miles of London function", () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test("it should call api and who lives within 50 miles of london", async () => {
        fetch.mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve([
                {
                    id: 322,
                    first_name: 'Hugo',
                    last_name: 'Lynd',
                    email: 'hlynd8x@merriam-webster.com',
                    ip_address: '109.0.153.166',
                    latitude: 51.6710832,
                    longitude: 0.8078532
                },
                {
                    id: 554,
                    first_name: 'Phyllys',
                    last_name: 'Hebbs',
                    email: 'phebbsfd@umn.edu',
                    ip_address: '100.89.186.13',
                    latitude: 51.5489435,
                    longitude: 0.3860497
                }
            ]),
        }))
        const apiCall = await API.within50MilesofLondon();

        expect(apiCall).toEqual(["Hugo Lynd", "Phyllys Hebbs"]);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    test("it should return error when API call fails", async () => {
        fetch.mockImplementationOnce(() => Promise.reject("API is down"));

        const apiCall = await API.within50MilesofLondon();

        expect(apiCall).toEqual("API is down");
        expect(fetch).toHaveBeenCalledTimes(1);
    });
});
