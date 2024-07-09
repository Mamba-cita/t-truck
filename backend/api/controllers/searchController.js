const Moves = require('../models/Moves');
const Customer = require('../models/Customers');
const Driver = require('../models/Driver');
const Trailer = require('../models/Trailer');
const Transporter = require('../models/Transporter');
const Trucks = require('../models/Trucks');

const search = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const regex = new RegExp(keyword, 'i');

    const movesPromise = Moves.find({
      $or: [
        { container_number: regex },
        { moveId: regex },
        { customer: regex },
        { truck: regex },
        { invoice_no: regex },
      ],
    }).exec();

    const customerPromise = Customer.find({ name: regex }).exec();
    const driverPromise = Driver.find({ $or: [{ name: regex }, { dl: regex }, { id_no: regex }] }).exec();
    const trailerPromise = Trailer.find({ reg: regex }).exec();
    const transporterPromise = Transporter.find({ name: regex }).exec();
    const truckPromise = Trucks.find({ reg: regex }).exec();

    const [movesResults, customerResults, driverResults, trailerResults, transporterResults, truckResults] = await Promise.all([
      movesPromise,
      customerPromise,
      driverPromise,
      trailerPromise,
      transporterPromise,
      truckPromise,
    ]);

    res.json({ moves: movesResults, customers: customerResults, drivers: driverResults, trailers: trailerResults, transporters: transporterResults, trucks: truckResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  search
};
