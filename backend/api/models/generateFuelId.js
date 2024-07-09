
const Fuel = require('./Fuel');

async function generateFuelId() {
  try {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');

    // Find the last fuel ID from the database
    const lastFuel = await Fuel.findOne({}, {}, { sort: { 'createdAt': -1 } });

    // If no Fuel exist, start with 001
    let lastFuelNumber = 0;
    if (lastFuel) {
      const lastFuelId = lastFuel.fuelId;
      if (lastFuelId) {
        const lastFuelNumberStr = lastFuelId.split('/').pop();
        lastFuelNumber = parseInt(lastFuelNumberStr);
      }
    }

    // Increment the last fuel number and generate the new fuel ID
    const newFuelNumber = lastFuelNumber + 1;
    const newFuelNumberStr = newFuelNumber.toString().padStart(3, '0');
    const fuelId = `F${year}/${month}/${newFuelNumberStr}`;
    
    return fuelId;
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = generateFuelId;
