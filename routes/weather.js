var express = require('express');
var weatherRouter = express.Router();
const axios = require('axios');
require('dotenv').config();

weatherRouter.get('/citys', async (req, res) => {
  try {
    const body = ['Salta', 'Mendoza', 'Ushuaia', 'Rosario', 'Jujuy']
    res.json({ ciudadesFavoritas: body });
  } catch (err) {
    res.status(500).json({ error: err, message: 'Error recuperando ciudades, intente nuevamente'})
  }
});

weatherRouter.get('/location', async (req, res) => {
  try {
    const response = await axios.get(process.env.IP_API_URL);
    const body = await response.data
    res.json({ dataUbicacion: body });
  } catch (err) {
    res.status(500).json({ error: err, message: 'Error recuperando ubicacion, intente nuevamente'})
  }
});

weatherRouter.get('/current/:city?', async (req, res) => {
  try {
    if (req.params.city) {
      const city = req.params.city
      const coordinatesCity = await axios.get(`${process.env.WEATHER_API_GEO}?q=${city}&limit=1&appid=${process.env.WEATHER_API_KEY}`)
      const currentWeather = await axios.get(`${process.env.WEATHER_API_CURRENT}?lat=${coordinatesCity.data[0].lat}&lon=${coordinatesCity.data[0].lon}&appid=${process.env.WEATHER_API_KEY}`)
      res.json({
        dataUbicacion: coordinatesCity.data[0],
        tiempoActual: currentWeather.data.weather[0].main
      })
    } else {
      const response = await axios.get(process.env.IP_API_URL);
      const location = await response.data
      const currentWeather = await axios.get(`${process.env.WEATHER_API_CURRENT}?lat=${location.lat}&lon=${location.lon}&appid=${process.env.WEATHER_API_KEY}`)
      res.json({
        dataUbicacion: location,
        tiempoActual: currentWeather.data.weather[0].main
      })
    }
  } catch (err) {
    res.status(500).json({error: err, message: 'Error en el servidor, intente nuevamente'})
  }
})

weatherRouter.get('/forecast/:city?', async (req, res) => {
  try {
    if (req.params.city) {
      const city = req.params.city
      const coordinatesCity = await axios.get(`${process.env.WEATHER_API_GEO}?q=${city}&limit=1&appid=${process.env.WEATHER_API_KEY}`)
      const fiveDaysWeather = await axios.get(`${process.env.WEATHER_API_FORECAST}?lat=${coordinatesCity.data[0].lat}&lon=${coordinatesCity.data[0].lon}&appid=${process.env.WEATHER_API_KEY}`)
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
      const response = await axios.get(process.env.IP_API_URL);
      const location = await response.data
      const fiveDaysWeather = await axios.get(`${process.env.WEATHER_API_FORECAST}?lat=${location.lat}&lon=${location.lon}&appid=${process.env.WEATHER_API_KEY}`)
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
    res.status(500).json({error: err, message: 'Error en el servidor, intente nuevamente'})
  }
})

module.exports = weatherRouter;
