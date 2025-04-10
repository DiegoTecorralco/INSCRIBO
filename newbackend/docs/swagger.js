// docs/swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Control Escolar',
    version: '1.0.0',
    description: 'Documentación de la API para el sistema escolar',
    contact: {
        name: 'Diego Salvador Tecorralco Martínez',
        email: 'mcteco111@gmail.com',
      },
  },
  servers: [
    {
      url: 'http://localhost:3000', // ajusta si tu server usa otro puerto
      description: 'Servidor local',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Escanea tus rutas
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
