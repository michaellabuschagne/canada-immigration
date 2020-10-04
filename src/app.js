
const xpath = require('xpath')
const dom = require('xmldom').DOMParser;
const axios = require('axios').default;
const parse5 = require('parse5');
const xmlser = require('xmlserializer');

// https://www.canada.ca/content/dam/ircc/documents/json/data-ptime-non-country-en.json
const canadaProcessingTimesUrl = 'https://www.canada.ca/content/dam/ircc/documents/json/data-ptime-en.json';
const cadExchangeUrl = 'https://api.exchangeratesapi.io/latest?base=CAD&symbols=ZAR';
const cadPrItaDrawUrl = 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/submit-profile/rounds-invitations.html';

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
            console.log(`CAD\\ZAR exchange rate: R${zarRate}`);     
        }
    })
    .catch(error => {
        console.log(error);
    });

// 
axios.get(cadPrItaDrawUrl)
    .then(response => {
        if (response.data) {
            // console.log(response.data);
            var xpath_ = '/html/body/main/div[1]/div[6]/p[7]/text()';
            var document = parse5.parse(response.data);
            var xhtml = xmlser.serializeToString(document);
            var doc = new dom().parseFromString(xhtml);
            var select = xpath.useNamespaces({"x": "http://www.w3.org/1999/xhtml"});
            var node = select(xpath_, doc);
            console.log(node[0]);

            // const doc = new dom().parseFromString(response.data);
            // const crsScore = xpath.select("//html//body//main//div[1]//div[6]//p[7]//ntext()", doc)
            // console.log('CRS score:', crsScore);
            

        }
    })
    .catch(error => {
        console.log(error);
        
    });