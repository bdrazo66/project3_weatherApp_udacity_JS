/* Global Variables */

const gBtn = document.getElementById('generate');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const entry = document.getElementsByClassName('title');
const entryHolder = document.querySelector('#entryHolder');
const content = document.getElementById('content');
const country = document.getElementById('country');
const city = document.getElementById('city');
var tempV;
var countryV;
var cityV;
var tempVg;
var countryVg;
var cityVg;
var gDate;
var feelingVg;


let d = new Date();
const newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();



gBtn.addEventListener('click', event => {

    event.preventDefault(); // tp prefent from refresh the page
    let d = new Date();
    var newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
    const zipCode = document.querySelector('#zip');
    const zipCodeV = zipCode.value;
    const url1 = 'http://api.openweathermap.org/data/2.5/weather?zip=';
    const url2 = '&appid=6efcb06ca733d2641baf0cd2cd7aeb0f&units=imperial';
    // for test purpose >>>> zipCodeV = 99524;
    const apiUrl = url1 + zipCodeV + url2;
    const feeling = document.querySelector('.myInput');
    const feelingV = feeling.value;

    console.log('button pressed');
    console.log(newDate);
    date.innerHTML = "Today is " + newDate;
    console.log(tempV);
    console.log(zipCodeV);
    console.log(feelingV);
    console.log(apiUrl);

    apiData();

    updateUI();
    fetch(apiUrl)


    async function apiData() {

        await fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                res => res.json()
                countryV = data.sys.country,
                    cityV = data.name,
                    tempV = data.main.temp;

                console.log(tempV);
                console.log(countryV);
                console.log(cityV);

            });
        sendData({ zipCode: zipCodeV, feeling: feelingV, temp: tempV, country: countryV, city: cityV, date: newDate })

        .then(() => {
            updateUI()

        });
    }


    async function sendData(data) {

        try {

            const request = await fetch('http://localhost:3232/a', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify(data),
                mode: 'cors'

            });

            const response = await request.json();

        } catch (error) {
            console.log('/a throw this', error);
            temp.innerHTML = "there was an error, /a throw this";
            date.innerHTML = "there was an error, /a throw this";
            feeling.innerHTML = "there was an error, /a throw this";
            country.innerHTML = "there was an error, /a throw this";
            city.innerHTML = "there was an error, /a throw this";
        }

    };


    async function updateUI() {
        const request = await fetch('http://localhost:3232/g')

        try {
            var data1 = await request.json();
            var currentData = data1.slice(-1)[0];
            var countryVg = currentData.country;
            var cityVg = currentData.city;
            var tempVg = currentData.temp;
            var gDate = currentData.date;
            var feelingVg = currentData.feeling;
            console.log(data1);
            console.log(currentData);


            temp.innerHTML = "Tempurature is : " + tempVg;
            date.innerHTML = "Today is " + gDate;
            content.innerHTML = "Feeling is : " + feelingVg;
            country.innerHTML = "City is : " + countryVg;
            city.innerHTML = "Country is : " + cityVg;
        } catch (error) {
            console.log("error3", error);
            temp.innerHTML = "there was an error, /a throw this";
            date.innerHTML = "there was an error, /a throw this";
            feeling.innerHTML = "there was an error, /a throw this";
            country.innerHTML = "there was an error, /a throw this";
            city.innerHTML = "there was an error, /a throw this";
        }
    };


});