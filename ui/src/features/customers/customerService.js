import axios from "axios";

const API_URL = '/api/customers/';

// create new customer
const createCustomer = async (customerData, token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, customerData, config)

    return response.data;
}

// get customers
const getCustomers = async (token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data;
}

// delete customer
const deleteCustomer = async (customerId, token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(`${API_URL}/${customerId}`, config);

    return response.data;
}

const customerService = {
    createCustomer,
    getCustomers,
    deleteCustomer,
}

export default customerService;
