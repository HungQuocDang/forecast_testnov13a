var cityName = 0;
var temperature1 = 0;
var weather = 0;
var windSpeed = 0;
let selectedCity;

function doSearchCity() {
  var x = document.getElementById("myText").value;
  selectedCity = x;
  console.log("selectedCity: ", selectedCity);

  CanadianWeather();
}
function CanadianWeather() {

  numMaxDays = 5;
  numNeedParameters = 6
  let matrixWeather = [];

  //http://api.openweathermap.org/geo/1.0/direct?q=Ottawa,CA&limit=5&appid=072c5a4ab04eb390a91ac908259464d0
  //https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=072c5a4ab04eb390a91ac908259464d0


  let textA = "https://api.openweathermap.org/geo/1.0/direct?q=";

  let textB = selectedCity;
  let textC = ",CA&limit=5&appid=072c5a4ab04eb390a91ac908259464d0";
  let resultAB = textA.concat(textB);
  let resultABC = resultAB.concat(textC);
  weatherUrl = resultABC;

  //var weatherUrl="https://api.openweathermap.org/geo/1.0/direct?q=Montreal,CA&limit=5&appid=072c5a4ab04eb390a91ac908259464d0";
  //var weatherUrl="https://api.openweathermap.org/geo/1.0/direct?q=Ottawa,CA&limit=5&appid=072c5a4ab04eb390a91ac908259464d0";
  console.log("weatherUrl", weatherUrl);

  fetch(weatherUrl)
    //fetch("https://api.openweathermap.org/geo/1.0/direct?q=Ottawa,CA&limit=5&appid=072c5a4ab04eb390a91ac908259464d0")
    .then(response => response.json()).then(cityNameInfo => {
      console.log("entrance:", cityNameInfo);

      if (!cityNameInfo[0]) {
        alert("city not found")
        return;
      }
      var lat = cityNameInfo[0].lat;
      var lon = cityNameInfo[0].lon;
      console.log("cityNameInfo", cityNameInfo);
      console.log("lon", lon);
      console.log("lat", lat);

      var searchedCity = cityNameInfo[0].name;
      console.log("searchedCity A:", searchedCity);
      var url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=072c5a4ab04eb390a91ac908259464d0`;
      fetch(url)
        .then(response => response.json()).then(forecastInfo => {

          if (!forecastInfo) {
            alert("city not found")
            return;
          }



          for (let k = 0; k <= (numMaxDays - 1); k++) {

            const aDay = dayjs()
            const bDay = aDay.add(k, 'day')
            var formatDay = dayjs(bDay).format('DD MMM YYYY');
            let temDay = (forecastInfo.daily[k].temp.day);
            let humidity = (forecastInfo.daily[k].humidity);
            let windSpeed = (forecastInfo.daily[k].wind_speed);
            let weatherIcon = (forecastInfo.daily[k].weather[0].icon);
            let weatherIcodDescrpipt = (forecastInfo.daily[k].weather[0].description);


            var listWeather = {
              temDayN: temDay,
              humidityN: humidity,
              windSpeedN: windSpeed,
              weatherIconN: weatherIcon,
              weatherIcodDescrpiptN: weatherIcodDescrpipt,
              searchedCityN: searchedCity,
              dayN: formatDay
            }
            matrixWeather.push(listWeather);
          }

          matrixAllDays = [];
          for (let m = 0; m <= (numMaxDays - 1); m++) {
            matrixAllDays.push(matrixWeather[m].dayN);
            matrixAllDays.push(matrixWeather[m].temDayN + " Cel");
            matrixAllDays.push(matrixWeather[m].humidityN + " Hum");
            matrixAllDays.push(matrixWeather[m].windSpeedN + " wind");
            matrixAllDays.push(matrixWeather[m].weatherIcodDescrpiptN);
            matrixAllDays.push(matrixWeather[m].weatherIconN);
          }
          iconDay0 = matrixAllDays[5];
       
          let mainA=document.getElementById("mainA");
          mainA.innerHTML="";
          var printCity = document.createElement("h1");   // print out city
          printCity.innerHTML = selectedCity;
          mainA.appendChild(printCity);
          
          let list0El=document.getElementById("list0");
          let list1El=document.getElementById("list1");
          let list2El=document.getElementById("list2");
          let list3El=document.getElementById("list3");
          let list4El=document.getElementById("list4");

          list0El.innerHTML="";
          list1El.innerHTML="";
          list2El.innerHTML="";
          list3El.innerHTML="";
          list4El.innerHTML="";

          for (let n = 0; n <= ((numNeedParameters * numMaxDays) - 1); n++) {
            var listItems = document.createElement("li");
            listItems.innerHTML = matrixAllDays[n];
            iconDay0 = matrixAllDays[5];
            iconDay1 = matrixAllDays[11];
            iconDay2 = matrixAllDays[17];
            iconDay3 = matrixAllDays[23];
            iconDay4 = matrixAllDays[29];

            let textIcon1 = "https://openweathermap.org/img/wn/";
            let textIcon3 = "@2x.png";

            if (n >= 0 && n <= 5) {

              if (n !== 5) {
               
                list0El.appendChild(listItems);

              }

              let textIconWeb = iconDay0;
              let resultIcon1Web = textIcon1.concat(textIconWeb);
              let resultIcon1Web3 = resultIcon1Web.concat(textIcon3);
              console.log("textIconWeb", textIconWeb);
              var iconWebUrl = resultIcon1Web3;
              console.log("iconWebUrl", iconWebUrl);
              $('#webicon0').attr('src', iconWebUrl);

            } else if (n >= 6 && n <= 11) {
              if (n !== 11) {
                
              
                list1El.appendChild(listItems);
              }
              let textIconWeb = iconDay1;
              let resultIcon1Web = textIcon1.concat(textIconWeb);
              let resultIcon1Web3 = resultIcon1Web.concat(textIcon3);
              console.log("textIconWeb", textIconWeb);
              var iconWebUrl = resultIcon1Web3;
              console.log("iconWebUrl", iconWebUrl);
              $('#webicon1').attr('src', iconWebUrl);


            } else if (n >= 12 && n <= 17) {
              if (n !== 17) {
               
                list2El.appendChild(listItems);
              }
              let textIconWeb = iconDay2;
              let resultIcon1Web = textIcon1.concat(textIconWeb);
              let resultIcon1Web3 = resultIcon1Web.concat(textIcon3);
              console.log("textIconWeb", textIconWeb);
              var iconWebUrl = resultIcon1Web3;
              console.log("iconWebUrl", iconWebUrl);
              $('#webicon2').attr('src', iconWebUrl);

            } else if (n >= 18 && n <= 23) {
              if (n !== 23) {
               
                list3El.appendChild(listItems);
              }
              let textIconWeb = iconDay3;
              let resultIcon1Web = textIcon1.concat(textIconWeb);
              let resultIcon1Web3 = resultIcon1Web.concat(textIcon3);
              console.log("textIconWeb", textIconWeb);
              var iconWebUrl = resultIcon1Web3;
              console.log("iconWebUrl", iconWebUrl);
              $('#webicon3').attr('src', iconWebUrl);

            } else if (n >= 24 && n <= 29) {
              if (n !== 29) {
               
                list4El.appendChild(listItems);
              }
              let textIconWeb = iconDay4;
              let resultIcon1Web = textIcon1.concat(textIconWeb);
              let resultIcon1Web3 = resultIcon1Web.concat(textIcon3);
              console.log("textIconWeb", textIconWeb);
              var iconWebUrl = resultIcon1Web3;
              console.log("iconWebUrl", iconWebUrl);
              $('#webicon4').attr('src', iconWebUrl);
            }
          }
        });
    })
}