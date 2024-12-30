import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Tasks Manager API',
            version: '1.0.0',
            description: 'API for managing Taks',
            servers: [
                {
                    url: 'http://localhost:3004',
                    description: 'Local server'
                }
            ]
        }
    },
    apis: ['./src/swagger/*.yml']
};

const specs = swaggerJsdoc(options);
export default specs;
