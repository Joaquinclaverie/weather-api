var express = require('express');
var weatherRouter = express.Router();
const axios = require('axios');

weatherRouter.get('/citys', async (req, res) => {
  try {
    const body = ['Salta', 'Mendoza', 'Ushuaia', 'Rosario', 'Jujuy']
    res.json({ ciudadesFavoritas: body });
  } catch (err) {
    res.status(500).json({ errorMessage: 'Error recuperando ciudades, intente nuevamente'})
  }
});

weatherRouter.get('/location', async (req, res) => {
  try {
    const response = await axios.get('http://ip-api.com/json/');
    const body = await response.data
    res.json({ dataUbicacion: body });
  } catch (err) {
    res.status(500).json({ errorMessage: 'Error recuperando ubicacion, intente nuevamente'})
  }
});

weatherRouter.get('/current/:city?', async (req, res) => {
  try {
    if (req.params.city) {
      const city = req.params.city
      const coordinatesCity = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=6e9b399568a2ae9fb39620ce199a6339`)
      const currentWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinatesCity.data[0].lat}&lon=${coordinatesCity.data[0].lon}&appid=6e9b399568a2ae9fb39620ce199a6339`)
      res.json({
        dataUbicacion: coordinatesCity.data[0],
        tiempoActual: currentWeather.data.weather[0].main
      })
    } else {
      const response = await axios.get('http://ip-api.com/json/');
      const location = await response.data
      const currentWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=6e9b399568a2ae9fb39620ce199a6339`)
      res.json({
        dataUbicacion: location,
        tiempoActual: currentWeather.data.weather[0].main
      })
    }
  } catch (err) {
    res.status(500).json({error: 'Error en el servidor, intente nuevamente'})
  }
})

weatherRouter.get('/forecast/:city?', async (req, res) => {
  try {
    if (req.params.city) {
      const city = req.params.city
      const coordinatesCity = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=6e9b399568a2ae9fb39620ce199a6339`)
      const fiveDaysWeather = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${coordinatesCity.data[0].lat}&lon=${coordinatesCity.data[0].lon}&appid=6e9b399568a2ae9fb39620ce199a6339`)
      const dailyWeather = fiveDaysWeather.data.list.map((days) => days.weather[0])
      const filterDailyWeather = dailyWeather.filter((obj, pos, arr) => {
        return arr
          .map(obj => obj.id)
          .indexOf(obj.id) == pos;
      })
      const mainWeather = filterDailyWeather.map(daily => daily.main)
      res.json({
        dataUbicacion: coordinatesCity.data[0],
        tiempoACincoDias: mainWeather
      })
    } else {
      const response = await axios.get('http://ip-api.com/json/');
      const location = await response.data
      const fiveDaysWeather = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=6e9b399568a2ae9fb39620ce199a6339`)
      const dailyWeather = fiveDaysWeather.data.list.map((days) => days.weather[0])
      const filterDailyWeather = dailyWeather.filter((obj, pos, arr) => {
        return arr
          .map(obj => obj.id)
          .indexOf(obj.id) == pos;
      })
      const mainWeather = filterDailyWeather.map(daily => daily.main)
      res.json({
        dataUbicacion: location,
        tiempoACincoDias: mainWeather
      })
    }
  } catch (err) {
    res.status(500).json({error: 'Error en el servidor, intente nuevamente'})
  }
})

module.exports = weatherRouter;
