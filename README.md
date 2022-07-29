# Weather API
API que provee en formato JSON el estado del tiempo basado en diferentes endpoints.

# Comandos para levantar la API

* `npm run dev` : Para levantar la API en modo desarrollo en la cual se reinicia la API cada vez que se modifica un archivo
* `npm run start`: Para levantar la API sin reinicio
* `npm run test`: Para ejecutar los test configurados

# Endpoints

`GET` Devuelve ciudades hardcodeadas como sugerencia para utilizarlas en los endpoints en los cuales se puede pasar una ciudad: `/v1/citys` 

`GET` Devuelve los datos de ubicación city según ip-api: `/v1/location` 

`GET` City es un parámetro opcional. Devuelve los datos de ubicación city o la ubicación actual según ip-api y el estado del tiempo actual: `/v1/current/:city` 

`GET` City es un parámetro opcional. Devuelve los datos de ubicación city o la ubicación actual según ip-api y el estado del tiempo a 5 días: `/v1/forecast/:id` 