const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'Your API Description',
    },
    servers: [
        {
          url: 'http://localhost:3000', // Thay đổi đường dẫn này nếu cần thiết
          description: 'Local development server',
        },
      ],
  },
  apis: [__dirname+'/routes/users.js'], // Đặt đường dẫn tới các file chứa định nghĩa routes của bạn
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
