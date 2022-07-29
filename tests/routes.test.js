const request = require('supertest')
require('dotenv').config();
const baseURL = process.env.BASE_URL

describe('Get Citys', () => {
    it('Recuperando Ciudades favoritas', async () => {
        const res = await request(baseURL).get('/v1/citys')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('ciudadesFavoritas')
    })
})

describe('Get Current sin pasarle ciudad', () => {
    it('Recuperando data de ubicacion y tiempo actual', async () => {
      const res = await request(baseURL).get('/v1/current')
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('dataUbicacion')
      expect(res.body).toHaveProperty('tiempoActual')
    })
})

describe('Get Current pasandole ciudad', () => {
    it('Recuperando data de ubicacion y tiempo actual', async () => {
        const res = await request(baseURL).get('/v1/current/Ushuaia')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('dataUbicacion')
        expect(res.body).toHaveProperty('tiempoActual')
    })
})

describe('Get Forecast sin pasarle ciudad', () => {
    it('Recuperando data de ubicacion y tiempo a 5 dias', async () => {
      const res = await request(baseURL).get('/v1/forecast')
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('dataUbicacion')
      expect(res.body).toHaveProperty('tiempoACincoDias')
    })
})

describe('Get Forecast pasandole ciudad', () => {
    it('Recuperando data de ubicacion y tiempo a 5 dias', async () => {
        const res = await request(baseURL).get('/v1/forecast/Ushuaia')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('dataUbicacion')
        expect(res.body).toHaveProperty('tiempoACincoDias')
    })
})