// https://www.canada.ca/content/dam/ircc/documents/json/data-ptime-non-country-en.json
const canadaProcessingTimesUrl = 'https://www.canada.ca/content/dam/ircc/documents/json/data-ptime-en.json';
const cadExchangeUrl = 'https://api.exchangeratesapi.io/latest?base=CAD&symbols=ZAR'

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

axios.get(cadExchangeUrl)
    .then(response => {
        if (response.data) {           
            // {"rates":{"ZAR":12.4336345575},"base":"CAD","date":"2020-10-02"}
            const { data : { rates : { ZAR : zarRate }, date } } = response;
            console.log(`CAD\\ZAR exchange rate R${zarRate}`);     
        }
    })
    .catch(error => {
        console.log(error);
    });