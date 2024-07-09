const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const updateMoveStatus = require('./moveStatusUpdater');
const Expenses = require('./models/Expenses');
const port = process.env.PORT || 9000



connectDB();


const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


app.use((req, res, next) => {
  updateMoveStatus();
  next();
});
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/transporters', require('./routes/transporterRoutes'));
app.use('/api/trucks', require('./routes/truckRoutes'));
app.use('/api/trailers', require('./routes/trailerRoutes'));
app.use('/api/drivers', require('./routes/driverRoutes'));
app.use('/api/moves', require('./routes/movesRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/allocate', require('./routes/allocateRoutes'));
app.use('/api/search', require('./routes/searchRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));
app.use('/api/expenses', require('./routes/expensesRoutes'));
app.use('/api/fuel', require('./routes/fuelRoutes'));
// app.use('/api/dashboard', require('./routes/dashboardRoutes'));


// services
// brake system
// oil/filters/
// change tires


// trucks total monthly Expenses
// total income monthly
// profit per month
// profit per truck

// route analysis service
// invoices - paid unpaid overdue
//testers total monthly















app.use(errorHandler);

app.use((req, res, next) => {
  updateMoveStatus();
  next();
});



app.listen(port, () => console.log(`Server running on ${port}`));
