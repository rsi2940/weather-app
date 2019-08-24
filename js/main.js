const Weatherapp = (() => {
  const init = async () => {
    let lat;
    let long;
    let api = ``;
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(position => {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        api = `https://api.darksky.net/forecast/73e0910b09c7698c62b4dbb11b6cf77f/${lat},${long}`;
        getApi(api);
      });
    }
    getTime();
    setInterval(() => {
      getApi(api);
    }, 15 * 60 * 1000);
    setInterval(() => {
      getTime();
    }, 1000);
  };
  const getApi = api => {
    fetch(api,{
    mode: 'no-cors',
    body: JSON.stringify(data)})
      .then(async response => {
      const data = await response;
      return data; })
      .then ( data=> {
              console.log(data);
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

        console.log('weather loaded!!');
      });
  };
  const getTime = () => {
    const now = new Date();
    const baseTime = now.getTime();
    const englishTime = new Date(baseTime);
    const currentTimeStr = englishTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
    const today = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(now);
    $('.english-date').html(today);
    $('.english-time').html(currentTimeStr);
  };
  return {
    init: init
  };
})();
$(document).ready(function() {
  Weatherapp.init();
});
