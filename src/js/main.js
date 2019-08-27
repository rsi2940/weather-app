const Weatherapp = (() => {
  let refreshCounter = 0;
  const init = async () => {
    let lat;
    let long;
    const proxy = `https://cors-anywhere.herokuapp.com/`; // enable cors
    let api = ``;
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(position => {
        lat = position.coords.latitude.toString();
        long = position.coords.longitude.toString();
        api = `${proxy}https://api.darksky.net/forecast/73e0910b09c7698c62b4dbb11b6cf77f/${lat},${long}`;
        getApi(api);
      });
    }
    const date = new Date();
    const today = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
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
  const getApi = api => {
    fetch(api)
      .then(response => {
        return response.json();
      })
      .then(data => {
        let alertTitle = '';
        let alertRegions = '';
        if (data.alerts) {
          const alerts = data.alerts;
          alertTitle = alerts[0].title;
          alertRegions = alerts[0].regions.join(', ');
        }
        const { temperature, summary, icon } = data.currently;
        const farenheit = temperature;
        const celsius = (farenheit - 32) / 1.8;
        $('.weather-summary').html(summary);
        $('.temp').html(Math.floor(farenheit));
        if (alertTitle && alertRegions) {
          $('.weather-alert').html(`${alertTitle}: ${alertRegions}`);
        }
        $('.weatherType').attr('id', icon);
        $('.row2').on('click', () => {
          if ($('.temp').html() == Math.floor(celsius)) {
            $('.temp').html(Math.floor(farenheit));
            $('.temp-type').html('°F');
          } else {
            $('.temp').html(Math.floor(celsius));
            $('.temp-type').html('°C');
          }
        });
        // SETTING UP THE ICON
        const skycons = new Skycons({
          color: 'white'
        });
        currentIcon = icon.replace(/-/g, '_').toUpperCase();
        skycons.play();
        skycons.set(icon, Skycons[currentIcon]);
      });
  };
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
    init: init
  };
})();
$(document).ready(function() {
  console.log('init');
  Weatherapp.init();
});
//register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/weatherAppSW.js');
  }
