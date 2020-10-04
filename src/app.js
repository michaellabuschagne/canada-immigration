// https://www.canada.ca/content/dam/ircc/documents/json/data-ptime-non-country-en.json
const canadaProcessingTimesUrl = 'https://www.canada.ca/content/dam/ircc/documents/json/data-ptime-en.json';

const axios = require('axios').default;

axios.get(canadaProcessingTimesUrl)
    .then(response => {
        if (response.data) {
            const { data : { work : { lastupdated, ZA } } } = response;
            console.log('Last Updated:', lastupdated);
            console.log('Work permit (from outside Canada) - South Africa:', ZA);
            
        }
    })
    .catch(error => {
        console.log(error);
    });