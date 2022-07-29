/**
 * @swagger
 * components:
 *  schemas:
 * 
 *      Cities:
 *          example:
 *              ciudadesFavoritas: array
 * 
 *      Location:
 *          example:
 *              dataUbicacion: array 
 * 
 *      Current:
 *          type: object
 *          properties:
 *              city:
 *                  type: string
 *                  description: ciudad a investigar
 *          example:
 *              dataUbicacion: object
 *              tiempoActual: string
 * 
 *      Forecast:
 *          type: object
 *          properties:
 *              city:
 *                  type: string
 *                  description: ciudad a investigar
 *          example:
 *              dataUbicacion: object
 *              tiempoACincoDias: array
 */

/**
 * @swagger
 * /v1/citys:
 *  get:
 *      summary: Recupera ciudades favoritas
 *      tags: [Citys]
 *      responses: 
 *          200:
 *              description: Ciudades favoritas obtenidas
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Cities'
 *          500: 
 *              description: Error recuperando ciudades
 */

/**
 * @swagger
 * /v1/location:
 *  get:
 *      summary: Recupera datos de la ubicacion actual
 *      tags: [Location]
 *      responses: 
 *          200:
 *              description: Datos recuperados de ubicacion
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Location'
 *          500: 
 *              description: Error recuperando ubicacion
 */

/**
 * @swagger
 * /v1/current/{city}:
 *  get:
 *      summary: Recupera datos de ubicacion de la City y estado del tiempoa actual
 *      tags: [Current]
 *      parameters: 
 *            - in: path
 *              name: city
 *              schema:
 *                  type: string 
 *              required: true
 *              description: Ciudad a investigar
 *      responses: 
 *          200:
 *              description: Datos recuperados de la Ciudad
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Weather'
 *          500: 
 *              description: Error en el servidor
 */

/**
 * @swagger
 * /v1/current:
 *  get:
 *      summary: Recupera datos de ubicacion actual y estado del tiempo actual
 *      tags: [Current]
 *      responses: 
 *          200:
 *              description: Datos recuperados de la Ciudad
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Weather'
 *          500: 
 *              description: Error en el servidor
 */

/**
 * @swagger
 * /v1/forecast/{city}:
 *  get:
 *      summary: Recupera datos de ubicacion de la City y estado del tiempo a 5 dias
 *      tags: [Forecast]
 *      parameters: 
 *            - in: path
 *              name: city
 *              schema:
 *                  type: string 
 *              required: true
 *              description: Ciudad a investigar
 *      responses: 
 *          200:
 *              description: Datos recuperados de la Ciudad
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Forecast'
 *          500: 
 *              description: Error en el servidor
 */

/**
 * @swagger
 * /v1/forecast:
 *  get:
 *      summary: Recupera datos de ubicacion actual y estado del tiempo a 5 dias
 *      tags: [Forecast]
 *      responses: 
 *          200:
 *              description: Datos recuperados de la Ciudad
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Forecast'
 *          500: 
 *              description: Error en el servidor
 */
