const express = require('express')
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

require('./database/mongoose')
const port = 3000

const userRouter = require('./routes/users');

app.use(express.json());
app.use(cors());
app.use(morgan('common'));
app.disable('x-powered-by');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/v1/users", userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})