const asyncHandler = require('express-async-handler');

const Customer = require('../models/Customers');


//Get Customers
// GET /api/customers
// access private
const getCustomers = asyncHandler (async (req, res) => {

    const customers = await Customer.find();

    res.status(200).json(customers);

})


//Get Customers
// GET /api/customer
// access private
const getCustomer = asyncHandler(async (req, res) => {
    const customerId = req.params.id;

    // Fetch customer data from the database based on the provided ID
    const customer = await Customer.findById(customerId);

    // Check if the customer exists
    if (!customer) {
        res.status(404); 
        throw new Error(`Customer with ID ${customerId} not found`);
    }
    res.status(200).json(customer);
});

//Get Customers
// POST /api/customer
// access private
const addCustomer = asyncHandler(async (req, res) => {
    const { name, email, city, state, country, phoneNumber } = req.body;

    // Check if required fields are missing
    if (!name || !email || !city || !state || !country || !phoneNumber) {
        res.status(400);
        throw new Error('All fields are required');
    }

    
    // Create a new customer
    const customer = await Customer.create({
        name,
        email,
        city,
        state,
        country,
        phoneNumber,
        user: req.user.id,
    });

    res.status(201).json(customer); 
});


//Get Customers
// PUT /api/customer
// access private

const updateCustomers = asyncHandler(async (req, res) => {
    const customerId = req.params.id;
    const updateData = req.body;

    // Fetch the customer from the database based on the provided ID
    let customer = await Customer.findById(customerId);

    // Check if the customer exists
    if (!customer) {
        res.status(404); // Not Found
        throw new Error(`Customer with ID ${customerId} not found`);
    }

    // Update the customer data with the provided update data
    customer = await Customer.findByIdAndUpdate(customerId, updateData, { new: true });

    // Respond with the updated customer data
    res.status(200).json(customer);
});



//Get Customers
// DLETE /api/customer
// access private
const deleteCustomers = asyncHandler(async (req, res) => {
    const customerId = req.params.id;

    // Fetch the customer from the database based on the provided ID
    const customer = await Customer.findById(customerId);

    // Check if the customer exists
    if (!customer) {
        res.status(404); // Not Found
        throw new Error(`Customer with ID ${customerId} not found`);
    }

    // Delete the customer from the database
    await Customer.findByIdAndDelete(customerId);

    // Respond with a success message
    res.status(200).json({ message: `Customer with ID ${customerId} has been deleted` });
});






module.exports = {
    getCustomers,
    getCustomer,
    addCustomer,
    updateCustomers,
    deleteCustomers
}