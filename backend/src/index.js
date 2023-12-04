const express = require('express')
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

require('./database/mongoose')
const port = 3000

const userRouter = require('./routes/users');
const screenRouter = require('./routes/screens');
const movieRouter = require('./routes/movies');
const scheduleRouter = require('./routes/schedules');
const showtimeRouter = require('./routes/showtimes');
const reservationRouter = require('./routes/reservations');
// const ticketRouter = require('./routes/tickets');
const otherRouter = require('./routes/others');

app.use(express.json());
app.use(cors());
app.use(morgan('common'));
app.disable('x-powered-by');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/v1/users", userRouter);
app.use("/v1/screens", screenRouter);
app.use("/v1/movies", movieRouter);
app.use("/v1/schedules", scheduleRouter);
app.use("/v1/showtimes", showtimeRouter);
app.use("/v1/reservations", reservationRouter);
// app.use("/v1/tickets", ticketRouter);
app.use("/v1/", otherRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})