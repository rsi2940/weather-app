const Weatherapp = (() => {
  let refreshCounter = 0;
  const init = async () => {
    let api = ``;
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude.toString();
        const long = position.coords.longitude.toString();
        const apiKey = '5106a8c6b134d42f71824dfb31a8867d';
        api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;
        getApi(api);
      });
    }
    getApi(api);
    const date = new Date();
    const today = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
    $('.english-date').html(today);
    getTime();
    setInterval(() => {
      refreshCounter++;
      if (refreshCounter > 0) {
        location.reload();
      }
      getApi(api);
    }, 60 * 60 * 1000);

    setInterval(() => {
      getTime();
    }, 1000);
  };
  // get the api
  const getApi = (api) => {
    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        data.message && $('.weather-alert').html(`${alertTitle}`);
        let alertTitle = '';
        if (data.alerts) {
          const alerts = data.alerts;
          alertTitle = alerts[0].event;
        }
        const temperature = data.current.temp;
        const summary = data.current.weather[0].main;
        const icon = data.current.weather[0].icon;
        const farenheit = temperature;
        const celsius = (farenheit - 32) / 1.8;
        $('.weather-summary').html(summary);
        $('.temp').html(Math.floor(farenheit));
        if (alertTitle) {
          $('.weather-alert').html(`${alertTitle}`);
        }
        // toggle temperature °F to °C
        $('.row2').on('click', () => {
          if ($('.temp').html() == Math.floor(celsius)) {
            $('.temp').html(Math.floor(farenheit));
            $('.temp-type').html('°F');
          } else {
            $('.temp').html(Math.floor(celsius));
            $('.temp-type').html('°C');
          }
        });
        // set icon
        $('#icon1').attr('src', `src/weather-icons/${icon}.png`);
      })
      .catch((e) => {
        console.log(e);
        $('.weather-alert').html(`${e}`);
      });
  };
  // get the time
  const getTime = () => {
    const now = new Date();
    const baseTime = now.getTime();
    const englishTime = new Date(baseTime);
    let currentTimeStr = englishTime.toLocaleTimeString();
    const timeArr = currentTimeStr.split(':');
    timeArr[0] < 10 && timeArr[0] != 0
      ? (currentTimeStr = `0${timeArr[0]}:${timeArr[1]} ${
          timeArr[2].split(' ')[1]
        }`)
      : (currentTimeStr = `${timeArr[0]}:${timeArr[1]} ${
          timeArr[2].split(' ')[1]
        }`);
    $('.english-time').html(currentTimeStr);
  };

  return {
    init: init,
  };
})();
$(document).ready(function () {
  console.log('init');
  Weatherapp.init();
});
// register service worker
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/weatherAppSW.js');
// }
